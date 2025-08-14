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
import axios from 'axios'
import { Colors } from '@/constants/Colors';
import InputField from '@/components/InputField';
import { router } from 'expo-router';
import { useDispatch } from 'react-redux';
import { setCredentials } from '@/redux/authSlice';
const Login = () => {
  
const dispatch = useDispatch();
  const API_BASE = process.env.EXPO_PUBLIC_BASE_URL!;
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSignIn = async () => {
    // if (!email || !password) {
    //   Alert.alert("Error", "Please fill in all fields");
    //   return;
    // }

    // try {
    //   const response = await axios.post(`${API_BASE}/api/auth/login`, {
    //     email,
    //     password,
    //   });

    //   if (response.data.success) {
    //     dispatch(
    //       setCredentials({
    //         token: response.data.jwt_token,
    //         user: {
    //           name: response.data.name,
    //           email: response.data.email,
    //           _id: response.data._id,
    //         },
    //       })
    //     );
        router.push("/(tabs)/Home");
    //   } else {
    //     Alert.alert("Error", response.data.message || "Login failed");
    //   }
    // } catch (error) {
    //   Alert.alert("Error", error.response?.data?.message || "Something went wrong");
    // }
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
          <Text style={styles.title}>Welcome Back!</Text>

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

        <TouchableOpacity style={styles.btn} onPress={handleSignIn}>
          <Text style={styles.btnTxt}>Login</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );


}

export default Login;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: Colors.background,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 80, // Space for button
  },
  form: {
    flex: 1,
    justifyContent: "center",
    minHeight: 300,
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
    bottom: 60,
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

