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
import {getProduct} from "@/api/services"
import { useSelector, useDispatch } from "react-redux";
const { width } = Dimensions.get("window");

export default function HomeScreen() {
  const [products,setProducts] = useState([])
  const token = useSelector((state: any) => state.auth.token);
  const getAllProducts = async()=>{
    const response = await getProduct(token);
  
    console.log("checking list of product \n",response.data)
    setProducts(response?.data)
  }
  useEffect (()=>{
    getAllProducts()
  },[])
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
      <Crousal />
      {/* Categories */}
      <Catagory />
      {/* Products Grid */}
      <FlatList
        data={products}
        renderItem={renderProduct}
        keyExtractor={(item) => item._id}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        contentContainerStyle={{ paddingBottom: 20 }}
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

  productCard: {
    backgroundColor: Colors.containers,
    borderRadius: 8,
    marginBottom: 15,
    flex: 1,
    marginHorizontal: 5,
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
  },
  categoryName: {
    fontSize: 14,
    color: Colors.smallText,
  },
  productPrice: {
    fontSize: 14,
    color: Colors.primary,
    fontWeight: "600",
  },
});
