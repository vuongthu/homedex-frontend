import React from 'react';
import Slider from '@react-native-community/slider';
import { StyleSheet } from "react-native";

const Scale = () => {
    return (
        <Slider style={styles.slider}
                thumbImage={require('../images/pointer.png')}
                minimumTrackTintColor={'#8EA7BA'}
                minimumValue={0}
                maximumValue={100}
        />
    )
}

const styles = StyleSheet.create({
    slider: {
        width: 100,
        height: 40,
    }
})

export default Scale;