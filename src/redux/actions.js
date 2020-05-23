export const DICTIONARY_CHANGE_SEARCH_INPUT = "DICTIONARY_CHANGE_SEARCH_INPUT";
export const DICTIONARY_RESULT_RECEIVED_OK = "DICTIONARY_RESULT_RECEIVED_OK";
export const DICTIONARY_RESULT_RECEIVED_FAIL = "DICTIONARY_RESULT_RECEIVED_FAIL";
export const DICTIONARY_APPEND_KANJI = "DICTIONARY_APPEND_KANJI";
export const DICTIONARY_START_FETCH = "DICTIONARY_START_FETCH";

export function appendKanji(kanji) {
  return {
    type: DICTIONARY_APPEND_KANJI,
    kanji,
  };
}

export function changeDictionarySearchInput(text, position) {
  return {
    type: DICTIONARY_CHANGE_SEARCH_INPUT,
    text,
    position,
  };
}

// TODO check that there's no other fetch currently running

export function fetchDictionaryResults() {
  return (dispatch, getState) => {

    const text = getState().dictionary.currentQueryString;

    if (!text)
      return {
        type: DICTIONARY_RESULT_RECEIVED_OK,
        results: [],
      };

    dispatch({ type: DICTIONARY_START_FETCH });

    return fetch("https://japdictapi.herokuapp.com/sentence/" + text)
      .then((result) => {
        if (!result.ok)
          dispatch({
            type: DICTIONARY_RESULT_RECEIVED_FAIL,
            error: result.statusText,
          });
        else
          result.json().then((json) => {
            dispatch({
              type: DICTIONARY_RESULT_RECEIVED_OK,
              results: json,
            });
          });
      })
      .catch((error) => {
        dispatch({
          type: DICTIONARY_RESULT_RECEIVED_FAIL,
          error,
        });
      });
  };
}
