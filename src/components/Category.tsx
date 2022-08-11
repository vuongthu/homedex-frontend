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
        <Pressable style={({ pressed }) => pressed ? [styles.text, styles.pressed] : styles.text}
                   onPress={onPressHandler}>
            <View style={styles.textContainer}>
                <View style={styles.buttonContainer}>
                    <PencilButton onPressHandler={onEditHandler} style={styles.moreImg}></PencilButton>
                </View>
                <Text style={styles.text}>{categoriesName}</Text>
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    textContainer: {
        borderColor: '#FFFFFF',
        borderWidth: 2,
        width: 160,
        height: 96,
        marginBottom: 16,
        borderRadius: 6,
    },
    text: {
        color: '#FFFFFF',
        lineHeight: 85,
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