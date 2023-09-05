import { useNavigation } from "@react-navigation/core";
import { Button, Text, TextInput, View, TouchableOpacity } from "react-native";
import { useState } from "react";
import axios from "axios";

export default function SignInScreen({ setToken }) {
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
      setToken(userToken);
      console.log("====================");
      console.log(response.data);
      console.log(
        `====> ${response.data.username} succesfully logged In. <====`
      );
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
            navigation.navigate("SignUp");
          }}
        />
        <TouchableOpacity onPress={() => {}}>
          <Text>Create an account</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
