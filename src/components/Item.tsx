import React from 'react';
import { Image, StyleSheet, Text, View } from "react-native";
import Scale from "./Scale";
import Quantity from "./Quantity";
import EditButton from "./EditButton";
import MoreInfo from "./MoreInfo";
import { Items } from "../../requests";

type ItemProps = {
    item: Items;
    onEditHandler: () => void;
};

const Item = ({ item, onEditHandler }: ItemProps) => {
    const {name, brand, expiration, measurement, unit, addInfo } = item;
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
            <View style={styles.buttonContainer}>
                <EditButton
                    style={styles.moreImg}
                    onPressHandler={onEditHandler}
                ></EditButton>
                {measurement === "SCALE" ? <Scale></Scale> :
                    <Quantity amount={unit} onIncrease={() => console.log("Increase!")}
                              onDecrease={() => console.log("Decrease!")}></Quantity>
                }
                {addInfo ? <View style={styles.infoImg}>
                    <MoreInfo text={addInfo}></MoreInfo>
                </View> : <></>}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 105,
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
    buttonContainer: {
        width: 100,
        height: 74,
        justifyContent: 'space-between'
    },
    moreImg: {
        alignSelf: 'flex-end',
    },
    infoImg: {
        alignItems: 'flex-end',
    },
});

export default Item;