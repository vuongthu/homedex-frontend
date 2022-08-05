import React from 'react';
import Slider from '@react-native-community/slider';
import { StyleSheet } from "react-native";

const Scale = () => {
    return (
        <Slider style={styles.slider} thumbImage={require('../images/pointer.png')}/>
    )
}

const styles = StyleSheet.create({
    slider: {
        width: 300,
        height: 40,
        minimumValue: 0,
        maximumValue: 100,
        minimumTrackTintColor: '#667080',
        maximumTrackTintColor: '#000000',
    }
})

export default Scale;