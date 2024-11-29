import CoinloreService from '../Model/Data/CoinloreService';
import FirebaseService from '../Model/Data/FirebaseService'

const CryptoViewModel = {
  fetchCryptoList: async () => {
    const cryptoList = await CoinloreService.getCryptoList();
    console.log('Fetched Crypto List:', cryptoList);
    return cryptoList;
  },

  fetchCryptoDetails: async (id) => {
    const cryptoDetails = await CoinloreService.getCryptoDetails(id);
    console.log('Fetched Crypto Details:', cryptoDetails);
    return cryptoDetails;
  },

  addToFavorites: async (crypto) => {
    await FirebaseService.addToFavorites(crypto);
  },

  removeFromFavorites: async (cryptoId) => {
    await FirebaseService.removeFromFavorites(cryptoId);
  },

  fetchFavorites: async () => {
    const favorites = await FirebaseService.getFavorites();
    console.log('Fetched Favorites:', favorites);
    return favorites;
  },

  removeAllFavorites: async () => {
    try {
      await FirebaseService.removeAllFavorites();
      console.log('All favorites removed');
    } catch (error) {
      console.error('Error removing all favorites:', error);
    }
  },
};

export default CryptoViewModel;
