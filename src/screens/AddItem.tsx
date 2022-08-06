import React from 'react';
import { StyleSheet, Text, TextInput, View } from "react-native";
import AcceptButton from "../components/AcceptButton";
import MeasurementToggle from "../components/MeasurementToggle";


const AddItem = ({ navigation }) => {
    return (
        <View>
            <Text style={styles.header}>Add New Item</Text>
            <View style={styles.formContainer}>
                <Text style={styles.label}>Item Name</Text>
                <TextInput style={styles.input}
                           placeholder=""/>
                <Text style={styles.label}>Brand</Text>
                <TextInput style={styles.input}
                           placeholder=""/>
            </View>
            <MeasurementToggle></MeasurementToggle>
            <View style={styles.formContainer}>
                <Text style={styles.label}>Additional Information (optional)</Text>
                <TextInput style={styles.input}
                           placeholder=""/>
            </View>
            <View style={styles.button}>
                <AcceptButton title={'Add to Inventory'}></AcceptButton>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    header: {
        fontWeight: '700',
        fontSize: 30,
        color: '#667080',
        marginBottom: 33,
        marginTop: 35,
        textAlign: "center",
    },
    label: {
        color: '#667080',
        fontSize: 16,
        fontWeight: '400',
        marginBottom: 6,
    },
    formContainer: {
        alignSelf: "center",
        marginTop: 40,
    },
    input: {
        borderWidth: 1,
        borderStyle: 'solid',
        color: '#667080',
        borderRadius: 6,
        width: 345,
        height: 48,
        borderColor: '#667080',
        padding: 12,
        marginBottom: 6,
    },
    button: {
        width: 311,
        height: 56,
        backgroundColor: '#667080',
        marginTop: 35,
        overflow: 'hidden',
        marginBottom: 16,
        borderRadius: 6,
        alignSelf: 'center'
    },

});

export default AddItem;