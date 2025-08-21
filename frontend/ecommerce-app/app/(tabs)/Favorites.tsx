import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { AntDesign } from '@expo/vector-icons'
import { Colors } from '@/constants/Colors'

const Favorites = () => {
  const [favorites, setFavorites] = useState([
    {
      id: '1',
      name: 'Nike Air Max',
      category: 'Shoes',
      price: '$120',
      image: 'https://via.placeholder.com/150',
    },
    {
      id: '2',
      name: 'Apple Watch',
      category: 'Accessories',
      price: '$350',
      image: 'https://via.placeholder.com/150',
    },
  ])

  const removeFromFavorites = (id: string) => {
    setFavorites(prev => prev.filter(item => item.id !== id))
  }

  const renderItem = ({ item }: any) => (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.category}>{item.category}</Text>
        <Text style={styles.price}>{item.price}</Text>
      </View>
      {/* Heart button to remove */}
      <TouchableOpacity onPress={() => removeFromFavorites(item.id)}>
        <AntDesign name="heart" size={28} color="red" />
      </TouchableOpacity>
    </View>
  )

  return (
    <View style={styles.container}>
      <Text style={styles.header}>My Favorites</Text>
      {favorites.length > 0 ? (
        <FlatList
          data={favorites}
          keyExtractor={item => item.id}
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
