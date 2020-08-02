import { combineReducers } from "redux";
import {
  DICTIONARY_CHANGE_SEARCH_INPUT,
  DICTIONARY_START_FETCH,
  DICTIONARY_RESULT_RECEIVED_OK,
  DICTIONARY_RESULT_RECEIVED_FAIL,
  DICTIONARY_APPEND_KANJI,
  RADICAL_CHANGE_SEARCH_INPUT,
  RADICAL_RESULT_RECEIVED_OK,
  RADICAL_RESULT_RECEIVED_FAIL,
  RADICAL_START_FETCH,
} from "./actions";

const initialDictionaryState = {
  currentQueryString: "", // always perfectly aligned with the actual state of the textbox
  currentCursorPosition: 0, // always perfectly aligned with the actual state of the textbox
  isQueryRunning: false, // if it's true, ignore new keystrokes
  currentlyDisplayedQuery: "", // the query for the results that are currently displayed on screen
  queryResults: [],
  initialSelectedWordIndex: 0,
  lastKeystrokeTime: 0, // when a setTimeout for debouncing finishes, i check that no new keys have been pressed in the meanwhile
  isWaitingForDebouncer: false, // launch the setTimeout only if this is false and there are no pending fetches
};

function dictionary(state = initialDictionaryState, action) {
  switch (action.type) {
    case DICTIONARY_CHANGE_SEARCH_INPUT:
      return Object.assign({}, state, {
        currentQueryString: action.text,
        currentCursorPosition: action.position,
        initialSelectedWordIndex: state.isQueryRunning
          ? state.initialSelectedWordIndex
          : calculateWordIndexFromCursorPosition(
              state.currentlyDisplayedQuery,
              state.queryResults.map((r) => r.word),
              action.position
            ),
      });

    case DICTIONARY_START_FETCH:
      return Object.assign({}, state, {
        isQueryRunning: true,
      });

    case DICTIONARY_RESULT_RECEIVED_OK:
      return Object.assign({}, state, {
        isQueryRunning: false,
        queryResults: action.results,
        currentlyDisplayedQuery: action.text,
        initialSelectedWordIndex: calculateWordIndexFromCursorPosition(
          action.text,
          action.results.map((r) => r.word),
          state.currentCursorPosition
        ),
      });

    case DICTIONARY_RESULT_RECEIVED_FAIL:
      return Object.assign({}, state, {
        isQueryRunning: false,
        error: action.error,
      });

    case DICTIONARY_APPEND_KANJI:
      return Object.assign({}, state, {
        currentQueryString: state.currentQueryString + action.kanji,
      });

    default:
      return state;
  }
}

const radicalsInitialState = {
  currentQueryString: "", // always perfectly aligned with the actual state of the textbox
  isQueryRunning: false, // if it's true, ignore new keystrokes
  queryResults: null, // null means that the page has just been opened and no search has been done yet
};

function radicals(state = radicalsInitialState, action) {
  switch (action.type) {
    case RADICAL_CHANGE_SEARCH_INPUT:
      return Object.assign({}, state, {
        currentQueryString: action.text,
      });
    case RADICAL_RESULT_RECEIVED_OK:
      return Object.assign({}, state, {
        isQueryRunning: false,
        queryResults: action.results,
      });
    case RADICAL_RESULT_RECEIVED_FAIL:
      return Object.assign({}, state, {
        isQueryRunning: false,
        error: action.error,
      });
    case RADICAL_START_FETCH:
      return Object.assign({}, state, {
        isQueryRunning: true,
      });
    default:
      return state;
  }
}

const mainReducer = combineReducers({
  dictionary,
  radicals,
});

export default mainReducer;

export function calculateWordIndexFromCursorPosition(
  fullText,
  splitWords,
  cursorPosition
) {
  let adjustedCursorPosition = fullText
    .substring(0, cursorPosition)
    .replace(/[\s.,。、]/g, "").length;

  for (let i = 0; i < splitWords.length; i++) {
    adjustedCursorPosition -= splitWords[i].length;
    if (adjustedCursorPosition < 0) return i;
  }
  return splitWords.length - 1; // should never happen
}
