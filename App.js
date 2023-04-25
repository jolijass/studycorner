// Imports
import React from 'react';
import { StyleSheet, View, StatusBar, Platform } from 'react-native';
import { Provider } from 'react-redux';
import reducer from './reducers';
import { createStore, applyMiddleware } from 'redux';
import NewCards from './components/NewCards';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Constants from 'expo-constants';
import { createLogger } from 'redux-logger';
import DeckList from './components/DeckList';
import { fetchDecks } from './utilities/api';
import { loadDeck } from './actions';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import DeckOptions from './components/DeckOptions';
import CardPlus from './components/CardPlus';
import QuizTime from './components/QuizTime';

// Display part one
function UdaciStatusBar({ backgroundColor, ...props }) {
  return (
    <View style={{ backgroundColor: backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  );
}

const store = createStore(reducer, applyMiddleware(createLogger()));

const Tab = createBottomTabNavigator();

// Tabs
function Tabs() {
  return (
    <Tab.Navigator
      initialRouteName='DeckList'
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'DeckList') {
            return <FontAwesome name={iconName} size={size} color={color} />;
          } else if (route.name === 'New Deck') {
            return <Ionicons name={iconName} size={size} color={color} />;
          }
        },
        tabBarActiveTintColor: "#F5D7FF",
        tabBarStyle: {
          backgroundColor: "#3A004D",
          shadowColor: 'rgba(0, 0, 0, 0.24)',
          shadowOffset: {
            width: 0,
            height: 3,
          },
          shadowRadius: 6,
          shadowOpacity: 1,
        },
      })}
    >
      <Tab.Screen name='Decks' component={DeckList} options={{ tabBarLabel: 'Decks' }} />
      <Tab.Screen name='Add A New Deck' component={NewCards} options={{ tabBarLabel: 'Add Deck' }} />
    </Tab.Navigator>
  );
}

// Navigation
const Stack = createStackNavigator();

function MainNavigator() {
  return (
    <Stack.Navigator
      initialRouteName='Home'
      screenOptions={{
        headerStyle: {
          backgroundColor: "#3A004D",
        },
        headerTintColor: "#3A004D",
      }}
    >
      <Stack.Screen name='Home' component={Tabs} options={{ headerShown: false }} />
      <Stack.Screen
        name='Deck Options'
        component={DeckOptions}
        options={({ route }) => ({ title: `${route.params.name}` })}
      />
      <Stack.Screen
        name='Add Card'
        component={CardPlus}
        options={({ route }) => ({ title: `Add Card: ${route.params.name}` })}
      />
      <Stack.Screen
        name='Quiz'
        component={QuizTime}
        options={({ route }) => ({ title: `Quiz: ${route.params.name}` })}
      />
    </Stack.Navigator>
  );
}
export default class App extends React.Component {

  // Display part two
    render() {
    return (
      <NavigationContainer>
        <Provider store={store}>
          <View style={styles.container}>
              <UdaciStatusBar backgroundColor={'#3A004D'} barStyle="dark-content" />
              <MainNavigator/>
          </View>
        </Provider>
      </NavigationContainer>
    );
    }
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

// Fetching decks
fetchDecks().then((res) => {
  if (res !== null) {
    let decksObject = JSON.parse(res);

    Object.keys(decksObject).map((e) => {
      let dispatchObject = {
        key: e,
        title: decksObject[e].title,
        questions: decksObject[e].questions,
      };
      store.dispatch(loadDeck(dispatchObject));
    });
  } else {
    console.log('No flashcards found');
  }
}).catch((error) => {
  console.log(error);
});
