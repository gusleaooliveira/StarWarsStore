import React, { useEffect } from 'react';
import { StyleSheet, ScrollView, ToastAndroid, TouchableWithoutFeedback } from 'react-native';
import { Button, Input, Layout, Text, Icon } from '@ui-kitten/components';
import { useForm, Controller } from 'react-hook-form';
import { useAuth } from '@/hooks/useAuth';

type FormData = {
  email: string;
  password: string;
};

export default function LoginScreen({ navigation }: any) {
  const { user, signIn } = useAuth();
  const { control, handleSubmit, formState: { errors }, watch } = useForm<FormData>();
  const [secureTextEntry, setSecureTextEntry] = React.useState(true);
  const [error, setError] = React.useState('');



  const toggleSecureEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  const renderIcon = (props: any) => (
    <TouchableWithoutFeedback onPress={toggleSecureEntry}>
      <Icon {...props} name={secureTextEntry ? 'eye-off' : 'eye'} />
    </TouchableWithoutFeedback>
  );

  const onSubmit = async (data: FormData) => {
    try { 
      
      await signIn(data.email, data.password);
      ToastAndroid.show('Logado com sucesso!', ToastAndroid.SHORT);
      // navigation.goBack(); // Volta para a tela anterior
      navigation.navigate('Home');
    } catch (err) {
      setError('Erro ao fazer login, tente novamente.');
      ToastAndroid.show('Erro ao fazer login, tente novamente.', ToastAndroid.SHORT);
    }
  };

  return (
    <Layout style={styles.container}> 
      <ScrollView>
        <Text category='h1' style={styles.title}>Login</Text>
        {error && <Text status='danger' style={styles.error}>{error}</Text>}
        
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
          defaultValue=""
        />

        <Controller
          control={control}
          rules={{ required: 'Senha é obrigatória' }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              label='Senha'
              placeholder='Digite sua senha'
              value={value}
              onBlur={onBlur}
              onChangeText={onChange}
              accessoryRight={renderIcon}
              secureTextEntry={secureTextEntry}
              style={styles.input}
              status={errors.password ? 'danger' : 'basic'}
              caption={errors.password ? errors.password.message : ''}
            />
          )}
          name="password"
          defaultValue=""
        />

        <Button style={styles.button} onPress={handleSubmit(onSubmit)}>
          Entrar
        </Button>
        <Button
          style={styles.button}
          appearance='ghost'
          status='primary'
          onPress={() => navigation.navigate('CreateUser')}
        >
          Criar Conta
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
  button: {
    marginTop: 20,
  },
  error: {
    marginBottom: 20,
    textAlign: 'center',
  },
});
