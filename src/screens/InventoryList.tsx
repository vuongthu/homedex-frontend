import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from "react-native";
import AddButton from "../components/AddButton";
import Item from "../components/Item";
import { getItems, Items } from "../../requests";

const InventoryList = ({ route, navigation }) => {

    const { categoryId, categoryName } = route.params;
    const [itemsListData, setItemsData] = useState([]);
    useEffect(() => {
        getItems(categoryId)
            .then((items: [Items]) => setItemsData(items))
    }, []);

    const itemsList = itemsListData.map((item: Items) => {
        return <Item
            key={item.id}
            name={item.name}
            brand={item.brand}
            expiration={item.expiration}
            measurement={item.measurement}
            unit={item.unit}
            addInfo={item.addInfo}
        ></Item>
    })


    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.headerLabel}>{categoryName} Inventory</Text>
                <AddButton
                    onPressHandler={() => navigation.navigate('Add New Item', { categoryId: categoryId })}
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

export default InventoryList;