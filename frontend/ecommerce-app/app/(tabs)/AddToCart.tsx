import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { Colors } from '@/constants/Colors';

const AddToCart = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: '1',
      name: 'Wireless Headphones',
      price: 120,
      image: 'https://via.placeholder.com/150',
    },
    {
      id: '2',
      name: 'Smart Watch',
      price: 250,
      image: 'https://via.placeholder.com/150',
    },
    {
      id: '3',
      name: 'Bluetooth Speaker',
      price: 80,
      image: 'https://via.placeholder.com/150',
    },
  ]);

  const removeItem = (id: string) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const renderItem = ({ item }: any) => (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.details}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.price}>${item.price}</Text>
      </View>
      <TouchableOpacity style={styles.removeBtn} onPress={() => removeItem(item.id)}>
        <Text style={styles.removeText}>Remove</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>My Cart</Text>
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        style={styles.listStyle}
      />
    </View>
  );
};

export default AddToCart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: 16,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 12,
    color : Colors.text,
    top:10,
    marginTop:60,
  },
  listStyle:{
marginTop:10,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.containers,
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 8,
  },
  details: {
    flex: 1,
    marginLeft: 12,
    color:Colors.text
  },
  name: {
    fontSize: 16,
    fontWeight: '500',
    color:Colors.text
  },
  price: {
    fontSize: 14,
    color: Colors.smallText,
  },
  removeBtn: {
    backgroundColor: '#ff4d4d',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  removeText: {
    color: '#fff',
    fontWeight: '600',
  },
});
