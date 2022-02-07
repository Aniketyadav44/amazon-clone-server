import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  productReducer,
  productDetailReducer,
} from "./reducers/productReducer";
import { profileReducer, userReducer } from "./reducers/userReducer";

const reducer = combineReducers({
  products: productReducer,
  product: productDetailReducer,
  user: userReducer,
  profile: profileReducer,
});

let initialState = {};

const middlewares = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middlewares))
);

export default store;
