import React, { useEffect } from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import { Button, Input, Layout, Text, Icon } from '@ui-kitten/components';
import { useForm, Controller } from 'react-hook-form';
import { useAuth } from '@/hooks/useAuth';
import apiService from '@/service/apiService';

type FormData = {
  name: string;
  email: string;
  address: string;
};

export default function ProfileScreen({ navigation }: any) {
  const { user } = useAuth();
  const { control, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
    defaultValues: {
      name: '',
      email: '',
      address: '',
    },
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await apiService.getUserById(user.id);
        reset({
          name: userData.name,
          email: userData.email,
          address: userData.address,
        });
      } catch (error) {
        console.error('Failed to fetch user data:', error);
      }
    };
    fetchUserData();
  }, [user.id, reset]);

  const handleSave = async (data: FormData) => {
    try {
      await apiService.updateUserProfile(user.id, data);
      alert('Profile saved!');
    } catch (error) {
      console.error('Failed to save user data:', error);
    }
  };

  return (
    <Layout style={styles.container}>
      <Text category='h1' style={styles.title}>Perfil</Text>
      <ScrollView style={{ flex: 1, marginBottom: 70 }}>
        <Text category='label' style={styles.username}>{user.username}</Text>

        <Controller
          control={control}
          rules={{ required: 'Nome é obrigatório' }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              label='Nome'
              placeholder='Digite seu nome'
              value={value}
              onBlur={onBlur}
              onChangeText={onChange}
              style={styles.input}
              status={errors.name ? 'danger' : 'basic'}
              caption={errors.name ? errors.name.message : ''}
            />
          )}
          name="name"
        />

        <Controller
          control={control}
          rules={{
            required: 'Email é obrigatório',
            pattern: {
              value: /^\S+@\S+$/i,
              message: 'Endereço de email inválido',
            },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              label='Email'
              placeholder='Digite seu email'
              value={value}
              onBlur={onBlur}
              onChangeText={onChange}
              style={styles.input}
              keyboardType="email-address"
              autoCapitalize="none"
              status={errors.email ? 'danger' : 'basic'}
              caption={errors.email ? errors.email.message : ''}
            />
          )}
          name="email"
        />

        <Controller
          control={control}
          rules={{ required: 'Endereço é obrigatório' }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              label='Endereço'
              placeholder='Digite seu endereço'
              value={value}
              onBlur={onBlur}
              onChangeText={onChange}
              style={styles.input}
              status={errors.address ? 'danger' : 'basic'}
              caption={errors.address ? errors.address.message : ''}
            />
          )}
          name="address"
        />

        <Button style={styles.button} onPress={handleSubmit(handleSave)}>
          Salvar
        </Button>
      </ScrollView>

      {/* Barra de menu inferior fixa */}
      <View style={styles.bottomBar}>
        <Button style={styles.iconButton} onPress={() => navigation.goBack()} accessoryLeft={(props) => <Icon {...props} name="arrow-back-outline" />}>
          Voltar
        </Button>
        <Button style={styles.iconButton} onPress={() => navigation.navigate('Cart')} accessoryLeft={(props) => <Icon {...props} name="shopping-cart-outline" />}>
          Ver Carrinho
        </Button>
        <Button style={styles.iconButton} onPress={() => navigation.navigate('Profile')} accessoryLeft={(props) => <Icon {...props} name="person-outline" />}>
          Perfil
        </Button>
      </View>
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
  username: {
    marginBottom: 20,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
  input: {
    marginBottom: 15,
  },
  button: {
    marginTop: 20,
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
