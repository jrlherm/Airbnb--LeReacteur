import { useNavigation } from "@react-navigation/core";
import { Button, Text, View } from "react-native";

export default function HomeScreen({ userId }) {
  const navigation = useNavigation();
  return (
    <View>
      <Text>Welcome home!</Text>
      <Button
        title="Go to Profile"
        onPress={() => {
          navigation.navigate("Profile", { userId: userId });
        }}
      />
    </View>
  );
}
