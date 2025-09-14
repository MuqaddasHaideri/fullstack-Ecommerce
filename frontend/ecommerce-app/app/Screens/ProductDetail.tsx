import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";
import React, { useState, useCallback } from "react";

import { AntDesign } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { useLocalSearchParams, useFocusEffect } from "expo-router";
import { useSelector } from "react-redux";
import {
  addFavorite,
  getProductByID,
  removeFavorite,
} from "@/api/services";

const { height } = Dimensions.get("window");

interface RootState {
  auth: {
    token: string;
  };
}

const ProductDetail = () => {
  const token = useSelector((state: RootState) => state.auth.token);
  const { id } = useLocalSearchParams();

  const [product, setProduct] = useState<any>(null);
  const [isFav, setIsFav] = useState(false);
  const [favoriteId, setFavoriteId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // always get product + fav info fresh
  const getProduct = async () => {
    try {
      setLoading(true);
      const response = await getProductByID(id, token);
      const data = response?.data || {};
      setProduct(data);
      // map your API fields here:
      setIsFav(Boolean(data?.favorited));
   
    } catch (err) {
      console.error("Error fetching product:", err);
    } finally {
      setLoading(false);
    }
  };

  const addToFav = async () => {
    try {
      const response = await addFavorite(id, token);
      setIsFav(true);
      setFavoriteId(response.data._id);
    } catch (err) {
      console.error("Error adding favorite:", err);
    }
  };

  const removeFav = async () => {
    try {
      let currentFavId = favoriteId;
      if (!currentFavId) {
        await getProduct();
        currentFavId = favoriteId;
      }
      if (!currentFavId) {
        console.warn("No favoriteId found for product");
        return;
      }
      await removeFavorite(currentFavId, token);
      setIsFav(false);
      setFavoriteId(null);
    } catch (err) {
      console.error("Error removing favorite:", err);
    }
  };

  const handleFavoritePress = () => {
    if (loading) return;
    if (isFav) {
      removeFav();
    } else {
      addToFav();
    }
  };

  useFocusEffect(
    useCallback(() => {
      getProduct();
    }, [id, token])
  );

  if (!product) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Loading product...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        <View>
          <Image source={{ uri: product?.image }} style={styles.productImage} />
          <TouchableOpacity style={styles.heartIcon} onPress={handleFavoritePress}>
            <AntDesign
              name="heart"
              size={28}
              color={isFav ? "red" : "white"}
              style={{ opacity: isFav ? 1 : 0.3 }}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.name}>{product?.name}</Text>
          <Text style={styles.category}>{product?.category}</Text>
          <Text style={styles.price}>${product?.price}</Text>
          <Text style={styles.description}>{product?.description}</Text>
        </View>
      </ScrollView>
      <View style={styles.cartContainer}>
        <TouchableOpacity style={styles.cartButton}>
          <Text style={styles.cartButtonText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProductDetail;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  productImage: {
    width: "100%",
    height: height * 0.4,
    resizeMode: "cover",
  },
  heartIcon: {
    position: "absolute",
    top: 20,
    right: 20,
    backgroundColor: Colors.background,
    padding: 8,
    borderRadius: 50,
  },
  infoContainer: { padding: 20 },
  name: {
    color: Colors.text,
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 5,
  },
  category: { fontSize: 18, color: Colors.text, marginBottom: 10 },
  price: {
    fontSize: 22,
    fontWeight: "600",
    color: Colors.primary,
    marginBottom: 15,
  },
  description: { fontSize: 16, lineHeight: 22, color: Colors.smallText },
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
    fontWeight: "bold",
  },
});
