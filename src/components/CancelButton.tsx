import { Pressable, StyleSheet, Text } from "react-native";

interface CancelButtonProps {
    title: string;
    onPressHandler?: () => void;
    style?: {};
}

const CancelButton = ({ title, onPressHandler, style }: CancelButtonProps) => {
    return (
        <Pressable
            style={({ pressed }) => pressed ? [styles.button, styles.pressed, style] : [styles.button, style]}
            onPress={onPressHandler}
        >
            <Text style={styles.buttonText}>{title}</Text>
        </Pressable>
    )
}


const styles = StyleSheet.create({
    button: {
        color: 'white',
        backgroundColor: '#C1C6CD',
        padding: 17,
        textAlign: 'center',
        borderRadius: 6,
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
        fontWeight: '700',
        fontSize: 16,
    },
    pressed: {
        opacity: 0.75,
    }
});

export default CancelButton;