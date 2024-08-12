import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { Layout, Text, Button } from '@ui-kitten/components';

const ProductDetail = ({ route, navigation }) => {
    const { id } = route.params;
    const [product, setProduct] = useState(null);

    useEffect(() => {
        // Simula a recuperação de dados do produto
        const fetchProduct = async () => {
            // Substitua pela lógica real de busca do produto, por exemplo, uma chamada à API
            const fetchedProduct = {
                id,
                title: 'Camiseta',
                price: 100.90,
                seller: 'Vendedor',
                description: 'Uma camiseta incrível e confortável.',
                thumbnailHd: 'https://i.imgur.com/34k3maY.jpeg',
            };
            setProduct(fetchedProduct);
        };

        fetchProduct();
    }, [id]);

    if (!product) {
        return <Layout style={styles.container}><Text>Loading...</Text></Layout>;
    }

    return (
        <ScrollView style={{ flex: 1 }}>
            <Layout style={styles.container}>
                <ScrollView contentContainerStyle={styles.scrollView}>
                    <Image source={{ uri: product.thumbnailHd }} style={styles.image} />
                    <Text category='h1' style={styles.title}>{product.title}</Text>
                    <Text category='h6' style={styles.price}>R$ {product.price.toFixed(2)}</Text>
                    <Text style={styles.seller}>Vendedor: {product.seller}</Text>
                    <Text style={styles.description}>{product.description}</Text>
                    <Button style={styles.button} onPress={() => navigation.goBack()}>
                        Voltar
                    </Button>
                </ScrollView>
            </Layout>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    scrollView: {
        alignItems: 'center',
    },
    image: {
        width: Dimensions.get('window').width * 0.9,
        height: Dimensions.get('window').width * 0.9,
        marginBottom: 20,
        resizeMode: 'contain',
    },
    title: {
        marginBottom: 10,
    },
    price: {
        marginBottom: 10,
    },
    seller: {
        marginBottom: 10,
    },
    description: {
        marginBottom: 20,
        textAlign: 'center',
    },
    button: {
        marginTop: 20,
    },
});

export default ProductDetail;
