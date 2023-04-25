// Imports
import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native'
import PropTypes from 'prop-types';
import { removeDeck } from "../actions";
import { connect } from 'react-redux';
import { deleteDeck } from "../utilities/api";
import { useNavigation } from '@react-navigation/native';

// Deck Settings for the most part
const Deck = ({ title, questions, deckKey, dispatch }) => {
  const navigation = useNavigation();

  const navigateToDeckOptions = () => {
    navigation.navigate('DeckOptions', { name: title });
  }

  const removeDeckHandler = () => {
    dispatch(removeDeck({ deckKey }));
    deleteDeck({ key: deckKey });
  }

  // Display
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.deckTitle}>{title}</Text>
        <Text style={styles.deckQuestionCount}>{questions.length} cards</Text>
        <TouchableOpacity
          style={[styles.deckOptions, { backgroundColor: '#3A004D' }]}
          onPress={navigateToDeckOptions}
        >
          <Text>Select Deck</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.deckOptions, { backgroundColor: '#3A004D' }]}
          onPress={removeDeckHandler}
        >
          <Text>Remove Deck</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

Deck.propTypes = {
  title: PropTypes.string.isRequired,
  questions: PropTypes.array.isRequired,
  deckKey: PropTypes.string.isRequired
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'stretch',
    justifyContent: 'center',
    borderBottomWidth: 1,
  },
  textContainer: {
    padding: 20,
  },
  deckTitle: {
    fontSize: 25,
    alignSelf: 'center'
  },
  deckQuestionCount: {
    alignSelf: 'center'
  },
  deckOptions: {
    alignItems: 'center',
    padding: 15,
    marginTop: 15,
    borderRadius: 15
  },
});

export default connect()(Deck);
