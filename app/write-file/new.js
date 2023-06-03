import { useCallback, useState } from "react";
import {
  View,
  Text,
  Input,
  TextInput,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
  TouchableOpacity
} from "react-native";
import { Stack, useRouter, useSearchParams } from "expo-router";
import { ScreenHeaderBtn } from "../../components";
import { COLORS, icons, SIZES } from "../../constants";
import welcomeStyles from "../../components/home/welcome/welcome.style";
import axios from 'axios';

const NewFile = () => {
  const [programName, setProgramName] = useState('');
  const params = useSearchParams();
  const router = useRouter();

  async function createNewFile(fileName) {
    if(fileName) {
      await axios(`http://localhost:5000/createFile?file=${fileName}`)
      .then((res) => {
        alert('¡Se creó el nuevo archivo!');
        router.back();
      })
      .catch((err) => {
        console.log(err);
        alert('ERROR: No se pudo crear tu archivo.');
      });
    } else {
      alert('Escribe el nombre del archivo.');
    }
  }

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
      <View style={{ flex: 1, margin: SIZES.medium, alignItems: 'center'}}>
        <View style={{paddingHorizontal: SIZES.medium}}>
          <Text
            style={welcomeStyles.fileName}>
            Nuevo programa
          </Text>
        </View>
        <View
          style={[
            welcomeStyles.inputContainer,
            { height: 50, marginTop: SIZES.xxxLarge, marginBottom: SIZES.xxxLarge}
          ]}>
          <View style={welcomeStyles.writeWrapper}>
            <TextInput
              placeholder="Nombre del progama"
              selectTextOnFocus={true}
              style={welcomeStyles.codeInput}
              onChangeText={setProgramName}
              value={programName}
            />
          </View>
        </View>
        <View style={{paddingHorizontal: SIZES.medium}}>
          <TouchableOpacity
            onPress={() => {
              createNewFile(programName);
            }}
            style={{
              backgroundColor: COLORS.tertiary,
              width: '40%',
              padding: SIZES.small,
              borderRadius: SIZES.small
            }}
          >
            <View>
              <Text
                style={{
                  color: COLORS.white,
                  fontWeight: 'bold',
                  fontSize: SIZES.medium,
                  textTransform: 'uppercase',
                  textAlign: 'center'
                }}
              >
                Guardar
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default NewFile;