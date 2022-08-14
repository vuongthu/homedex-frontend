import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from "react-native";
import AddButton from "../components/AddButton";
import Item from "../components/Item";
import {
    addItem,
    deleteItem,
    getItems,
    ItemRequest,
    Items,
    toggleLikeItem,
    togglePurchaseItem,
    updateItem
} from "../../requests";

const ItemList = ({ route, navigation }) => {

    const { categoryId, categoryName } = route.params;
    const [itemsListData, setItemsData] = useState<Items[]>([]);

    useEffect(() => {
        getItems(categoryId)
            .then((items: Items[]) => setItemsData(items))
    }, []);

    const updateAmountOnItem = (item: Items, amount: number) => {
        const request = new ItemRequest(
            item.name,
            item.measurement,
            item.brand,
            item.addInfo,
            item.expiration,
            amount,
        );
        updateItem(categoryId, item.id, request)
            .then((updatedItem: Items) => {
                setItemsData((oldData: Items[]) => {
                    return oldData.map((oldItem: Items) => {
                        if (oldItem.id === updatedItem.id) {
                            return updatedItem
                        } else {
                            return oldItem
                        }
                    })
                })
            })
            .catch((err) => console.log(`Error updating item from itemList: ${err}`));
    };

    const toggleItemLiked = (itemId: string) => {
        toggleLikeItem(itemId)
            .then(() => {
                setItemsData((oldItems: Items[]) => {
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

    const toggleItemPurchase = (itemId: string) => {
        togglePurchaseItem(itemId)
            .then(() => {
                setItemsData((oldItems: Items[]) => {
                    return oldItems.map((oldItem: Items) => {
                        if (oldItem.id === itemId) {
                            return { ...oldItem, purchase: !oldItem.purchase }
                        } else {
                            return oldItem
                        }
                    })
                })
            })
    }

    const itemsList = itemsListData.map((item: Items) => {
        return <Item
            key={item.id}
            item={item}
            onUpdateAmount={updateAmountOnItem}
            onEditHandler={() => navigation.navigate({
                name: 'Item Form',
                params: {
                    categoryId: categoryId,
                    categoryName: categoryName,
                    item: item
                }
            })}
            onToggleLike={() => toggleItemLiked(item.id)}
            onTogglePurchase={() => toggleItemPurchase(item.id)}
        ></Item>
    });

    useEffect(() => {
        if (route.params?.item || route.params?.itemId) {
            if (route.params?.action === 'add') {
                addItem(categoryId, route.params.item)
                    .then((item: Items) => {
                        setItemsData((oldData: Items[]) => [...oldData, item])
                    })
            } else if (route.params?.action === 'edit') {
                updateItem(categoryId, route.params.itemId, route.params.item)
                    .then((updatedItem: Items) => {
                        setItemsData((oldData: Items[]) => {
                            return oldData.map((oldItem: Items) => {
                                if (oldItem.id === updatedItem.id) {
                                    return updatedItem
                                } else {
                                    return oldItem
                                }
                            })
                        })
                    })
            } else if (route.params?.action === 'delete') {
                deleteItem(categoryId, route.params.itemId)
                    .then(() => {
                        setItemsData((oldData: Items[]) => {
                            return oldData.filter((oldItem: Items) => oldItem.id !== route.params.itemId)
                        })
                    })
            }
        }
    }, [route.params?.action, route.params?.item, route.params?.itemId])

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <View style={styles.headerLabelContainer}>
                    <Text style={styles.categoryLabel}>{categoryName}</Text>
                    <Text style={styles.headerLabel}>Inventory</Text>
                </View>
                <AddButton
                    style={styles.button}
                    onPressHandler={() => navigation.navigate('Item Form', {
                        categoryId: categoryId,
                        categoryName: categoryName
                    })}
                ></AddButton>
            </View>
            <ScrollView>
                {itemsList}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 10,
        alignSelf: 'center',
        width: 370,
    },
    headerContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 40,
        marginTop: 40,
    },
    headerLabelContainer: {
        flexDirection: 'column'
    },
    categoryLabel: {
        color: '#FFFFFF',
        fontSize: 35,
        fontWeight: '700',
        marginLeft: 16,
        textTransform: 'uppercase',
    },
    headerLabel: {
        color: '#FFFFFF',
        fontSize: 24,
        fontWeight: '700',
        marginLeft: 16,
        textTransform: 'capitalize',
    },
    button: {
        marginTop: 25,
        marginRight: 16,
    },
});

export default ItemList;