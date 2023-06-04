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

import globalStyles from "../../../global.style";
import { icons, SIZES } from "../../../constants";

const Welcome = () => {
  const router = useRouter();

  return (
    <View>
      <View style={globalStyles.container}>
        <Text style={globalStyles.userName}>Hola,</Text>
        <Text style={globalStyles.welcomeMessage}>Escribamos código en FRIMA</Text>
      </View>
    </View>
  )
}

export default Welcome