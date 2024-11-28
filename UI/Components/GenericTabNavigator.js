import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';

const Tab = createBottomTabNavigator();

const GenericTabNavigator = ({ screens, activeColor = 'tomato', inactiveColor = 'gray', tabBarStyle = {} }) => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarActiveTintColor: activeColor,
      tabBarInactiveTintColor: inactiveColor,
      tabBarStyle: { display: 'flex', ...tabBarStyle },
      tabBarIcon: ({ focused }) => {
        const screen = screens.find((s) => s.name === route.name);
        const iconName = focused ? screen.icon.active : screen.icon.inactive;
        return <Icon name={iconName} size={20} color={focused ? activeColor : inactiveColor} />;
      },
    })}
  >
    {screens.map((screen) => (
      <Tab.Screen key={screen.name} name={screen.name} component={screen.component} />
    ))}
  </Tab.Navigator>
);

export default GenericTabNavigator;
