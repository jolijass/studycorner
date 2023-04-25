import { createSlice } from '@reduxjs/toolkit';

const initialState = {};

const cardDecksSlice = createSlice({
  name: 'cardDecks',
  initialState,
  reducers: {
    addCard(state, action) {
      const { deckKey, question, answer } = action.payload;
      state[deckKey].questions.push({ question, answer });
    },
    addDeck(state, action) {
      const { title } = action.payload;
      state[title] = { title, questions: [] };
    },
    removeDeck(state, action) {
      const { deckKey } = action.payload;
      delete state[deckKey];
    },
    loadDeck(state, action) {
      const { title, questions } = action.payload;
      state[title] = { title, questions };
    },
  },
});

export const { addCard, addDeck, removeDeck, loadDeck } = cardDecksSlice.actions;

export default cardDecksSlice.reducer;
