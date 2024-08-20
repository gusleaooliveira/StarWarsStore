import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet, ScrollView } from 'react-native';
import { Card, Layout, Text } from '@ui-kitten/components';
import axios from '@/hooks/axiosConfig';
import { Product } from '@/types/Product';

export default function RecommendationsScreen({ navigation }: any) {
    const [recommendedProducts, setRecommendedProducts] = useState<Product[]>([]);

    useEffect(() => {
        const fetchRecommendations = async () => {
            try {
                const response = await axios.get('/products/recommendations');
                setRecommendedProducts(response.data);
            } catch (error) {
                console.error('Error fetching recommendations:', error);
            }
        };
        fetchRecommendations();
    }, []);

    return (
        <Layout style={styles.container}>
            <Text category='h1' style={styles.title}>Recomendações para você</Text>
            <ScrollView>
                {recommendedProducts.map((product) => (
                    <Card
                        key={product.id}
                        style={styles.card}
                        onPress={() => navigation.navigate('ProductDetail', { id: product.id })}>
                        <Image source={{ uri: product.thumbnailHd }} style={styles.image} />
                        <Text category='h6'>{product.title}</Text>
                        <Text category='s1' status='primary'>R$ {product.price.toFixed(2)}</Text>
                    </Card>
                ))}
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
});

 
