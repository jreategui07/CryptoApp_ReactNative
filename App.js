import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Components
import GenericTabNavigator from './UI/Components/GenericTabNavigator';

// Views
import HomeScreen from './View/HomeScreen';
import FavouriteListScreen from './View/FavouriteListScreen';
import CryptoDetailsScreen from './View/CryptoDetailsScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  const tabScreens = [
    {
      name: 'Home',
      component: HomeScreen,
      icon: { active: 'home', inactive: 'home' },
    },
    {
      name: 'Favourite List',
      component: FavouriteListScreen,
      icon: { active: 'heart', inactive: 'heart-o' },
    },
  ];

  const headerOptions = {
    headerStyle: { backgroundColor: '#3b5998', },
    headerTintColor: 'white',
    headerTitleAlign: 'center',
    headerTitleStyle: { fontWeight: 'bold', fontSize: 20 },
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Jonathan Crypto"
          options={{
            ...headerOptions
          }}
        >
          {() => (
            <GenericTabNavigator
              screens={tabScreens}
              activeColor="tomato"
              inactiveColor="gray"
              tabBarStyle={{ backgroundColor: '#282c34', borderRadius: 15 }}
            />
          )}
        </Stack.Screen>
        <Stack.Screen
          name="FavouriteList"
          component={FavouriteListScreen}
          options={{ 
            title: 'Favorites', 
            ...headerOptions
            }}
        />
        <Stack.Screen
          name="CryptoDetails"
          component={CryptoDetailsScreen}
          options={{
            title: 'Crypto Details', 
            ...headerOptions
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
