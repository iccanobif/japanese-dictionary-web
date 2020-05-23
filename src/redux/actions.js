export const DICTIONARY_CHANGE_SEARCH_INPUT = "DICTIONARY_CHANGE_SEARCH_INPUT";
export const DICTIONARY_RESULT_RECEIVED_OK = "DICTIONARY_RESULT_RECEIVED_OK";
export const DICTIONARY_RESULT_RECEIVED_FAIL =
  "DICTIONARY_RESULT_RECEIVED_FAIL";
export const DICTIONARY_APPEND_KANJI = "DICTIONARY_APPEND_KANJI";
export const DICTIONARY_START_FETCH = "DICTIONARY_START_FETCH";

export const RADICAL_CHANGE_SEARCH_INPUT = "RADICAL_CHANGE_SEARCH_INPUT";
export const RADICAL_RESULT_RECEIVED_OK = "RADICAL_RESULT_RECEIVED_OK";
export const RADICAL_RESULT_RECEIVED_FAIL = "RADICAL_RESULT_RECEIVED_FAIL";
export const RADICAL_START_FETCH = "RADICAL_START_FETCH";

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
  return async (dispatch, getState) => {
    try {
      const text = getState().dictionary.currentQueryString;

      if (!text)
        return {
          type: DICTIONARY_RESULT_RECEIVED_OK,
          results: [],
        };

      dispatch({ type: DICTIONARY_START_FETCH });

      const result = await fetch(
        "https://japdictapi.herokuapp.com/sentence/" + text
      );

      if (result.ok)
        dispatch({
          type: DICTIONARY_RESULT_RECEIVED_OK,
          results: await result.json(),
        });
      else
        dispatch({
          type: DICTIONARY_RESULT_RECEIVED_FAIL,
          error: result.statusText,
        });
    } catch (error) {
      dispatch({
        type: DICTIONARY_RESULT_RECEIVED_FAIL,
        error,
      });
    }
  };
}

export function changeRadicalSearchInput(text) {
  return {
    type: RADICAL_CHANGE_SEARCH_INPUT,
    text,
  };
}

export function fetchRadicalResults() {
  return async (dispatch, getState) => {
    try {
      const text = getState().radicals.currentQueryString;

      if (!text)
        return {
          type: RADICAL_RESULT_RECEIVED_OK,
          results: [],
        };

      dispatch({ type: RADICAL_START_FETCH });

      const result = await fetch(
        "https://japdictapi.herokuapp.com/kanji-by-radical/" + text
      );

      if (result.ok)
        dispatch({
          type: RADICAL_RESULT_RECEIVED_OK,
          results: await result.json(),
        });
      else
        dispatch({
          type: RADICAL_RESULT_RECEIVED_FAIL,
          error: result.statusText,
        });
    } catch (error) {
      dispatch({
        type: RADICAL_RESULT_RECEIVED_FAIL,
        error,
      });
    }
  };

}
