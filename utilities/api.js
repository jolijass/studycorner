import AsyncStorage from '@react-native-async-storage/async-storage';

const DECK_KEY = 'DECK_KEY';

// Submit Deck
export async function submitDeck({ deck, key }) {
  try {
    const storedDecks = await AsyncStorage.getItem(DECK_KEY);
    let parsedDecks = JSON.parse(storedDecks);

    if (!parsedDecks) {
      parsedDecks = {};
    }

    parsedDecks[key] = deck;

    await AsyncStorage.setItem(DECK_KEY, JSON.stringify(parsedDecks));

    return parsedDecks;
  } catch (error) {
    console.log(error);
    throw new Error('Unable to submit deck');
  }
}

// Card Storage
export async function addCardStorage({ question, answer, key }) {
  try {
    const storedDecks = await AsyncStorage.getItem(DECK_KEY);
    let parsedDecks = JSON.parse(storedDecks);

    if (!parsedDecks || !parsedDecks[key]) {
      throw new Error('Deck not found');
    }

    parsedDecks[key].questions.push({ question, answer });

    await AsyncStorage.setItem(DECK_KEY, JSON.stringify(parsedDecks));
  } catch (error) {
    console.log(error);
    throw new Error('Unable to add card to deck');
  }
}

// Fetching Decks
export function fetchDecks() {
  return AsyncStorage.getItem(DECK_KEY)
      .then((res) => {
          return res;
      })
}

// Deleting Decks
export async function deleteDeck({ key }) {
  try {
    const storedDecks = await AsyncStorage.getItem(DECK_KEY);
    let parsedDecks = JSON.parse(storedDecks);

    if (parsedDecks) {
      delete parsedDecks[key];

      await AsyncStorage.setItem(DECK_KEY, JSON.stringify(parsedDecks));
    }
  } catch (error) {
    console.log(error);
    throw new Error('Unable to delete deck');
  }
}

// Getting Decks
export function getDeck({key}) {
  return AsyncStorage.getItem(DECK_KEY)
      .then((result) => {
          const data = JSON.parse(result)
          console.log('key: ' + JSON.stringify(key))
          console.log('data: ' + JSON.stringify(data))
          if(data !== null) {
              return data[key]
          }
          return undefined
  })
}


