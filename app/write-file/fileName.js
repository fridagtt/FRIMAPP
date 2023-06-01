import { useCallback, useState } from "react";
import {
  View,
  Text,
  TextInput,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { Stack, useRouter, useSearchParams } from "expo-router";
import { ScreenHeaderBtn } from "../../components";
import { COLORS, icons, SIZES } from "../../constants";
import welcomeStyles from "../../components/home/welcome/welcome.style";

const FileName = () => {
  const [text, onChangeText] = useState('Codigo');
  const [number, onChangeNumber] = useState('');
  const params = useSearchParams();
  const router = useRouter();

  /*const { data, isLoading, error, refetch } = useFetch("file-details", {
    file_id: params.id,
  });*/

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          headerBackVisible: false,
          headerLeft: () => (
            <ScreenHeaderBtn
              iconUrl={icons.left}
              dimension='60%'
              handlePress={() => router.back()}
            />
          ),
          headerTitle: "",
        }}
      />
      <View style={welcomeStyles.newFileContainer}>
        <View style={welcomeStyles.writeWrapper}>
          <TextInput
            style={welcomeStyles.searchInput}
            onChangeText={onChangeText}
            placeholder="Escribe aquí tu código"
            value={text}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default FileName;