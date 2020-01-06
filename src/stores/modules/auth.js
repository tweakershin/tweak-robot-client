import produce from "immer";

import { ActionType } from "redux-promise-middleware";
import { createAction, handleActions } from "redux-actions";

import { login, logout } from "services/auth";

// import { AsyncStorage } from "react-native";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import { persistReducer } from "redux-persist";

/***** 1. INITIAL_STATE *****/
const initialState = {
  /*** NETWORK ***/
  // 통신중
  isPending: false,

  /*** CONTROL ***/
  logined: false,
  authInfo: {
    access_token: "",
    expires_in: 0,
    refresh_token: "",
    scope: "",
    token_type: ""
  }
};

/***** 2. ACTION_TYPE *****/

/*** NETWORK ***/
export const SERVER_LOGIN = "auth/NETWORK/SERVER_LOGIN";
export const SERVER_LOGIN_PENDING = `${SERVER_LOGIN}_PENDING`;
export const SERVER_LOGIN_SUCCESS = `${SERVER_LOGIN}_SUCCESS`;
export const SERVER_LOGIN_FAILURE = `${SERVER_LOGIN}_FAILURE`;

export const SERVER_LOGOUT = "auth/NETWORK/SERVER_LOGOUT";
export const SERVER_LOGOUT_PENDING = `${SERVER_LOGOUT}_PENDING`;
export const SERVER_LOGOUT_SUCCESS = `${SERVER_LOGOUT}_SUCCESS`;
export const SERVER_LOGOUT_FAILURE = `${SERVER_LOGOUT}_FAILURE`;

/*** CONTORL ***/
const FE_LOGIN = "auth/CONTROL/FE_LOGIN";
const FE_LOGOUT = "auth/CONTROL/FE_LOGOUT";

/* -------------------------------------------------------------------------------- */

/***** 3. ACTION_CREATOR *****/

/*** UI ***/

/*** NETWORK ***/
const serverLogin = createAction(SERVER_LOGIN, login);
const serverLogout = createAction(SERVER_LOGOUT, logout);

// /*** CONTORL ***/
// // AsyncStorage에 있는 유저 정보를 state에 저장
const feLogin = createAction(FE_LOGIN, authInfo => authInfo);

// // state에 있는 유저 정보를 제거
const feLogout = createAction(FE_LOGOUT, () => {});

/*** TOTAL ***/
export const actionCreators = {
  /*** NETWORK ***/
  serverLogin,
  serverLogout,

  // /*** CONTORL ***/
  feLogin,
  feLogout
};

/***** 4. REDUCER *****/
const reducer = handleActions(
  {
    /*** NETWORK ***/
    // login
    [SERVER_LOGIN_PENDING]: (state, action) => {
      return produce(state, draft => {
        draft.isPending = true;
      });
    },

    [SERVER_LOGIN_SUCCESS]: (state, action) => {
      const authInfo = action.payload;

      return produce(state, draft => {
        draft.isPending = false;
        draft.loginError = {
          state: false,
          messages: []
        };
        draft.authInfo = authInfo;
        draft.logined = true;
        draft.usernameInput = "";
        draft.passwordInput = "";
      });
    },

    [SERVER_LOGIN_FAILURE]: (state, action) => {
      return produce(state, draft => {
        draft.passwordInput = "";
        draft.isPending = false;
        draft.logined = false;
        draft.loginError = {
          state: true,
          messages: []
        };
      });
    },

    // 로그아웃
    [SERVER_LOGOUT_PENDING]: (state, action) => {
      return produce(state, draft => {
        draft.isPending = true;
      });
    },

    [SERVER_LOGOUT_SUCCESS]: (state, action) => {
      return produce(state, draft => {
        draft.isPending = false;
        draft.loginError = {
          state: false,
          messages: []
        };
        draft.authInfo = {};
        draft.logined = false;
      });
    },

    [SERVER_LOGOUT_FAILURE]: (state, action) => {
      return produce(state, draft => {
        draft.isPending = false;
        draft.logoutError = {
          state: true,
          messages: []
        };
      });
    },

    /*** CONTORL ***/
    [FE_LOGIN]: (state, action) => {
      return produce(state, draft => {
        draft.logined = true;
        draft.authInfo = action.payload;
      });
    },
    [FE_LOGOUT]: (state, action) => {
      return produce(state, draft => {
        draft.logined = false;
        draft.authInfo = {};
      });
    }
  },
  initialState
);

// persist config
const authPersistConfig = {
  key: "auth",
  storage: storage,

  // 두개만 persist
  whitelist: ["authInfo", "logined"]
};

const authReducer = persistReducer(authPersistConfig, reducer);
export default authReducer;
