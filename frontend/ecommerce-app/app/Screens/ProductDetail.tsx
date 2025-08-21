import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, Dimensions } from 'react-native'
import React, { useState } from 'react'
import { AntDesign } from '@expo/vector-icons' // for heart icon
import { Colors } from '@/constants/Colors';

const { height } = Dimensions.get("window");

const ProductDetail = () => {
  const [isFav, setIsFav] = useState(false);

  // dummy product data
  const product = {
    id: 1,
    name: "Wireless Headphones",
    category: "Electronics",
    price: "$120",
    description:
      "loreakan ajndajdn jadnkand jadnkdn jdnakd idns iadkn iadnkd dalnad dnakn kadn, anadkn adnadnkla addna addnakdn These wireless headphones provide premium sound quality, long-lasting comfort, and reliable Bluetooth connectivity. With noise cancellation and up to 20 hours of battery life, they are perfect for work, travel, and everyday use.",
    image: "data:image/jpeg;base64,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"
  }

  return (
    <View style={styles.container}>
      {/* Scrollable Content */}
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        {/* Product Image */}
        <View>
          <Image source={{ uri: product.image }} style={styles.productImage} />

          {/* Heart Icon */}
          <TouchableOpacity 
            style={styles.heartIcon} 
            onPress={() => setIsFav(!isFav)}
          >
            <AntDesign name={isFav ? "heart" : "hearto"} size={28} color={isFav ? "red" : "white"} />
          </TouchableOpacity>
        </View>

        {/* Product Info */}
        <View style={styles.infoContainer}>
          <Text style={styles.name}>{product.name}</Text>
          <Text style={styles.category}>{product.category}</Text>
          <Text style={styles.price}>{product.price}</Text>
          <Text style={styles.description}>{product.description.repeat(3)}</Text>
        </View>
      </ScrollView>

      {/* Add to Cart Button at Bottom */}
      <View style={styles.cartContainer}>
        <TouchableOpacity style={styles.cartButton}>
          <Text style={styles.cartButtonText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default ProductDetail

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  productImage: {
    width: '100%',
    height: height * 0.4, // half screen height
    resizeMode: 'cover',
  },
  heartIcon: {
    position: "absolute",
    top: 20,
    right: 20,
    backgroundColor: "rgba(0,0,0,0.4)",
    padding: 8,
    borderRadius: 50,
  },
  infoContainer: {
    padding: 20,
  },
  name: {
    color: Colors.text,
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  category: {
    fontSize: 18,
    color: Colors.text,
    marginBottom: 10,
  },
  price: {
    fontSize: 22,
    fontWeight: '600',
    color: Colors.primary,
    marginBottom: 15,
  },
  description: {
    fontSize: 16,
    lineHeight: 22,
    color: Colors.smallText,
  },
  cartContainer: {
    position: "absolute",
    bottom: 24,
    left: 0,
    right: 0,
    padding: 15,
    backgroundColor: Colors.background,
    borderTopWidth: 0.7,
    borderColor: Colors.text,
  },
  cartButton: {
    backgroundColor: Colors.primary,
    padding: 16,
    borderRadius: 10,
    alignItems: "center",
  },
  cartButtonText: {
    color: Colors.text,
    fontSize: 18,
    fontWeight: 'bold',
  },
})
