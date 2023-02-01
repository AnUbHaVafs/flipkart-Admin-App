import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import reduxReducer from '../reducers';

const store = createStore(reduxReducer, applyMiddleware(thunk));

export default store;