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

const jobTypes = ["Full-time", "Part-time", "Contractor"];

const Welcome = () => {
  const router = useRouter();
  const [activeJobType, setActiveJobType] = useState("Full-time");

  return (
    <View>
      <View style={welcomeStyles.container}>
        <Text style={welcomeStyles.userName}>Hello,</Text>
        <Text style={welcomeStyles.welcomeMessage}>Let's start using FRIMA</Text>
      </View>

      {/*
      <View style={welcomeStyles.searchContainer}>
        <View style={welcomeStyles.searchWrapper}>
          <TextInput
            style={welcomeStyles.searchInput}
            onChangeText={() => {}}
            placeholder="Escribe aquí tu código"
            value=""
          />
        </View>
      </View>
      */}

    </View>
  )
}

export default Welcome