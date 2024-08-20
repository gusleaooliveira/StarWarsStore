import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Layout, Text, Card } from '@ui-kitten/components';
import axios from '@/hooks/axiosConfig';

type Order = {
    id: string;
    date: string;
    total: number;
    status: string;
    items: {
        title: string;
        quantity: number;
        price: number;
    }[];
};

export default function OrderHistoryScreen() {
    const [orders, setOrders] = useState<Order[]>([]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get('/orders');
                setOrders(response.data);
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };
        fetchOrders();
    }, []);

    return (
        <Layout style={styles.container}>
            <Text category='h1' style={styles.title}>Histórico de Pedidos</Text>
            <ScrollView>
                {orders.map((order) => (
                    <Card key={order.id} style={styles.card}>
                        <Text category='h6'>Pedido #{order.id}</Text>
                        <Text category='s2'>Data: {order.date}</Text>
                        <Text category='s2'>Total: R$ {order.total.toFixed(2)}</Text>
                        <Text category='s2'>Status: {order.status}</Text>
                        <Text category='h6'>Itens:</Text>
                        {order.items.map((item, index) => (
                            <Text key={index} category='p2'>
                                {item.title} x{item.quantity} - R$ {item.price.toFixed(2)}
                            </Text>
                        ))}
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
        padding: 20,
    },
});

 
