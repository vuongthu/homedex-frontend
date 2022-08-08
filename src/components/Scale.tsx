import React from 'react';
import Slider from '@react-native-community/slider';
import { StyleSheet } from "react-native";

type ScaleProps = {
    unit: number;
    setUnit: (value: number) => void;
    style?: {};
};

const Scale = ({ unit, setUnit, style }: ScaleProps) => {
    return (
        <Slider
            style={[styles.slider, style]}
            onValueChange={setUnit}
            thumbImage={require('../images/pointer.png')}
            value={unit}
            minimumValue={0}
            maximumValue={100}
        />
    )
}

const styles = StyleSheet.create({
    slider: {
        width: 100,
        height: 40,
        minimumTrackTintColor: '#667080',
        maximumTrackTintColor: '#000000',
    }
})

export default Scale;