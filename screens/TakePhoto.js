import { Camera } from "expo-camera";
import Slider from "@react-native-community/slider";
import { useEffect, useRef, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import styled from "styled-components";
import { Alert, Image, StatusBar, TouchableOpacity } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { colors } from "../colors";

const Container = styled.View`
  flex: 1;
  background-color: black;
`;
const CloseBtn = styled.TouchableOpacity`
  position: absolute;
  top: 20px;
  left: 10px;
`;
const ActionsContainer = styled.View`
  flex: 0.35;
  padding: 0px 30px;
  align-items: center;
  justify-content: space-around;
`;
const Actions = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;
const TakePhotoBtn = styled.TouchableOpacity`
  width: 80px;
  height: 80px;
  background-color: rgba(255, 255, 255, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.8);
  border-radius: 50%;
`;
const PhotoActions = styled(Actions)`
  flex: 0.35;
  flex-direction: row;
`;
const PhotoAction = styled.TouchableOpacity`
  background-color: ${colors.light};
  padding: 5px 10px;
  border-radius: 4px;
  flex-direction: row;
`;
const PhotoActionText = styled.Text`
  color: ${colors.dark};
  font-weight: 600;
`;

export default function TakePhoto({ navigation }) {
  const camera = useRef();
  const [takenPhoto, setTakenPhoto] = useState("");
  const [cameraReady, setCameraReady] = useState(false);
  const [ok, setOk] = useState(false);
  const [flashMode, setFlashMode] = useState(Camera?.Constants?.FlashMode?.off);
  const [zoom, setZoom] = useState(0);
  const [cameraType, setCameraType] = useState(Camera?.Constants?.Type?.back);
  const getPermissions = async () => {
    const { granted } = await Camera.requestCameraPermissionsAsync();
    setOk(granted);
  };
  useEffect(() => {
    getPermissions();
  }, []);
  const onCameraSwitch = () => {
    if (cameraType === Camera.Constants.Type.front) {
      setCameraType(Camera.Constants.Type.back);
    } else {
      setCameraType(Camera.Constants.Type.front);
    }
  };
  const onZoomValueChange = (e) => {
    setZoom(e);
  };
  const onFlashChange = () => {
    if (flashMode === Camera.Constants.FlashMode.off) {
      setFlashMode(Camera.Constants.FlashMode.on);
    } else if (flashMode === Camera.Constants.FlashMode.on) {
      setFlashMode(Camera.Constants.FlashMode.auto);
    } else if (flashMode === Camera.Constants.FlashMode.auto) {
      setFlashMode(Camera.Constants.FlashMode.off);
    }
  };
  const onCameraReady = () => setCameraReady(true);
  const takePhoto = async () => {
    if (camera.current && cameraReady) {
      const { uri } = await camera.current.takePictureAsync({
        quality: 1,
        exif: true,
      });
      setTakenPhoto(uri);
    }
  };
  const goToUpload = async (save) => {
    if (save) {
      await MediaLibrary.saveToLibraryAsync(takenPhoto);
    }
    navigation.navigate("CreateShop", {
      file: takenPhoto,
    });
  };
  const onDismiss = () => setTakenPhoto("");
  const onUpload = () => {
    Alert.alert("Save Photo?", "Save Photo & Upload or just Upload", [
      {
        text: "Save & Upload",
        onPress: () => goToUpload(true),
      },
      {
        text: "Just Upload",
        onPress: () => goToUpload(false),
      },
    ]);
  };
  const isFocused = useIsFocused();
  return (
    <Container>
      {isFocused ? <StatusBar hidden={true} /> : null}
      {!takenPhoto ? (
        <Camera
          type={cameraType}
          style={{ flex: 1 }}
          zoom={zoom}
          flashMode={flashMode}
          ref={camera}
          onCameraReady={onCameraReady}
        >
          <CloseBtn>
            <Ionicons name="close" color="white" size={30} />
          </CloseBtn>
        </Camera>
      ) : (
        <Image source={{ uri: takenPhoto }} style={{ flex: 1 }} />
      )}
      {!takenPhoto ? (
        <ActionsContainer>
          <Slider
            style={{ width: 200, height: 40 }}
            minimumValue={0}
            maximumValue={1}
            minimumTrackTintColor="#FFFFFF"
            maximumTrackTintColor="rgba(255, 255, 255, 0.5)"
            onValueChange={onZoomValueChange}
          />
          <Actions>
            <TouchableOpacity
              onPress={onFlashChange}
              style={{ marginRight: 30 }}
            >
              <Ionicons
                size={28}
                color="white"
                name={
                  flashMode === Camera.Constants.FlashMode.off
                    ? "flash-off"
                    : flashMode === Camera.Constants.FlashMode.on
                    ? "flash"
                    : flashMode === Camera.Constants.FlashMode.auto
                    ? "eye"
                    : ""
                }
              />
            </TouchableOpacity>
            <TakePhotoBtn onPress={takePhoto} />
            <TouchableOpacity onPress={onCameraSwitch}>
              <Ionicons
                size={28}
                color="white"
                name={
                  cameraType === Camera.Constants.Type.front
                    ? "camera-reverse"
                    : "camera"
                }
              />
            </TouchableOpacity>
          </Actions>
        </ActionsContainer>
      ) : (
        <PhotoActions>
          <PhotoAction onPress={onDismiss}>
            <PhotoActionText>Dissmiss</PhotoActionText>
          </PhotoAction>
          <PhotoAction onPress={onUpload}>
            <PhotoActionText>Upload</PhotoActionText>
          </PhotoAction>
        </PhotoActions>
      )}
    </Container>
  );
}
