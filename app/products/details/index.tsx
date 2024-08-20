import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet, Dimensions, ScrollView, ToastAndroid } from 'react-native';
import { Layout, Text, Button, Icon } from '@ui-kitten/components';
import Carousel from 'react-native-reanimated-carousel';
import LocationCEPComponent from '@/components/Cep';
import { Product } from '@/types/Product';
import apiService from '@/service/apiService';
import { useAuth } from '@/hooks/useAuth';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width } = Dimensions.get('window');

const ProductDetail = ({ route, navigation }: any) => {
  const { id } = route.params;
  const [product, setProduct] = useState<Product | null>(null);
  const { user } = useAuth();
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productData = await apiService.getProductById(id);
        setProduct(productData);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };
    fetchProduct();
  }, [id]);

  const addToCart = async () => {
    try {
      if (!user) {
        navigation.navigate('Login');
        return;
      }

      const cartItem = {
        productId: product?.id,
        quantity,
        user: user?.id,
      };

      console.log(cartItem); // Mostrar o ID do produto no console
      
      const response = await apiService.addToCart(cartItem);
      ToastAndroid.show('Produto adicionado ao carrinho!', ToastAndroid.SHORT);

      // Salva o ID do carrinho no AsyncStorage
      const cartId = response.id; // Supondo que o ID do produto seja o ID do carrinho
      await AsyncStorage.setItem('cartId', cartId.toString());
    } catch (error) {
      console.error('Erro ao adicionar ao carrinho:', error);
      ToastAndroid.show('Erro ao adicionar ao carrinho', ToastAndroid.SHORT);
    }
  };

  const ProfileIcon = (props: any) => (
    <Icon {...props} name={user ? 'person' : 'person-outline'} />
  );

  const BackIcon = (props: any) => (
    <Icon {...props} name='arrow-back-outline' />
  );

  const CartIcon = (props: any) => (
    <Icon {...props} name='shopping-cart-outline' />
  );

  if (!product) {
    return (
      <Layout style={styles.container}>
        <Text>Loading...</Text>
      </Layout>
    );
  }

  return (
    <Layout style={styles.container}>
      <LocationCEPComponent />
      <ScrollView style={{ flex: 1 }}>
        <Text category='h1' style={styles.title}>{product.title}</Text>

        <Carousel
          width={width}
          height={width * 0.75}
          data={product.images}
          onSnapToItem={(index) => setCurrentImageIndex(index)}
          renderItem={({ item }: { item: string }) => (
            <View style={styles.carouselContainer}>
              <Image source={{ uri: item }} style={styles.carouselImage} />
              <Text style={styles.imageCounter}>
                {currentImageIndex + 1} / {product.images.length}
              </Text>
            </View>
          )}
        />

        <Text category='h6' style={styles.price}>R$ {product.price.toFixed(2)}</Text>

        <View style={styles.quantityContainer}>
          <Text category='s1'>Quantidade:</Text>
          <Picker
            selectedValue={quantity}
            style={styles.picker}
            onValueChange={(itemValue) => setQuantity(itemValue as number)}
          >
            {[1, 5, 10, 15, 20].map((value) => (
              <Picker.Item label={value.toString()} value={value} key={value} />
            ))}
          </Picker>
        </View>

        <Button style={styles.addButton} onPress={addToCart}>
          Adicionar ao Carrinho
        </Button>

        <Layout style={styles.detailsContainer}>
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
        </Layout>
      </ScrollView>

      <View style={styles.bottomBar}>
        <Button style={styles.iconButton} onPress={() => navigation.goBack()} accessoryLeft={BackIcon}>
          Voltar
        </Button>
        <Button style={styles.iconButton} onPress={() => navigation.navigate('Cart')} accessoryLeft={CartIcon}>
          Ver Carrinho
        </Button>
        <Button style={styles.iconButton} onPress={() => navigation.navigate('Profile')} accessoryLeft={ProfileIcon}>
          Perfil
        </Button>
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#2B111A', // Dark background
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
    borderRadius: 10,
    resizeMode: 'cover',
  },
  imageCounter: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    color: '#FFF',
    padding: 5,
    borderRadius: 5,
    fontSize: 14,
  },
  title: {
    marginVertical: 10,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 24,
    color: '#FFDDCC', // Primary color
  },
  price: {
    marginVertical: 10,
    textAlign: 'center',
    fontSize: 20,
    color: '#D8F8C6', // Success color
    fontWeight: 'bold',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  picker: {
    marginLeft: 10,
    width: 120,
    color: '#FFDDCC',
  },
  addButton: {
    marginTop: 20,
    backgroundColor: '#FFD700', // Bright yellow for better visibility
    borderColor: '#FFD700',
    borderRadius: 25,
    paddingVertical: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5, // Adds a shadow for Android devices
    alignSelf: 'center', // Centers the button
    width: '90%', // Ensures the button is wide enough
  },
  detailsContainer: {
    marginTop: 20,
  },
  seller: {
    marginBottom: 10,
    textAlign: 'center',
    fontSize: 16,
    color: '#FFB399', // Light primary color
  },
  description: {
    marginBottom: 20,
    textAlign: 'center',
    fontSize: 16,
    color: '#FF8066', // Medium primary color
  },
  category: {
    marginBottom: 10,
    fontSize: 16,
    color: '#FFB399',
  },
  stock: {
    marginBottom: 10,
    fontSize: 16,
    color: '#FF503F', // Darker primary color
  },
  rating: {
    marginBottom: 10,
    fontSize: 16,
    color: '#AAF291', // Light success color
  },
  reviewsCount: {
    marginBottom: 10,
    fontSize: 16,
    color: '#6DD856', // Medium success color
  },
  brand: {
    marginBottom: 10,
    fontSize: 16,
    color: '#38B22C', // Dark success color
  },
  sku: {
    marginBottom: 10,
    fontSize: 16,
    color: '#FFB399',
  },
  weight: {
    marginBottom: 10,
    fontSize: 16,
    color: '#FF503F',
  },
  dimensions: {
    marginBottom: 10,
    fontSize: 16,
    color: '#FFB399',
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 15,
    backgroundColor: '#2B111A', // Matching background
    borderTopWidth: 1,
    borderColor: '#4D4142', // Subtle border color
  },
  iconButton: {
    flex: 1,
    marginHorizontal: 5,
    backgroundColor: '#FF0000', // Primary color for buttons
    borderColor: '#FF0000',
  },
});

export default ProductDetail;
