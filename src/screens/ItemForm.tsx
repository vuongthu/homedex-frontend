import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, View } from "react-native";
import AcceptButton from "../components/AcceptButton";
import MeasurementToggle from "../components/MeasurementToggle";
import DateTimePicker from '@react-native-community/datetimepicker';
import AddButton from "../components/AddButton";
import { ItemRequest, Items } from "../../requests";
import CancelButton from "../components/CancelButton";
import TextButton from "../components/TextButton";

type ItemFormProps = {
    route: any;
    navigation: any;
};

const ItemForm = ({ route, navigation }: ItemFormProps) => {

    const { categoryId, categoryName, item } = route.params;
    const [isValid, setIsValid] = useState(false);
    const [itemName, setItemName] = useState("");
    const [itemBrand, setItemBrand] = useState("");
    const [addInfo, setAddInfo] = useState("");
    const [measureType, setMeasureType] = useState("QUANTITY");
    const [unit, setUnit] = useState(0);
    const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
    const [expiration, setExpiration] = useState(new Date());

    useEffect(() => {
        if (item) {
            setItemName(item.name);
            setItemBrand(item.brand);
            setAddInfo(item.addInfo);
            setMeasureType(item.measurement);
            setUnit(item.unit);
            if (item.expiration) {
                setExpiration(new Date(item.expiration));
                setIsDatePickerVisible(true)
            }
        }
    }, []);

    useEffect(() => {
        setIsValid(itemName.length && itemBrand.length && unit > 0 && itemName.length <= 22 && itemBrand.length <= 23)
    }, [itemName, itemBrand, unit]);

    const nameTextChangeHandler = (name: string) => {
        setItemName(name);
    }

    const brandTextChangeHandler = (name: string) => {
        setItemBrand(name);
    }

    const addInfoTextChangeHandler = (name: string) => {
        setAddInfo(name);
    }

    const expirationDateChangeHandler = (event, selectedDate) => {
        setExpiration(selectedDate)
    }

    const onSaveItem = () => {
        const newItem = new ItemRequest(
            itemName,
            measureType,
            itemBrand,
            addInfo,
            isDatePickerVisible ? expiration.toISOString() : null,
            unit
        )
        if (item) {
            navigation.navigate({
                name: 'Items',
                params: {
                    categoryId: categoryId,
                    categoryName: categoryName,
                    item: newItem,
                    itemId: item.id,
                    action: 'edit'
                },
                merge: true,
            })
        } else {
            navigation.navigate({
                name: 'Items',
                params: { categoryId: categoryId, categoryName: categoryName, item: newItem, action: 'add' },
                merge: true,
            })
        }
    }

    const onDeleteItem = () => {
        navigation.navigate({
            name: 'Items',
            params: { categoryId: categoryId, categoryName: categoryName, itemId: item.id, action: 'delete' },
            merge: true,
        })
    }

    return (
        <View>
            <Text style={styles.header}>{item ? `Edit Item` : 'Add New Item'}</Text>
            <View style={styles.formContainer}>
                <Text style={styles.label}>Item Name</Text>
                <TextInput
                    style={styles.input}
                    value={itemName}
                    placeholder=""
                    onChangeText={nameTextChangeHandler}
                />
                <Text style={styles.label}>Brand</Text>
                <TextInput
                    style={styles.input}
                    value={itemBrand}
                    placeholder=""
                    onChangeText={brandTextChangeHandler}
                />
            </View>
            <View style={styles.formContainer}>
                <MeasurementToggle
                    measureType={measureType}
                    setMeasureType={setMeasureType}
                    unit={unit}
                    setUnit={setUnit}
                ></MeasurementToggle>
            </View>
            <View style={styles.formContainer}>
                <View style={styles.expContainer}>
                    <Text style={styles.expText}>Add Expiration Date</Text>
                    <AddButton
                        onPressHandler={() => setIsDatePickerVisible(!isDatePickerVisible)}
                        style={{ marginRight: 0 }}
                    ></AddButton>
                </View>
                {isDatePickerVisible ? <DateTimePicker
                    value={expiration}
                    display={'default'}
                    mode={'date'}
                    onChange={expirationDateChangeHandler}
                    style={styles.datePicker}
                /> : <></>}
            </View>
            <View style={styles.formContainer}>
                <Text style={styles.label}>Additional Information (optional)</Text>
                <TextInput
                    style={styles.input}
                    value={addInfo}
                    placeholder=""
                    onChangeText={addInfoTextChangeHandler}
                />
                <View style={styles.buttonContainer}>
                    <CancelButton
                        style={styles.button}
                        title="Cancel"
                        onPressHandler={() => navigation.navigate('Items', {
                            categoryId: categoryId,
                            categoryName: categoryName
                        })}
                    ></CancelButton>
                    <AcceptButton
                        style={styles.button}
                        title={'Save'}
                        onPressHandler={onSaveItem}
                        disabled={!isValid}
                    ></AcceptButton>
                </View>
                {item ?
                    <TextButton
                        onPressHandler={() => onDeleteItem()}
                        text={'Delete?'}
                        style={styles.textButton}
                    ></TextButton>
                    : <></>}
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    header: {
        fontWeight: '700',
        fontSize: 30,
        color: '#FFFFFF',
        marginTop: 90,
        textAlign: "center",
        textTransform: 'capitalize',
    },
    formContainer: {
        alignSelf: "center",
        marginTop: 5,
    },
    label: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '400',
        marginBottom: 6,
        marginTop: 15,
    },
    input: {
        borderWidth: 1,
        borderStyle: 'solid',
        color: '#FFFFFF',
        borderRadius: 6,
        width: 345,
        height: 48,
        borderColor: '#FFFFFF',
        padding: 12,
    },
    expContainer: {
        width: 345,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    expText: {
        color: '#FFFFFF',
        fontSize: 16,
    },
    datePicker: {
        marginTop: 10,
    },
    buttonContainer: {
        width: 345,
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
    },
    button: {
        width: 160,
        height: 56,
    },
    textButton: {
        fontSize: 14,
        textAlign: 'center',
        marginTop: 30,
        color: '#667080',
    },
    pressed: {
        opacity: 0.75,
    },
});

export default ItemForm;