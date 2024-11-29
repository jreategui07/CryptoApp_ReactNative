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
      <View style={{ flex: 1 }}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemSymbol}>{item.symbol}</Text>
        <Text style={styles.itemPrice}>${item.price_usd}</Text>
      </View>
      <Text style={styles.badge}>Rank: {item.rank}</Text>
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
    backgroundColor: '#f1f5f9',
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
    padding: 20,
  },
  emptyText: {
    fontSize: 18,
    color: '#6c757d',
    textAlign: 'center',
    fontWeight: '600',
  },
  listContainer: {
    paddingVertical: 10,
  },
  itemContainer: {
    backgroundColor: '#ffffff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1c4e80',
  },
  itemSymbol: {
    fontSize: 14,
    color: '#6c757d',
    fontStyle: 'italic',
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#16a34a',
    marginTop: 5,
  },
  badge: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#16a34a',
    backgroundColor: '#dcfce7',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 5,
    textAlign: 'center',
    overflow: 'hidden',
    alignSelf: 'flex-start',
    marginTop: 5,
  },
  headerButton: {
    marginRight: 15,
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: '#fde2e2',
    borderColor: '#ef4444',
    borderWidth: 1,
    borderRadius: 5,
  },
  headerButtonText: {
    color: '#b91c1c',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    textTransform: 'uppercase',
  },
});

export default FavouriteListScreen;
