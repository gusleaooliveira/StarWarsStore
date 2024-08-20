import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { Button, Input, Layout, Text } from '@ui-kitten/components';
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import { Product } from '@/types/Product';
import apiService from '@/service/apiService';

export default function CheckoutScreen({ navigation }: any) {
  const [userId, setUserId] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardHolderName, setCardHolderName] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [totalAmount, setTotalAmount] = useState(0);
  const [cartItems, setCartItems] = useState<Product[]>([]);

  useEffect(() => {
    const fetchCartItems = async () => {
      const cart = await AsyncStorage.getItem('cart');
      if (cart) {
        const items = JSON.parse(cart);
        setCartItems(items);
        const total = items.reduce((sum: number, item: Product) => sum + item.price, 0);
        setTotalAmount(total);
      }
    };
    fetchCartItems();
  }, []);

  const handleCheckout = async () => {
    try {
      const transactionData = {
        userId,
        cardNumber,
        cardHolderName,
        expiryDate,
        cvv,
        totalAmount,
        items: cartItems.map(item => ({
          productId: item.id,
          quantity: 1, // Supondo que a quantidade seja 1 para cada item no carrinho
        })),
      };

      const response = await apiService.processTransaction(transactionData);
      if (response.success) {
        alert('Transação completada com sucesso!');
        await AsyncStorage.removeItem('cart');
        navigation.navigate('Home');
      } else {
        alert('Erro ao processar a transação.');
      }
    } catch (error) {
      console.error('Erro ao processar a transação:', error);
      alert('Erro ao processar a transação.');
    }
  };

  return (
    <Layout style={styles.container}>
      <ScrollView>
        <Text category='h1' style={styles.title}>Checkout</Text>

        <Input
          label='ID do Usuário'
          placeholder='Digite seu ID de usuário'
          value={userId}
          onChangeText={setUserId}
          style={styles.input}
        />
        <Input
          label='Número do Cartão'
          placeholder='XXXX XXXX XXXX XXXX'
          value={cardNumber}
          onChangeText={setCardNumber}
          maxLength={16}
          keyboardType='numeric'
          style={styles.input}
        />
        <Input
          label='Nome do Portador do Cartão'
          placeholder='Nome como está no cartão'
          value={cardHolderName}
          onChangeText={setCardHolderName}
          style={styles.input}
        />
        <Input
          label='Vencimento do Cartão (MM/yy)'
          placeholder='MM/yy'
          value={expiryDate}
          onChangeText={setExpiryDate}
          maxLength={5}
          keyboardType='numeric'
          style={styles.input}
        />
        <Input
          label='CVV'
          placeholder='Código de 3 dígitos'
          value={cvv}
          onChangeText={setCvv}
          maxLength={3}
          keyboardType='numeric'
          style={styles.input}
        />
        <Text category='h6' style={styles.totalAmount}>Total: R$ {totalAmount.toFixed(2)}</Text>

        <Button style={styles.button} onPress={handleCheckout}>
          Processar Pagamento
        </Button>
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
  input: {
    marginBottom: 15,
  },
  totalAmount: {
    marginBottom: 15,
    textAlign: 'center',
  },
  button: {
    marginTop: 20,
  },
});

 
