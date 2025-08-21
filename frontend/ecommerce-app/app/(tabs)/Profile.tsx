import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../redux/authSlice';
import { Colors } from '@/constants/Colors';

const Profile = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  // Uncomment when Redux is fully connected
  // const { name, email, imageUrl } = useSelector((state) => state.auth.user || {});

  // const handleLogout = () => {
  //   dispatch(logout());
  // };

  return (
    <View style={styles.container}>
      {/* Profile Image */}
      <Image
        source={imageUrl ? { uri: imageUrl } : require("../../assets/images/image1.jpeg")}
        style={styles.profileImage}
      />

      {/* User Info */}
      <Text style={styles.name}>{name || 'User Name'}</Text>
      <Text style={styles.email}>{email || 'user@example.com'}</Text>

      {/* Bottom Buttons */}
      <View style={styles.buttonContainer}>
        {/* Edit Profile Button */}
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Edit Profile</Text>
        </TouchableOpacity>

        {/* Logout Button */}
        <TouchableOpacity 
          style={[styles.button, styles.logoutButton]} 
          // onPress={handleLogout}
        >
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 80, 
    backgroundColor: Colors.background,
  },
  profileImage: {
    width: 180, // bigger profile image
    height: 180,
    borderRadius: 90,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: Colors.text,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
    color: Colors.text,
  },
  email: {
    fontSize: 16,
    color: Colors.smallText,
    marginBottom: 30,
    // color: Colors.text,
    
  },
  buttonContainer: {
    position: "absolute",
    bottom: 40,
    width: "100%",
    alignItems: "center",
  },
  button: {
    width: "80%",
    paddingVertical: 14,
    borderRadius: 10,
    backgroundColor: Colors.containers,
    marginBottom: 15,
    alignItems: "center",
  },
  logoutButton: {
    backgroundColor: Colors.containers,
  },
  buttonText: {
    color: Colors.text,
    fontSize: 16,
    fontWeight: "bold",
  },
});
