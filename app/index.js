import { View, ScrollView, SafeAreaView } from 'react-native';
import { Stack } from 'expo-router';

import { COLORS, SIZES } from '../constants';
import { FilesSection, Welcome } from "../components";

const Home = () => {

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <Stack.Screen 
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          headerTitle: "",
        }}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            flex: 1,
            padding: SIZES.medium,
          }}
        >
          <Welcome/>
          <FilesSection />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Home;