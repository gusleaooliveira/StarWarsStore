import React, { useEffect, useState } from 'react';
import { ScrollView, Image, StyleSheet } from 'react-native';
import { Layout, Text, Card } from '@ui-kitten/components';
import axios from '@/hooks/axiosConfig';
import { Product } from '@/types/Product';

export default function PromotionsScreen({ navigation }: any) {
    const [promotions, setPromotions] = useState<Product[]>([]);

    useEffect(() => {
        const fetchPromotions = async () => {
            try {
                const response = await axios.get('/products/promotions');
                setPromotions(response.data);
            } catch (error) {
                console.error('Error fetching promotions:', error);
            }
        };
        fetchPromotions();
    }, []);

    return (
        <Layout style={styles.container}>
            <Text category='h1' style={styles.title}>Ofertas e Promoções</Text>
            <ScrollView>
                {promotions.map((product) => (
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

 
