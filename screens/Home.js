import { gql, useQuery, useReactiveVar } from "@apollo/client";
import React, { useState } from "react";
import { FlatList } from "react-native";
import { isLoggedInVar } from "../apollo";
import CoffeeShopList from "../components/CoffeeShopList";
import ScreenLayout from "../components/ScreenLayout";

const SEECOFFEESHOPS_QUERY = gql`
  query seeCoffeeShops($offset: Int!) {
    seeCoffeeShops(offset: $offset) {
      id
      name
      bio
      adress
      avatar
      followers
      isFollowing
      categories {
        id
        name
      }
      user {
        username
        avatarURL
      }
    }
  }
`;

export default function Home({ navigation }) {
  const isLoggedin = useReactiveVar(isLoggedInVar);
  const { data, loading, refetch, fetchMore } = useQuery(SEECOFFEESHOPS_QUERY, {
    variables: {
      offset: 0,
    },
  });
  const renderCoffeeShop = ({ item: shops }) => {
    return <CoffeeShopList {...shops} />;
  };
  const refresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };
  const [refreshing, setRefreshing] = useState(false);
  return (
    <ScreenLayout loading={loading}>
      <FlatList
        onEndReachedThreshold={0.1}
        onEndReached={() =>
          fetchMore({
            variables: {
              offset: data?.seeCoffeeShops?.length,
            },
          })
        }
        refreshing={refreshing}
        onRefresh={refresh}
        style={{ width: "100%" }}
        showsVerticalScrollIndicator={false}
        data={data?.seeCoffeeShops}
        keyExtractor={(shop) => "" + shop.id}
        renderItem={renderCoffeeShop}
      />
    </ScreenLayout>
  );
}
