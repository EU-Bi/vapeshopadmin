import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

import { userReducer } from "./reducers/userReducer";
import { deviceReducer } from "./reducers/deviceReducer";
import { formReducer } from "./reducers/formReducer";

const reducer = combineReducers({
    user:userReducer,
    device:deviceReducer,
    form: formReducer,
})

export const store = createStore(reducer,composeWithDevTools(applyMiddleware(thunk))) ;

store.subscribe(()=>console.log(store.getState()))