import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from "react-native";
import AddButton from "../components/AddButton";
import Item from "../components/Item";
import { addItem, getItems, Items } from "../../requests";

const ItemList = ({ route, navigation }) => {

    const { categoryId, categoryName } = route.params;
    const [itemsListData, setItemsData] = useState([]);

    useEffect(() => {
        getItems(categoryId)
            .then((items: [Items]) => setItemsData(items))
    }, []);

    const itemsList = itemsListData.map((item: Items) => {
        return <Item
            key={item.id}
            item={item}
            onEditHandler={() => navigation.navigate('Edit Item', { item: item })}
        ></Item>
    });

    useEffect(() => {
        if (route.params.item) {
            addItem(categoryId, route.params.item)
                .then((item: Items) => {
                    setItemsData((oldData: Items[]) => [...oldData, item])
                })
        }
    }, [route.params?.item]);

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.headerLabel}>{categoryName} Inventory</Text>
                <AddButton
                    onPressHandler={() => navigation.navigate('Add New Item', {
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
        padding: 10,
    },
    headerContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 40,
        marginTop: 60,
    },
    headerLabel: {
        color: '#FFFFFF',
        fontSize: 24,
        fontWeight: '700',
        marginLeft: 16,
        textTransform: 'capitalize',
    }
});

export default ItemList;