import { Button, Text, TextInput, View, TouchableOpacity } from "react-native";

import { useState } from "react";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

export default function SignInScreen({ setToken, setUserId }) {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setformData] = useState({
    email: "",
    password: "",
  });

  const navigation = useNavigation();

  const handleChange = (name, value) => {
    setformData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (click) => {
    setIsLoading(true);

    console.log("Handle Submit");

    try {
      const response = await axios.post(
        "https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/user/log_in",
        formData
      );
      const userToken = response.data.token;
      const userId = response.data.id;

      setToken(userToken);
      setUserId(userId);
      console.log("====================");
      console.log(response.data);
      console.log(
        `====> ${response.data.username} succesfully logged In. <====`
      );
      console.log(`====> ${response.data.id} ==> ID. <====`);
      console.log("userToken ==> ", userToken);
    } catch (error) {
      console.log("Error during account login ==> ", error.message);
    }
    setIsLoading(false);
  };

  return (
    <View>
      <View>
        <Text>Name: </Text>
        <TextInput
          placeholder="Username"
          onChangeText={(value) => handleChange("email", value)}
        />
        <Text>Password: </Text>
        <TextInput
          placeholder="Password"
          secureTextEntry={true}
          onChangeText={(value) => handleChange("password", value)}
        />
        <Button
          title="Sign in"
          onPress={async () => {
            const userToken = "secret-token";
            setToken(userToken);
            handleSubmit();
          }}
        />
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("SignUp");
          }}
        >
          <Text>Create an account</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
