import React, { useContext } from 'react';
import { View, Text, ScrollView, StyleSheet, Image, TextInput, Button } from "react-native";
import { AuthContext } from "../../App";
import TextButton from "../components/TextButton";

const UserInfo = ({ navigation }) => {

    const { signOut } = useContext(AuthContext);

    return (
        <View style={styles.container}>
            <Image style={styles.img} source={require('../images/logo.png')}/>
            <View style={styles.headerContainer}>
                <Text style={styles.headerLabel}>Account Details</Text>
            </View>
            <View style={styles.formContainer}>
                <Text style={styles.label}>Username</Text>
                <TextInput
                    style={styles.input}
                    // value={}
                    placeholder=""
                    // onChangeText={}
                />
                <Text style={styles.label}>Email</Text>
                <TextInput
                    style={styles.input}
                    // value={}
                    placeholder=""
                    // onChangeText={}
                />
                <Text style={styles.label}>Password</Text>
                <TextInput
                    style={styles.input}
                    // value={}
                    placeholder=""
                    // onChangeText={}
                />
            </View>
            <TextButton text={'Sign Out?'} onPressHandler={signOut} style={styles.logoutText}></TextButton>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
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
    label: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '400',
        marginBottom: 6,
    },
    formContainer: {
        alignSelf: "center",

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
    img: {
        width: 125,
        height: 93,
        marginTop: 50,
        alignSelf: 'center'
    },
    logoutText: {
        fontSize: 16,
        textAlign: 'center',
        marginTop: 30,
        color: '#667080',
    }
});

export default UserInfo;