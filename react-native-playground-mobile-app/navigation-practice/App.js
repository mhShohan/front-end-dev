import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet, Text, View } from 'react-native';

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator screenOptions={{
        headerTitle: () => <Logo />,
        headerStyle: {
          backgroundColor: 'lightblue',
        },
        headerTintColor: 'white',
        headerTitleAlign: 'center',
      }}>
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="About" component={AboutScreen} />
        <Drawer.Screen name="Profile" component={ProfileScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Home Screen</Text>
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

const AboutScreen = () => {
  return (
    <View style={styles.container}>
      <Text>About Screen</Text>
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
