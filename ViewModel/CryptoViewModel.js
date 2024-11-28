import CoinloreService from '../Model/Data/CoinloreService';

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
};

export default CryptoViewModel;
