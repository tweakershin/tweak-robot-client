import produce from "immer";

import { ActionType } from "redux-promise-middleware";
import { createAction, handleActions } from "redux-actions";

// import { AsyncStorage } from "react-native";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import { persistReducer } from "redux-persist";

import { fetchShopList, createNewShop } from "services/supply/shop";

/***** 1. INITIAL_STATE *****/
const initialState = {
  /*** UI ***/
  addmodalOpend: false,

  addModalForm: {
    shopName: "",
    shopUrl: "",
    shopDescription: "",

    parent: {
      parentId: null,
      parentShopName: ""
    }
  },

  /*** NETWORK ***/
  // 통신중
  isPending: false,

  shopList: [],
  /*** CONTROL ***/
  errors: {
    state: false,
    messages: []
  }
};

/***** 2. ACTION_TYPE *****/

/*** UI ***/
const CHANGE_ADDMODAL_STATE = "supply/ui/CHANGE_ADDMODAL_STATE";

const EDIT_ADDMODAL_FORM = "supply/ui/EDIT_ADDMODAL_FORM";

/*** NETWORK ***/

const FETCH_SHOP_LIST = "supply/shop/FETCH_SHOP_LIST";
const FETCH_SHOP_LIST_PENDING = `${FETCH_SHOP_LIST}_PENDING`;
const FETCH_SHOP_LIST_SUCCESS = `${FETCH_SHOP_LIST}_SUCCESS`;
const FETCH_SHOP_LIST_FAILURE = `${FETCH_SHOP_LIST}_FAILURE`;

const POST_NEW_SHOP = "supply/shop/POST_NEW_SHOP";
const POST_NEW_SHOP_PENDING = `${POST_NEW_SHOP}_PENDING`;
const POST_NEW_SHOP_SUCCESS = `${POST_NEW_SHOP}_SUCCESS`;
const POST_NEW_SHOP_FAILURE = `${POST_NEW_SHOP}_FAILURE`;

/*** CONTORL ***/

/* -------------------------------------------------------------------------------- */

/***** 3. ACTION_CREATOR *****/

/*** UI ***/
const changeAddmodalState = createAction(
  CHANGE_ADDMODAL_STATE,
  (parentId = null, parentShopName = "") => ({ parentId, parentShopName })
);

const editAddmodalForm = createAction(EDIT_ADDMODAL_FORM, (field, content) => ({
  field,
  content
}));

// const editAddmodalFormShopname = createAction(
//   EDIT_ADDMODAL_FORM_SHOPNAME,
//   shopName => shopName
// );
// const editAddmodalFormShopUrl = createAction(
//   EDIT_ADDMODAL_FORM_SHOPURL,
//   shopUrl => shopUrl
// );

/*** NETWORK ***/
const getShopList = createAction(FETCH_SHOP_LIST, fetchShopList);
const postNewShop = createAction(POST_NEW_SHOP, createNewShop);

/*** CONTORL ***/

export const actionCreators = {
  /*** UI ***/
  changeAddmodalState,
  editAddmodalForm,

  /*** NETWORK ***/
  getShopList,
  postNewShop

  /*** CONTORL ***/
};

/***** 4. REDUCER *****/
const reducer = handleActions(
  {
    /*** UI ***/
    [CHANGE_ADDMODAL_STATE]: (state, action) => {
      const payload = action.payload;
      return produce(state, draft => {
        draft.addmodalOpend = !state.addmodalOpend;

        draft.addModalForm = {
          shopName: "",
          shopUrl: "",
          shopDescription: "",

          parent: {
            parentId: payload.parentId,
            parentShopName: payload.parentShopName
          }
        };
      });
    },

    [EDIT_ADDMODAL_FORM]: (state, action) => {
      const payload = action.payload;
      return produce(state, draft => {
        draft.addModalForm[payload.field] = payload.content;
      });
    },

    /*** NETWORK ***/
    // 샵 가져오기
    [FETCH_SHOP_LIST_PENDING]: (state, action) => {
      return produce(state, draft => {
        draft.isPending = true;
        draft.viewType = "ind";
      });
    },
    [FETCH_SHOP_LIST_SUCCESS]: (state, action) => {
      return produce(state, draft => {
        draft.isPending = false;
        draft.errors = {
          state: false,
          message: []
        };
        draft.shopList = action.payload;
      });
    },
    [FETCH_SHOP_LIST_FAILURE]: (state, action) => {
      return produce(state, draft => {
        draft.errors = {
          state: true,
          messages: [action.payload]
        };

        draft.isPending = false;
        draft.viewType = "group";
      });
    },

    // 샵 생성하기
    [POST_NEW_SHOP_PENDING]: (state, action) => {
      return produce(state, draft => {
        draft.isPending = true;
      });
    },
    [POST_NEW_SHOP_SUCCESS]: (state, action) => {
      const payload = action.payload;
      return produce(state, draft => {
        draft.isPending = false;
        draft.addmodalOpend = false;
        // 배열 앞에 추가
        draft.shopList.unshift(payload);
        // draft.shopList.push()
      });
    },
    [POST_NEW_SHOP_FAILURE]: (state, action) => {
      return produce(state, draft => {
        draft.isPending = false;
        draft.errors = {
          state: true,
          messages: [action.payload]
        };
      });
    }

    /*** CONTORL ***/
  },
  initialState
);

// persist config
const supplyPersistConfig = {
  key: "supply",
  storage: storage,
  // 두개만 persist
  whitelist: ["viewType"]
};

const supplyReducer = persistReducer(supplyPersistConfig, reducer);
export default supplyReducer;
