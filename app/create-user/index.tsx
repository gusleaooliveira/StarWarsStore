import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { View, StyleSheet } from 'react-native';
import { Button, Input, Layout, Text } from '@ui-kitten/components';
import AsyncStorage from '@react-native-async-storage/async-storage';
import apiService from '@/service/apiService';

type FormData = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export default function CreateUserScreen({ navigation }: any) {
  const { control, handleSubmit, formState: { errors }, watch } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    try {
      // Envia a requisição para o endpoint de signup
      await apiService.signup({
        username: data.username,
        email: data.email,
        password: data.password,
      });

      await AsyncStorage.setItem('userToken', 'new-user-token');
      navigation.navigate('Home');
    } catch (error) {
      console.error('User creation error:', error);
    }
  };

  const password = watch('password');

  
  return (
    <Layout style={styles.container}>
      <Text category='h1' style={styles.title}>Create User</Text>
      <Controller
        control={control}
        rules={{
          required: 'Username is required',
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            label='Username'
            placeholder='Enter your username'
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            style={styles.input}
            status={errors.username ? 'danger' : 'basic'}
            caption={errors.username ? errors.username.message : ''}
          />
        )}
        name='username'
        defaultValue=''
      />
      <Controller
        control={control}
        rules={{
          required: 'Email is required',
          pattern: {
            value: /^\S+@\S+$/i,
            message: 'Invalid email address',
          },
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            label='Email'
            placeholder='Enter your email'
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            style={styles.input}
            status={errors.email ? 'danger' : 'basic'}
            caption={errors.email ? errors.email.message : ''}
          />
        )}
        name='email'
        defaultValue=''
      />
      <Controller
        control={control}
        rules={{
          required: 'Password is required',
          minLength: {
            value: 6,
            message: 'Password must be at least 6 characters',
          },
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            label='Password'
            placeholder='Enter your password'
            secureTextEntry={true}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            style={styles.input}
            status={errors.password ? 'danger' : 'basic'}
            caption={errors.password ? errors.password.message : ''}
          />
        )}
        name='password'
        defaultValue=''
      />
      <Controller
        control={control}
        rules={{
          required: 'Confirm your password',
          validate: value =>
            value === password || 'Passwords do not match',
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            label='Confirm Password'
            placeholder='Re-enter your password'
            secureTextEntry={true}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            style={styles.input}
            status={errors.confirmPassword ? 'danger' : 'basic'}
            caption={errors.confirmPassword ? errors.confirmPassword.message : ''}
          />
        )}
        name='confirmPassword'
        defaultValue=''
      />
      <Button onPress={handleSubmit(onSubmit)} style={styles.button}>
        Create Account
      </Button>
      <Button onPress={() => navigation.goBack()} appearance='ghost' status='primary' style={styles.button}>
        Back to Login
      </Button>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    textAlign: 'center',
    marginBottom: 24,
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginTop: 16,
  },
});