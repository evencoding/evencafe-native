import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { Image, TouchableOpacity, useWindowDimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styled from "styled-components/native";
import { colors } from "../colors";
import { useNavigation } from "@react-navigation/native";

const Container = styled.View`
  margin-bottom: 18px;
`;
const Avatar = styled.Image``;
const ShopInfo = styled.View`
  padding: 10px;
`;
const MainInfo = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 5px;
`;
const ShopName = styled.Text`
  font-size: 22px;
  font-weight: 900;
  color: white;
`;
const Like = styled.View``;
const Action = styled.TouchableOpacity``;
const CategoryContainer = styled.View`
  flex-direction: row;
`;
const Category = styled.TouchableOpacity`
  margin-right: 10px;
`;
const CategoryName = styled.Text`
  color: ${colors.light};
  border-radius: 10px;
  padding: 5px 5px;
  border: 2px solid ${colors.dark};
  font-size: 14px;
  font-weight: 900;
`;

export default function CoffeeShopList({
  id,
  avatar,
  categories,
  name,
  isFollowing,
}) {
  const navigation = useNavigation();
  const { width, height } = useWindowDimensions();
  const [imageHeight, setImageHeight] = useState(height);
  useEffect(() => {
    Image.getSize(avatar, (width, height) => {
      setImageHeight(height / 7);
    });
  });
  return (
    <Container>
      <TouchableOpacity
        onPress={() => navigation.navigate("CoffeeShop", { id })}
      >
        <Avatar
          resizeMode="cover"
          style={{ width, height: imageHeight }}
          source={{ uri: avatar }}
        />
      </TouchableOpacity>
      <ShopInfo>
        <MainInfo>
          <TouchableOpacity
            onPress={() => navigation.navigate("CoffeeShop", { id })}
          >
            <ShopName>{name}</ShopName>
          </TouchableOpacity>
          <Action>
            <Ionicons
              name={isFollowing ? "star" : "star-outline"}
              color={colors.light}
              size={28}
            />
          </Action>
        </MainInfo>
        <CategoryContainer>
          {categories?.map((item) => (
            <Category key={item.id}>
              <CategoryName>{item.name}</CategoryName>
            </Category>
          ))}
        </CategoryContainer>
      </ShopInfo>
    </Container>
  );
}

CoffeeShopList.propTypes = {
  id: PropTypes.number.isRequired,
  avatar: PropTypes.string,
  name: PropTypes.string.isRequired,
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    })
  ),
  isFollowing: PropTypes.bool.isRequired,
};
