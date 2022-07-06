import { legacy_createStore as createStore } from "redux";
import { shoppingReducer } from "./Shopping-reducers/reducer";

export const store = createStore(shoppingReducer);
