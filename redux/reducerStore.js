import { createStore, combineReducers } from "redux";
import * as types from "./actionTypes";

const initialState = {
  cardA: 0,
  cardB: 0,
  totalBCards: []
};

const AddReducer = (state = initialState, action) => {
  const totalBCards = [...state.totalBCards];
  switch (action.type) {
    case types.ADD_B_CARDS:
      for (let i = 0; i < 1000; i += 1) {
        const countB = state.cardB;
        totalBCards.push(countB);
      }

      return { ...state, totalBCards };
    case types.ADD_A:
      const cardA = (state.cardA += 1);

      return { ...state, cardA };
    case types.ADD_B:
      let cardB = (state.cardB += 1);
      for (let i = 0; i < totalBCards.length; i += 1) {
        totalBCards[i] += 1;
      }

      return { ...state, cardB, totalBCards };
    default:
      return state;
  }
};

const reducers = combineReducers({
  add: AddReducer
});

const store = createStore(reducers);

export default store;
