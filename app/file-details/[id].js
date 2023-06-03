import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity
} from "react-native";
import {useIsFocused} from '@react-navigation/native';
import welcomeStyles from "../../components/home/welcome/welcome.style";

import { Stack, useRouter, useSearchParams } from "expo-router";
import { ScreenHeaderBtn } from "../../components";
import { COLORS, icons, SIZES } from "../../constants";
import axios from 'axios';

const FileDetails = () => {
  const params = useSearchParams();
  const router = useRouter();
  const [data, setData] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [input, setInput] = React.useState('');
  const [output, setOutput] = React.useState('');
  const [pendiente, setPendiente] = React.useState(false);
  const isFocused = useIsFocused();

  useEffect(() => {
    async function fetchData() {
      await axios(`http://127.0.0.1:5000/readFile?path=${params.path}`)
        .then((res) => {
          setData(res.data);
          setIsLoading(false);
        })
        .catch((error) => {
          setError(true);
          console.log(error);
        });
    }
    fetchData();
  }, [isFocused]);

  async function deleteFile() {
    await axios(`http://127.0.0.1:5000/deleteFile?file=${params.id}`)
      .then(() => {
        alert('¡Tu archivo se ha eliminado!');
        router.back()
      })
      .catch(() => {
        alert('¡Tu archivo no se ha eliminado exitosamente!');
      });
  }

  async function saveData() {
    await axios
      .post('http://127.0.0.1:5000/saveFile', {
        fileContent: data,
        filePath: params.path,
      })
      .then(
        (response) => {
          setPendiente(true);
        },
        (error) => {
          alert('Tu archivo no pudo ser guardado, intenta otra vez (:');
        },
      );
  }

  async function runFile() {
    await axios(
      `http://127.0.0.1:5000/compiler?input=${input}&path=${params.path}`,
    )
      .then((response) => {
        setOutput(response.data.data.join(','))
        setPendiente(true);
      })
      .catch((err) => {
        alert(err.response.data);
      });
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite, height: '100%' }}>
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
        <View style={{ flex: 1, alignItems: 'center'}}>
          {isLoading ? (
            <ActivityIndicator size='large' color={COLORS.primary} />
          ) : error ? (
            <Text>Hubo un error de nuestro lado.</Text>
          ) : (
            <>
              <Text style={welcomeStyles.welcomeMessage}>{params.id}</Text>
              <View style={[welcomeStyles.inputContainer, { height: '50%'}]}>
                <View style={welcomeStyles.writeWrapper}>
                  <TextInput
                    selectTextOnFocus={true}
                    multiline={true}
                    numberOfLines={150}
                    style={welcomeStyles.codeInput}
                    onChangeText={setData}
                    placeholder="Escribe aquí tu código"
                    value={data}
                  />
                </View>
              </View>
              <View style={[welcomeStyles.inputContainer, { height: 50}]}>
                <View style={welcomeStyles.writeWrapper}>
                  <TextInput
                    selectTextOnFocus={true}
                    multiline={true}
                    style={welcomeStyles.codeInput}
                    onChangeText={setInput}
                    placeholder="Input"
                    value={input}
                    keyboardType="numeric"
                  />
                </View>
              </View>
              <View style={[welcomeStyles.inputContainer, { height: 50}]}>
                <View style={welcomeStyles.writeWrapper}>
                  <TextInput
                    selectTextOnFocus={true}
                    multiline={true}
                    style={welcomeStyles.codeInput}
                    onChangeText={setOutput}
                    placeholder="Resultado"
                    editable={false}
                    value={output}
                  />
                </View>
              </View>
              <View style={{ display: 'flex', flexDirection: 'row', marginTop: SIZES.large }}>
                <TouchableOpacity
                  onPress={() => saveData()}
                  style={{
                    backgroundColor: COLORS.gray,
                    width: 132,
                    padding: SIZES.xSmall,
                    borderRadius: SIZES.small,
                    marginRight: SIZES.medium
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
                <TouchableOpacity
                  onPress={() => runFile()}
                  style={{
                    backgroundColor: COLORS.tertiary,
                    width: 132,
                    padding: SIZES.small,
                    borderRadius: SIZES.small,
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
                      Compilar
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                  onPress={() => deleteFile()}
                  style={{
                    width: 140,
                    padding: SIZES.small,
                    borderRadius: SIZES.small
                  }}
                >
                  <View>
                    <Text
                      style={{
                        color: COLORS.error,
                        fontWeight: 'bold',
                        fontSize: SIZES.medium,
                        textAlign: 'center'
                      }}
                    >
                      Borrar archivo
                    </Text>
                  </View>
                </TouchableOpacity>
            </>
          )}
        </View>
    </SafeAreaView>
  );
};

export default FileDetails;