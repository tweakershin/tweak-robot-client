import { combineReducers } from "redux";

import authReducer, { actionCreators as authActions } from "./auth";

// import supplyReducer, { actionCreators as supplyActions } from "./supply";
import uiReducer, { actionCreators as uiActions } from "./ui";

// Action Creators
export {
  authActions,
  // supplyActions,
  uiActions
};

// Reducers
export default combineReducers({
  auth: authReducer,
  // supply: supplyReducer,
  ui: uiReducer
});
