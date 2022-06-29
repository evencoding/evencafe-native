import { gql, useMutation } from "@apollo/client";
import { ReactNativeFile } from "apollo-upload-client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { TouchableOpacity, Text } from "react-native";
import styled from "styled-components";
import { colors } from "../colors";
import { TextInput } from "../components/auth/AuthShared";
import DismissKeyboard from "../components/DismissKeyboard";

const CREATE_COFFEESHOP_MUTATION = gql`
  mutation createCoffeeShop(
    $name: String!
    $bio: String
    $adress: String
    $categories: String
    $avatar: Upload
  ) {
    createCoffeeShop(
      name: $name
      bio: $bio
      adress: $adress
      categories: $categories
      avatar: $avatar
    ) {
      ok
      id
      error
    }
  }
`;

const Container = styled.View`
  flex: 1;
  background-color: black;
  align-items: center;
  justify-content: center;
  padding: 0 15%;
`;
const UploadContainer = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding: 0 20%;
`;
const FileName = styled.Text`
  background-color: rgba(255, 255, 255, 0.3);
  margin-top: 13px;
  width: 100%;
  height: 50px;
  margin-left: 5px;
  color: white;
  padding: 0 10px;
`;
const AvatarUploadText = styled.View`
  margin-top: 20px;
  background-color: ${colors.light};
  padding: 15px 7px;
  border-radius: 4px;
  color: white;
  margin-bottom: ${(props) => (props.lastOne ? "15" : 8)}px;
  border-radius: 8px;
`;

export default function CreateShop({ route, navigation }) {
  // coffeeShop을 반환해야 아래의 방법대로 처리 가능
  //   const updateUploadPhoto = (cache, result) => {
  //     const {
  //       data: { createCoffeeShop },
  //     } = result;
  //     if (createCoffeeShop.id) {
  //       cache.modify({
  //         id: "ROOT_QUERY",
  //         fields: {
  //           seeCoffeeShops(prev) {
  //             return [createCoffeeShop, ...prev];
  //           },
  //         },
  //       });
  //     }
  //   };
  const onCreateCompleted = () => {
    navigation.navigate("Tabs");
  };
  const { register, handleSubmit, setValue, watch } = useForm();
  const [file, setFile] = useState("");
  const [createShopMutation, { loading }] = useMutation(
    CREATE_COFFEESHOP_MUTATION,
    {
      onCompleted: onCreateCompleted,
    }
  );
  useEffect(() => {
    register("name");
  }, [register]);
  useEffect(() => {
    setFile(route?.params?.file);
  }, [route]);
  const onValid = ({ name }) => {
    let avatar;
    if (file) {
      avatar = new ReactNativeFile({
        uri: route?.params?.file,
        name: `1.jpg`,
        type: "image/jpeg",
      });
    }
    createShopMutation({
      variables: {
        name,
        ...(avatar && { avatar }),
      },
    });
  };
  return (
    <DismissKeyboard>
      <Container>
        <TextInput
          value={watch("name")}
          placeholder="카페 이름"
          placeholderTextColor="rgba(255, 255, 255, 0.3)"
          style={{ width: "100%" }}
          onChangeText={(text) => setValue("name", text)}
        />
        <UploadContainer onPress={() => navigation.navigate("Upload")}>
          <AvatarUploadText>
            <Text style={{ color: `${colors.dark}`, fontWeight: "600" }}>
              Upload Avatar
            </Text>
          </AvatarUploadText>
          <FileName>{file ? file : "파일 선택 or 촬영"}</FileName>
        </UploadContainer>
        <TouchableOpacity
          onPress={handleSubmit(onValid)}
          style={{ width: "100%" }}
        >
          <AvatarUploadText>
            <Text
              style={{
                color: `${colors.dark}`,
                textAlign: "center",
                fontWeight: "900",
              }}
            >
              Create Shop
            </Text>
          </AvatarUploadText>
        </TouchableOpacity>
      </Container>
    </DismissKeyboard>
  );
}
