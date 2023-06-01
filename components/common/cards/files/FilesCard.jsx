
import React from 'react';
import { View, Text, TouchableOpacity, Image } from "react-native";
import styles from "./filesCard.style";

const FilesCard = ({ fileName, handleNavigate }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={handleNavigate}>
      <TouchableOpacity style={styles.logoContainer}>
        <Image
          source={{
            uri: "https://t4.ftcdn.net/jpg/05/05/61/73/360_F_505617309_NN1CW7diNmGXJfMicpY9eXHKV4sqzO5H.jpg",
          }}
          resizeMode='contain'
          style={styles.logImage}
        />
      </TouchableOpacity>

      <View style={styles.textContainer}>
        <Text style={styles.fileName} numberOfLines={1}>
          {fileName}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default FilesCard;