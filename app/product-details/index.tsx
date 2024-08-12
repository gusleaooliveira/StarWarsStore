import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { Layout, Text, Button } from '@ui-kitten/components';
import axios from '@/hooks/axiosConfig';
import LocationCEPComponent from '@/components/Cep';
import { Product } from '@/types/Product';
import Carousel from 'react-native-reanimated-carousel';

const { width } = Dimensions.get('window');

const ProductDetail = ({ route, navigation }: any) => {
    const { id } = route.params;
    const [product, setProduct] = useState<Product | null>(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`/products/${id}`);
                setProduct(response.data);
                console.log(response.data);
                
            } catch (error) {
                console.error('Error fetching product:', error);
            }
        };

        fetchProduct();
    }, [id]);

    if (!product) {
        return <Layout style={styles.container}><Text>Loading...</Text></Layout>;
    }

    return (
        <ScrollView style={{ flex: 1 }}>
            <LocationCEPComponent />
            <Layout style={styles.container}>
                <Carousel
                    width={width}
                    height={width * 0.9}
                    data={product.images}
                    renderItem={({ item }: { item: string }) => (
                        <View style={styles.carouselContainer}>
                            <Image source={{ uri: item }} style={styles.carouselImage} />
                        </View>
                    )}
                />
                <Text category='h1' style={styles.title}>{product.title}</Text>
                <Text category='h6' style={styles.price}>R$ {product.price.toFixed(2)}</Text>
                <Text style={styles.seller}>Vendedor: {product.seller}</Text>
                <Text style={styles.description}>{product.description}</Text>
                <Text style={styles.category}>Categoria: {product.category}</Text>
                <Text style={styles.stock}>Estoque: {product.stock}</Text>
                <Text style={styles.rating}>Avaliação: {product.rating}</Text>
                <Text style={styles.reviewsCount}>Número de Avaliações: {product.reviewsCount}</Text>
                <Text style={styles.brand}>Marca: {product.brand}</Text>
                <Text style={styles.sku}>SKU: {product.sku}</Text>
                <Text style={styles.weight}>Peso: {product.weight} kg</Text>
                <Text style={styles.dimensions}>Dimensões: {product.dimensions}</Text>
                <Button style={styles.button} onPress={() => navigation.goBack()}>
                    Voltar
                </Button>
            </Layout>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    carouselContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
    },
    carouselImage: {
        width: '100%',
        height: '100%',
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
    category: {
        marginBottom: 10,
    },
    stock: {
        marginBottom: 10,
    },
    rating: {
        marginBottom: 10,
    },
    reviewsCount: {
        marginBottom: 10,
    },
    brand: {
        marginBottom: 10,
    },
    sku: {
        marginBottom: 10,
    },
    weight: {
        marginBottom: 10,
    },
    dimensions: {
        marginBottom: 10,
    },
    button: {
        marginTop: 20,
    },
});

export default ProductDetail;
