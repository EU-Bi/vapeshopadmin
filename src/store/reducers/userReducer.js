const LOGIN = "LOGIN";
const LOGOUT = "LOGOUT";

const initialState = {};

export function userReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN: {
      return {
        ...state,
        ...action.payload,
      };
    }
    case LOGOUT: {
      return {};
    }
    default:
      return state;
  }
}

export const actionLogIn = (payload) => ({ type: LOGIN, payload });
export const actionLogOut = () => ({ type: LOGOUT });
