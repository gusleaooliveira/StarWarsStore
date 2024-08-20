import { ApplicationProvider, Button, Icon, IconElement, IconRegistry, Input, Layout, Text } from '@ui-kitten/components'
import * as eva from '@eva-design/eva'
import { ThemeContext } from '@/constants/Theme'
import React, { useEffect } from 'react'
import { darkTheme } from '@/constants/DarkTheme'
import { lightTheme } from '@/constants/LightTheme'
import { SafeAreaView, StyleSheet } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { EvaIconsPack } from '@ui-kitten/eva-icons'
// import { createStackNavigator } from '@react-navigation/stack'

import { createDrawerNavigator } from '@react-navigation/drawer';

// import HomeScreen from './home'
// import SearchScreen from './search'
// import ProductDetail from './products/details'
// import DrawerComponent from '@/components/Drawer'
// import AsyncStorage from '@react-native-async-storage/async-storage'
// import LoginScreen from './login'
// import CreateUserScreen from './create-user'
// import CartScreen from './cart'
// import CategoriesScreen from './categories/indext'
// import ProductsByCategoryScreen from './products/categories'
// import ProfileScreen from './profile'
// import OrderHistoryScreen from './products/historic'
// import FavoritesScreen from './products/favorites'
// import PromotionsScreen from './products/promotions'
// import NotificationsScreen from './notifications'
// import HelpAndSupportScreen from './faq'
// import WishlistScreen from './products/wishlist'
// import RecommendationsScreen from './products/recomendations'
// import SettingsScreen from './settings'
// import CheckoutScreen from './products/checkout'

import PublicNavigator from '@/components/PublicNavigator'
import AuthNavigator from '@/components/AuthNavigator'
import PrivateNavigator from '@/components/PrivateNavigator'
import CheckoutNavigator from '@/components/CheckoutNavigator' 
import { useAuth } from '@/hooks/useAuth'


// const Stack = createStackNavigator()

const Drawer = createDrawerNavigator();

export default function App() {
    const { isLoggedIn } = useAuth();
    const [theme, setTheme] = React.useState('dark')
    const [currentTheme, setCurrentTheme] = React.useState(
        theme == 'dark' ? darkTheme : lightTheme
    )

    // useEffect(() => {
    //     const loadTheme = async () => {
    //         const theme = await AsyncStorage.getItem('theme')
    //         if (theme) {
    //             setTheme(theme)
    //             setCurrentTheme(theme == 'dark' ? darkTheme : lightTheme)
    //         }
    //     }
    //     loadTheme()
    // }, [theme])

    // useEffect(() => {
    //     const saveTheme = async () => {
    //         await AsyncStorage.setItem('theme', theme)
    //     }
    //     saveTheme()
    // }, [theme])

    const toggleTheme = () => {
        setTheme(prevTheme => (prevTheme === 'dark' ? 'light' : 'dark'));
        console.log('Theme changed to', theme);

    };


    return ( 
        <NavigationContainer independent={true}>
            <IconRegistry icons={EvaIconsPack} />
            <ThemeContext.Provider value={{ theme, toggleTheme }}>
                <ApplicationProvider {...eva} theme={currentTheme}  >
                    <SafeAreaView style={{ flex: 1 }}>
                        {/* <Button status='primary' onPress={toggleTheme}>Trocar tema</Button> */}

                        <Drawer.Navigator screenOptions={{ headerShown: false }}>
                            <Drawer.Screen name="Public" component={PublicNavigator} />
                            {/*!isLoggedIn &&*/ <Drawer.Screen name="Auth" component={AuthNavigator} />}
                            {isLoggedIn && <Drawer.Screen name="Private" component={PrivateNavigator} />}
                            {isLoggedIn && <Drawer.Screen name="Checkout" component={CheckoutNavigator} />}
                        </Drawer.Navigator>
                        {/* <Stack.Navigator screenOptions={{ headerShown: false }}>
                            <Stack.Screen name="main" component={DrawerComponent} />
                            <Stack.Screen name="product-details" component={ProductDetail} />
                            <Stack.Screen name="login" component={LoginScreen} />
                            <Stack.Screen name="create-user" component={CreateUserScreen} />
                            <Stack.Screen name="Cart" component={CartScreen} />
                            <Stack.Screen name="Categories" component={CategoriesScreen} />
                            <Stack.Screen name="ProductsByCategory" component={ProductsByCategoryScreen} />
                            <Stack.Screen name="Profile" component={ProfileScreen} />
                            <Stack.Screen name="OrderHistory" component={OrderHistoryScreen} />
                            <Stack.Screen name="Favorites" component={FavoritesScreen} />
                            <Stack.Screen name="Search" component={SearchScreen} />
                            <Stack.Screen name="Promotions" component={PromotionsScreen} />
                            <Stack.Screen name="Notifications" component={NotificationsScreen} />
                            <Stack.Screen name="HelpAndSupport" component={HelpAndSupportScreen} />
                            <Stack.Screen name="Wishlist" component={WishlistScreen} />
                            <Stack.Screen name="Recommendations" component={RecommendationsScreen} />
                            <Stack.Screen name="Settings" component={SettingsScreen} />
                            <Stack.Screen name="ProductDetail" component={ProductDetail} />
                            <Stack.Screen name="Checkout" component={CheckoutScreen} />

                        </Stack.Navigator> */}
                    </SafeAreaView>
                </ApplicationProvider>
            </ThemeContext.Provider>
        </NavigationContainer> 
    )
}


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#FFF',
    },
    iconButton: {
        marginHorizontal: 5,
    },
    searchContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F0F0F0',
        borderRadius: 25,
        paddingHorizontal: 10,
    },
    searchInput: {
        flex: 1,
        height: 40,
        paddingLeft: 10,
        color: '#333',
    },
    searchButton: {
        height: 40,
        borderRadius: 20,
        marginLeft: 10,
    },
});