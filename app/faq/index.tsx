import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Layout, Text, Card, Input, Button } from '@ui-kitten/components';

export default function HelpAndSupportScreen() {
    const [message, setMessage] = React.useState('');

    const handleSend = () => {
        alert('Mensagem enviada!');
        setMessage('');
    };

    return (
        <Layout style={styles.container}>
            <Text category='h1' style={styles.title}>Ajuda e Suporte</Text>
            <ScrollView>
                <Card style={styles.card}>
                    <Text category='h6'>FAQs</Text>
                    <Text category='p1'>Aqui estão as perguntas mais frequentes.</Text>
                </Card>

                <Card style={styles.card}>
                    <Text category='h6'>Envie-nos uma mensagem</Text>
                    <Input
                        placeholder='Digite sua mensagem'
                        multiline
                        value={message}
                        onChangeText={setMessage}
                        style={styles.input}
                    />
                    <Button style={styles.button} onPress={handleSend}>
                        Enviar
                    </Button>
                </Card>
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
    input: {
        marginBottom: 15,
    },
    button: {
        marginTop: 10,
    },
});

 