import React, { useCallback, useEffect, useState } from 'react';
import { Image, RefreshControl, ScrollView, StyleSheet, Text, View } from "react-native";
import ShoppingItem from "../components/ShoppingItem";
import {
    getHouseholds,
    getItemsByHousehold,
    Households,
    Items,
    toggleLikeItem,
    togglePurchaseItem
} from "../../requests";
import * as SecureStore from "expo-secure-store";
import SelectDropdown from "react-native-select-dropdown";

const ShoppingItemsList = () => {

    const [householdData, setHouseholdData] = useState<Households[]>([]);
    const [selectedHousehold, setSelectedHousehold] = useState<Households>(null);
    const [shopItemsList, setShopItemsList] = useState<Items[]>([]);
    const [refreshing, setRefreshing] = useState(false);


    const retrieveUser = async () => {
        try {
            return await SecureStore.getItemAsync('user-id');
        } catch (err) {
            console.log(`user-id from secure store not found: ${err}`)
        }
    };

    useEffect(() => {
        retrieveUser().then((userId: string) => {
            getHouseholds(userId).then((households: Households[]) => {
                setHouseholdData(households)
            })
        });
    }, [])

    const onSelectHandler = (selectedItem: string, index: number) => {
        setSelectedHousehold(selectedItem);
    }

    useEffect(() => {
        if (selectedHousehold) {
            getItemsByHousehold(selectedHousehold.id, 'purchase')
                .then((items: Items[]) => {
                    setShopItemsList(items)
                })
        }
    }, [selectedHousehold])

    const onUnlikeItem = (itemId: string) => {
        toggleLikeItem(itemId)
            .then(() => {
                setShopItemsList((oldItems: Items[]) => {
                    return oldItems.map((oldItem: Items) => {
                        if (oldItem.id === itemId) {
                            return { ...oldItem, liked: !oldItem.liked }
                        } else {
                            return oldItem
                        }
                    })
                })
            })
    }

    const onPurchaseItem = (itemId: string) => {
        togglePurchaseItem(itemId)
            .then(() => {
                setShopItemsList((oldData: Items[]) => {
                    return oldData.filter((oldItem: Items) => oldItem.id !== itemId)
                })
            })
    }

    const shopItems = shopItemsList.map((item: Items) => {
        return (
            <ShoppingItem
                key={item.id}
                item={item}
                onLike={() => onUnlikeItem(item.id)}
                onShop={() => onPurchaseItem(item.id)}
            ></ShoppingItem>
        )
    })

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        if (selectedHousehold) {
            getItemsByHousehold(selectedHousehold.id, 'purchase')
                .then((items: Items[]) => {
                    setShopItemsList(items)
                })
                .finally(() => setRefreshing(false))
        }
    }, [selectedHousehold]);

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.headerLabel}>Shopping List</Text>
                <Image source={require('../images/shopping-emoji.png')}/>
            </View>
            <SelectDropdown
                data={householdData}
                defaultButtonText={'Select Household'}
                onSelect={onSelectHandler}
                buttonTextAfterSelection={(selectedItem, index) => selectedItem.name}
                rowTextForSelection={(item, index) => item.name}
                buttonStyle={styles.dropdownButton}
                buttonTextStyle={styles.dropdownButtonText}
                renderDropdownIcon={isOpened => {
                    return isOpened ? <Image source={require('../images/caret-up.png')}/>
                        : <Image source={require('../images/caret-down.png')}/>
                }}
                dropdownStyle={styles.dropdownStyle}
                rowStyle={styles.dropdownRow}
                rowTextStyle={styles.dropdownRowText}
            />
            <ScrollView
                style={styles.shopList}
                refreshControl={<RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                />}
            >
                {shopItems}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        marginBottom: 120,
    },
    headerContainer: {
        flexDirection: "row",
        justifyContent: "center",
        marginBottom: 30,
        marginTop: 100,
        alignItems: "center"
    },
    headerLabel: {
        color: '#FFFFFF',
        fontSize: 35,
        fontWeight: '700',
        textAlign: 'center',
        marginRight: 15,
    },
    dropdownButton: {
        width: '80%',
        height: 50,
        backgroundColor: '#365F7E',
        borderRadius: 6,
        alignSelf: 'center',
    },
    dropdownButtonText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        textTransform: 'capitalize',
    },
    dropdownStyle: {
        marginRight: 15,
        borderRadius: 6,
    },
    dropdownRow: {
        backgroundColor: '#365F7E',
        borderBottomColor: '#FFFFFF',
    },
    dropdownRowText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        textTransform: 'capitalize',
    },
    shopList: {
        marginTop: 30,
    },
});

export default ShoppingItemsList;