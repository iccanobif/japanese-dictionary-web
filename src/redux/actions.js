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
  return async(dispatch, getState) => {
    dispatch({
      type: DICTIONARY_APPEND_KANJI,
      kanji,
    });

    // Fetch the results for the new query
    const { currentQueryString, currentCursorPosition } = getState().dictionary;
    const action = fetchDictionaryResultsIfNeeded(currentQueryString, currentCursorPosition);
    await dispatch(action);
  }
}

export function fetchDictionaryResultsIfNeeded(text, position) {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: DICTIONARY_CHANGE_SEARCH_INPUT,
        text,
        position,
      });

      const {
        queryChangesCount,
        currentlyDisplayedInput,
      } = getState().dictionary;

      if (text === currentlyDisplayedInput) return;

      // No need to actually fetch anything if the string is empty
      if (!text || text.match(/^\s*$/)) {
        dispatch({
          type: DICTIONARY_RESULT_RECEIVED_OK,
          results: [],
        });
        return;
      }

      dispatch({ type: DICTIONARY_START_FETCH });

      const result = await fetch(
        process.env.REACT_APP_API_URL + "/sentence/" + text
      );

      // // In the meanwhile the input has already changed and its results have already bee
      // if (queryChangesCount !== getState().dictionary.queryChangesCount)
      //   return

      if (result.ok) {
        dispatch({
          type: DICTIONARY_RESULT_RECEIVED_OK,
          results: await result.json(),
          text,
          queryChangesCount,
        });
      } else {
        dispatch({
          type: DICTIONARY_RESULT_RECEIVED_FAIL,
          errorMessage: result.statusText,
        });
      }
    } catch (error) {
      dispatch({
        type: DICTIONARY_RESULT_RECEIVED_FAIL,
        errorMessage: error.message,
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
        process.env.REACT_APP_API_URL + "/kanji-by-radical/" + text
      );

      if (result.ok)
        dispatch({
          type: RADICAL_RESULT_RECEIVED_OK,
          results: await result.json(),
        });
      else
        dispatch({
          type: RADICAL_RESULT_RECEIVED_FAIL,
          errorMessage: result.statusText,
        });
    } catch (error) {
      dispatch({
        type: RADICAL_RESULT_RECEIVED_FAIL,
        errorMessage: error.message,
      });
    }
  };
}
