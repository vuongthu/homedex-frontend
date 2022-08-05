import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, Text, TextInput, Button, Linking, StyleSheet } from "react-native";
import AcceptButton from "../components/AcceptButton";

const Login = () => {
    return (
        <View style={styles.loginContainer}>
            <Text style={styles.title}>HomeDex</Text>
            <Text style={styles.label}>Username or Email</Text>
            <TextInput style={styles.input} placeholder="Email"/>
            <Text style={styles.label}>Password</Text>
            <TextInput style={styles.input} placeholder="Password"/>
            <View style={styles.button}>
                <AcceptButton title="Sign In"></AcceptButton>
            </View>
            <Text style={styles.password} onPress={() => Linking.openURL('https://google.com')}>Forgot Password?</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    loginContainer: {
        marginLeft: 32,
        marginRight: 32,
    },
    title: {
        fontSize: 48,
        fontWeight: '700',
        color: '#667080',
        textAlign: "center",
        marginTop: 160,
        marginBottom: 50,
    },
    label: {
        fontSize: 14,
        fontWeight: '400',
        marginBottom: 4,
        marginTop: 25,
        color: '#667080',
    },
    input: {
        borderWidth: 1,
        borderStyle: 'solid',
        color: '#667080',
        borderRadius: 6,
        width: 311,
        height: 48,
        borderColor: '#667080',
        padding: 12,
    },
    button: {
        width: 311,
        height: 56,
        backgroundColor: '#667080',
        alignItems: 'center',
        marginTop: 35,
        overflow: 'hidden',
        marginBottom: 16,
    },
    password: {
        color: '#667080',
        textAlign: 'center',
    }
})

export default Login;