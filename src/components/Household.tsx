import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import EditButton from "./EditButton";

const Household = ({ householdName, onPressHandler, onEditHandler }) => {
    return (
        <Pressable style={({ pressed }) => pressed ? [styles.container, styles.pressed] : styles.container}
                   onPress={onPressHandler}>
            <Image style={styles.image} source={require('../images/imgplaceholder.png')}/>
            <Text style={styles.text}>{householdName}</Text>
            <View style={styles.buttonContainer}>
                <EditButton onPressHandler={onEditHandler} style={styles.moreImg}></EditButton>
            </View>
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
        fontSize: 20,
        fontWeight: '700',
        marginTop: 33,
        width: 155,
    },
    image: {
        marginLeft: 23,
        marginRight: 23,
    },
    pressed: {
        opacity: 0.75,
    },
    buttonContainer: {
        marginTop: 10,
    },
    moreImg: {
        alignSelf: 'flex-end'
    },
})

export default Household;