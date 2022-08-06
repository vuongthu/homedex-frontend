import { ScrollView, StyleSheet, Text, View } from "react-native";
import AddButton from "../components/AddButton";
import Category from "../components/Category";
import { useEffect, useState } from "react";
import { Categories, getCategories } from "../../requests";

const CategoriesList = ({ route, navigation }) => {

    const { householdId } = route.params;

    const [categoriesData, setCategoriesData] = useState([]);

    useEffect(() => {
        getCategories(householdId).then((categories: [Categories]) => setCategoriesData(categories))
    }, [])

    const categoriesList =
        categoriesData.map((category: Categories) => {
            return <Category
                key={category.id}
                categoriesName={category.name}
                onPressHandler={() => navigation.navigate('Items', { categoryId: category.id })}
            ></Category>
        })

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.headerLabel}>Home Categories</Text>
                <AddButton></AddButton>
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
    }
})

export default CategoriesList;