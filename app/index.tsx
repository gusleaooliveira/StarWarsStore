import { ApplicationProvider, Button, Icon, IconElement, IconRegistry, Input, Layout, Text } from '@ui-kitten/components'
import * as eva from '@eva-design/eva'
import { ThemeContext } from '@/constants/Theme'
import React, { useEffect } from 'react'
import { darkTheme } from '@/constants/DarkTheme'
import { lightTheme } from '@/constants/LightTheme'
import { StyleSheet } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { EvaIconsPack } from '@ui-kitten/eva-icons'
import { createStackNavigator } from '@react-navigation/stack'
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from './home'
import SearchScreen from './search'


const Stack = createStackNavigator()

const Drawer = createDrawerNavigator();

export default function App() {
    const [theme, setTheme] = React.useState('dark')
    const [currentTheme, setCurrentTheme] = React.useState(
        theme == 'dark' ? darkTheme : lightTheme
    )
    const [searchQuery, setSearchQuery] = React.useState('')

    const toggleTheme = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark')
    }

    useEffect(() => {
        setCurrentTheme(theme == 'dark' ? darkTheme : lightTheme)
        console.log(currentTheme)

    }, [theme])

    const handleSearch = () => {
        console.log(`Searching for: ${searchQuery}`)
        // Aqui você pode adicionar a lógica de busca, como fazer uma requisição a uma API
    }

    return (
        <NavigationContainer independent={true}>
            <IconRegistry icons={EvaIconsPack} />
            <ThemeContext.Provider value={{ theme, toggleTheme }}>
                <ApplicationProvider {...eva} theme={currentTheme}  >
                    <Button status='primary' onPress={toggleTheme}>Trocar tema</Button>

                    <Drawer.Navigator initialRouteName="home"
                        screenOptions={{
                            drawerStyle: {
                               backgroundColor:  theme == 'dark' ? '#222B45' : '#fff', 
                            },
                            drawerLabelStyle: {
                                color: theme == 'dark' ? '#FFF' : '#000',
                            },
                            headerStyle: {
                                backgroundColor: theme == 'dark' ? '#222B45' : '#fff',
                                borderBottomWidth: 0,
                            },
                            headerTintColor: theme == 'dark' ? '#FFF' : '#000',
                        }}
                    >
                        <Drawer.Screen name="home" component={HomeScreen} />
                        <Drawer.Screen name="search" component={SearchScreen} />
                    </Drawer.Navigator>

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