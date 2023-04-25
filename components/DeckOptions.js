import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { getDeck } from "../utilities/api";
import { useNavigation, useNavigationState } from "@react-navigation/native";

// Deck Settings
const DeckOptions = () => {
    const navigation = useNavigation();
    const [title, setTitle] = useState(null);
    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        const deckTitle = navigation.getParam('name', 'Deck');
        getDeck({key: deckTitle}).then((deck) => {
            setTitle(deck.title);
            setQuestions(deck.questions);
        });
    }, [navigation]);

    const handleOnNavigationback = () => {
        const deckTitle = navigation.getParam('name', 'Deck');
        getDeck({key: deckTitle}).then((deck) => {
            setTitle(deck.title);
            setQuestions(deck.questions);
        });
    };

    const addCardView = () => {
        navigation.navigate('AddCard', {
            name: navigation.getParam('name', 'Deck'),
            onNavigateBack: handleOnNavigationback
        });
    };

    const startQuiz = () => {
        navigation.navigate('Quiz', {
            name: navigation.getParam('name', 'Deck')
        });
    };

    // Display
    return (
        <View style={styles.container}>
            <View style={styles.displayPanel}>
                <Text style={styles.deckTitle}>{title}</Text>
                <Text style={styles.questionCount}>{questions.length} cards</Text>
            </View>
            <View style={styles.controlPanel}>
                {questions.length > 0 ? (
                    <TouchableOpacity
                        style={[styles.buttonContainer, {backgroundColor: green}]}
                        onPress={startQuiz}
                    >
                        <Text style={styles.buttonText}>Start Quiz</Text>
                    </TouchableOpacity>
                ):('')}
                <TouchableOpacity
                    style={[styles.buttonContainer, {backgroundColor: lightBlue}]}
                    onPress={addCardView}
                >
                    <Text style={styles.buttonText}>Add Card</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

// Styling
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    deckTitle: {
        fontSize: 30
    },
    questionCount: {

    },
    buttonText: {
        fontSize: 20
    },
    buttonContainer: {
        padding: 20,
        marginTop: 10,
        borderRadius: 15
    },
    controlPanel: {
        justifyContent: 'center'
    },
    displayPanel: {
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default DeckOptions;
