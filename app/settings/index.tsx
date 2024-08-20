import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Button, Layout, Text, Toggle } from '@ui-kitten/components';

export default function SettingsScreen() {
    const [notificationsEnabled, setNotificationsEnabled] = React.useState(true);
    const [darkModeEnabled, setDarkModeEnabled] = React.useState(false);

    const toggleNotifications = () => setNotificationsEnabled(!notificationsEnabled);
    const toggleDarkMode = () => setDarkModeEnabled(!darkModeEnabled);

    return (
        <Layout style={styles.container}>
            <Text category='h1' style={styles.title}>Configurações</Text>
            <ScrollView>
                <Toggle
                    checked={notificationsEnabled}
                    onChange={toggleNotifications}
                    style={styles.toggle}>
                    Notificações
                </Toggle>
                <Toggle
                    checked={darkModeEnabled}
                    onChange={toggleDarkMode}
                    style={styles.toggle}>
                    Modo Escuro
                </Toggle>
                <Button style={styles.button}>
                    Ajustar Preferências de Idioma
                </Button>
                <Button style={styles.button}>
                    Limpar Cache
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
    toggle: {
        marginVertical: 10,
    },
    button: {
        marginTop: 20,
    },
});

 
