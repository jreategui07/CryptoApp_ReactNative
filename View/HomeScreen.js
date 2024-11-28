import React from 'react';
import { View, Button, StyleSheet } from 'react-native';

// View Models
import CryptoViewModel from '../ViewModel/CryptoViewModel';

const HomeScreen = () => {
  const handleFetchCryptoList = async () => {
    await CryptoViewModel.fetchCryptoList();
  };

  const handleFetchCryptoDetails = async () => {
    const id = 1;
    await CryptoViewModel.fetchCryptoDetails(id);
  };

  return (
    <View style={styles.container}>
      <Button title="Fetch Crypto List" onPress={handleFetchCryptoList} />
      <Button title="Fetch Crypto Details" onPress={handleFetchCryptoDetails} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;
