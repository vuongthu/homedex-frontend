import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import Scale from "./Scale";
import Quantity from "./Quantity";
import EditButton from "./EllipseButton";
import MoreInfo from "./MoreInfo";
import { Items } from "../../requests";
import HeartButton from "./HeartButton";
import ShoppingButton from "./ShoppingButton";

type ItemProps = {
    item: Items;
    onEditHandler: () => void;
    onUpdateAmount: (item: Items, unit: number) => void;
    onToggleLike: () => void;
    onTogglePurchase: () => void;
};

const Item = ({ item, onEditHandler, onUpdateAmount, onToggleLike, onTogglePurchase }: ItemProps) => {
    const { name, brand, expiration, measurement, unit, addInfo } = item;

    const onIncrease = () => {
        onUpdateAmount(item, unit + 1)
    };
    const onDecrease = () => onUpdateAmount(item, unit - 1);
    const setScaleValue = (value: number) => onUpdateAmount(item, Math.floor(value));

    return (
        <View style={styles.container}>
            <View style={styles.itemImgContainer}>
                <ShoppingButton
                    onPressHandler={onTogglePurchase}
                    purchase={item.purchase}
                ></ShoppingButton>
                <HeartButton
                    onPressHandler={onToggleLike}
                    liked={item.liked}
                ></HeartButton>
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.nameText}>{name}</Text>
                <Text style={styles.brandText}>{brand}</Text>
                <Text style={styles.expirationText}>{expiration ? expiration.slice(0, 10) : expiration}</Text>
            </View>
            <View style={styles.buttonContainer}>
                <EditButton
                    style={styles.editButton}
                    onPressHandler={onEditHandler}
                ></EditButton>
                <View>
                    {measurement === "SCALE" ?
                    <Scale
                        unit={unit}
                        setUnit={setScaleValue}
                    ></Scale> :
                    <Quantity
                        amount={unit}
                        onIncrease={onIncrease}
                        onDecrease={onDecrease}
                    ></Quantity>
                }
                </View>
                {addInfo ? <View style={styles.infoImg}>
                    <MoreInfo text={addInfo}></MoreInfo>
                </View> : <View style={styles.infoImg}></View>}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 105,
        width: 360,
        borderWidth: 2,
        borderColor: '#FFFFFF',
        marginBottom: 20,
        borderRadius: 6,
        flexDirection: 'row',
        alignSelf: 'center',
    },
    itemImgContainer: {
        flexDirection: 'column',
        width: 30,
        height: 100,
        justifyContent: 'space-evenly',
        paddingLeft: 10,
    },
    textContainer: {
        marginLeft: 15,
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        height: 100,
        paddingTop: 5,
        paddingLeft: 10,
        width: 200,
    },
    nameText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
    },
    brandText: {
        color: '#FFFFFF',
    },
    expirationText: {
        color: '#FFFFFF',
    },
    buttonContainer: {
        width: 100,
        height: 100,
        justifyContent: 'space-evenly',
        marginRight: 10,
    },
    editButton: {
        alignSelf: 'flex-end',
    },
    infoImg: {
        alignItems: 'flex-end',
    },
});

export default Item;