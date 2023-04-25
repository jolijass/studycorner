import { createAction } from '@reduxjs/toolkit';

export const ADD_DECK = 'ADD_DECK';
export const ADD_CARD = 'ADD_CARD';
export const LOAD_DECK = 'LOAD_DECK';
export const REMOVE_DECK = 'REMOVE_DECK';

export const addDeck = createAction(ADD_DECK, (title) => ({ payload: { title } }));
export const loadDeck = createAction(LOAD_DECK, (key, title, questions) => ({ payload: { key, title, questions } }));
export const removeDeck = createAction(REMOVE_DECK, (deckKey) => ({ payload: { deckKey } }));
export const addCard = createAction(ADD_CARD, (deckKey, question, answer) => ({ payload: { deckKey, question, answer } }));
