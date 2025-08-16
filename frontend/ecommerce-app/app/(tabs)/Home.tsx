import React from "react";
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
const { width } = Dimensions.get("window");


// const categories = [
//   { id: "1", name: "Shoes", image: require("../../assets/images/image1.jpeg") },
//   { id: "2", name: "Bags", image: require("../../assets/images/image2.jpeg") },
//   { id: "3", name: "Watches", image: require("../../assets/images/image3.jpeg") },
//   { id: "4", name: "Clothes", image: require("../../assets/images/image1.jpeg") },
// ];

const products = Array.from({ length: 20 }, (_, i) => ({
  id: i.toString(),
  name: `Product ${i + 1}`,
  price: `$${(i + 1) * 5}`,
  image: require("../../assets/images/image3.jpeg"),
}));

export default function HomeScreen() {

  // const renderCategory = ({ item }: { item: any }) => (
  //   <View style={styles.categoryItem}>
  //     <Image source={item.image} style={styles.categoryImage} />
  //     <Text style={styles.categoryText}>{item.name}</Text>
  //   </View>
  // );

  const renderProduct = ({ item }: { item: any }) => (
    <TouchableOpacity style={styles.productCard}>
      <Image source={item.image} style={styles.productImage} />
      <Text style={styles.productName}>{item.name}</Text>
      <Text style={styles.productPrice}>{item.price}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Banner Carousel */}
      <Crousal/>
      {/* Categories */}
  <Catagory/> 
      {/* Products Grid */}
      <FlatList
        data={products}
        renderItem={renderProduct}
        keyExtractor={(item) => item.id}
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
    backgroundColor: "#fff",
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
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
  },
  productPrice: {
    fontSize: 12,
    color: "#ff5733",
  },
});
