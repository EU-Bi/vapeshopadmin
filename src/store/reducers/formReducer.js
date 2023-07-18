const SET_DATA = "SET_DATA";
const SET_PHOTO = "SET_PHOTO";
const CLEAR_DATA = "CLEAR_DATA";
const DELETE_PHOTO = "DELETE_PHOTO";

const initialState = {
  form: [],
  photo: [],
};

export function formReducer(state = initialState, action) {
  switch (action.type) {
    case SET_DATA: {
      return {
        ...state,
        form: action.payload,
      };
    }
    case SET_PHOTO: {
      return {
        ...state,
        photo: [...state.photo, action.payload],
      };
    }
    case DELETE_PHOTO: {
      const updatedPhoto = [...state.photo];
      updatedPhoto.splice(action.payload, 1);
      return {
        ...state,
        photo: updatedPhoto,
      };
    }
    case CLEAR_DATA: {
      return {
        ...state,
        form: [],
        photo: [],
      };
    }
    default:
      return state;
  }
}

export const actionSetData = (payload) => ({ type: SET_DATA, payload });
export const actionSetPhoto = (payload) => ({ type: SET_PHOTO, payload });
export const actionDeletePhoto = (payload) => ({ type: DELETE_PHOTO, payload });
export const actionClearData = () => ({ type: CLEAR_DATA });
