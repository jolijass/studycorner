import React, { useState } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  TextInput,
  Animated,
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
} from 'react-native';
import { connect } from 'react-redux';
import LabelText from './Text';
import { addDeck } from '../actions';
import { submitDeck, getDeck } from '../utilities/api';

//
function NewCards(props) {
  const [titleText, setTitleText] = useState('');
  const [notifierOpacity] = useState(new Animated.Value(0));
  const [errorNotifierOpacity] = useState(new Animated.Value(0));

  const addNewDeck = async () => {
    const validated = await validate();

    if (validated) {
      let dispatchObject = {
        title: titleText,
      };
      props.addDeck(dispatchObject);

      let newDeck = {
        title: titleText,
        questions: [],
      };

      submitDeck({ deck: newDeck, key: titleText });

      setTitleText('');
      Keyboard.dismiss();

      Animated.sequence([
        Animated.spring(notifierOpacity, { toValue: 1, speed: 5 }),
        Animated.timing(notifierOpacity, { toValue: 0, duration: 3000 }),
      ]).start();
      props.navigation.navigate('DeckList', { newDeck });
    } else {
      Keyboard.dismiss();

      Animated.sequence([
        Animated.spring(errorNotifierOpacity, { toValue: 1, speed: 5 }),
        Animated.timing(errorNotifierOpacity, { toValue: 0, duration: 5000 }),
      ]).start();
    }
  };

  // Validation
  const validate = async () => {
    if (titleText.length === 0) {
      return false;
    }
    const res = await getDeck({ key: titleText });
    return typeof res === 'undefined';
  };

  const updateDeckInput = (input) => {
    setTitleText(input);
  };

  // Display
  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View>
          <LabelText text={'What will you name your deck?'} />
          <TextInput
            style={styles.input}
            onChangeText={updateDeckInput}
            value={titleText}
          />
          <TouchableOpacity
            style={styles.submitBtn}
            onPress={addNewDeck}
          >
            <Text>Add Deck</Text>
          </TouchableOpacity>
          <Animated.View
            style={[
              styles.newMessageNotifyer,
              { opacity: notifierOpacity },
              { backgroundColor: '#F5D7FF' },
            ]}
          >
            <Text style={styles.messageStyles}>
              Your new deck has been added, now go study!
            </Text>
          </Animated.View>
          <Animated.View
            style={[
              styles.newMessageNotifyer,
              { opacity: errorNotifierOpacity },
              { backgroundColor: '#F5D7FF' },
            ]}
          >
            <Text style={styles.messageStyles}>
              This is already a deck, please name it something else.
            </Text>
          </Animated.View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

// Styling
const styles = StyleSheet.create({
    container: {
        padding: 20
    },
    input: {
        borderWidth: 1,
        borderColor: '#3A004D',
        borderRadius: 5,
        backgroundColor: '#ffffff',
        padding: 10,
    },
    submitBtn: {
        backgroundColor: '#830DA8',
        padding: 10,
        height: 45,
        borderRadius: 2,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 15
    },
    newMessageNotifyer: {
        marginTop: 2,
        padding: 25,
        alignSelf: 'stretch',
        borderRadius: 5
    },
    messageStyles: {
        alignSelf: 'center',
        fontSize: 20
    }
})

export default connect(null, { addDeck })(NewCards);

