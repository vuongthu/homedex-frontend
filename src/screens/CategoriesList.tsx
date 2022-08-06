import { ScrollView, StyleSheet, Text, View } from "react-native";
import AddButton from "../components/AddButton";
import Category from "../components/Category";
import { useEffect, useState } from "react";
import { Categories, getCategories } from "../../requests";

const CategoriesList = ({ route, navigation }) => {

    const { householdId, householdName } = route.params;

    const [categoriesData, setCategoriesData] = useState([]);

    useEffect(() => {
        getCategories(householdId).then((categories: [Categories]) => setCategoriesData(categories))
    }, [])

    const categoriesList =
        categoriesData.map((category: Categories) => {
            return <Category
                key={category.id}
                categoriesName={category.name}
                onPressHandler={() => navigation.navigate('Items', { categoryId: category.id, categoryName: category.name })}
            ></Category>
        })

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <View style={styles.headerLabelContainer}>
                    <Text style={styles.householdLabel}>{householdName}</Text>
                    <Text style={styles.headerLabel}>Home Categories</Text>
                </View>
                <View style={styles.button}>
                    <AddButton></AddButton>
                </View>
            </View>
            <ScrollView>
                <View style={styles.categoryContainer}>
                    {categoriesList}
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
    categoryContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
    },
    headerContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 40,
        marginTop: 60,
        borderBottomWidth: 1,
        borderBottomColor: '#FFFFFF',
        paddingBottom: 40,
    },
    headerLabel: {
        color: '#FFFFFF',
        fontSize: 24,
        fontWeight: '700',
        marginLeft: 16,
    },
    householdLabel: {
        color: '#FFFFFF',
        fontSize: 35,
        fontWeight: '700',
        marginLeft: 16,
        textTransform: 'uppercase',
    },
    headerLabelContainer: {
        flexDirection: 'column'
    },
    button: {
        marginTop: 25,
    },
})

export default CategoriesList;