import React, { useContext, useEffect, useState } from 'react';
import { Image, StyleSheet, Text, TextInput, View } from "react-native";
import { AuthContext } from "../../App";
import TextButton from "../components/TextButton";
import * as SecureStore from "expo-secure-store";
import { getUser, updateUser, User, UserRequest } from "../../requests";
import AcceptButton from "../components/AcceptButton";

const UserInfo = () => {

    const { signOut } = useContext(AuthContext);
    const [email, setEmail] = useState<string>('');
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [isFormValid, setIsFormValid] = useState<boolean>(false)

    const retrieveUser = async () => {
        try {
            return await SecureStore.getItemAsync('user-id');
        } catch (err) {
            console.log(`user-id from secure store not found: ${err}`)
        }
    };

    useEffect(() => {
        retrieveUser().then((userId: string) => {
            getUser(userId)
                .then((user: User) => {
                    setEmail(user.email)
                    setUsername(user.username)
                });
        });
    }, [])

    useEffect(() => setIsFormValid(email.length > 0 && username.length > 0 && password.length > 0), [email, username, password])

    const onSaveHandler = () => {
        const request = new UserRequest(username, email);

        setEmail('')
        setUsername('')
        setPassword('')
        setIsFormValid(false)

        retrieveUser().then((userId: string) => {
            updateUser(userId, request)
                .then((user: User) => {
                    setEmail(user.email)
                    setUsername(user.username)
                });
        })
    }

    return (
        <View style={styles.container}>
            <Image style={styles.logo} source={require('../images/logo.png')}/>
            <View style={styles.headerContainer}>
                <Text style={styles.headerLabel}>Account Details</Text>
            </View>
            <View style={styles.formContainer}>
                <Text style={styles.label}>Username</Text>
                <TextInput
                    style={styles.input}
                    value={username}
                    placeholder=""
                    onChangeText={(text) => setUsername(text)}
                    autoCapitalize="none"
                    autoCorrect={false}
                />
                <Text style={styles.label}>Email</Text>
                <TextInput
                    style={styles.input}
                    value={email}
                    placeholder=""
                    onChangeText={(text) => setEmail(text)}
                    autoCapitalize="none"
                    autoCorrect={false}
                    textContentType={'emailAddress'}
                />
                <Text style={styles.label}>Password</Text>
                <TextInput
                    style={styles.input}
                    value={password}
                    placeholder=""
                    onChangeText={(text) => setPassword(text)}
                    autoCapitalize="none"
                    autoCorrect={false}
                    secureTextEntry={true}
                />
                <View style={styles.buttonContainer}>
                    <AcceptButton
                        style={styles.button}
                        title="Save"
                        onPressHandler={onSaveHandler}
                        disabled={!isFormValid}
                    ></AcceptButton>
                </View>
                <TextButton text={'Sign Out?'} onPressHandler={signOut} style={styles.logoutText}></TextButton>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        marginTop: 40,
    },
    logo: {
        width: 125,
        height: 93,
        marginTop: 50,
        alignSelf: 'center'
    },
    headerContainer: {
        flexDirection: "row",
        justifyContent: "center",
        marginBottom: 40,
        marginTop: 40,
        alignItems: "center"
    },
    headerLabel: {
        color: '#FFFFFF',
        fontSize: 35,
        fontWeight: '700',
        textAlign: "center"
    },
    formContainer: {
        alignSelf: "center",
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
        color: '#FFFFFF',
        borderRadius: 6,
        width: 345,
        height: 48,
        borderColor: '#FFFFFF',
        padding: 12,
        marginBottom: 15,
    },
    buttonContainer: {
        width: 313,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
        alignSelf: "center"
    },
    button: {
        width: 313,
        height: 56,
    },
    logoutText: {
        fontSize: 16,
        textAlign: 'center',
        marginTop: 40,
        color: '#667080',
    },
});

export default UserInfo;