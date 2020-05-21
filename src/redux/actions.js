export const Actions = {
  CHANGE_DICTIONARY_SEARCH_INPUT: 1,
  DICTIONARY_RESULT_RECEIVED_FROM_BACKEND: 2,
  CHANGE_RADICAL_SEARCH_INPUT: 3,
};

export function changeDictionarySearchInput(text, position) {
  return {
    type: Actions.CHANGE_DICTIONARY_SEARCH_INPUT,
    text,
    position,
  };
}
