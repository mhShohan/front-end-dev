import { useState } from 'react';
import { Button, StyleSheet, Text, View, SafeAreaView } from 'react-native';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Counter App</Text>
      <Box text="Counter 1" bgColor="red" />
      <Box text="Counter 2" bgColor="blue" />
      <Box text="Counter 3" bgColor="green" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    backgroundColor: 'lightblue',
    padding: 16,
  },
  header: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 4,
  },
  box: {
    flex: 1,
    backgroundColor: 'blue',
    margin: 8,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 40,
    color: 'white',
    fontWeight: 'bold',
  },
  count: {
    fontSize: 52,
    color: 'white',
  },
});

const Box = ({ text = 'box', bgColor = 'blue' }) => {
  const [count, setCount] = useState(0);

  return (
    <View style={[styles.box, { backgroundColor: bgColor }]} >
      <Text style={styles.title}>{text}</Text>
      <Text style={styles.count}>{count}</Text>
      <View style={{ flexDirection: 'row', gap: 4 }}>
        <Button title="Increment" onPress={() => setCount(p => p + 1)} />
        <Button title="Decrement" onPress={() => setCount(p => p - 1)} />
        <Button title="Reset" onPress={() => setCount(p => 0)} />
      </View>

    </View>
  );
};