import axios from 'axios';

const BASE_URL = 'https://api.coinlore.net/api';

const CoinloreService = {
  getCryptoList: async (start = 0, limit = 50) => {
    try {
      const response = await axios.get(`${BASE_URL}/tickers`, {
        params: { start, limit },
      });
      return response.data.data;
    } catch (error) {
      console.error('Error fetching crypto list:', error);
      return [];
    }
  },

  getCryptoDetails: async (id) => {
    try {
      const response = await axios.get(`${BASE_URL}/ticker`, {
        params: { id },
      });
      return response.data[0];
    } catch (error) {
      console.error('Error fetching crypto details:', error);
      return null;
    }
  },
};

export default CoinloreService;
