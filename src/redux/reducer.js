import { Actions } from "./actions";

const initialState = {
  currentQueryString: "", // always perfectly aligned with the actual state of the textbox
  currentCursorPosition: 0, // always perfectly aligned with the actual state of the textbox
  isQueryRunning: false, // if it's true, ignore new keystrokes
  lastKeystrokeTime: 0, // when a setTimeout for debouncing finishes, i check that no new keys have been pressed in the meanwhile
  isWaitingForDebouncer: false, // launch the setTimeout only if this is false and there are no pending fetches
};

export default function mainReducer(state = initialState, action) {
  console.log(action);
  switch (action.type) {
    case Actions.CHANGE_DICTIONARY_SEARCH_INPUT:
      return state;
    default:
      return state;
  }
}
