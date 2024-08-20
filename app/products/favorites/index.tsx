import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet, ScrollView } from 'react-native';
import { Button, Layout, Text, Card } from '@ui-kitten/components';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Product } from '@/types/Product';

export default function FavoritesScreen({ navigation }: any) {
    const [favorites, setFavorites] = useState<Product[]>([]);

    useEffect(() => {
        const fetchFavorites = async () => {
            const favs = await AsyncStorage.getItem('favorites');
            if (favs) {
                setFavorites(JSON.parse(favs));
            }
        };
        fetchFavorites();
    }, []);

    const removeFavorite = async (id: string) => {
        const updatedFavorites = favorites.filter(item => item.id !== id);
        setFavorites(updatedFavorites);
        await AsyncStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    };

    return (
        <Layout style={styles.container}>
            <Text category='h1' style={styles.title}>Favoritos</Text>
            <ScrollView>
                {favorites.length === 0 ? (
                    <Text category='s1' style={styles.emptyMessage}>Você não tem favoritos ainda.</Text>
                ) : (
                    favorites.map((product) => (
                        <Card key={product.id} style={styles.card}>
                            <Image source={{ uri: product.thumbnailHd }} style={styles.image} />
                            <Text category='h6'>{product.title}</Text>
                            <Text category='s1'>R$ {product.price.toFixed(2)}</Text>
                            <Button style={styles.button} onPress={() => navigation.navigate('ProductDetail', { id: product.id })}>
                                Ver Detalhes
                            </Button>
                            <Button
                                style={styles.button}
                                appearance='outline'
                                status='danger'
                                onPress={() => removeFavorite(product.id)}>
                                Remover
                            </Button>
                        </Card>
                    ))
                )}
            </ScrollView>
        </Layout>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    title: {
        marginBottom: 20,
        textAlign: 'center',
    },
    emptyMessage: {
        textAlign: 'center',
        marginTop: 50,
    },
    card: {
        marginBottom: 15,
        padding: 10,
        alignItems: 'center',
    },
    image: {
        width: 100,
        height: 100,
        marginBottom: 10,
    },
    button: {
        marginTop: 10,
        width: '100%',
    },
});

 
