import React from 'react';
import { Image, Pressable, StyleSheet, Text } from "react-native";

const Household = ({ householdName, onPressHandler }) => {
    return (
        <Pressable style={({ pressed }) => pressed ? [styles.container, styles.pressed] : styles.container}
                   onPress={onPressHandler}>
            <Image style={styles.image} source={require('../images/imgplaceholder.png')}/>
            <Text style={styles.text}>{householdName}</Text>
        </Pressable>
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
    pressed: {
        opacity: 0.75,
    }
})

export default Household;