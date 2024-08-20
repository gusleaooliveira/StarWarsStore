import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Layout, Text, Card } from '@ui-kitten/components';
import axios from '@/hooks/axiosConfig';

type Notification = {
    id: string;
    title: string;
    message: string;
    date: string;
};

export default function NotificationsScreen() {
    const [notifications, setNotifications] = useState<Notification[]>([]);

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const response = await axios.get('/notifications');
                setNotifications(response.data);
            } catch (error) {
                console.error('Error fetching notifications:', error);
            }
        };
        fetchNotifications();
    }, []);

    return (
        <Layout style={styles.container}>
            <Text category='h1' style={styles.title}>Notificações</Text>
            <ScrollView>
                {notifications.map((notification) => (
                    <Card key={notification.id} style={styles.card}>
                        <Text category='h6'>{notification.title}</Text>
                        <Text category='p1'>{notification.message}</Text>
                        <Text category='c1' appearance='hint'>{notification.date}</Text>
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
    },
});

 
