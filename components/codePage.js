import React, {useState} from 'react';
import {SafeAreaView, StyleSheet, TextInput} from 'react-native';
import {Button,View,Text,Alert,} from 'react-native';


const TextInputExample = () => {
  const [text, onChangeText] = React.useState('Codigo');
  const [number, onChangeNumber] = React.useState('');
  const [titleText, setTitleText] = useState("Program");

  return (
    <SafeAreaView>

      <Text style={styleTitle.baseText}>
            <Text style={styleTitle.titleText}>
            {titleText}
              </Text>
          </Text>

      <TextInput
        style={styleCode.input}
        onChangeText={onChangeText}
        placeholder="Código"
        value={text}
      />
      <TextInput
        style={styleInputOutput.input}
        onChangeText={onChangeNumber}
        value={number}
        placeholder="Entrada"
        keyboardType="numeric"
      />
        <TextInput 
        style={styleInputOutput.input}
             value="Salida"
             underlineColorAndroid='transparent'
             editable={false}
             selectTextOnFocus={false}
        />
    
   
      <View style={styleBoton.fixToText}>
        <Button
          title="Left button"
          onPress={() => Alert.alert('Left button pressed')}
        />
        <Button
          title="Right button"
          onPress={() => Alert.alert('Right button pressed')}
        />
      </View>

    
 


      </SafeAreaView>
  );

};

const styleCode = StyleSheet.create({
  input: {
    height: 300,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

const styleInputOutput = StyleSheet.create({
  input: {
    height: 80,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

const styleBoton = StyleSheet.create({
  container: {
    flex: 2,
    justifyContent: 'center',
    marginHorizontal: 50,
    position: 'absolute',
    bottom: -50,
    left:45,
  },
  title: {
    textAlign: 'center',
    marginVertical: 8,
  },
   fixToText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

const styleTitle = StyleSheet.create({
  baseText: {
    fontFamily: 'Cochin',
  },
  titleText: {
    textAlign: 'center',
    fontSize: 40,
    fontWeight: 'bold',
  },
});

export default TextInputExample;