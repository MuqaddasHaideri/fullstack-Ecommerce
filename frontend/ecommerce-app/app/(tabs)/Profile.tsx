import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/authSlice";
import { Colors } from "@/constants/Colors";
import { getProfile } from "@/api/services";
const Profile = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const token = useSelector((state: any) => state.auth.token);
  const axiosProfile = async () => {
    const response = await getProfile(token);
    // console.log("this is response==========", response?.data);
    setName(response?.data?.name);
    setEmail(response?.data?.email);
    setImageUrl(response?.data?.profilePic);
  };
  useEffect(() => {
    axiosProfile();
  }, []);
  return (
    <View style={styles.container}>
      <Image
        source={
          imageUrl
            ? { uri: imageUrl }
            : require("../../assets/images/image1.jpeg")
        }
        style={styles.profileImage}
      />

      <Text style={styles.name}>{name || "User Name"}</Text>
      <Text style={styles.email}>{email || "user@example.com"}</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Edit Profile</Text>
        </TouchableOpacity>

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
    alignItems: "center",
    paddingTop: 80,
    backgroundColor: Colors.background,
  },
  profileImage: {
    width: 180,
    height: 180,
    borderRadius: 90,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: Colors.text,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
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
