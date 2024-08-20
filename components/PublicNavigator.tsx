import CartScreen from "@/app/cart";
import CategoriesScreen from "@/app/categories/indext";
import CreateUserScreen from "@/app/create-user";
import HelpAndSupportScreen from "@/app/faq";
import HomeScreen from "@/app/home";
import LoginScreen from "@/app/login";
import CheckoutScreen from "@/app/products/checkout";
import ProductDetail from "@/app/products/details";
import OrderHistoryScreen from "@/app/products/historic";
import PromotionsScreen from "@/app/products/promotions";
import ProfileScreen from "@/app/profile";
import SearchScreen from "@/app/search";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

export default function PublicNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
       <Stack.Screen name="Login" component={LoginScreen} />
       <Stack.Screen name="CreateUser" component={CreateUserScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="ProductDetail" component={ProductDetail} />
      <Stack.Screen name="HelpAndSupport" component={HelpAndSupportScreen} />
      <Stack.Screen name="Promotions" component={PromotionsScreen} />
      <Stack.Screen name="Search" component={SearchScreen} />
      <Stack.Screen name="ProductsByCategory" component={CategoriesScreen} />
      <Stack.Screen name="Categories" component={CategoriesScreen} />
      <Stack.Screen name="Cart" component={CartScreen} />
      <Stack.Screen name="Checkout" component={CheckoutScreen} />
      <Stack.Screen name="OrderHistory" component={OrderHistoryScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} /> 
    </Stack.Navigator>
  );
}