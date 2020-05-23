import { Actions } from "./actions";

const initialState = {
  currentQueryString: "", // always perfectly aligned with the actual state of the textbox
  currentCursorPosition: 0, // always perfectly aligned with the actual state of the textbox
  isQueryRunning: false, // if it's true, ignore new keystrokes
  dictionaryQueryResults: [],
  lastKeystrokeTime: 0, // when a setTimeout for debouncing finishes, i check that no new keys have been pressed in the meanwhile
  isWaitingForDebouncer: false, // launch the setTimeout only if this is false and there are no pending fetches
};

export default function mainReducer(state = initialState, action) {
  switch (action.type) {
    case Actions.DICTIONARY_CHANGE_SEARCH_INPUT:
      return Object.assign({}, state, {
        currentQueryString: action.text,
        currentCursorPosition: action.position,
      });

    case Actions.DICTIONARY_START_FETCH:
      return Object.assign({}, state, {
        isQueryRunning: true,
      });

    case Actions.DICTIONARY_RESULT_RECEIVED_OK:
      return Object.assign({}, state, {
        isQueryRunning: false,
        dictionaryQueryResults: action.results,
      });

    case Actions.DICTIONARY_RESULT_RECEIVED_FAIL:
      return Object.assign({}, state, {
        isQueryRunning: false,
        error: action.error,
      });

    case Actions.DICTIONARY_APPEND_KANJI:
      return Object.assign({}, state, {
        currentQueryString: state.currentQueryString + action.kanji,
      });

    default:
      return state;
  }
}
