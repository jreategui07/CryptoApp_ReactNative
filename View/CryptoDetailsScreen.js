import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import CryptoViewModel from '../ViewModel/CryptoViewModel';

const CryptoDetailsScreen = ({ route }) => {
  const { cryptoId, refreshFavorites } = route.params;
  const [cryptoDetails, setCryptoDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    fetchDetails();
  }, [cryptoId]);

  const fetchDetails = async () => {
    setLoading(true);
    const data = await CryptoViewModel.fetchCryptoDetails(cryptoId);
    setCryptoDetails(data);

    const favorites = await CryptoViewModel.fetchFavorites();
    setIsFavorite(favorites.some((fav) => fav.id === cryptoId));

    setLoading(false);
  };

  const toggleFavorite = async () => {
    if (isFavorite) {
      await CryptoViewModel.removeFromFavorites(cryptoId);
    } else {
      await CryptoViewModel.addToFavorites(cryptoDetails); // Saving all values of the crypto
    }
  
    if (refreshFavorites) {
      await refreshFavorites();
    }
  
    const updatedFavorites = await CryptoViewModel.fetchFavorites();
    setIsFavorite(updatedFavorites.some((fav) => fav.id === cryptoId));
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#007BFF" />
      </View>
    );
  }

  if (!cryptoDetails) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Error loading crypto details.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{cryptoDetails.name}</Text>
      <Text style={styles.subtitle}>{cryptoDetails.symbol}</Text>

      <View style={styles.detailContainer}>
        <Text style={styles.detail}>
          <Text style={styles.detailBold}>Price:</Text> ${cryptoDetails.price_usd}
        </Text>
        <Text style={styles.detail}>
          <Text style={styles.detailBold}>Market Cap:</Text> ${cryptoDetails.market_cap_usd}
        </Text>
        <Text style={styles.detail}>
          <Text style={styles.detailBold}>24h Volume:</Text> ${cryptoDetails.volume24}
        </Text>
        <Text style={styles.detail}>
          <Text style={styles.detailBold}>1h Change:</Text> {cryptoDetails.percent_change_1h}%
        </Text>
        <Text style={styles.detail}>
          <Text style={styles.detailBold}>24h Change:</Text> {cryptoDetails.percent_change_24h}%
        </Text>
        <Text style={styles.detail}>
          <Text style={styles.detailBold}>7d Change:</Text> {cryptoDetails.percent_change_7d}%
        </Text>
        <Text style={styles.detail}>
          <Text style={styles.detailBold}>Price (BTC):</Text> {cryptoDetails.price_btc} BTC
        </Text>
        <Text style={styles.detail}>
          <Text style={styles.detailBold}>Rank:</Text> {cryptoDetails.rank}
        </Text>
        <Text style={styles.detail}>
          <Text style={styles.detailBold}>Circulating Supply:</Text> {cryptoDetails.csupply}
        </Text>
        <Text style={styles.detail}>
          <Text style={styles.detailBold}>Total Supply:</Text> {cryptoDetails.tsupply}
        </Text>
        <Text style={styles.detail}>
          <Text style={styles.detailBold}>Max Supply:</Text> {cryptoDetails.msupply ? cryptoDetails.msupply : "N/A"}
        </Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[
            styles.button,
            isFavorite ? styles.removeButton : styles.addButton, // Applying style depending of the favorite state
          ]}
          onPress={toggleFavorite}
        >
          <Text style={styles.buttonText}>
            {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#007BFF',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#6c757d',
    marginBottom: 20,
    textAlign: 'center',
  },
  detailContainer: {
    backgroundColor: '#ffffff',
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  detail: {
    fontSize: 16,
    color: '#495057',
    marginVertical: 5,
  },
  detailBold: {
    fontWeight: 'bold',
  },
  buttonContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  addButton: {
    backgroundColor: '#22c55e',
  },
  removeButton: {
    backgroundColor: '#ef4444',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
});

export default CryptoDetailsScreen;