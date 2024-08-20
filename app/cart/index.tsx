'use strict';
import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet, ScrollView } from 'react-native';
import { Button, Layout, Text } from '@ui-kitten/components';
import apiService from '@/service/apiService'; // Certifique-se de que o caminho está correto
import { Product } from '@/types/Product';

export default function CartScreen({ navigation }: any) {
    const [cartItems, setCartItems] = useState<Product[]>([]);

    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                const response = await apiService.getCartItems();
                setCartItems(response); // Supondo que a API retorne os itens do carrinho
            } catch (error) {
                console.error('Erro ao buscar itens do carrinho:', error);
            }
        };
        fetchCartItems();
    }, []);

    const handleCheckout = () => {
        alert('Proceed to checkout');
    };

    return (
        <Layout style={styles.container}>
            <Text category='h1' style={styles.title}>Carrinho</Text>
            <ScrollView>
                {cartItems.length === 0 ? (
                    <Text category='s1' style={styles.emptyCart}>O carrinho está vazio</Text>
                ) : (
                    cartItems.map((item, index) => (
                        <View key={index} style={styles.cartItem}>
                            <Image source={{ uri: item.thumbnailHd }} style={styles.image} />
                            <View style={styles.details}>
                                <Text category='s1'>{item.title}</Text>
                                <Text category='s2'>R$ {item.price.toFixed(2)}</Text>
                            </View>
                        </View>
                    ))
                )}
            </ScrollView>
            <Button style={styles.button} onPress={handleCheckout}>
                Finalizar Compra
            </Button>
            <Button style={styles.button} appearance='ghost' status='primary' onPress={() => navigation.goBack()}>
                Continuar Comprando
            </Button>
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
    emptyCart: {
        textAlign: 'center',
        marginTop: 50,
    },
    cartItem: {
        flexDirection: 'row',
        marginBottom: 20,
        alignItems: 'center',
    },
    image: {
        width: 60,
        height: 60,
        marginRight: 20,
    },
    details: {
        flex: 1,
    },
    button: {
        marginTop: 20,
    },
}); 
