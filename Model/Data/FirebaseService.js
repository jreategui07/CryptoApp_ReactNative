import { collection, addDoc, deleteDoc, doc, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../Config/FirebaseConfig';

const FirebaseService = {
  addToFavorites: async (crypto) => {
    try {
      const collectionRef = collection(db, 'favorites');
      const searchQuery = query(collectionRef, where('id', '==', crypto.id));
      const getFavouriteList = await getDocs(searchQuery);

      if (!getFavouriteList.empty) {
        console.log('Crypto already in favorites:', crypto);
        return false;
      }

      await addDoc(collectionRef, crypto);
      console.log('Crypto added to favorites:', crypto);
      return true;
    } catch (error) {
      console.error('Error adding to favorites:', error);
      throw error;
    }
  },

  removeFromFavorites: async (cryptoId) => {
    try {
      const collectionRef = collection(db, 'favorites');
      const getFavouriteList = await getDocs(collectionRef);
      getFavouriteList.forEach(async (docSnapshot) => {
        if (docSnapshot.data().id === cryptoId) {
          await deleteDoc(doc(db, 'favorites', docSnapshot.id));
          console.log('Crypto removed from favorites:', cryptoId);
        }
      });
    } catch (error) {
      console.error('Error removing from favorites:', error);
    }
  },

  getFavorites: async () => {
    try {
      const getFavouriteList = await getDocs(collection(db, 'favorites'));
      const favorites = getFavouriteList.docs.map((doc) => doc.data());
      return favorites;
    } catch (error) {
      console.error('Error fetching favorites:', error);
      return [];
    }
  },
};

export default FirebaseService;
