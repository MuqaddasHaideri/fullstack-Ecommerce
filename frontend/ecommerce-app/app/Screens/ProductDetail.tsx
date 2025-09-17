import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Alert,
  ActivityIndicator
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
  getUsersFavorite,
} from "@/api/services";

const { height } = Dimensions.get("window");

interface RootState {
  auth: {
    token: string;
  };
}

interface Product {
  _id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  image: string;
  favorited?: boolean;
  favoriteId?: string;
}

const ProductDetail = () => {
  const token = useSelector((state: RootState) => state.auth.token);
  const { id } = useLocalSearchParams();

  const [product, setProduct] = useState<Product | null>(null);
  const [isFav, setIsFav] = useState(false);
  const [favoriteId, setFavoriteId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);

  // Get user's favorites to check if this product is already favorited
  const checkIfFavorited = async (productId: string) => {
    try {
      const response = await getUsersFavorite(token);
      const favorites = response.data || [];
      
      // Find if this product is in favorites
      const favorite = favorites.find((fav: any) => 
        fav.productId?._id === productId || fav.productId === productId
      );
      
      if (favorite) {
        setIsFav(true);
        setFavoriteId(favorite._id);
        return favorite._id;
      } else {
        setIsFav(false);
        setFavoriteId(null);
        return null;
      }
    } catch (err) {
      console.error("Error checking favorites:", err);
      return null;
    }
  };

  const getProduct = async () => {
    try {
      setLoading(true);
      const response = await getProductByID(id, token);
      const data = response?.data || {};
      setProduct(data);
      
      // Check if this product is in user's favorites
      await checkIfFavorited(data._id || id);
      
    } catch (err) {
      console.error("Error fetching product:", err);
      Alert.alert("Error", "Failed to load product");
    } finally {
      setLoading(false);
    }
  };

  const addToFav = async () => {
    try {
      setProcessing(true);
      const response = await addFavorite(id, token);
      
      if (response.data && response.data._id) {
        setIsFav(true);
        setFavoriteId(response.data._id);
        Alert.alert("Success", "Added to favorites!");
      } else {
        throw new Error("Invalid response from server");
      }
    } catch (err: any) {
      console.error("Error adding favorite:", err);
      Alert.alert("Error", err.response?.data?.message || "Failed to add favorite");
    } finally {
      setProcessing(false);
    }
  };

  const removeFav = async () => {
    try {
      setProcessing(true);
      
      // If we don't have favoriteId, try to get it first
      let favId = favoriteId;
      if (!favId) {
        favId = await checkIfFavorited(product?._id || id);
      }
      
      if (!favId) {
        Alert.alert("Error", "Favorite not found");
        return;
      }
      
      await removeFavorite(favId, token);
      setIsFav(false);
      setFavoriteId(null);
      Alert.alert("Success", "Removed from favorites!");
    } catch (err: any) {
      console.error("Error removing favorite:", err);
      Alert.alert("Error", err.response?.data?.message || "Failed to remove favorite");
    } finally {
      setProcessing(false);
    }
  };

  const handleFavoritePress = () => {
    if (processing || loading) return;
    
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

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color={Colors.primary} />
        <Text style={{ marginTop: 10 }}>Loading product...</Text>
      </View>
    );
  }

  if (!product) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Product not found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        <View>
          <Image 
            source={{ uri: product?.image }} 
            style={styles.productImage} 
            onError={() => console.log("Image failed to load")}
          />
          <TouchableOpacity 
            style={styles.heartIcon} 
            onPress={handleFavoritePress}
            disabled={processing}
          >
            {processing ? (
              <ActivityIndicator size="small" color="white" />
            ) : (
              <AntDesign
                name={isFav ? "heart" : "heart"}
                size={28}
                color={isFav ? "red" : "white"}
              />
            )}
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
    backgroundColor: Colors.background, // Fallback background
  },
  heartIcon: {
    position: "absolute",
    top: 20,
    right: 20,
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: 10,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    height: 50,
  },
  infoContainer: { padding: 20 },
  name: {
    color: Colors.text,
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 5,
  },
  category: { 
    fontSize: 18, 
    color: Colors.smallText, 
    marginBottom: 10,
    textTransform: 'capitalize',
  },
  price: {
    fontSize: 22,
    fontWeight: "600",
    color: Colors.primary,
    marginBottom: 15,
  },
  description: { 
    fontSize: 16, 
    lineHeight: 22, 
    color: Colors.smallText,
    marginTop: 10,
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
    fontWeight: "bold",
  },
});