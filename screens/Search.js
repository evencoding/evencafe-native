import { gql, useLazyQuery } from "@apollo/client";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  View,
  useWindowDimensions,
  Text,
  ActivityIndicator,
  FlatList,
} from "react-native";
import styled from "styled-components/native";
import CoffeeShopList from "../components/CoffeeShopList";
import DismissKeyboard from "../components/DismissKeyboard";
import ShopDetail from "../components/ShopDetail";

const SEARCH_COFFEESHOP = gql`
  query searchCoffeeShop($keyword: String!) {
    searchCoffeeShop(keyword: $keyword) {
      id
      avatar
      name
      categories {
        id
        name
      }
      isFollowing
    }
  }
`;

const MessageContainer = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;
const MessageText = styled.Text`
  margin-top: 10px;
  color: white;
  font-weight: 600;
`;

const Input = styled.TextInput`
  background-color: rgba(255, 255, 255, 0.9);
  width: ${(props) => props.width / 1.5}px;
  padding: 5px 10px;
  border-radius: 7px;
`;

export default function Search({ navigation }) {
  const { width } = useWindowDimensions();
  const { setValue, register, handleSubmit } = useForm();
  const [startQueryFn, { loading, data, called }] =
    useLazyQuery(SEARCH_COFFEESHOP);
  const onValid = ({ keyword }) => {
    startQueryFn({
      variables: {
        keyword,
      },
    });
  };
  const SearchBox = () => (
    <Input
      width={width}
      placeholderTextColor="rgba(0, 0, 0, 0.8)"
      placeholder="카페 검색"
      autoCapitalize="none"
      returnKeyLabel="Search"
      returnKeyType="search"
      autoCorrect={false}
      onChangeText={(text) => setValue("keyword", text)}
      onSubmitEditing={handleSubmit(onValid)}
    />
  );
  useEffect(() => {
    navigation.setOptions({
      headerTitle: SearchBox,
    });
    register("keyword", {
      required: true,
    });
  });
  const renderItem = ({ item: shop }) => <CoffeeShopList {...shop} />;
  return (
    <DismissKeyboard>
      <View style={{ flex: 1, backgroundColor: "black" }}>
        {loading ? (
          <MessageContainer>
            <ActivityIndicator size="large" />
            <MessageText>Searching...</MessageText>
          </MessageContainer>
        ) : null}
        {!called ? (
          <MessageContainer>
            <MessageText>카페의 이름으로 검색하세요!!</MessageText>
          </MessageContainer>
        ) : null}
        {data?.searchCoffeeShop !== undefined ? (
          data?.searchCoffeeShop.length === 0 ? (
            <MessageContainer>
              <MessageText>검색 결과가 존재하지 않습니다</MessageText>
            </MessageContainer>
          ) : (
            <FlatList
              data={data?.searchCoffeeShop}
              keyExtractor={(shop) => "" + shop.id}
              renderItem={renderItem}
            />
          )
        ) : null}
      </View>
    </DismissKeyboard>
  );
}
