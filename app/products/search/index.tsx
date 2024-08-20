import React, { useState } from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import { Input, Layout, Text, Button, Card } from '@ui-kitten/components'; 
import { Product } from '@/types/Product';
import apiService from '@/service/apiService';

export default function SearchScreen({ navigation }: any) {
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [seller, setSeller] = useState('');
    const [results, setResults] = useState<Product[]>([]);

    const handleSearch = async () => {
        try {
            const filters = {
                title,
                category,
                minPrice: minPrice ? parseFloat(minPrice) : undefined,
                maxPrice: maxPrice ? parseFloat(maxPrice) : undefined,
                seller,
            };

            const response = await apiService.filterProducts(filters);
            setResults(response);
        } catch (error) {
            console.error('Error searching products:', error);
        }
    };

    return (
        <Layout style={styles.container}>
            <ScrollView>
                <Input
                    placeholder='Buscar por título...'
                    value={title}
                    onChangeText={setTitle}
                    style={styles.input}
                />
                <Input
                    placeholder='Buscar por categoria...'
                    value={category}
                    onChangeText={setCategory}
                    style={styles.input}
                />
                <Input
                    placeholder='Preço mínimo...'
                    value={minPrice}
                    onChangeText={setMinPrice}
                    style={styles.input}
                    keyboardType="numeric"
                />
                <Input
                    placeholder='Preço máximo...'
                    value={maxPrice}
                    onChangeText={setMaxPrice}
                    style={styles.input}
                    keyboardType="numeric"
                />
                <Input
                    placeholder='Buscar por vendedor...'
                    value={seller}
                    onChangeText={setSeller}
                    style={styles.input}
                />
                <Button onPress={handleSearch} style={styles.button}>
                    Pesquisar
                </Button>
                <ScrollView>
                    {results.length === 0 ? (
                        <Text category='s1' style={styles.noResults}>Nenhum resultado encontrado</Text>
                    ) : (
                        results.map((product) => (
                            <Card
                                key={product.id}
                                style={styles.card}
                                onPress={() => navigation.navigate('ProductDetail', { id: product.id })}
                            >
                                <Text category='h6'>{product.title}</Text>
                                <Text category='s1'>R$ {product.price.toFixed(2)}</Text>
                            </Card>
                        ))
                    )}
                </ScrollView>
            </ScrollView>
        </Layout>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    input: {
        marginBottom: 10,
    },
    button: {
        marginBottom: 20,
    },
    noResults: {
        textAlign: 'center',
        marginTop: 50,
    },
    card: {
        marginBottom: 15,
        padding: 20,
    },
});
 
