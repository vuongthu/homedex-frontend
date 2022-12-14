import { ScrollView, StyleSheet, Text, View } from "react-native";
import AddButton from "../components/AddButton";
import Category from "../components/Category";
import { useEffect, useState } from "react";
import { Categories, createCategory, deleteCategory, editCategory, getCategories, Items } from "../../requests";

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
                onPressHandler={() => navigation.navigate('Items', {
                    categoryId: category.id,
                    categoryName: category.name
                })}
                onEditHandler={() => navigation.navigate('Category Form', {
                    householdId: householdId,
                    householdName: householdName,
                    categoryNameParam: category.name,
                    categoryId: category.id,
                })}
            ></Category>
        })

    useEffect(() => {
        if (route.params?.categoryName || route.params?.categoryId) {
            if (route.params?.action === 'add') {
                createCategory(route.params.categoryName, householdId)
                    .then((category: Categories) => {
                        setCategoriesData((oldData: Categories[]) => [...oldData, category])
                        navigation.navigate('Items', { categoryId: category.id, categoryName: category.name })
                    })
            } else if (route.params?.action === 'edit' && route.params?.categoryId) {
                editCategory(route.params.categoryName, route.params.categoryId)
                    .then((category: Categories) => {
                        setCategoriesData((oldCategories: Categories[]) => {
                            return oldCategories.map((oldCategory: Categories) => {
                                if (oldCategory.id === category.id) {
                                    return category
                                } else {
                                    return oldCategory
                                }
                            })
                        })
                    })
            } else if (route.params?.action === 'delete' && route.params?.categoryId) {
                deleteCategory(route.params?.categoryId)
                    .then(() => {
                        setCategoriesData((oldData: Categories[]) => {
                            return oldData.filter((oldCategory: Categories) => oldCategory.id !== route.params.categoryId)
                        })
                    })
            }
        }
    }, [route.params?.action, route.params?.categoryName, route.params?.categoryId]);

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <View style={styles.headerLabelContainer}>
                    <Text style={styles.householdLabel}>{householdName}</Text>
                    <Text style={styles.headerLabel}>Home Categories</Text>
                </View>
                <AddButton
                    style={styles.button}
                    onPressHandler={() => navigation.navigate('Category Form', {
                        householdId: householdId,
                        householdName: householdName,
                    })}
                ></AddButton>
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
        marginBottom: 120,
        alignSelf: 'center',
        width: 340,
    },
    headerContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 40,
        marginTop: 40,
        borderBottomWidth: 1,
        borderBottomColor: '#FFFFFF',
        paddingBottom: 40,
    },
    headerLabelContainer: {
        flexDirection: 'column'
    },
    householdLabel: {
        color: '#FFFFFF',
        fontSize: 35,
        fontWeight: '700',
        textTransform: 'uppercase',
    },
    headerLabel: {
        color: '#FFFFFF',
        fontSize: 24,
        fontWeight: '700',
    },
    button: {
        marginTop: 25,
    },
    categoryContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between'
    },
})

export default CategoriesList;