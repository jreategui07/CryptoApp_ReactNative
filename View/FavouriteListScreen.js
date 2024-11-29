import React, { useCallback, useState, useLayoutEffect } from 'react';
import { View, FlatList, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

// View Models
import CryptoViewModel from '../ViewModel/CryptoViewModel';

const FavouriteListScreen = ({ navigation }) => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchFavorites = async () => {
    setLoading(true);
    const data = await CryptoViewModel.fetchFavorites();
    setFavorites(data);
    setLoading(false);
  };

  useFocusEffect(
    useCallback(() => {
      fetchFavorites();
    }, [])
  );

  const handleRemoveAll = async () => {
    Alert.alert(
      'Remove All Favorites',
      'Are you sure you want to remove all favorites?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Remove All',
          style: 'destructive',
          onPress: async () => {
            await CryptoViewModel.removeAllFavorites();
            fetchFavorites(); // Refreshing the favorite list
          },
        },
      ]
    );
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () =>
        favorites.length > 0 ? ( // Displaying "Remove All" button only is there are alements
          <TouchableOpacity onPress={handleRemoveAll} style={styles.headerButton}>
            <Text style={styles.headerButtonText}>Remove All</Text>
          </TouchableOpacity>
        ) : null, // Otherwise we don't display the button
    });
  }, [navigation, favorites]);

  const navigateToCryptoDetailsScreen = (crypto) => {
    navigation.navigate('CryptoDetails', {
      cryptoId: crypto.id,
      cryptoName: crypto.name,
      cryptoSymbol: crypto.symbol,
      refreshFavorites: fetchFavorites,
    });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => navigateToCryptoDetailsScreen(item)}
    >
      <Text style={styles.itemName}>{item.name}</Text>
      <Text style={styles.itemSymbol}>{item.symbol}</Text>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#007BFF" />
      </View>
    );
  }

  if (favorites.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No currency found.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={favorites}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#6c757d',
  },
  listContainer: {
    paddingVertical: 10,
  },
  itemContainer: {
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 5,
    marginHorizontal: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007BFF',
  },
  itemSymbol: {
    fontSize: 14,
    color: '#6c757d',
  },
  headerButton: {
    marginRight: 15,
  },
  headerButtonText: {
    color: 'red',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default FavouriteListScreen;
