import { gql, useMutation } from "@apollo/client";
import AuthButton from "../components/auth/AuthButton";
import AuthLayout from "../components/auth/AuthLayout";
import { useForm } from "react-hook-form";
import { TextInput } from "../components/auth/AuthShared";
import { useEffect, useRef } from "react";
import { logUserIn } from "../apollo";

const LOGIN_MUTATION = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      ok
      token
      error
    }
  }
`;

export default function Login({ route: { params } }) {
  const passwordRef = useRef();
  const { register, handleSubmit, setValue, watch, formState } = useForm({
    defaultValues: {
      username: params?.username,
      password: params?.password,
    },
  });
  const onCompleted = async (data) => {
    const {
      login: { ok, token },
    } = data;
    if (!ok) {
      return;
    }
    await logUserIn(token);
  };
  const [loginMutation, { loading }] = useMutation(LOGIN_MUTATION, {
    onCompleted,
  });
  const onValid = (data) => {
    loginMutation({
      variables: {
        ...data,
      },
    });
  };
  const onNext = (nextOne) => {
    nextOne?.current?.focus();
  };

  useEffect(() => {
    register("username", {
      required: true,
    });
    register("password", {
      required: true,
    });
  }, [register]);

  return (
    <AuthLayout>
      <TextInput
        value={watch("username")}
        placeholder="Username"
        onSubmitEditing={() => onNext(passwordRef)}
        returnKeyType="next"
        autoCapitalize="none"
        placeholderTextColor={"rgba(255, 255, 255, 0.6)"}
        onChangeText={(text) => setValue("username", text)}
      />
      <TextInput
        value={watch("password")}
        ref={passwordRef}
        placeholder="Password"
        onSubmitEditing={handleSubmit(onValid)}
        secureTextEntry
        autoCapitalize="none"
        returnKeyType="done"
        lastOne={true}
        placeholderTextColor={"rgba(255, 255, 255, 0.6)"}
        onChangeText={(text) => setValue("password", text)}
      />
      <AuthButton
        text="Log In"
        disabled={!watch("username") || !watch("password")}
        loading={loading}
        onPress={handleSubmit(onValid)}
      />
    </AuthLayout>
  );
}
