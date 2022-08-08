import React from 'react';
import { StyleSheet, View } from "react-native";
import DuoToggleSwitch from "react-native-duo-toggle-switch";
import Scale from "./Scale";
import Quantity from "./Quantity";
import BigQuantity from "./BigQuantity";
import BigScale from "./BigScale";

type MeasurementToggleProps = {
    measureType: string;
    setMeasureType: (type: string) => void;
    unit: number;
    setUnit: (unit: number) => void;
};

const MeasurementToggle = ({ measureType, setMeasureType, unit, setUnit }: MeasurementToggleProps) => {

    const onIncrease = () => setUnit((unit: number) => unit + 1)


    const onDecrease = () => setUnit((unit: number) => unit - 1);

    const setScaleValue = (value: number) => setUnit(Math.floor(value));


    return (
        <View style={styles.container}>
            <DuoToggleSwitch
                style={styles.toggle}
                primaryText='Quantity'
                secondaryText='Scale'
                onPrimaryPress={() => setMeasureType('Quantity')}
                onSecondaryPress={() => setMeasureType('Scale')}
                activeColor='#667080'
                inactiveColor='#FFFFFF'/>
            {measureType === 'Scale' ? <BigScale setUnit={setScaleValue}></BigScale> :
                <BigQuantity amount={unit} onIncrease={onIncrease}
                             onDecrease={onDecrease}></BigQuantity>}
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        alignSelf: "center",
    },
    toggle: {
        width: 170,
        alignSelf: "center",
    },
});

export default MeasurementToggle;