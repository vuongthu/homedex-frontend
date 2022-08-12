import { StyleSheet, Text, View } from "react-native";
import MoreInfo from "./MoreInfo";
import React from "react";
import ShoppingButton from "./ShoppingButton";
import HeartButton from "./HeartButton";
import { Items } from "../../requests";

type FavItemProps = {
    item: Items;
    onLike: () => void;
    onShop: () => void;
};

const FavItem = ({ item, onLike, onShop }: FavItemProps) => {

    const { name, brand, expiration, addInfo } = item;

    return (
        <View style={styles.container}>
            <View style={styles.itemImgContainer}>
                <ShoppingButton onPressHandler={onShop}></ShoppingButton>
                <HeartButton
                    onPressHandler={onLike}
                    liked={item.liked}
                ></HeartButton>
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.nameText}>{name}</Text>
                <Text style={styles.brandText}>{brand}</Text>
                <Text style={styles.expirationText}>{expiration ? expiration.slice(0, 10) : expiration}</Text>
            </View>
            <View style={styles.buttonContainer}>
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
        width: 280,
        borderWidth: 2,
        borderColor: '#FFFFFF',
        marginBottom: 20,
        borderRadius: 6,
        flexDirection: 'row',
        alignSelf: 'center',
    },
    textContainer: {
        marginLeft: 15,
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        height: 100,
        paddingLeft: 20,
        width: 110,
    },
    itemImgContainer: {
        flexDirection: 'column',
        width: 30,
        height: 100,
        justifyContent: 'space-evenly',
        paddingLeft: 15,
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
        marginTop: 70,
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
    }
});

export default FavItem;