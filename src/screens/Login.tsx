import React, { useState } from 'react';
import { Alert, Image, Linking, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import AcceptButton from "../components/AcceptButton";
import { User, userLogin } from "../../requests";


const Login = ({ navigation }) => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const onUserLogin = async () => {
        const user: User = await userLogin(username, password);

        if (!user) {
            Alert.alert('Login Failed', 'Please enter a valid username/email and/or password')
        }
        else {
            navigation.navigate('Households', {
                userId: user.id,
            });
        }
    };

    return (
        <View style={styles.loginContainer}>
            <Image style={styles.logo} source={require('../images/logo-with-name.png')}/>
            <Text style={styles.label}>Username or Email</Text>
            <TextInput style={styles.input} placeholder={"Username or Email"} value={username}
                       onChangeText={setUsername} autoCapitalize="none" autoCorrect={false}/>
            <Text style={styles.label}>Password</Text>
            <TextInput style={styles.input} placeholder={"Password"} value={password}
                       onChangeText={setPassword} autoCapitalize="none" autoCorrect={false} secureTextEntry={true}/>
            <View style={styles.button}>
                <AcceptButton title={"Sign In"} onPressHandler={onUserLogin}></AcceptButton>
            </View>
            <Text style={styles.password} onPress={() => Linking.openURL('https://google.com')}>Forgot Password?</Text>
            <Text style={styles.altLoginText}>Sign In With</Text>
            <Pressable style={styles.loginIcons}>
                <Image style={styles.icon} source={require('../images/fb-icon.png')}/>
                <Image style={styles.icon} source={require('../images/google-icon.png')}/>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    loginContainer: {
        marginLeft: 32,
        marginRight: 32,
    },
    logo: {
        height: 143,
        width: 124,
        alignSelf: "center",
        marginTop: 120,
        marginBottom: 10,
    },
    label: {
        fontSize: 14,
        fontWeight: '400',
        marginBottom: 4,
        marginTop: 25,
        color: '#FFFFFF',
    },
    input: {
        borderWidth: 1,
        borderStyle: 'solid',
        color: '#667080',
        borderRadius: 6,
        width: 311,
        height: 48,
        borderColor: '#FFFFFF',
        padding: 12,
        backgroundColor: '#FFFFFF'
    },
    button: {
        width: 311,
        height: 56,
        backgroundColor: '#667080',
        alignItems: 'center',
        marginTop: 35,
        overflow: 'hidden',
        marginBottom: 16,
        borderRadius: 6,
    },
    password: {
        color: '#667080',
        textAlign: 'center',
    },
    altLoginText: {
        fontSize: 10,
        fontWeight: '600',
        marginTop: 60,
        textAlign: 'center',
        color: '#FFFFFF',
    },
    loginIcons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 100,
        alignSelf: 'center',
        marginTop: 20,
    },
    icon: {
        height: 40,
        width: 40,
    }
});

export default Login;