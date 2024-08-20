import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native'; 
import HomeScreen from '@/app/home';
import CategoriesScreen from '@/app/categories/indext';
import CartScreen from '@/app/cart';
import ProfileScreen from '@/app/profile';
import OrderHistoryScreen from '@/app/products/historic';
import WishlistScreen from '@/app/products/wishlist';
import NotificationsScreen from '@/app/notifications';
import PromotionsScreen from '@/app/products/promotions';
import SettingsScreen from '@/app/settings';
import HelpAndSupportScreen from '@/app/faq';
import RecommendationsScreen from '@/app/products/recomendations';
import FavoritesScreen from '@/app/products/favorites';
import CheckoutScreen from '@/app/products/checkout';
import ProductDetail from '@/app/products/details';
import SearchScreen from '@/app/search';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

function MainDrawer() {
  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Categories" component={CategoriesScreen} />
      <Drawer.Screen name="Cart" component={CartScreen} />
      <Drawer.Screen name="Profile" component={ProfileScreen} />
      <Drawer.Screen name="OrderHistory" component={OrderHistoryScreen} />
      <Drawer.Screen name="Wishlist" component={WishlistScreen} />
      <Drawer.Screen name="Notifications" component={NotificationsScreen} />
      <Drawer.Screen name="Promotions" component={PromotionsScreen} />
      <Drawer.Screen name="Settings" component={SettingsScreen} />
      <Drawer.Screen name="HelpAndSupport" component={HelpAndSupportScreen} />
      <Drawer.Screen name="Recommendations" component={RecommendationsScreen} />
      <Drawer.Screen name="Favorites" component={FavoritesScreen} />
    </Drawer.Navigator>
  );
}

function LoggedInStack() {
  return (
    <Stack.Navigator initialRouteName="Drawer">
      <Stack.Screen name="Drawer" component={MainDrawer} options={{ headerShown: false }} />
      <Stack.Screen name="Checkout" component={CheckoutScreen} />
      <Stack.Screen name="ProductDetail" component={ProductDetail} />
      <Stack.Screen name="ProductsByCategory" component={CategoriesScreen} />
      <Stack.Screen name="Search" component={SearchScreen} />
    </Stack.Navigator>
  );
}
