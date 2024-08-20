import React, { useEffect, useState } from 'react';
import { Dimensions, Image, ScrollView, StyleSheet, View } from 'react-native';
import { Button, Card, Layout, Text, useTheme } from '@ui-kitten/components';
import { Product } from '@/types/Product';
import LocationCEPComponent from '@/components/Cep';
import apiService from '@/service/apiService';

export default function HomeScreen({ navigation }: any) {
  const [data, setData] = useState<Product[] | undefined>(undefined);
  const theme = useTheme();

  useEffect(() => {
    const getData = async () => {
      try {
        const highlightedProducts = await apiService.getHighlightedProducts();
        setData(highlightedProducts);
        console.log(highlightedProducts);
      } catch (error) {
        console.error(error);
      }
    };
    getData();
  }, []);

  const windowWidth = Dimensions.get('window').width;
  const cardWidth = (windowWidth - 40) / 2;

  return (
    <Layout style={styles.container}>
      <LocationCEPComponent />
      <ScrollView contentContainerStyle={styles.cardContainer}>
        {!!data && data.map((item) => (
          <Card
            key={item.id}
            style={[styles.card, { width: cardWidth, backgroundColor: theme['color-info-100'] }]}
            onPress={() => navigation.navigate('ProductDetail', { id: item.id })}
          >
            <Image
              source={{ uri: item.thumbnailHd }}
              style={[styles.image, { width: cardWidth * 0.9, height: cardWidth * 0.6 }]}
            />
            <Text category="h6" style={[styles.title, { color: theme['color-primary-500'] }]}>{item.title}</Text>
            <Text category="s1" status="primary" style={[styles.price, { color: theme['color-success-500'] }]}>
              R$ {item.price.toFixed(2)}
            </Text>
            <Text appearance="hint" style={[styles.seller, { color: theme['color-info-500'] }]}>{item.seller}</Text>
          </Card>
        ))}
      </ScrollView>
      <Layout style={styles.bottomButtons}>
        <Button style={styles.button} onPress={() => navigation.navigate('Search')}>
          Pesquisar
        </Button>
        <Button style={styles.button} onPress={() => navigation.navigate('Home')}>
          Home
        </Button>
      </Layout>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  cardContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingBottom: 20,
  },
  card: {
    marginBottom: 20,
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 3, // Sombras para Android
    shadowColor: '#000', // Sombras para iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    alignItems: 'center',
    padding: 10,
  },
  image: {
    marginBottom: 10,
    borderRadius: 8,
    resizeMode: 'cover',
  },
  title: {
    marginBottom: 5,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
  price: {
    marginBottom: 5,
    textAlign: 'center',
    fontSize: 15,
  },
  seller: {
    textAlign: 'center',
    fontSize: 14,
  },
  bottomButtons: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 20,
  },
  button: {
    width: '45%',
  },
});
