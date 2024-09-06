import { Dialogs, Color } from '@nativescript/core';
import { RouteProp } from '@react-navigation/core';
import * as React from "react";
import { StyleSheet } from "react-nativescript";
import { FrameNavigationProp } from "react-nativescript-navigation";
import { BiometricAuth, BiometricResult, ERROR_CODES } from '@nativescript/biometrics';

import { MainStackParamList } from "../NavigationParamList";

type ScreenOneProps = {
    route: RouteProp<MainStackParamList, "One">,
    navigation: FrameNavigationProp<MainStackParamList, "One">,
};

export function ScreenOne({ navigation }: ScreenOneProps) {
    const [authStatus, setAuthStatus] = React.useState("Not started");
    const biometricAuth = new BiometricAuth();

    const handleBiometricAuth = async () => {
        try {
            const result = await biometricAuth.available();
            if (result.any && result.biometrics) {
                // Attempt biometric authentication
                biometricAuth.verifyBiometric({
                    title: 'Login',
                    message: 'Authenticate to log in',
                    fallbackMessage: 'Enter your PIN',
                    pinFallback: true,
                }).then(
                    (result: BiometricResult) => {
                        if (result.code === ERROR_CODES.SUCCESS) {
                            setAuthStatus("Login successful");
                            Dialogs.alert("You are logged in").then(() => {
                                // Optionally navigate or perform additional actions here
                            });
                            console.log('Biometric authentication successful');
                        } else {
                            setAuthStatus(`Login failed: ${result.code}`);
                            console.log(`Biometric authentication failed: ${JSON.stringify(result)}`);
                        }
                    },
                    err => {
                        setAuthStatus(`Error: ${err}`);
                        console.error(`Biometric authentication error: ${JSON.stringify(err)}`);
                    }
                );
            } else {
                setAuthStatus("Biometric authentication not available or not supported");
            }
        } catch (error) {
            setAuthStatus("Error checking biometrics");
            console.error("Error checking biometrics:", error);
        }
    };

    return (
        <flexboxLayout style={styles.container}>
            <label
                className="fas"
                style={styles.title}
            >
                REACT NATIVE
            </label>
            <label
                style={styles.instructions}
                textWrap="true" // Ensure text wraps properly
            >
                Uses Nativescript Biometrics
            </label>
            <flexboxLayout style={styles.biometricContainer}>
                <button 
                    text="Authenticate" 
                    onTap={handleBiometricAuth} 
                    style={styles.authenticateButton} 
                    isEnabled={true} // Correctly using isEnabled
                />
                <label style={styles.authStatus}>Status: {authStatus}</label>
                <label style={styles.infoText}
                textWrap="true">
                    This screen uses NativeScript's biometric authentication to secure access.{"\n"}
                    If biometric authentication is not available, you may need to{"\n"}
                    enable it in your device settings.
                </label>
            </flexboxLayout>
        </flexboxLayout>
    );
}

const styles = StyleSheet.create({
    container: {
        height: "100%",
        flexDirection: "column",
        justifyContent: "center",
        padding: 20,
        backgroundColor: "#f0f4f8", // Light gray background
    },
    title: {
        textAlignment: "center",
        fontSize: 32,
        color: "#333", // Darker text color
        marginBottom: 20,
        fontWeight: 'bold', // Make title bold
    },
    instructions: {
        textAlignment: "center",
        fontSize: 18,
        color: "#555", // Medium gray text color
        marginBottom: 20,
    },
    biometricContainer: {
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#ffffff", // White background for the biometric section
        borderRadius: 15,
        padding: 20,
        shadowColor: "#000", // Shadow color for the container
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 5, // Elevation for Android shadow
    },
    authenticateButton: {
        fontSize: 24,
        color: "#ffffff",
        backgroundColor: "#007bff", // Blue background color for the button
        borderRadius: 10,
        paddingHorizontal: 30,
        paddingVertical: 15,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: "#007bff", // Matching border color
    },
    authStatus: {
        fontSize: 18,
        marginTop: 10,
        color: "#e74c3c", // Red color for status
    },
    infoText: {
        fontSize: 16,
        color: "#888",
        textAlign: "center",
        marginTop: 20,
    },
});
