import { Button, Text, TextInput, View, TouchableOpacity } from "react-native";
import { useState } from "react";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

export default function SignUpScreen({ setToken, setUserId }) {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    description: "",
  });

  const navigation = useNavigation();

  const handleChange = (name, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    setIsLoading(true);

    try {
      const response = await axios.post(
        "https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/user/sign_up",
        formData
      );
      // Handle the response data as needed
      console.log(response.data);
      setUserId(response.data.id);
      setToken(response.data.token);
    } catch (error) {
      console.log("Error during account signup ==> ", error.message);
    }

    setIsLoading(false);
  };

  return (
    <View>
      <View>
        <Text>Name: </Text>
        <TextInput
          placeholder="Username"
          onChangeText={(value) => handleChange("username", value)}
          value={formData.username}
        />
        <Text>Email: </Text>
        <TextInput
          placeholder="Email"
          onChangeText={(value) => handleChange("email", value)}
          value={formData.email}
        />
        <Text>Description: </Text>
        <TextInput
          placeholder="Description"
          multiline={true}
          numberOfLines={4}
          onChangeText={(value) => handleChange("description", value)}
          value={formData.description}
        />
        <Text>Password: </Text>
        <TextInput
          placeholder="Password"
          secureTextEntry={true}
          onChangeText={(value) => handleChange("password", value)}
          value={formData.password}
        />
        <Button title="Sign up" onPress={handleSubmit} />
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("SignUp");
          }}
        >
          <Text>Signin</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
