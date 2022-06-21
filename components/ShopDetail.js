import { Image, ScrollView, Text, useWindowDimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styled from "styled-components/native";
import { colors } from "../colors";
import { useEffect, useState } from "react";

const InfoContainer = styled.View`
  padding: 10px 20px;
`;
const ShopAvatar = styled.Image``;
const HeaderInfo = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
const ShopName = styled.Text`
  font-size: 22px;
  font-weight: 600;
  color: white;
  margin-bottom: 15px;
`;
const Action = styled.TouchableOpacity``;
const ExtreInfo = styled.View``;
const ShopAdress = styled.View`
  flex-direction: row;
  margin-bottom: 10px;
  font-size: 15px;
  font-weight: 600;
`;
const ShopBio = styled.View`
  flex-direction: row;
`;
const MarginText = styled.Text`
  color: white;
  margin-left: 20px;
  font-size: 15px;
  font-weight: 600;
`;
const AdressMarginText = styled(MarginText)`
  margin-left: 48px;
`;
const CategoryContainer = styled.View`
  margin-top: 15px;
  flex-direction: row;
`;
const PhotosContainer = styled.View``;
const Photo = styled.Image`
  margin-bottom: 10px;
`;
const Owner = styled.View``;
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

export default function ShopDetail({ data }) {
  const { width, height } = useWindowDimensions();
  const [imageHeight, setImageHeight] = useState(height);
  useEffect(() => {
    Image.getSize(data?.avatar, (width, height) => {
      setImageHeight(height / 5);
    });
  });
  return (
    <ScrollView style={{ width: "100%", flex: 1 }}>
      <ShopAvatar
        style={{ width, height: imageHeight }}
        resizeMode="cover"
        source={{ uri: data?.avatar }}
      />
      <InfoContainer>
        <HeaderInfo>
          <ShopName>{data?.name}</ShopName>
          <Action>
            <Ionicons
              name={data?.isFollowing ? "star" : "star-outline"}
              color={colors.light}
              size={28}
            />
          </Action>
        </HeaderInfo>
        <ExtreInfo>
          <ShopAdress>
            <Text
              style={{ color: "white", fontSize: "15px", fontWeight: "600" }}
            >
              주소
            </Text>
            <AdressMarginText>{data?.adress}</AdressMarginText>
          </ShopAdress>
          <ShopBio>
            <Text
              style={{ color: "white", fontSize: "15px", fontWeight: "600" }}
            >
              한줄 소개
            </Text>
            <MarginText>{data?.bio}</MarginText>
          </ShopBio>
          {data?.categories?.length > 0 ? (
            <CategoryContainer>
              {data?.categories?.map((item) => (
                <Category key={item.id}>
                  <CategoryName>{item.name}</CategoryName>
                </Category>
              ))}
            </CategoryContainer>
          ) : null}
          <Owner>
            <Text></Text>
            <Text></Text>
          </Owner>
        </ExtreInfo>
      </InfoContainer>
      <Text style={{ color: "white" }}>사진</Text>
      <PhotosContainer>
        {data?.photos?.map((photo) => (
          <Photo
            key={photo.id}
            source={{ uri: photo?.url }}
            style={{ width, height: imageHeight }}
            resizeMode="cover"
          />
        ))}
      </PhotosContainer>
    </ScrollView>
  );
}
