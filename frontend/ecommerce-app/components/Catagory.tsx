import { StyleSheet, Text, View, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Colors } from '@/constants/Colors';
import { useSelector } from 'react-redux';
import { router } from 'expo-router';

const Catagory = () => {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Get token from Redux
  const token = useSelector((state: any) => state.auth.token);

  const dummyCategories = [
    { id: "1", name: "Shoes" },
    { id: "2", name: "Bags" },
    { id: "3", name: "Watches" },
    { id: "4", name: "Clothes" },
  ];

  const fetchCategories = async () => {
    const API_BASE = process.env.EXPO_PUBLIC_BASE_URL!;
    try {
      const res = await fetch(`${API_BASE}/api/products/category`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`, // token from Redux
        },
      });

      if (!res.ok) throw new Error('Failed to fetch');

      const data = await res.json();
      console.log("API Response:", data);

      if (Array.isArray(data) && data.length > 0) {
        setCategories(data);
      } else {
        setCategories(dummyCategories);
      }
    } catch (error) {
      console.log('Error fetching categories:', error);
      setCategories(dummyCategories);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchCategories();
    } else {
      console.log("No token found, using dummy categories");
      setCategories(dummyCategories);
      setLoading(false);
    }
  }, [token]); // refetch when token changes

  const renderCategory = ({ item }: { item: any }) => (
    // <TouchableOpacity onPress={handleProductDetail}>
    <View style={styles.categoryItem}>
   
      <Text style={styles.categoryText}>{item.name || item}</Text>
    </View>
      //  </TouchableOpacity>
  );

  if (loading) {
    return <ActivityIndicator style={{ marginTop: 20 }} size="large" color={Colors.primary} />;
  }

  return (
    <View>
      <FlatList
        data={categories}
        renderItem={renderCategory}
        keyExtractor={(item) => item.id?.toString() || Math.random().toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.list}
      />
    </View>
  );
};

export default Catagory;

const styles = StyleSheet.create({
  categoryItem: {
    alignItems: "center",
    marginHorizontal: 10,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 10,
    height: 50,
    width: 100,
    justifyContent: "center",
    backgroundColor: Colors.containers,
  },
  categoryText: {
    fontSize: 12,
    color: Colors.text,
    fontWeight: "600",
  },
  list: {
    marginVertical: 15,
  },
});
