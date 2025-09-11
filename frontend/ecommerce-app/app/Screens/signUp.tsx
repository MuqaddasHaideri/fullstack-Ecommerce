import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Alert
} from 'react-native'
import React, { useState } from 'react'
import { Colors } from '@/constants/Colors';
import InputField from '@/components/InputField';
import { router } from 'expo-router';
import { signupUser } from '@/api/services';

const SignUp = () => {

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const handleSignUp = async () => {
    if (!name || !email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    try {
      const response = await signupUser(name, email, password);
      console.log(response)
      if (response.data.success) {
        router.push('/(tabs)/Home');
      } else {
        Alert.alert('Error', response.data.message || 'signIn failed');
      }
    } catch (error) {
      Alert.alert('Error', error.response?.data?.message || 'Something went wrong');
    }
  };
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.form}>
          <Text style={styles.title}>Register yourself</Text>
          <InputField
            icon="person"
            placeholder="Enter your name"
            placeholderTextColor="#888"
            value={name}
            onChangeText={setName}
            autoCapitalize="none"
            autoComplete="name"
          />
          <InputField
            icon="email"
            placeholder="Email"
            placeholderTextColor="#888"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoComplete="email"
          />
          <InputField
            icon="lock"
            placeholder="Password"
            placeholderTextColor="#888"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            keyboardType="default"
            autoCapitalize="none"
            autoComplete="password"
          />
        </View>

        <TouchableOpacity style={styles.btn} onPress={handleSignUp}>
          <Text style={styles.btnTxt}>Signup</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );

}

export default SignUp;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: Colors.background,
    paddingBottom:6,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 80, 
  },
  form: {
    flex: 1,
    justifyContent: "center",
  },
  title: {
    fontFamily: "handCursiveVariable",
    fontSize: 30,

    fontWeight: "bold",
    marginBottom: 40,
    color: Colors.text,
    textAlign: "center",

  },
  btn: {
    backgroundColor: Colors.primary,
    height: 60,
    width: "100%",
    alignSelf: "center",
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    elevation: 3,
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    marginTop: 20,
  },
  btnTxt: {
    color: Colors.text,
    fontSize: 18,
    fontWeight: "bold",
  },
});

