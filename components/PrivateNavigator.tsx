import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SettingsScreen from '@/app/settings';
import RecommendationsScreen from '@/app/products/recomendations';
import WishlistScreen from '@/app/products/wishlist';
import NotificationsScreen from '@/app/notifications';
import FavoritesScreen from '@/app/products/favorites';
import ProfileScreen from '@/app/profile';


const Stack = createStackNavigator();

export default function PrivateNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Settings" component={SettingsScreen} />
      <Stack.Screen name="Recommendations" component={RecommendationsScreen} />
      <Stack.Screen name="Wishlist" component={WishlistScreen} />
      <Stack.Screen name="Notifications" component={NotificationsScreen} />
      <Stack.Screen name="Favorites" component={FavoritesScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
    </Stack.Navigator>
  );
}
