import React from 'react';
import { Image, StyleSheet, Text, View } from "react-native";

const Household = ({householdName}) => {
    return (
        <View style={styles.container}>
            <Image style={styles.image} source={require('../images/imgplaceholder.png')}/>
            <Text style={styles.text}>{householdName}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        marginBottom: 24,
        borderWidth: 1,
        borderColor: '#FFFFFF',
        borderRadius: 6,
        padding: 10,
        width: 325,
        height: 100,
        alignSelf: 'center',
    },
    text: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '700',
        marginTop: 33
    },
    image: {
        marginLeft: 23,
        marginRight: 23,
    },
})

export default Household;