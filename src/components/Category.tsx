import React from 'react';
import { Pressable, StyleSheet, Text, View } from "react-native";
import EditButton from "./EditButton";

type CategoryProps = {
    categoriesName: string;
    onPressHandler: () => void;
    onEditHandler: () => void;
};

const Category = ({ categoriesName, onPressHandler, onEditHandler }: CategoryProps) => {
    return (
        <Pressable style={({ pressed }) => pressed ? [styles.text, styles.pressed] : styles.text}
                   onPress={onPressHandler}>
            <View style={styles.textContainer}>
                <View style={styles.buttonContainer}>
                    <EditButton onPressHandler={onEditHandler} style={styles.moreImg}></EditButton>
                </View>
                <Text style={styles.text}>{categoriesName}</Text>
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    textContainer: {
        backgroundColor: '#DCE3E9',
        width: 160,
        height: 96,
        marginBottom: 16,
        borderRadius: 6,
    },
    text: {
        color: '#667080',
        lineHeight: 130,
        paddingLeft: 10,
    },
    pressed: {
        opacity: 0.75,
    },
    buttonContainer: {
        marginTop: 10,
        marginRight: 13,
    },
    moreImg: {
        alignSelf: 'flex-end'
    },
})

export default Category;