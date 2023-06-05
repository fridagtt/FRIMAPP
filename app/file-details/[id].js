import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  SafeAreaView,
  ActivityIndicator,
  TouchableOpacity
} from "react-native";
import { Stack, useRouter, useSearchParams } from "expo-router";
import { useIsFocused } from '@react-navigation/native';
import axios from 'axios';

import globalStyles from "../../global.style";
import { ScreenHeaderBtn } from "../../components";
import { COLORS, icons, SIZES } from "../../constants";

const FileDetails = () => {
  const params = useSearchParams();
  const router = useRouter();
  const [code, setCode] = useState('');
  const [pendiente, setPendiente] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const isFocused = useIsFocused();

  useEffect(() => {
    async function fetchData() {
      await axios(`http://127.0.0.1:5000/readFile?path=${params.path}`)
        .then((res) => {
          setCode(res.data);
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
        fileContent: code,
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

  const writeToFile = (value) => {
    setCode(value)
    setPendiente(false)
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
              <Text style={globalStyles.welcomeMessage}>{params.id}</Text>
              <View style={[globalStyles.inputContainer, { height: '50%'}]}>
                <View style={globalStyles.writeWrapper}>
                  <TextInput
                    selectTextOnFocus={true}
                    multiline={true}
                    numberOfLines={150}
                    style={globalStyles.codeInput}
                    onChangeText={(value) => writeToFile(value)}
                    placeholder="Escribe aquí tu código"
                    value={code}
                  />
                </View>
              </View>
              <View style={[globalStyles.inputContainer, { height: 50}]}>
                <View style={globalStyles.writeWrapper}>
                  <TextInput
                    selectTextOnFocus={true}
                    multiline={true}
                    style={globalStyles.codeInput}
                    onChangeText={setInput}
                    placeholder="Input"
                    value={input}
                    keyboardType="numeric"
                  />
                </View>
              </View>
              <View style={[globalStyles.inputContainer, { height: 50}]}>
                <View style={globalStyles.writeWrapper}>
                  <TextInput
                    selectTextOnFocus={true}
                    multiline={true}
                    style={globalStyles.codeInput}
                    onChangeText={setOutput}
                    placeholder="Resultado"
                    editable={false}
                    value={output}
                  />
                </View>
              </View>
              <View style={{ display: 'flex', alignItems: 'center', marginTop: SIZES.large }}>
                { !pendiente ? ( <TouchableOpacity
                    onPress={() => saveData()}
                    style={{
                      backgroundColor: COLORS.gray,
                      width: 132,
                      padding: SIZES.xSmall,
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
                        Guardar
                      </Text>
                    </View>
                  </TouchableOpacity> ) : (
                  <TouchableOpacity
                    onPress={() => runFile()}
                    style={{
                      backgroundColor: COLORS.tertiary,
                      width: 132,
                      padding: SIZES.xSmall,
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
                  </TouchableOpacity>)
                }
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
              </View>
            </>
          )}
        </View>
    </SafeAreaView>
  );
};

export default FileDetails;