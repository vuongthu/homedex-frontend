import React, { useCallback, useEffect, useState } from 'react';
import { Image, RefreshControl, ScrollView, StyleSheet, Text, View } from "react-native";
import SelectDropdown from 'react-native-select-dropdown'
import FavItem from "../components/FavItem";
import * as SecureStore from "expo-secure-store";
import {
    getHouseholds,
    getItemsByHousehold,
    Households,
    Items,
    toggleLikeItem,
    togglePurchaseItem
} from "../../requests";

const FavItemsList = () => {

    const [householdData, setHouseholdData] = useState<Households[]>([]);
    const [selectedHousehold, setSelectedHousehold] = useState<Households>(null);
    const [favItemsList, setFavItemsList] = useState<Items[]>([]);
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
    }, []);

    const onSelectHandler = (selectedItem: string, index: number) => {
        setSelectedHousehold(selectedItem);
    }

    useEffect(() => {
        if (selectedHousehold) {
            getItemsByHousehold(selectedHousehold.id, 'like')
                .then((items: Items[]) => {
                    setFavItemsList(items)
                })
        }
    }, [selectedHousehold])

    const onUnlikeItem = (itemId: string) => {
        toggleLikeItem(itemId)
            .then(() => {
                setFavItemsList((oldData: Items[]) => {
                    return oldData.filter((oldItem: Items) => oldItem.id !== itemId)
                })
            })
    }

    const onTogglePurchaseItem = (itemId: string) => {
        togglePurchaseItem(itemId)
            .then(() => {
                setFavItemsList((oldData: Items[]) => {
                    return oldData.map((oldItem: Items) => {
                        if (oldItem.id === itemId) {
                            return { ...oldItem, purchase: !oldItem.purchase }
                        } else {
                            return oldItem
                        }
                    })
                })
            })
    }

    const favItems = favItemsList.map((item: Items) => {
        return (
            <FavItem
                key={item.id}
                item={item}
                onLike={() => onUnlikeItem(item.id)}
                onShop={() => onTogglePurchaseItem(item.id)}
            ></FavItem>
        )
    })

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        if (selectedHousehold) {
            getItemsByHousehold(selectedHousehold.id, 'like')
                .then((items: Items[]) => {
                    setFavItemsList(items)
                })
                .finally(() => setRefreshing(false))
        }
    }, [selectedHousehold]);

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.headerLabel}>Favorite Items</Text>
                <Image source={require('../images/heart-emoji.png')}/>
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
                style={styles.favList}
                refreshControl={<RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                    tintColor={'#FFFFFF'}
                />}
            >
                {favItems}
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
    favList: {
        marginTop: 30,
        height: 500,
    },
});

export default FavItemsList;