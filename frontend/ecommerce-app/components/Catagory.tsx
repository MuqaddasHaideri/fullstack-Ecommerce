import { StyleSheet, Text, View, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Colors } from '@/constants/Colors';
import { useSelector } from 'react-redux';
import { router } from 'expo-router';
import { getCatagory, getCatagoryById } from '@/api/services';

const Catagory = ({ selectedCategory, onCategorySelect }: { 
  selectedCategory: string | null; 
  onCategorySelect: (categoryName: string) => void; 
}) => {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const token = useSelector((state: any) => state.auth.token);

  const fetchCategories = async () => {
    const response = await getCatagory(token);
    setCategories(response?.data);
    console.log("checking list of category \n", response);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const renderCategory = ({ item, index }: { item: any; index: number }) => {
    const categoryName = item.name || item;
    const isSelected = selectedCategory === categoryName;
    
    return (
      <TouchableOpacity onPress={() => onCategorySelect(categoryName)}>
        <View style={[
          styles.categoryItem,
          isSelected && styles.selectedCategoryItem // Apply selected style
        ]}>
          <Text style={[
            styles.categoryText,
            isSelected && styles.selectedCategoryText // Apply selected text style
          ]}>
            {categoryName}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

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
  selectedCategoryItem: {
    backgroundColor: Colors.primary, 
    borderColor: Colors.text,
  },
  selectedCategoryText: {
    color: 'white', 
    fontWeight: 'bold',
  },
});
