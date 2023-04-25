import React from 'react';
import { Text, StyleSheet } from 'react-native';

// Text Stuff
export default function TextLabel({ text }) {
    return (
        <Text style={styles.text}>
            {text}
        </Text>
    )
}

const styles = StyleSheet.create({
    text: {
        marginVertical: 15,
        fontSize: 40,
    }
});
