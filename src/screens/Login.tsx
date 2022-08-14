import React, { useContext, useState } from 'react';
import { Image, Linking, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import AcceptButton from "../components/AcceptButton";
import { AuthContext } from "../../App";
import TextButton from "../components/TextButton";


const Login = ({ navigation }) => {

    const { signIn } = useContext(AuthContext);

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const onUserLogin = async () => {
        await signIn(username, password);
    };

    return (
        <View style={styles.container}>
            <Image style={styles.logo} source={require('../images/logo-with-name.png')}/>
            <Text style={styles.label}>Username or Email</Text>
            <TextInput style={styles.input} placeholder={"Username or Email"}
                       value={username}
                       onChangeText={setUsername}
                       autoCapitalize="none"
                       autoCorrect={false}/>
            <Text style={styles.label}>Password</Text>
            <TextInput style={styles.input}
                       placeholder={"Password"}
                       value={password}
                       onChangeText={setPassword}
                       autoCapitalize="none"
                       autoCorrect={false}
                       secureTextEntry={true}/>
            <AcceptButton style={styles.button}
                          title={"Sign In"}
                          onPressHandler={onUserLogin}></AcceptButton>
            <View style={styles.textButtonContainer}>
                <TextButton style={styles.textButton}
                            text={'Create New Account'}
                            onPressHandler={() => navigation.navigate('New User')}></TextButton>
                <Text style={styles.textButton}
                      onPress={() => Linking.openURL('https://google.com')}>Forgot Password?</Text>
            </View>
            <Text style={styles.altLoginText}>Sign In With</Text>
            <Pressable style={styles.loginIcons}>
                <Image style={styles.icon} source={require('../images/fb-icon.png')}/>
                <Image style={styles.icon} source={require('../images/google-icon.png')}/>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignSelf: 'center',
    },
    logo: {
        height: 143,
        width: 124,
        alignSelf: "center",
        marginTop: 110,
        marginBottom: 50,
    },
    label: {
        fontSize: 14,
        fontWeight: '400',
        marginBottom: 6,
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
        backgroundColor: '#FFFFFF',
        marginBottom: 20,
    },
    button: {
        width: 311,
        height: 56,
        alignItems: 'center',
        overflow: 'hidden',
        marginTop: 10,
        marginBottom: 30,
    },
    textButton: {
        color: '#FFFFFF',
        textAlign: 'center',
        fontWeight: '500',
    },
    textButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 50,
    },
    altLoginText: {
        fontSize: 11,
        fontWeight: '600',
        textAlign: 'center',
        color: '#667080',
    },
    loginIcons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 100,
        alignSelf: 'center',
        marginTop: 20,
        marginBottom: 20,
    },
    icon: {
        height: 40,
        width: 40,
    }
});

export default Login;