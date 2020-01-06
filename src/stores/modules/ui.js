import produce from "immer";

// import { ActionType } from "redux-promise-middleware";
import { createAction, handleActions } from "redux-actions";

import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import { persistReducer } from "redux-persist";

/***** 1. INITIAL_STATE *****/
const initialState = {
  /*** UI ***/
  miniActive: false,
  mobileOpen: false,
  sidebarImage: require("assets/img/sidebar-2.jpg"),
  sidebarColor: "blue",
  sidebarBgColor: "black",
  logo: require("assets/img/logo-white.svg")
};

/***** 2. ACTION_TYPE *****/
const SET_MINI_ACTIVE = "ui/SET_MINI_ACTIVE";
const SET_MOBILE_OPEN = "ui/SET_MOBILE_OPEN";
const HANDLE_SIDEBAR_BG_COLOR = "ui/HANDLE_SIDEBAR_BG_COLOR";
const HANDLE_SIDEBAR_IMAGE = "ui/HANDLE_SIDEBAR_IMAGE";
const HANDLE_SIDEBAR_COLOR = "ui/HANDLE_SIDEBAR_COLOR";

/* -------------------------------------------------------------------------------- */

/***** 3. ACTION_CREATOR *****/
/*** UI ***/
export const setMiniActive = createAction(SET_MINI_ACTIVE, () => {});
export const setMobileOpen = createAction(SET_MOBILE_OPEN, isOpen => ({
  isOpen
}));
export const handleSidebarBgColor = createAction(
  HANDLE_SIDEBAR_BG_COLOR,
  sidebarBgColor => ({
    sidebarBgColor
  })
);
export const handleSidebarImage = createAction(
  HANDLE_SIDEBAR_IMAGE,
  sidebarImage => ({
    sidebarImage
  })
);
export const handleSidebarColor = createAction(
  HANDLE_SIDEBAR_COLOR,
  sidebarColor => ({
    sidebarColor
  })
);

export const actionCreators = {
  /*** UI ***/
  setMiniActive,
  setMobileOpen,
  handleSidebarBgColor,
  handleSidebarImage,
  handleSidebarColor
};

/***** 4. REDUCER *****/
const reducer = handleActions(
  {
    /*** UI ***/
    [SET_MINI_ACTIVE]: (state, action) => {
      return produce(state, draft => {
        draft.miniActive = !state.miniActive;
      });
    },
    [SET_MOBILE_OPEN]: (state, action) => {
      const { isOpen } = action.payload;
      return produce(state, draft => {
        draft.mobileOpen = isOpen;
      });
    },
    [HANDLE_SIDEBAR_BG_COLOR]: (state, action) => {
      const { sidebarBgColor } = action.payload;
      let logo;
      switch (sidebarBgColor) {
        case "white":
          logo = require("assets/img/logo.svg");
          break;
        default:
          logo = require("assets/img/logo-white.svg");
          break;
      }
      return produce(state, draft => {
        draft.logo = logo;
        draft.sidebarBgColor = sidebarBgColor;
      });
    },
    [HANDLE_SIDEBAR_IMAGE]: (state, action) => {
      const { sidebarImage } = action.payload;
      return produce(state, draft => {
        draft.sidebarImage = sidebarImage;
      });
    },
    [HANDLE_SIDEBAR_COLOR]: (state, action) => {
      const { sidebarColor } = action.payload;
      return produce(state, draft => {
        draft.sidebarColor = sidebarColor;
      });
    }
  },
  initialState
);

// persist config
const uiPersistConfig = {
  key: "ui",
  storage: storage,
  // 두개만 persist
  blacklist: []
  // whitelist: ["setMiniActive"]
};

const uiReducer = persistReducer(uiPersistConfig, reducer);
export default uiReducer;
