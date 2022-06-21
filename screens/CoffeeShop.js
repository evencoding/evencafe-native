import { gql, useQuery } from "@apollo/client";
import React from "react";
import ScreenLayout from "../components/ScreenLayout";
import ShopDetail from "../components/ShopDetail";

const SEE_COFFEESHOP_QUERY = gql`
  query seeCoffeeShop($id: Int!) {
    seeCoffeeShop(id: $id) {
      id
      name
      bio
      avatar
      adress
      latitude
      longitude
      followers
      isFollowing
      user {
        username
        avatarURL
      }
      photos {
        id
        url
      }
      categories {
        id
        name
      }
      createdAt
    }
  }
`;

export default function CoffeeShop({ navigation, route }) {
  const {
    params: { id },
  } = route;
  const { data } = useQuery(SEE_COFFEESHOP_QUERY, {
    variables: { id },
  });
  return (
    <ScreenLayout>
      <ShopDetail data={data?.seeCoffeeShop} />
    </ScreenLayout>
  );
}
