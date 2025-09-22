import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { Colors } from '@/constants/Colors';
import {
  getCartItems,
  removeFromCart,
  updateCartQuantity, 
} from '@/api/services';
import { useSelector } from 'react-redux';

const AddToCart = () => {
  const [cart, setCart] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const token = useSelector((state: any) => state.auth.token);

  const getUserCart = async () => {
    try {
      setLoading(true);
      const response = await getCartItems(token);
      if (response.data) {
        setCart(response.data);
      } else if (Array.isArray(response)) {
        setCart(response);
      } else {
        console.error('Unexpected response format:', response);
        setCart([]);
      }
    } catch (error) {
      console.error('Error fetching cart:', error);
      Alert.alert('Error', 'Failed to load cart');
      setCart([]);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const removeCart = async (itemId: string) => {
    try {
      await removeFromCart(itemId, token);
      setCart(prev => prev.filter(item => item._id !== itemId));
    } catch (error) {
      console.error('Error removing item:', error);
      Alert.alert('Error', 'Failed to remove item');
    }
  };

  const handleQuantityChange = async (itemId: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    try {
      await updateCartQuantity(itemId, newQuantity, token);
      
      setCart(prev =>
        prev.map(item =>
          item._id === itemId ? { ...item, quantity: newQuantity } : item,
        ),
      );
    } catch (err) {
      console.error('Error updating quantity:', err);
      Alert.alert('Error', 'Failed to update quantity');
    }
  };

  useEffect(() => {
    getUserCart();
  }, []);

  const renderItem = ({ item }: any) => (
    <View style={styles.card}>
      <Image source={{ uri: item?.productId?.image }} style={styles.image} />
      <View style={styles.details}>
        <Text style={styles.name}>{item.productId?.name}</Text>
        <Text style={styles.price}>${item.productId?.price}</Text>

        <View style={styles.quantityRow}>
          <TouchableOpacity
            style={styles.qtyBtn}
            onPress={() =>
              handleQuantityChange(item._id, item.quantity - 1)
            }>
            <Text style={styles.qtyText}>-</Text>
          </TouchableOpacity>

          <Text style={styles.qtyValue}>{item.quantity}</Text>

          <TouchableOpacity
            style={styles.qtyBtn}
            onPress={() =>
              handleQuantityChange(item._id, item.quantity + 1)
            }>
            <Text style={styles.qtyText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity
        style={styles.removeBtn}
        onPress={() => removeCart(item?._id)}>
        <Text style={styles.removeText}>Remove</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>My Cart</Text>
      <FlatList
        data={cart}
        keyExtractor={item => item._id}
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
    color: Colors.text,
    marginTop: 60,
  },
  listStyle: {
    marginTop: 10,
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
  },
  name: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.text,
  },
  price: {
    fontSize: 14,
    color: Colors.smallText,
  },
  quantityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  qtyBtn: {
    backgroundColor: Colors.background,
    borderWidth: 1,
    borderColor: Colors.smallText,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 4,
  },
  qtyText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text,
  },
  qtyValue: {
    marginHorizontal: 12,
    fontSize: 16,
    color: Colors.text,
  },
  removeBtn: {
    backgroundColor: Colors.error,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  removeText: {
    color: Colors.text,
    fontWeight: '600',
  },
});
