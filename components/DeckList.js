// Imports
import React, { Component } from 'react';
import { StyleSheet, ScrollView, Text, View } from 'react-native';
import { connect } from 'react-redux';
import Deck from './Deck';
import { isEmpty } from 'lodash';

// Rendering a list
class DeckList extends Component {
  render() {
    const { decks, navigation } = this.props;

    // Display
    return (
      <ScrollView style={styles.container}>
        {!isEmpty(decks) ? (
          Object.keys(decks).map((key, index) => (
            <Deck
              title={decks[key].title}
              questions={decks[key].questions}
              key={decks[key].title}
              deckKey={key}
              navigation={navigation}
            />
          ))
        ) : (
          <View style={styles.noDeckView}>
            <Text style={styles.noDeckText}>
              You have no decks right now, so go create some!
            </Text>
          </View>
        )}
      </ScrollView>
    );
  }
}

// Styling
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#830DA8"
  },
  noDeckView: {
    alignItems: 'center',
    backgroundColor: "#E9A2FF",
  },
  noDeckText: {
    fontSize: 20,
  },
});

// In the case of empty list
const mapStateToProps = (state) => {
  if (isEmpty(state.cardDecks)) {
    return {};
  } else {
    return {
      decks: state.cardDecks,
    };
  }
};

export default connect(mapStateToProps)(DeckList);

