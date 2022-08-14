import React from 'react';
import { Pressable, StyleSheet, Text, View } from "react-native";
import PencilButton from "./PencilButton";

type CategoryProps = {
    categoriesName: string;
    onPressHandler: () => void;
    onEditHandler: () => void;
};

const Category = ({ categoriesName, onPressHandler, onEditHandler }: CategoryProps) => {
    return (
        <Pressable style={({ pressed }) => pressed ? [styles.container, styles.pressed] : styles.container}
                   onPress={onPressHandler}>
            <View style={styles.buttonContainer}>
                <PencilButton onPressHandler={onEditHandler} style={styles.editButton}></PencilButton>
            </View>
            <Text style={styles.text}>{categoriesName}</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        borderColor: '#FFFFFF',
        borderWidth: 2,
        width: 160,
        height: 96,
        marginBottom: 16,
        borderRadius: 6,
    },
    buttonContainer: {
        marginTop: 10,
        marginRight: 13,
    },
    editButton: {
        alignSelf: 'flex-end'
    },
    text: {
        color: '#FFFFFF',
        lineHeight: 85,
        paddingLeft: 10,
    },
    pressed: {
        opacity: 0.75,
    },
})

export default Category;