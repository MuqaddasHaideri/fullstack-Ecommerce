import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { AntDesign } from '@expo/vector-icons'
import { Colors } from '@/constants/Colors'
import { getUsersFavorite, removeFavorite } from '@/api/services'
import { useSelector } from 'react-redux'
import { router } from 'expo-router'

const Favorites = () => {
  const [favorites, setFavorites] = useState([])
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const token = useSelector((state: any) => state.auth.token);

  const getUserFav = async () => {
    try {
      setLoading(true)
      const response = await getUsersFavorite(token);
      console.log("Favorites API response:", response);
      if (response.data) {
        setFavorites(response.data)
      } else if (Array.isArray(response)) {
        setFavorites(response)
      } else {
        console.error("Unexpected response format:", response)
        setFavorites([])
      }
    } catch (error) {
      console.error("Error fetching favorites:", error)
      Alert.alert("Error", "Failed to load favorites")
      setFavorites([])
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  };
  const handleProductDetail = (id: string) => {
    router.push({
      pathname: '/Screens/ProductDetail',
      params: { id },
    });
  };
  const removeFav = async (favoriteId: string) => {
    try {
      await removeFavorite(favoriteId, token);
      setFavorites(prev => prev.filter(item => item._id !== favoriteId));

    } catch (error) {
      console.error("Error removing favorite:", error);
      Alert.alert("Error", "Failed to remove favorite");
      getUserFav();
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    getUserFav();
  };

  useEffect(() => {
    getUserFav();
  }, []);

  const renderItem = ({ item }: any) => (
    
    <TouchableOpacity
    style={styles.card}
    onPress={() => handleProductDetail(item?.productId?._id)}
  >
      <Image 
        source={{ uri: item?.productId?.image }} 
        style={styles.image} 
        onError={() => console.log("Image failed to load")}
      />
      <View style={styles.info}>
        <Text style={styles.name}>{item.productId?.name || 'Unknown Product'}</Text>
        <Text style={styles.category}>{item.productId?.category || 'No category'}</Text>
        <Text style={styles.price}>${item.productId?.price || '0.00'}</Text>
      </View>
      <TouchableOpacity 
        onPress={() => removeFav(item._id)}
        style={styles.heartButton}
      >
        <AntDesign name="heart" size={28} color="red" />
      </TouchableOpacity>
      </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>My Favorites</Text>
        <Text style={styles.emptyText}>Loading...</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>My Favorites</Text>
      
      {favorites.length > 0 ? (
        <FlatList
          data={favorites}
          keyExtractor={item => item._id}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 20 }}
          style={styles.listStyle}
          refreshing={refreshing}
          onRefresh={handleRefresh}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <AntDesign name="hearto" size={50} color={Colors.smallText} />
          <Text style={styles.emptyText}>No favorites yet!</Text>
          <Text style={styles.emptySubText}>Start adding products to see them here</Text>
        </View>
      )}
    </View>
  )
}

export default Favorites

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: 15,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
    color: Colors.text,
    top: 10,
    marginTop: 60,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.containers,
    marginBottom: 12,
    borderRadius: 12,
    padding: 12,
    shadowColor: Colors.smallText,
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  listStyle: {
    marginTop: 10,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 10,
    backgroundColor: Colors.background, 
  },
  info: {
    flex: 1,
    marginLeft: 12,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text,
  },
  category: {
    fontSize: 14,
    color: Colors.smallText,
    marginVertical: 2,
  },
  price: {
    fontSize: 15,
    color: Colors.primary,
    fontWeight: '600',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100,
  },
  emptyText: {
    fontSize: 18,
    color: Colors.smallText,
    textAlign: 'center',
    marginTop: 20,
    fontWeight: '600',
  },
  emptySubText: {
    fontSize: 14,
    color: Colors.smallText,
    textAlign: 'center',
    marginTop: 10,
    opacity: 0.7,
  },
  heartButton: {
    padding: 8,
  },
})