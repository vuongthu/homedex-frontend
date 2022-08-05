import { ScrollView, StyleSheet, Text, View } from "react-native";
import AddButton from "../components/AddButton";
import Category from "../components/Category";

const CategoriesList = ({navigation}) => {
    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.headerLabel}>Home Categories</Text>
                <AddButton></AddButton>
            </View>
            <ScrollView>
                <View style={styles.categoryContainer}>
                    <Category categoriesName="Kitchen"></Category>
                    <Category categoriesName="Fridge"></Category>
                    <Category categoriesName="Master Bathroom"></Category>
                    <Category categoriesName="Garage"></Category>
                    <Category categoriesName="Bathroom 2"></Category>
                    <Category categoriesName="Bathroom 3"></Category>
                    <Category categoriesName="Bottom Pantry"></Category>
                    <Category categoriesName="Freezer"></Category>
                    <Category categoriesName="Kitchen Sink"></Category>
                    <Category categoriesName="Top Pantry"></Category>
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
        borderBottomColor: '#667080',
        paddingBottom: 40,
    },
    headerLabel: {
        color: '#667080',
        fontSize: 24,
        fontWeight: '700',
        marginLeft: 16,
    }
})

export default CategoriesList;