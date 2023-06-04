
import React from 'react';
import { View, Text, TouchableOpacity, Image } from "react-native";

import { images } from "../../../../constants";
import styles from "./filesCard.style";

const FilesCard = ({ fileName, handleNavigate }) => {
  
  return (
    <TouchableOpacity style={styles.container} onPress={handleNavigate}>
      <TouchableOpacity style={styles.logoContainer}>
        <Image
          source={images.logo}
          resizeMode='contain'
          style={styles.logoImage}
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