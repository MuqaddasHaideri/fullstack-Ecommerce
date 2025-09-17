import React, { useState } from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { Colors } from "@/constants/Colors";

const { height } = Dimensions.get("window");

const FilterBottomsheet = ({ visible, onClose, onFilter }) => {
  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.backdrop}>
        {/* Semi-transparent overlay that covers the whole screen */}
        <TouchableOpacity 
          style={styles.overlay} 
          activeOpacity={1} 
          onPress={onClose}
        />
        
        {/* Bottom sheet content */}
        <View style={styles.container}>
          <View style={styles.handle} />
          <Text style={styles.title}>Sort by Price</Text>
          
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              onFilter("asc");
              onClose();
            }}
          >
            <Text style={styles.buttonText}>Low → High</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              onFilter("desc");
              onClose();
            }}
          >
            <Text style={styles.buttonText}>High → Low</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.cancelButton}
            onPress={onClose}
          >
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    justifyContent: "flex-end",
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black
  },
  container: {
    backgroundColor: Colors.background,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 24,
    paddingBottom: 40, // Extra padding for bottom safe area
    maxHeight: height * 0.4, // Limit height to 40% of screen
  },
  handle: {
    width: 40,
    height: 4,
    backgroundColor: Colors.smallText,
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 20,
    opacity: 0.5,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.text,
    marginBottom: 20,
    textAlign: "center",
  },
  button: {
    padding: 16,
    borderRadius: 12,
    backgroundColor: Colors.containers,
    marginBottom: 12,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.text,
  },
  cancelButton: {
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 8,
  },
  cancelText: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.primary,
  },
});

export default FilterBottomsheet;