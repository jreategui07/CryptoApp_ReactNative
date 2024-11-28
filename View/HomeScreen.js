import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';

// View Models
import CryptoViewModel from '../ViewModel/CryptoViewModel';

const HomeScreen = ({ navigation }) => {
  const [cryptoList, setCryptoList] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingFavorites, setLoadingFavorites] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    const data = await CryptoViewModel.fetchCryptoList();
    setCryptoList(data);
    setLoading(false);
  };

  const fetchFavorites = async () => {
    setLoadingFavorites(true);
    const data = await CryptoViewModel.fetchFavorites();
    setFavorites(data);
    setLoadingFavorites(false);
  };

  const navigateToCryptoDetailsScreen = (crypto) => {
    navigation.navigate('CryptoDetails', {
      cryptoId: crypto.id,
      cryptoName: crypto.name,
      cryptoSymbol: crypto.symbol,
      refreshFavorites: fetchFavorites
    });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => navigateToCryptoDetailsScreen(item)}
    >
      <Text style={styles.itemName}>{item.name}</Text>
      <Text style={styles.itemSymbol}>{item.symbol}</Text>
      <Text style={styles.itemPrice}>${item.price_usd}</Text>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#007BFF" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {
        loadingFavorites && (
          <View style={styles.loaderContainer}>
            <ActivityIndicator size="small" color="#007BFF" />
          </View>
        )
      }
      <FlatList
        data={cryptoList}
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
  itemPrice: {
    fontSize: 16,
    fontWeight: '600',
    color: '#28a745',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;
