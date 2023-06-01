import React, {useState, useEffect} from 'react';
import { useRouter } from "expo-router";
import { View, Text, TouchableOpacity, ActivityIndicator, Image } from "react-native";
import {useIsFocused} from '@react-navigation/native';
import axios from 'axios';

import styles from "./filesSection.style";
import welcomeStyles from "../welcome/welcome.style";

import { COLORS } from "../../../constants";
import FilesCard from "../../common/cards/files/FilesCard";
import useFetch from "../../../hook/useFetch";
import { icons } from "../../../constants";

const FilesSection = () => {
  const router = useRouter();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const isFocused = useIsFocused();

  useEffect(() => {
    async function fetchData() {
      await axios('http://127.0.0.1:5000/files')
        .then((res) => {
          setData(res.data.files);
          setIsLoading(false);
        })
        .catch((error) => {
          setError(true);
          console.log(error);
        });
    }
    fetchData();
  }, [isFocused]);

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.headerWrapper}>
          <Text style={styles.headerTitle}>Archivos</Text>
        </View>

        <TouchableOpacity style={welcomeStyles.searchBtn} onPress={() => router.push(`/write-file/new`)}>
          <Image
            source={icons.plus}
            resizeMode='contain'
            style={welcomeStyles.searchBtnImage}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.cardsContainer}>
        {isLoading ? (
          <ActivityIndicator size='large' color={COLORS.primary} />
        ) : error ? (
          <Text>Something went wrong</Text>
        ) : (
          data?.map((file, i)  => (
            <FilesCard
              fileName={file.name}
              filaNamePath={file.path}
              key={`file-${i}`}
              handleNavigate={() => router.push({pathname: `/file-details/${file.name}`, params:{ path: file.path}})}
            />
          ))
        )}
      </View>
    </View>
  )
}

export default FilesSection