import React from 'react';
import { View, Text, Button, Alert } from 'react-native';
import ReactNativeBiometrics from 'react-native-biometrics';

const BiometricAuth = () => {
  const handleAuth = async () => {
    const rnBiometrics = new ReactNativeBiometrics();

    try {
      const { available } = await rnBiometrics.isSensorAvailable();

      if (available) {
        const { success, error } = await rnBiometrics.simplePrompt({
          promptMessage: 'Confirm fingerprint',
        });

        if (success) {
          Alert.alert('Authenticated successfully');
        } else {
          Alert.alert('Authentication failed');
        }
      } else {
        Alert.alert('Biometrics not available');
      }
    } catch (err) {
      console.error(err);
      Alert.alert('An error occurred');
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Biometric Authentication</Text>
      <Button title="Authenticate" onPress={handleAuth} />
    </View>
  );
};

export default BiometricAuth;
