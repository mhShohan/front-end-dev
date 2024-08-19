import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home' screenOptions={{
        headerTitle: (props) => <Logo {...props} />,
        headerStyle: {
          backgroundColor: 'lightblue',
        },
        headerTintColor: 'white',
        headerTitleAlign: 'center',
      }}>
        <Stack.Screen name="Home" component={HomeScreen} options={{
          // headerTitle: (props) => <Logo {...props} />,
          headerStyle: {
            backgroundColor: 'gray',
          },
          // headerTintColor: 'white',
          // headerTitleAlign: 'center',
        }} />
        <Stack.Screen name="About" component={AboutScreen} />
        <Stack.Screen name="AboutDetails" component={AboutDetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>Home Screen</Text>
      <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('About')}>
        <Text>Go to About Screen</Text>
      </TouchableOpacity>
    </View>
  );
};

const Logo = () => {
  return (
    <View>
      <Text style={{ fontSize: 22, fontWeight: 700 }}>React Navigation</Text>
    </View>
  );
};

const AboutScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>About Screen</Text>
      <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('AboutDetails', { id: '12312423' })}>
        <Text>View Details</Text>
      </TouchableOpacity>
    </View>
  );
};

const AboutDetailsScreen = ({ route }) => {
  const { id } = route.params;

  return (
    <View style={styles.container}>
      <Text>About Details ID: {id}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btn: {
    width: 200,
    height: 40,
    backgroundColor: 'lightblue',
    color: 'white',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20
  }
});
