import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import {useIsFocused} from '@react-navigation/native';

import { Stack, useRouter, useSearchParams } from "expo-router";
import { JobFooter, ScreenHeaderBtn } from "../../components";
import { COLORS, icons, SIZES } from "../../constants";
import useFetch from "../../hook/useFetch";
import axios from 'axios';

const FileDetails = () => {
  const params = useSearchParams();
  const router = useRouter();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
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

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {}

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

      <>
        <ScrollView showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        >
          {/*{isLoading ? (
            <ActivityIndicator size='large' color={COLORS.primary} />
          ) : error ? (
            <Text>Something went wrong</Text>
          ) : data.length === 0 ? (
            <Text>No data available</Text>
          ) : (
            <View style={{ padding: SIZES.medium, paddingBottom: 100 }}>
              <Text>VISTA FILE {params.id}</Text>
            </View>
          )}*/}
            <View style={{ padding: SIZES.medium, paddingBottom: 100 }}>
              {isLoading ? (
                <ActivityIndicator size='large' color={COLORS.primary} />
              ) : error ? (
                <Text>Something went wrong</Text>
              ) : (
                <Text>{params.id}</Text>
              )}
            </View>
        </ScrollView>

        <JobFooter url='https://careers.google.com/jobs/results/' />
      </>
    </SafeAreaView>
  );
};

export default FileDetails;