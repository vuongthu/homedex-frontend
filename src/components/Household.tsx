import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import PencilButton from "./PencilButton";

type HouseholdProps = {
    householdName: string;
    householdImage?: string;
    onPressHandler: () => void;
    onEditHandler: () => void;
};

const Household = ({ householdName, householdImage, onPressHandler, onEditHandler }: HouseholdProps) => {
    return (
        <Pressable style={({ pressed }) => pressed ? [styles.container, styles.pressed] : styles.container}
                   onPress={onPressHandler}>
            {
                householdImage ? <Image style={styles.image} source={{ uri: householdImage }}/>
                    : <Image style={styles.image} source={require('../images/imgplaceholder.png')}/>
            }
            <Text style={styles.text}>{householdName}</Text>
            <View style={styles.buttonContainer}>
                <PencilButton onPressHandler={onEditHandler} style={styles.editButton}></PencilButton>
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
    image: {
        width: 77,
        height: 77,
        borderRadius: 50,
        marginLeft: 5,
        marginRight: 15,
    },
    text: {
        color: '#FFFFFF',
        fontSize: 20,
        fontWeight: '700',
        marginTop: 33,
        width: 180,
    },
    buttonContainer: {
        marginTop: 5,
    },
    editButton: {
        alignSelf: 'flex-end'
    },
    pressed: {
        opacity: 0.75,
    },
})

export default Household;