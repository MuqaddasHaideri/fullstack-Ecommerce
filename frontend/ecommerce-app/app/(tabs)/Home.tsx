import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import Crousal from "@/components/Crousal";
import { Colors } from "@/constants/Colors";
import Catagory from "@/components/Catagory";
import { router } from "expo-router";
import {getCatagoryById, getProduct} from "@/api/services"
import { useSelector, useDispatch } from "react-redux";
import SearchBar from "@/components/SearchBar";
const { width } = Dimensions.get("window");

export default function HomeScreen() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]); 
  const [selectedCategory, setSelectedCategory] = useState(null); 
  const [searchQuery, setSearchQuery] = useState("");
  const token = useSelector((state: any) => state.auth.token);
  
  const getAllProducts = async () => {
    const response = await getProduct(token);
    console.log("checking list of product \n", response.data);
    setProducts(response?.data);
    setFilteredProducts(response?.data); 
  };
  
  useEffect(() => {
    getAllProducts();
  }, []);
  
  const filterProductsByCategory = async (categoryName: string) => {
    if (selectedCategory === categoryName) {
      setSelectedCategory(null);
      setFilteredProducts(products);
    } else {
      setSelectedCategory(categoryName);
      const response = await getCatagoryById(categoryName, token);
      setFilteredProducts(response?.data || []);
    }
  };
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim() === "") {
      if (selectedCategory) {
        filterProductsByCategory(selectedCategory);
      } else {
        setFilteredProducts(products);
      }
    } else {
      const filtered = products.filter(product =>
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        (product.category && product.category.toLowerCase().includes(query.toLowerCase()))
      );
      setFilteredProducts(filtered);
    }
  };

  // Clear search
  const handleClearSearch = () => {
    setSearchQuery("");
    if (selectedCategory) {
      filterProductsByCategory(selectedCategory);
    } else {
      setFilteredProducts(products);
    }
  };
  const handleProductDetail = (id: string) => {
    router.push({
      pathname: '/Screens/ProductDetail',
      params: { id },
    });
  };

  const renderProduct = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={styles.productCard}
      onPress={() => handleProductDetail(item?._id)}
    >
      <Image source={{ uri: item.image }} style={styles.productImage} />
      <Text style={styles.productName}>{item?.name}</Text>
      <Text style={styles.categoryName}>{item?.category} </Text>
      <Text style={styles.productPrice}>${item?.price}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Banner Carousel */}
      <SearchBar
        placeholder="Search for products..."
        onSearch={handleSearch}
        onClear={handleClearSearch}
      />
      <Crousal />
      {/* Categories */}
      <Catagory 
        selectedCategory={selectedCategory}
        onCategorySelect={filterProductsByCategory}
      />
      <FlatList
        data={filteredProducts} 
        renderItem={renderProduct}
        keyExtractor={(item) => item._id}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    backgroundColor: Colors.background,
    paddingHorizontal: 10,
  },
  columnWrapper: {
    justifyContent: "space-between",
    marginBottom: 15,
  },
  listContent: {
    paddingBottom: 20,
  },
  productCard: {
    backgroundColor: Colors.containers,
    borderRadius: 8,
    width: (width - 30) / 2, 
    padding: 10,
    alignItems: "center",
    elevation: 2,
  },
  productImage: {
    width: "100%",
    height: 120,
    borderRadius: 8,
    marginBottom: 10,
  },
  productName: {
    fontSize: 12,
    fontWeight: "600",
    color: Colors.text,
    textAlign: "center",
  },
  categoryName: {
    fontSize: 14,
    color: Colors.smallText,
    textAlign: "center",
  },
  productPrice: {
    fontSize: 14,
    color: Colors.primary,
    fontWeight: "600",
    textAlign: "center",
  },
  selectedCategory: {
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 5,
  },
});