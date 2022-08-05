import React from 'react';
import { Image, StyleSheet, Text, View } from "react-native";
import Scale from "./Scale";
import Quantity from "./Quantity";
import EditButton from "./EditButton";

type ItemProps = {
    name: string;
    brand: string;
    expiration: string;
    measurement: string;
};

const Item = ({name, brand, expiration, measurement}: ItemProps) => {
    return (
        <View style={styles.container}>
            <View>
                <Image style={styles.itemImg} source={require('../images/imgitem.png')}/>
            </View>
            <View style={styles.textContainer}>
                <Text>{name}</Text>
                <Text>{brand}</Text>
                <Text>{expiration}</Text>
            </View>
            <View>
                <View style={styles.moreImg}>
                    <EditButton></EditButton>
                </View>
                <Scale></Scale>
                <Quantity amount="5" onIncrease={() => console.log("Increase!")}
                          onDecrease={() => console.log("Decrease!")}></Quantity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 96,
        backgroundColor: '#DCE3E9',
        marginBottom: 20,
        borderRadius: 6,
        flexDirection: 'row',
        alignItems: 'center',
    },
    textContainer: {
        marginLeft: 15,
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        height: 85,
        paddingTop: 5,
        width: 150,
    },
    itemImg: {
        height: 74,
        width: 74,
        marginLeft: 10,
        borderRadius: 6,
    },
    itemName: {
        fontSize: 16,
        fontWeight: '700'
    },
    moreImg: {
        alignItems: "flex-end",
    }
});

export default Item;