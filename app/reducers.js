import { combineReducers } from "redux";

const initialNotesState = {
  isFetching: false,
  items: []
}

function notesReducer(state = initialNotesState, action) {
  switch (action.type) {
    case 'GET_NOTES':
      return { ...state, isFetching: true };
    case 'GET_NOTES_SUCCESS':
      return {
        ...state,
        isFetching: false,
        items: action.payload.data
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
};


module.exports = combineReducers({ notes: notesReducer });
