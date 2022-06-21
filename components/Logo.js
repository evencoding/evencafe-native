import styled from "styled-components/native";
import { colors } from "../colors";

const SLogo = styled.View`
  display: flex;
  margin: 0 auto;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-bottom: 30px;
`;
const LogoIcon = styled.Image`
  width: 21px;
  height: 21px;
`;
const LogoText = styled.Text`
  color: ${colors.light};
  margin-left: 4px;
  font-size: 20px;
  font-weight: 900;
`;

export default function Logo() {
  return (
    <SLogo>
      <LogoIcon resizeMode="contain" source={require("../assets/logo.png")} />
      <LogoText>Nomad Coffee</LogoText>
    </SLogo>
  );
}
{
  /* <AuthButton text="Log Out" disabled={false} onPress={logUserOut} /> */
}
