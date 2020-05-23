export const Actions = {
  DICTIONARY_CHANGE_SEARCH_INPUT: 1,
  DICTIONARY_RESULT_RECEIVED_OK: 2,
  DICTIONARY_RESULT_RECEIVED_FAIL: 3,
  DICTIONARY_APPEND_KANJI: 4,
  DICTIONARY_START_FETCH: 5,
  CHANGE_RADICAL_SEARCH_INPUT: 6,
};

export function appendKanji(kanji) {
  return {
    type: Actions.DICTIONARY_APPEND_KANJI,
    kanji,
  };
}

export function changeDictionarySearchInput(text, position) {
  return {
    type: Actions.DICTIONARY_CHANGE_SEARCH_INPUT,
    text,
    position,
  };
}

// TODO check that there's no other fetch currently running

export function fetchDictionaryResults() {
  return (dispatch, getState) => {

    const text = getState().dictionaryCurrentQueryString;

    if (!text)
      return {
        type: Actions.DICTIONARY_RESULT_RECEIVED_OK,
        results: [],
      };

    dispatch({ type: Actions.DICTIONARY_START_FETCH });

    return fetch("https://japdictapi.herokuapp.com/sentence/" + text)
      .then((result) => {
        if (!result.ok)
          dispatch({
            type: Actions.DICTIONARY_RESULT_RECEIVED_FAIL,
            error: result.statusText,
          });
        else
          result.json().then((json) => {
            dispatch({
              type: Actions.DICTIONARY_RESULT_RECEIVED_OK,
              results: json,
            });
          });
      })
      .catch((error) => {
        dispatch({
          type: Actions.DICTIONARY_RESULT_RECEIVED_FAIL,
          error,
        });
      });
  };
}
