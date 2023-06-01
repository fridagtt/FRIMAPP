import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";
import { useRouter } from "expo-router";

import welcomeStyles from "./welcome.style";
import { icons, SIZES } from "../../../constants";

const Welcome = () => {
  const router = useRouter();
  const [activeJobType, setActiveJobType] = useState("Full-time");

  return (
    <View>
      <View style={welcomeStyles.container}>
        <Text style={welcomeStyles.userName}>Hola,</Text>
        <Text style={welcomeStyles.welcomeMessage}>Escribamos código en FRIMA</Text>
      </View>
    </View>
  )
}

export default Welcome