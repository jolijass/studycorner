// Imports
import React, { Component } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  Animated,
  Keyboard,
  KeyboardAvoidingView,
} from 'react-native';
import { addCard } from '../actions';
import { connect } from 'react-redux';
import { addCardStorage } from '../utilities/api';
import { StackActions } from '@react-navigation/native';

// Adding cards
const maxCharacterLength = 75;
class CardPlus extends Component {
  state = {
    question: '',
    answer: '',
    notifierOpacity: new Animated.Value(0),
  };

  navigateBackAction = StackActions.pop(1);

  updateQuestionInput = (input) => {
    this.setState({ question: input });
  };

  updateAnswerInput = (input) => {
    this.setState({ answer: input });
  };

  //Validation
  validate = () => {
    const { answer, question } = this.state;
    if (
      answer.length === 0 ||
      answer.length > maxCharacterLength ||
      question.length === 0 ||
      question.length > maxCharacterLength
    ) {
      return false;
    }
    return true;
  };

  addNewCard = () => {
    const { question, answer, notifierOpacity } = this.state;
    const { dispatch, navigation } = this.props;

    if (this.validate()) {
      let dispatchObject = {
        deckKey: navigation.getParam('name', 'Deck'),
        question: question,
        answer: answer,
      };
      dispatch(addCard(dispatchObject));

      let saveObject = {
        key: navigation.getParam('name', 'Deck'),
        question: question,
        answer: answer,
      };
      addCardStorage(saveObject).then((res) => {
        navigation.state.params.onNavigateBack();
        navigation.dispatch(this.navigateBackAction);
      });
    } else {
      Keyboard.dismiss();
      Animated.sequence([
        Animated.spring(notifierOpacity, { toValue: 1, speed: 5 }),
        Animated.timing(notifierOpacity, { toValue: 0, duration: 3000 }),
      ]).start();
    }
  };

  // Presentation
  render() {
    const { question, answer, notifierOpacity } = this.state;
    return (
      <KeyboardAvoidingView style={styles.container} behavior='padding' enabled>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <View style={styles.container}>
            <TextInput
              style={styles.input}
              onChangeText={this.updateQuestionInput}
              value={question}
              placeholder={'What is the question for this card?'}
            />
            <TextInput
              style={styles.input}
              onChangeText={this.updateAnswerInput}
              value={answer}
              placeholder={'What is the answer for this cards question?'}
            />
            <TouchableOpacity style={styles.submit} onPress={this.addNewCard}>
              <Text>Submit</Text>
            </TouchableOpacity>
            <Animated.View
              style={[styles.newMessageNotifyer, { opacity: notifierOpacity }]}
            >
              <Text style={styles.errorMessage}>
                Your terms must be between 1 and {maxCharacterLength}{' '}
                characters long.
              </Text>
            </Animated.View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    );
  }
}

// Styling
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'

    },
    input: {
        alignSelf: 'stretch',
        borderColor: '#3A004D',
        borderWidth: 1,
        marginLeft: 15,
        marginRight: 15,
        marginTop: 25,
        padding: 10,
        borderRadius: 5,
        backgroundColor: '#3A004D',
    },
    submit: {
        marginTop: 25,
        padding: 10,
        backgroundColor: '#3A004D',
        height: 45,
        borderRadius: 2,
        alignSelf: 'stretch',
        alignItems: 'center',
        marginLeft: 15,
        marginRight: 15,
    },
    errorMessage: {
        marginTop: 20,
        backgroundColor: '#3A004D',
        padding: 25,
        alignSelf: 'stretch',
        borderRadius: 5
    }
})

const mapDispatchToProps = dispatch => ({
    addCard: data => dispatch(addCard(data)),
  });
  
  export default connect(null, mapDispatchToProps)(CardPlus);