import { View, Text, TouchableOpacity } from "react-native";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../../navigation/AppNavigator";

export default function BookDetailScreen() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <View>
      <Text>Book Detail Screen</Text>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text>Back to Book List</Text>
      </TouchableOpacity>
    </View>
  );
}
