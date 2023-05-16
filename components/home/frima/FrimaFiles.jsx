import React from "react";
import { useRouter } from "expo-router";
import { View, Text, TouchableOpacity, ActivityIndicator, Image } from "react-native";

import styles from "./frimaFiles.style";
import welcomeStyles from "../welcome/welcome.style";

import { COLORS } from "../../../constants";
import FilesCard from "../../common/cards/files/FilesCard";
import useFetch from "../../../hook/useFetch";
import { icons } from "../../../constants";

const FrimaFiles = () => {
  const router = useRouter();
  const isLoading = false;
  const error = false;

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.headerWrapper}>
          <Text style={styles.headerTitle}>Archivos</Text>
        </View>

        <TouchableOpacity style={welcomeStyles.searchBtn} onPress={() => {}}>
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
          [1,2,3,4]?.map((job) => (
            <FilesCard
              job={job}
              key={`file-${job.job_id}`}
              handleNavigate={() => router.push(`/job-details/${job.job_id}`)}
            />
          ))
        )}
      </View>
    </View>
  )
}

export default FrimaFiles