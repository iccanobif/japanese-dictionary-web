export const Actions = {
  CHANGE_DICTIONARY_SEARCH_INPUT: 1,
  DICTIONARY_RESULT_RECEIVED_OK: 2,
  DICTIONARY_RESULT_RECEIVED_FAIL: 3,
  CHANGE_RADICAL_SEARCH_INPUT: 4,
};

export function changeDictionarySearchInput(text, position) {
  return (dispatch) => {
    dispatch({
      type: Actions.CHANGE_DICTIONARY_SEARCH_INPUT,
      text,
      position,
    });

    if (!text)
      return {
        type: Actions.DICTIONARY_RESULT_RECEIVED_OK,
        results: [],
      };

    // TODO check that there's no other fetch currently running

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
