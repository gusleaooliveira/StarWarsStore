import LocationCEPComponent from "@/components/Cep";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Button, Card, Input, Layout, Text } from "@ui-kitten/components";
import { useEffect, useState } from "react";
import { Dimensions, Image, ScrollView, StyleSheet, View } from "react-native";

export default function HomeScreen({ navigation }) {

    const items = [
        { id: 1, title: 'Camiseta', price: 100.90, seller: 'Vendedor', thumbnailHd: 'https://i.imgur.com/34k3maY.jpeg' },
        { id: 2, title: 'Camiseta', price: 100.90, seller: 'Vendedor', thumbnailHd: 'https://i.imgur.com/34k3maY.jpeg' },
        { id: 3, title: 'Camiseta', price: 100.90, seller: 'Vendedor', thumbnailHd: 'https://i.imgur.com/34k3maY.jpeg' },
        { id: 4, title: 'Camiseta', price: 100.90, seller: 'Vendedor', thumbnailHd: 'https://i.imgur.com/34k3maY.jpeg' },
        { id: 5, title: 'Camiseta', price: 100.90, seller: 'Vendedor', thumbnailHd: 'https://i.imgur.com/34k3maY.jpeg' },
        { id: 6, title: 'Camiseta', price: 100.90, seller: 'Vendedor', thumbnailHd: 'https://i.imgur.com/34k3maY.jpeg' },
        { id: 7, title: 'Camiseta', price: 100.90, seller: 'Vendedor', thumbnailHd: 'https://i.imgur.com/34k3maY.jpeg' },
        { id: 8, title: 'Camiseta', price: 100.90, seller: 'Vendedor', thumbnailHd: 'https://i.imgur.com/34k3maY.jpeg' },
        { id: 9, title: 'Camiseta', price: 100.90, seller: 'Vendedor', thumbnailHd: 'https://i.imgur.com/34k3maY.jpeg' },
        { id: 10, title: 'Camiseta', price: 100.90, seller: 'Vendedor', thumbnailHd: 'https://i.imgur.com/34k3maY.jpeg' },

    ]

    const [cep, setCep] = useState('');


    const windowWidth = Dimensions.get('window').width;
    const cardWidth = (windowWidth - 40) / 2;

  


    return (
        <Layout>

            {/* <View>
                <Layout style={{ flexDirection: 'row', justifyContent: 'center' }}>
                    <Input placeholder='Search' />
                    <Button status='primary'>Search</Button>
                    <Button status='primary'>Carrinho</Button>
                </Layout>
            </View> */}


            <LocationCEPComponent />

            <ScrollView contentContainerStyle={styles.cardContainer}> 
                {items.map((item) => (
                    <Card
                        key={item.id}
                        style={[styles.card, { width: cardWidth, height: (cardWidth * 210) / 136 }]}
                        onPress={() => navigation.navigate('product-details', { id: item.id })}
                    
                    >
                        <Image
                            source={{ uri: item.thumbnailHd }}
                            style={[styles.image, { width: cardWidth * 0.73, height: cardWidth * 0.73 }]}
                        />
                        <Text category="h6" style={styles.title}>{item.title}</Text>
                        <Text category="s1" status="primary" style={styles.price}>R$ {item.price.toFixed(2)}</Text>
                        <Text appearance="hint">{item.seller}</Text>
                    </Card>
                ))} 
            </ScrollView>


            <Layout style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                <Button onPress={() => navigation.navigate('search')}>Search</Button>
                <Button onPress={() => navigation.navigate('home')} >Home</Button>
            </Layout>
        </Layout>
    )
}


const styles = StyleSheet.create({
    cardContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    container: {
        flex: 1,
        padding: 10,
    },
    searchContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 20,
    },
    input: {
        flex: 1,
        marginRight: 10,
    },
    button: {
        marginRight: 10,
    },
    cardContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
    },
    card: {
        marginBottom: 20,
        alignItems: 'center',
        padding: 10,
    },
    image: {
        marginBottom: 10,
    },
    title: {
        marginBottom: 5,
        textAlign: 'center',
    },
    price: {
        marginBottom: 5,
        textAlign: 'center',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginTop: 20,
    },
   
});