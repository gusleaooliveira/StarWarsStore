import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Button, Card, Layout, Text } from '@ui-kitten/components';
import axios from '@/hooks/axiosConfig';

export default function CategoriesScreen({ navigation }: any) {
    const [categories, setCategories] = useState<string[]>([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('/categories');
                setCategories(response.data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };
        fetchCategories();
    }, []);

    return (
        <Layout style={styles.container}>
            <Text category='h1' style={styles.title}>Categorias</Text>
            <ScrollView>
                {categories.map((category, index) => (
                    <Card
                        key={index}
                        style={styles.card}
                        onPress={() => navigation.navigate('ProductsByCategory', { category })}>
                        <Text category='h5'>{category}</Text>
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
 
