import { Alert, Image, StyleSheet, Text, TextInput, View } from "react-native";
import createHousehold, { Household } from "../../requests";
import React, { useState } from "react";
import AcceptButton from "../components/AcceptButton";
import CancelButton from "../components/CancelButton";

const CreateHousehold = ({navigation}) => {

    const [householdName, setHouseholdName] = useState("");
    const [isInputValid, setInputValid] = useState({nameInput: false})

    const onCreateHousehold = async () => {
        const household = await createHousehold(householdName, "e50aac94-b0b7-49a3-ad99-146c1eaf6583");
        Alert.alert('Household Created', `${household.name}`)
    }

    return (
        <View>
            <View style={styles.photoContainer}>
                <Text style={styles.header}>Create Your Household</Text>
                <Image source={require('../images/imgplaceholder.png')}/>
                <Text style={styles.photoLabel}>Choose Photo</Text>
            </View>
            <View style={styles.formContainer}>
                <Text style={styles.label}>Household Name</Text>
                <TextInput style={styles.input} value={householdName} onChangeText={setHouseholdName}
                           placeholder=""/>
                <View style={styles.buttonContainer}>
                    <View style={styles.button}>
                        <CancelButton title="Cancel"></CancelButton>
                    </View>
                    <View style={styles.button}>
                        <AcceptButton title="Save" onPressHandler={onCreateHousehold}></AcceptButton>
                    </View>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    photoContainer: {
        alignItems: 'center',
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
        marginTop: 100,
    },
    label: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '400',
    },
    formContainer: {
        marginLeft: 33,
        marginTop: 80,
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
        marginTop: 20,
    }
});

export default CreateHousehold;