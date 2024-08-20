import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, ToastAndroid } from 'react-native';
import { Icon, Tooltip, Text } from '@ui-kitten/components';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location';
import axios from 'axios';

export default function LocationCEPComponent() {
  const [location, setLocation] = useState<any | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [cep, setCep] = useState('');
  const [visible, setVisible] = useState(false);

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
        },
      });
      const postalCode = response.data.address?.postcode || '';
      setCep(postalCode);
      await AsyncStorage.setItem('cep', postalCode);
    } catch (error) {
      console.error('Error fetching CEP:', error);
      setErrorMsg('Error fetching CEP');
    }
  };

  const toggleTooltip = () => {
    setVisible(!visible);
  };

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
      <Tooltip
        anchor={() => (
          <TouchableOpacity onPress={toggleTooltip}>
            <Icon name="pin-outline" fill="#fff" style={styles.icon} />
          </TouchableOpacity>
        )}
        visible={visible}
        onBackdropPress={toggleTooltip}
      >
        <Text>{cep ? `CEP: ${cep}` : 'CEP não encontrado'}</Text>
      </Tooltip>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-end',
    paddingRight: 15,
    marginBottom: 10,
  },
  icon: {
    width: 32,
    height: 32,
  },
});
