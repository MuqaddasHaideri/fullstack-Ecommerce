if (__DEV__) {
  require("../reactrotron");
}
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Login from './Screens/login';
import Signup from './Screens/signUp';
import { Colors } from '@/constants/Colors';

const Index = () => {
  const [mode, setMode] = useState<'login' | 'signup'>('login');

  return (
    <View style={styles.container}>
      <View style={styles.toggleContainer}>
        <TouchableOpacity
          onPress={() => setMode('login')}
          style={[
            styles.toggleButton,
            mode === 'login' && styles.activeButton,
          ]}
        >
          <Text style={mode === 'login' ? styles.activeText : styles.inactiveText}>
            Existing
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setMode('signup')}
          style={[
            styles.toggleButton,
            mode === 'signup' && styles.activeButton,
          ]}
        >
          <Text style={mode === 'signup' ? styles.activeText : styles.inactiveText}>
            New
          </Text>
        </TouchableOpacity>
      </View>

      {mode === 'login' ? <Login /> : <Signup />}
    </View>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 20,
    backgroundColor:Colors.background,
    // backgroundColor:"red"
  
  },
  toggleContainer: {
    display: "flex",
    width: "90%",
    flexDirection: 'row',
    borderRadius: 25,
    backgroundColor: Colors.containers,
    padding: 5,
    alignSelf: 'center',
    marginBottom: 20,
    borderWidth:2,
    // borderBlockColor:Colors.text,
  },
  toggleButton: {

    flex: 1,
    paddingVertical: 10,
    borderRadius: 20,
    alignItems: 'center',
 
  },
  activeButton: {
    backgroundColor: Colors.primary,
  },
  activeText: {
    color: Colors.text,
    fontWeight: 'bold',
    fontSize:20,
  },
  inactiveText: {
    color: Colors.text,
    fontSize:20,
  },
});