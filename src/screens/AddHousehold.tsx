import { Image, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import AcceptButton from "../components/AcceptButton";
import CancelButton from "../components/CancelButton";

const AddHousehold = ({ route, navigation }) => {

    const { userId } = route.params;
    const [householdName, setHouseholdName] = useState("");
    const [isInputValid, setInputValid] = useState(false);

    const handleHouseholdTextChange = (text: string) => {
        setHouseholdName(text);
        setInputValid(text.length > 0);
    };

    return (
        <View>
            <View style={styles.photoContainer}>
                <Image style={styles.img} source={require('../images/logo.png')}/>
                <Text style={styles.header}>Create Your Household</Text>
                <Image source={require('../images/imgplaceholder.png')}/>
                <Text style={styles.photoLabel}>Choose Photo</Text>
            </View>
            <View style={styles.formContainer}>
                <Text style={styles.label}>Household Name</Text>
                <TextInput style={styles.input} value={householdName} onChangeText={handleHouseholdTextChange}
                           placeholder=""/>
                <View style={styles.buttonContainer}>
                    <CancelButton
                        style={styles.button}
                        title="Cancel"
                        onPressHandler={() => navigation.navigate('Households', { userId: userId })}
                    ></CancelButton>
                    <AcceptButton
                        style={styles.button}
                        title="Save"
                        onPressHandler={() => navigation.navigate({
                            name: 'Households',
                            params: { userId: userId, householdName: householdName },
                            merge: true,
                        })}
                        disabled={!isInputValid}
                    ></AcceptButton>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    photoContainer: {
        alignItems: 'center',
    },
    img: {
        width: 125,
        height: 93,
        marginTop: 50,
    },
    photoLabel: {
        marginTop: 10,
        color: '#FFFFFF',
        fontSize: 14,
        fontWeight: '400',
    },
    header: {
        fontWeight: '700',
        fontSize: 30,
        color: '#FFFFFF',
        marginBottom: 33,
        marginTop: 50,
    },
    label: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '400',
    },
    formContainer: {
        marginLeft: 33,
        marginTop: 50,
    },
    input: {
        height: 48,
        width: 313,
        borderWidth: 1,
        borderRadius: 6,
        padding: 10,
        marginTop: 10,
        borderColor: '#FFFFFF',
    },
    button: {
        width: 147,
        height: 56,
    },
    buttonContainer: {
        width: 313,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 30,
    },
});

export default AddHousehold;