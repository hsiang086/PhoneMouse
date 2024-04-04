import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { TextInput } from 'react-native-element-textinput';

const Home = ({ navigation }) => {
  const [hostIp, setHostIp] = useState('');
  const [port, setPort] = useState('');

  return (
    <View style={styles.container}>
      <TextInput
        value={hostIp}
        style={styles.input}
        inputStyle={styles.inputStyle}
        labelStyle={styles.labelStyle}
        placeholderStyle={styles.placeholderStyle}
        textErrorStyle={styles.textErrorStyle}
        label="host ip"
        placeholder="Enter host ip"
        placeholderTextColor="gray"
        focusColor="blue"
        onChangeText={text => {
          setHostIp(text);
        }}
      />
      <TextInput
        value={port}
        style={styles.input}
        inputStyle={styles.inputStyle}
        labelStyle={styles.labelStyle}
        placeholderStyle={styles.placeholderStyle}
        textErrorStyle={styles.textErrorStyle}
        label="port"
        placeholder="Enter port"
        placeholderTextColor="gray"
        focusColor="blue"
        keyboardType="number-pad"
        onChangeText={text => {
          setPort(text);
        }}
      />
      <TouchableOpacity
        style={{
          backgroundColor: "#4287f5",
          padding: 12,
          borderRadius: 8,
        }}
        onPress={() => {
          navigation.navigate('Mouse', { hostIp: hostIp, port: port });
        }}>
        <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>Connect</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    gap: 16,
    justifyContent: 'center',
    padding: 16,
    paddingBottom: 100,
  },
  input: {
    height: 55,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 0.5,
    borderColor: '#DDDDDD',
  },
  inputStyle: { fontSize: 16 },
  labelStyle: {
    fontSize: 14,
    position: 'absolute',
    top: -10,
    backgroundColor: '#f2f2f2',
    paddingHorizontal: 4,
    marginLeft: -4,
  },
  placeholderStyle: { fontSize: 16 },
  textErrorStyle: { fontSize: 16 },
});