import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../redux/authSlice';
import { Colors } from '@/constants/Colors';

const Profile = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [imageUrl, setPassword] = useState('')
  // const { name, email, imageUrl } = useSelector((state) => state.auth.user || {});

  // const handleLogout = () => {
  //   dispatch(logout());
  // };

  return (
    <View style={styles.container}>
      <Image
        source={imageUrl ? { uri: imageUrl } : require("../../assets/images/image1.jpeg")}
        style={styles.profileImage}
      />
      <Text style={styles.name}>{name || 'User Name'}</Text>
      <Text style={styles.email}>{email || 'user@example.com'}</Text>

      <TouchableOpacity style={styles.logoutButton} 
      // onPress={handleLogout}
      >
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.background,
    padding: 20,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#ccc',
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  email: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 30,
  },
  logoutButton: {
    backgroundColor: 'red',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
  },
});
