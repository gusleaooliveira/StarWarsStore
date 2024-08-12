import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
import { ThemeContext } from '@/constants/Theme';
import React, { useEffect } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer'; 
import { darkTheme } from '@/constants/DarkTheme';
import { lightTheme } from '@/constants/LightTheme';
import HomeScreen from '@/app/home';
import SearchScreen from '@/app/search';

const Drawer = createDrawerNavigator();

export default function DrawerComponent() {
    const [theme, setTheme] = React.useState('dark');
    const [currentTheme, setCurrentTheme] = React.useState(
        theme == 'dark' ? darkTheme : lightTheme
    );

    useEffect(() => {
        setCurrentTheme(theme == 'dark' ? darkTheme : lightTheme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark');
    };

    return (
        <Drawer.Navigator
            initialRouteName="home"
            screenOptions={{
                drawerStyle: {
                    backgroundColor: theme == 'dark' ? '#222B45' : '#fff',
                },
                drawerLabelStyle: {
                    color: theme == 'dark' ? '#FFF' : '#000',
                },
                headerStyle: {
                    backgroundColor: theme == 'dark' ? '#222B45' : '#fff',
                },
                headerTintColor: theme == 'dark' ? '#FFF' : '#000',
            }}
        >
            <Drawer.Screen name="home" component={HomeScreen} />
            <Drawer.Screen name="search" component={SearchScreen} />
        </Drawer.Navigator>
    );
}

 

                        {/* <Drawer.Navigator initialRouteName="home"
                            screenOptions={{
                                drawerStyle: {
                                    backgroundColor: theme == 'dark' ? '#222B45' : '#fff',
                                },
                                drawerLabelStyle: {
                                    color: theme == 'dark' ? '#FFF' : '#000',
                                },
                                headerStyle: {
                                    backgroundColor: theme == 'dark' ? '#222B45' : '#fff',
                                },
                                headerTintColor: theme == 'dark' ? '#FFF' : '#000',
                                
                            }}
                        >
                            <Drawer.Screen name="home" component={HomeScreen} />
                            <Drawer.Screen name="search" component={SearchScreen} />
                            <Drawer.Screen name="product-details" component={ProductDetail} />
                        </Drawer.Navigator> */}