import { StyleSheet, Text, View, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Colors } from '@/constants/Colors';
import { useSelector } from 'react-redux';
import { router } from 'expo-router';
import { getCatagory, getCatagoryById } from '@/api/services';

const Catagory = () => {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [id, setId] = useState();
  const token = useSelector((state: any) => state.auth.token);

  const fetchCategories = async () => {
 const response = await getCatagory(token);
 setCategories(response?.data);
console.log("checking list of catagory \n",response)
  };

  useEffect(() => {
   fetchCategories()
  }, []);
  const handleCategoryById = async (index: number) => {
    const categoryName = categories[index];  
    console.log("Category name....", categoryName);
  
    const response = await getCatagoryById(categoryName, token); 
    // setPro(response?.data); // if you want to display products
    console.log("Products by category \n", response?.data);
  };
  
  
     const renderCategory = ({ item, index }: { item: any; index: number }) => (
      <TouchableOpacity onPress={() => handleCategoryById(index)}>
        <View style={styles.categoryItem}>
          <Text style={styles.categoryText}>{item.name || item}</Text>
        </View>
      </TouchableOpacity>
    );
    



  return (
    <View>
      <FlatList
        data={categories}
        renderItem={renderCategory}
        keyExtractor={(item, index) => index.toString()}

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
