import LocationCEPComponent from "@/components/Cep";
import api from "@/hooks/axiosConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Button, Card, Input, Layout, Text } from "@ui-kitten/components";
import axios from "axios";
import { useEffect, useState } from "react";
import { Dimensions, Image, ScrollView, StyleSheet, View } from "react-native";
import { Product } from "@/types/Product";

export default function HomeScreen({ navigation }: any) {


    const [data, setData] = useState<Product[] | undefined>(undefined);

    useEffect(() => {
        const getData = async () => {
            await api.get('/products/highlighted')
                .then((response) => {
                    setData(response.data);
                    console.log(response.data); 
                })
                .catch((error) => {
                    console.error(error);
                })
        }
        getData();
    }, [])




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
                {!!data && data.map((item) => (
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