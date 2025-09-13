import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { AntDesign } from '@expo/vector-icons'
import { Colors } from '@/constants/Colors'
import { getUsersFavorite, removeFavorite } from '@/api/services'
import { useSelector } from 'react-redux'

const Favorites = () => {
  const [favorites, setFavorites] = useState([])
  const [isFav, setIsFav] = useState(false);
  const token = useSelector((state: any) => state.auth.token);
  // const removeFromFavorites = (id: string) => {
  //   setFavorites(prev => prev.filter(item => item.id !== id))
  // }
  
  const getUserFav = async () => {
    const response = await getUsersFavorite(token);
    console.log("checking list of favorites>>>>>>> \n", response.data);
    setFavorites(response?.data)
    
  };
  const removeFav = async (favoriteId: string) => {
    try {
      await removeFavorite(favoriteId, token); // DELETE /favorites/:favoriteId
      setFavorites(prev => prev.filter(item => item._id !== favoriteId));
    } catch (error) {
      console.error("Error removing favorite:", error);
    }
  };
  
  
  
  useEffect(()=>{
getUserFav();
  },[token])
  const renderItem = ({ item }: any) => (
    <View style={styles.card}>
      <Image source={{ uri: item?.productId?.image }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.name}>{item.productId?.name}</Text>
        <Text style={styles.category}>{item.productId?.category}</Text>
        <Text style={styles.price}>{item.productId?.price}</Text>
      </View>
      <TouchableOpacity onPress={() => removeFav(item._id)}>
  <AntDesign name="heart" size={28} color="red" />
</TouchableOpacity>

    </View>
  );
  
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
        />
      ) : (
        <Text style={styles.emptyText}>No favorites yet!</Text>
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
  emptyText: {
    fontSize: 16,
    color: 'gray',
    textAlign: 'center',
    marginTop: 30,
  },
})
