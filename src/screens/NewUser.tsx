import React, { useEffect, useState } from 'react';
import { Alert, Image, StyleSheet, Text, TextInput, View } from "react-native";
import AcceptButton from "../components/AcceptButton";
import TextButton from "../components/TextButton";
import { createUser, User, UserRequest } from "../../requests";

const NewUser = ({ navigation }) => {

    const [email, setEmail] = useState<string>('');
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [isFormValid, setIsFormValid] = useState<boolean>(false);

    useEffect(() => setIsFormValid(email.length > 0 && username.length > 0 && password.length > 0), [email, username, password])

    const onCreateUser = () => {
        const request = new UserRequest(username, email);

        createUser(request)
            .then((user: User) => {
                setUsername(user.username)
                setEmail(user.email)
                navigation.navigate('Login')
                Alert.alert('Success!', 'Please login with the created username and password.')
            });
    };

    return (
        <View style={styles.container}>
            <Image style={styles.logo} source={require('../images/logo.png')}/>
            <View style={styles.headerContainer}>
                <Text style={styles.headerText}>Let's Get Started!</Text>
                <Text style={styles.captionText}>Create an account with HomeDex</Text>
            </View>
            <Text style={styles.label}>Username</Text>
            <TextInput
                style={styles.input}
                value={username}
                placeholder="Username"
                onChangeText={(text) => setUsername(text)}
                autoCapitalize="none"
                autoCorrect={false}
            />
            <Text style={styles.label}>Email</Text>
            <TextInput
                style={styles.input}
                value={email}
                placeholder="Email"
                onChangeText={(text) => setEmail(text)}
                autoCapitalize="none"
                autoCorrect={false}
                textContentType={'emailAddress'}
            />
            <Text style={styles.label}>Password</Text>
            <TextInput
                style={styles.input}
                value={password}
                placeholder="Password"
                onChangeText={(text) => setPassword(text)}
                autoCapitalize="none"
                autoCorrect={false}
                secureTextEntry={true}
            />
            <View style={styles.buttonContainer}>
                <AcceptButton
                    style={styles.button}
                    title="Create"
                    onPressHandler={onCreateUser}
                    disabled={!isFormValid}
                ></AcceptButton>
            </View>
            <TextButton style={styles.textButton}
                        text={'Already a User?'}
                        onPressHandler={() => navigation.navigate('Login')}></TextButton>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignSelf: 'center',
    },
    logo: {
        width: 125,
        height: 93,
        marginTop: 50,
        alignSelf: 'center',
        marginBottom: 35,
    },
    headerContainer: {
        marginBottom: 35,
    },
    headerText: {
        fontSize: 30,
        fontWeight: '700',
        color: '#FFFFFF',
        textAlign: 'center',
        marginBottom: 8,
    },
    captionText: {
        fontSize: 14,
        color: '#365F7E',
        textAlign: 'center',
    },
    label: {
        color: '#FFFFFF',
        fontSize: 14,
        fontWeight: '400',
        marginBottom: 6,
    },
    input: {
        borderWidth: 1,
        borderStyle: 'solid',
        color: '#667080',
        borderRadius: 6,
        width: 345,
        height: 48,
        borderColor: '#FFFFFF',
        padding: 12,
        backgroundColor: '#FFFFFF',
        marginBottom: 15,
    },
    buttonContainer: {
        marginTop: 20,
        alignSelf: 'center'
    },
    button: {
        width: 147,
        height: 56,
    },
    textButton: {
        color: '#667080',
        textAlign: 'center',
        marginTop: 40,
        fontWeight: '500',
    },
})

export default NewUser;