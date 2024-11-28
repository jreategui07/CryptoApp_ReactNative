import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Components
import GenericTabNavigator from './UI/Components/GenericTabNavigator';

// Views
import HomeScreen from './View/HomeScreen';
import FavouriteListScreen from './View/FavouriteListScreen';

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

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Jonathan Crypto"
          options={{
            headerStyle: { backgroundColor: '#3b5998', },
            headerTintColor: 'white',
            headerTitleAlign: 'center',
            headerTitleStyle: { fontWeight: 'bold', fontSize: 20 },
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}
