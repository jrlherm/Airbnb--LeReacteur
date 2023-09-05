import { useRoute } from "@react-navigation/core";
import { Text, View } from "react-native";

export default function ProfileScreen({ userToken, userId }) {
  const { params } = useRoute();
  return (
    <View>
      <Text>user id : {params.userId}</Text>
    </View>
  );
}
