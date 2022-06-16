import { gql, useMutation } from "@apollo/client";
import AuthButton from "../components/auth/AuthButton";
import AuthLayout from "../components/auth/AuthLayout";
import { useForm } from "react-hook-form";
import { TextInput } from "../components/auth/AuthShared";
import { useEffect, useRef } from "react";

const CREATEACCOUNT_MUTATION = gql`
  mutation createAccount(
    $name: String!
    $username: String!
    $email: String!
    $password: String!
  ) {
    createAccount(
      name: $name
      username: $username
      email: $email
      password: $password
    ) {
      ok
      error
    }
  }
`;

export default function CreateAccount({ navigation }) {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { isValid },
    watch,
  } = useForm();
  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const onCompleted = (data) => {
    const {
      createAccount: { ok },
    } = data;
    if (!ok) {
      return;
    }
    const { username, password } = getValues();
    navigation.navigate("Login", { username, password });
  };
  const [createAccountMutation, { loading }] = useMutation(
    CREATEACCOUNT_MUTATION,
    {
      onCompleted,
    }
  );
  const onValid = (data) => {
    createAccountMutation({
      variables: {
        ...data,
      },
    });
  };

  const onNext = (nextOne) => {
    nextOne?.current?.focus();
  };

  useEffect(() => {
    register("name", {
      required: true,
    });
    register("username", {
      required: true,
    });
    register("email", {
      required: true,
    });
    register("password", {
      required: true,
    });
  }, [register]);

  return (
    <AuthLayout>
      <TextInput
        placeholder="Name"
        onSubmitEditing={() => onNext(usernameRef)}
        returnKeyType="next"
        autoCapitalize="none"
        placeholderTextColor={"rgba(255, 255, 255, 0.6)"}
        onChangeText={(text) => setValue("name", text)}
      />
      <TextInput
        ref={usernameRef}
        placeholder="Username"
        onSubmitEditing={() => onNext(emailRef)}
        returnKeyType="next"
        autoCapitalize="none"
        placeholderTextColor={"rgba(255, 255, 255, 0.6)"}
        onChangeText={(text) => setValue("username", text)}
      />
      <TextInput
        ref={emailRef}
        placeholder="Email"
        onSubmitEditing={() => onNext(passwordRef)}
        keyboardType="email-address"
        returnKeyType="next"
        autoCapitalize="none"
        placeholderTextColor={"rgba(255, 255, 255, 0.6)"}
        onChangeText={(text) => setValue("email", text)}
      />
      <TextInput
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
        text="Create Account"
        loading={loading}
        onPress={handleSubmit(onValid)}
      />
    </AuthLayout>
  );
}
