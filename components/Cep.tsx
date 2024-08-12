import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location';
import axios from 'axios';

export default function LocationCEPComponent() {
    const [location, setLocation] = useState<any | null>(null);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const [cep, setCep] = useState('');

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);
            if (location) {
                await getCEPFromLocation(location.coords.latitude, location.coords.longitude);
            }
        })();
    }, []);

    const getCEPFromLocation = async (latitude: number, longitude: number) => {
        try {
            const response = await axios.get(`https://nominatim.openstreetmap.org/reverse`, {
                params: {
                    format: 'json',
                    lat: latitude,
                    lon: longitude,
                }
            });
            const postalCode = response.data.address?.postcode || '';
            setCep(postalCode);
            await AsyncStorage.setItem('cep', postalCode);
        } catch (error) {
            console.error('Error fetching CEP:', error);
            setErrorMsg('Error fetching CEP');
        }
    };

    let text = 'Waiting..';
    if (errorMsg) {
        text = errorMsg;
    } else if (cep) {
        text = `CEP: ${cep}`;
    }

    useEffect(() => {
        (async () => {
            try {
                const storedCep = await AsyncStorage.getItem('cep');
                if (storedCep !== null) {
                    setCep(storedCep);
                }
            } catch (error) {
                console.error('Error fetching CEP from storage:', error);
            }
        })();
    }, []);

    return (
        <View style={styles.container}> 
        {cep ? (
                <Text style={styles.cep}>CEP: {cep}</Text>
            ) : (
                <Text style={styles.cep}>CEP não encontrado</Text>
            )}

        </View>
    );
}

const styles = StyleSheet.create({
    container: { 
        backgroundColor: '#222B45',
    },
    paragraph: {
        fontSize: 14,
        textAlign: 'center',
    },
    cep: {
        fontSize: 14,
        marginVertical: 10,
        textAlign: 'center',
        color: '#fff', 
    },
});
