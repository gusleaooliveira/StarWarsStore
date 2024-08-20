import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import CheckoutScreen from '@/app/products/checkout';
import OrderHistoryScreen from '@/app/products/historic';
 
const Stack = createStackNavigator();

export default function CheckoutNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Checkout" component={CheckoutScreen} />
      <Stack.Screen name="OrderHistory" component={OrderHistoryScreen} />
    </Stack.Navigator>
  );
}
