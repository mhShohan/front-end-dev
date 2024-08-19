import { Inter_400Regular, Inter_700Bold, useFonts } from '@expo-google-fonts/inter';
import { useState } from 'react';
import { ActivityIndicator, Image, ImageBackground, Pressable, StyleSheet, Text, View } from 'react-native';


export default function App() {
  let [fontsLoaded] = useFonts({
    'Inter': Inter_400Regular,
    'InterBold': Inter_700Bold
  });
  const [isShowMore, setIsShowMore] = useState(false);

  if (!fontsLoaded) {
    return <ActivityIndicator />;
  }

  return (
    <ImageBackground source={require('./assets/light-bg.png')} style={{ flex: 1 }}>
      <View style={styles.container} >
        {/* Top Section */}
        {!isShowMore && (
          <View style={{ flexDirection: 'row', marginTop: 16, gap: 12 }}>
            <View style={{ flex: 1 }}>
              <Text style={[styles.text, { textAlign: 'justify' }]}>Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                aliquip ex ea commodo consequat.</Text>
              <Text style={[styles.text, { fontFamily: 'InterBold', marginTop: 12 }]}>~ Mehdi Hasan Shohan</Text>
            </View>
            <Image source={require('./assets/refresh.png')} style={{ width: 30, height: 30, marginTop: 12 }} />
          </View>
        )}

        {/* Bottom Section */}
        <View style={{ marginTop: 20 }}>
          <View>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
              <Image source={require('./assets/sun.png')} style={{ width: 30, height: 30 }} />
              <Text style={{ fontFamily: 'Inter', fontSize: 22, color: '#fff' }}>Good Morning</Text>
            </View>
            <View >
              <Text style={{ fontFamily: 'InterBold', color: '#fff', fontSize: 82 }}>09:04</Text>
              <Text style={{ color: '#fff', fontSize: 18 }}>Monday, 21 June, 2021</Text>
              <Text style={{ color: '#fff', fontSize: 18 }}>Pabna, Bangladesh</Text>
            </View>
          </View>
          <View style={{ marginTop: 42, flexDirection: 'row' }}>
            <Pressable onPress={() => setIsShowMore(p => !p)} style={styles.btn}>
              <Text style={{ fontSize: 18, fontFamily: 'InterBold' }}>{!isShowMore ? 'More' : 'Less'}</Text>
              {isShowMore ? <Image source={require('./assets/arrow-down.png')} /> : <Image source={require('./assets/arrow-up.png')} />}
            </Pressable>
          </View>
        </View>


      </View>

      {/* Modal View */}
      {isShowMore && (
        <View style={{ backgroundColor: '#fff', justifyContent: 'space-evenly', height: 250, opacity: 0.85, padding: 32 }}>
          <Row level="Date" value="19 August, 2024" />
          <Row level="Timezone" value="Dhaka" />
          <Row level="Day" value="Monday" />
          <Row level="Week Number" value="43" />
          <Row level="Day Number" value="268" />
        </View>
      )}
    </ImageBackground >
  );
}

const Row = ({ level, value }) => {
  return <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
    <Text style={{ fontFamily: 'Inter', fontSize: 18, textTransform: 'uppercase', letterSpacing: 1 }}>{level}</Text>
    <Text style={{ fontFamily: 'InterBold', fontSize: 18 }}>{value}</Text>
  </View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
    backgroundColor: 'rgba(0,0,0,0.30)',
    justifyContent: 'space-between'
  },
  text: {
    fontFamily: 'Inter',
    fontSize: 12,
    lineHeight: 16,
    color: 'white',
  },
  btn: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingLeft: 20,
    paddingRight: 5,
    width: 120,
    height: 40,
    borderRadius: 30,
    marginRight: 8,
    justifyContent: 'space-between',
    alignItems: 'center'
  },
});
