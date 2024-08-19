import { Inter_400Regular, Inter_700Bold, useFonts } from '@expo-google-fonts/inter';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Image, ImageBackground, Pressable, StyleSheet, Text, TouchableHighlight, TouchableOpacity, View } from 'react-native';
import formatTime from './utils/formatTime';
import formatDate from './utils/formatDate';



export default function App() {
  const [quote, setQuote] = useState({
    quote: "This communication alone, by the comparison of the antagonisms, rivalries, movements which give birth to decisive moments, permits the evolution of the soul, whereby a man realizes himself on earth. It is impossible to be concerned with anything else in art.",
    author: "Robert Delaunay",
    category: "communication"
  });
  const [refetch, setRefetch] = useState(false);
  const [time, setTime] = useState(new Date());

  let [fontsLoaded] = useFonts({
    'Inter': Inter_400Regular,
    'InterBold': Inter_700Bold
  });
  const [isShowMore, setIsShowMore] = useState(false);


  useEffect(() => {
    const fetchQuote = async () => {
      const res = await fetch('https://api.api-ninjas.com/v1/quotes', {
        headers: {
          'X-Api-Key': 'VWJ7jRVck5n9gWOG4rXMFQ==EBnzPcYl63cMtMCw'
        }
      });
      const data = await res.json();
      if (data.length > 0) {
        setQuote(data[0]);
      }
    };
    fetchQuote();
  }, [refetch]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, [time]);

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
              <Text style={[styles.text, { textAlign: 'justify' }]}>{quote.quote}</Text>
              <Text style={[styles.text, { fontFamily: 'InterBold', marginTop: 12 }]}>~ {quote.author}</Text>
            </View>
            <TouchableOpacity onPress={() => setRefetch(p => !p)}>
              <Image source={require('./assets/refresh.png')} style={{ width: 30, height: 30, marginTop: 12 }} />
            </TouchableOpacity>
          </View>
        )}

        {/* Bottom Section */}
        <View style={{ marginTop: 20 }}>
          <View>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
              <Image source={require('./assets/sun.png')} style={{ width: 30, height: 30 }} />
              <Text style={{ fontFamily: 'Inter', fontSize: 22, color: '#fff' }}>Good {
                time.getHours() < 12 ? 'Morning' : time.getHours() < 18 ? 'Afternoon' : 'Evening'
              }</Text>
            </View>
            <View >
              <View style={{ flexDirection: 'row', alignItems: 'flex-end', gap: 12 }}>
                <Text style={{ fontFamily: 'InterBold', color: '#fff', fontSize: 82 }}>{formatTime(time).time}</Text>
                <Text style={{ fontFamily: 'InterBold', color: '#fff', fontSize: 28, marginBottom: 20 }}>{formatTime(time).period}</Text>
              </View>
              <Text style={{ color: '#fff', fontSize: 18 }}>{formatDate(time).day} || {formatDate(time).date} </Text>
              <Text style={{ color: '#fff', fontSize: 18 }}>{Intl.DateTimeFormat().resolvedOptions().timeZone
              }</Text>
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
      {
        isShowMore && (
          <View style={{ backgroundColor: '#fff', justifyContent: 'space-evenly', height: 250, opacity: 0.85, padding: 32 }}>
            <Row level="Date" value={formatDate(time).date} />
            <Row level="Timezone" value={Intl.DateTimeFormat().resolvedOptions().timeZone} />
            <Row level="Day" value={formatDate(time).day} />
            {/* <Row level="Week Number" value="43" />
          <Row level="Day Number" value="268" /> */}
          </View>
        )
      }
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
