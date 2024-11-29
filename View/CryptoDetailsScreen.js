import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Button } from 'react-native';
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

      <Text style={styles.detail}>Price: ${cryptoDetails.price_usd}</Text>
      <Text style={styles.detail}>Market Cap: ${cryptoDetails.market_cap_usd}</Text>
      <Text style={styles.detail}>24h Volume: ${cryptoDetails.volume24}</Text>
      <Text style={styles.detail}>1h Change: {cryptoDetails.percent_change_1h}%</Text>
      <Text style={styles.detail}>24h Change: {cryptoDetails.percent_change_24h}%</Text>
      <Text style={styles.detail}>7d Change: {cryptoDetails.percent_change_7d}%</Text>
      <Text style={styles.detail}>Price (BTC): {cryptoDetails.price_btc} BTC</Text>
      <Text style={styles.detail}>Rank: {cryptoDetails.rank}</Text>
      <Text style={styles.detail}>Circulating Supply: {cryptoDetails.csupply}</Text>
      <Text style={styles.detail}>Total Supply: {cryptoDetails.tsupply}</Text>
      <Text style={styles.detail}>Max Supply: {cryptoDetails.msupply ? cryptoDetails.msupply : "N/A"}</Text>

      <Button
        title={isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
        onPress={toggleFavorite}
      />
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
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007BFF',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#6c757d',
  },
  detail: {
    fontSize: 16,
    marginVertical: 5,
  },
});

export default CryptoDetailsScreen;