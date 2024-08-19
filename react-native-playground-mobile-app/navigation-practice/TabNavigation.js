import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName='Home'>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="About" component={AboutScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
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
      <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('Profile')}>
        <Text>View Details</Text>
      </TouchableOpacity>
    </View>
  );
};

const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      <Text>ProfileScreen</Text>
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
