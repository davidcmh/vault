import { combineReducers } from "redux";

const initialNotesState = {
  isFetching: false,
  items: [],
  page: 0
};

function notesReducer(state = initialNotesState, action) {
  switch (action.type) {
    case 'GET_NOTES':
      return { ...state, isFetching: true, page: state.page + 1 };
    case 'GET_NOTES_SUCCESS':
      return {
        ...state,
        isFetching: false,
        items: state.items.concat(action.payload.data)
      };
    case 'GET_NOTES_FAIL':
      return {
        ...state,
        loading: false,
        error: 'Error while fetching notes'
      };
    default:
        return state;
  }
}


module.exports = combineReducers({ notes: notesReducer });
