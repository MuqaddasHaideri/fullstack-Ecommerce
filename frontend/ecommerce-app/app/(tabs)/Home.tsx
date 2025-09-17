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
import { filterProducts, getCatagoryById, getProduct } from "@/api/services";
import { useSelector, useDispatch } from "react-redux";
import SearchBar from "@/components/SearchBar";
import { AntDesign, Feather } from "@expo/vector-icons";
import FilterBottomsheet from '@/components/FilterBottomsheet'
const { width } = Dimensions.get("window");

export default function HomeScreen() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const token = useSelector((state: any) => state.auth.token);
  const [showFilter, setShowFilter] = useState(false);
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
      const filtered = products.filter(
        (product) =>
          product.name.toLowerCase().includes(query.toLowerCase()) ||
          (product.category &&
            product.category.toLowerCase().includes(query.toLowerCase()))
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
      pathname: "/Screens/ProductDetail",
      params: { id },
    });
  };
  const handleFavoritesPress = () => {
    // router.push('/Screens/Favorites');
  };


  const handleFiltersPress = () => {
    setShowFilter(true);
  };
  
  const handleFilterSelect = async (sortType: string) => {
    try {
      const res = await filterProducts(sortType, token);
      setFilteredProducts(res.data);
    } catch (err) {
      console.error("Error filtering products:", err);
    }
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
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Discover</Text>
        <View style={styles.headerIcons}>
        <TouchableOpacity
      style={styles.iconButton}
      onPress={handleFiltersPress}
    >
      <Feather name="filter" size={24} color={Colors.text} />
    </TouchableOpacity>
  
    <FilterBottomsheet
      visible={showFilter}
      onClose={() => setShowFilter(false)}
      onFilter={handleFilterSelect}
    />
          <TouchableOpacity
            style={styles.iconButton}
            onPress={handleFavoritesPress}
          >
            <AntDesign name="heart" size={24} color={Colors.text} />
          </TouchableOpacity>
        </View>
      </View>
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
    backgroundColor: Colors.background,
    paddingHorizontal: 15,
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
    width: (width - 40) / 2,
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
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 50,
    paddingBottom: 15,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.text,
  },
  headerIcons: {
    flexDirection: "row",
    gap: 15,
  },
  iconButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: Colors.containers,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
});
