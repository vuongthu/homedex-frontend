import { Pressable, StyleSheet, Text } from "react-native";

type AcceptButtonProps = {
    title: string;
    onPressHandler: () => void;
};

const AcceptButton = ({ title, onPressHandler }: AcceptButtonProps) => {
    return (
        <Pressable style={({ pressed }) => pressed ? [styles.button, styles.pressed] : styles.button}
                   onPress={() => onPressHandler ? onPressHandler() : console.log("Pressed!")}>
            <Text style={styles.buttonText}>{title}</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    button: {
        color: 'white',
        backgroundColor: '#667080',
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

export default AcceptButton;