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

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.itemContainer}
        onPress={() => navigateToCryptoDetailsScreen(item)}
      >
        <View style={{ flex: 1 }}>
          <Text style={styles.itemName}>{item.name}</Text>
          <Text style={styles.itemSymbol}>{item.symbol}</Text>
          <Text style={styles.itemPrice}>${item.price_usd}</Text>
        </View>
      </TouchableOpacity>
    );
  };

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
    backgroundColor: '#f1f5f9',
  },
  listContainer: {
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  itemContainer: {
    backgroundColor: '#ffffff',
    padding: 20,
    marginVertical: 8,
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
    marginBottom: 5,
  },
  itemSymbol: {
    fontSize: 14,
    color: '#6b7280',
    fontStyle: 'italic',
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#16a34a',
    marginTop: 5,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;
