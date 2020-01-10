import axios from "axios";

import { store } from "stores/";
import { authActions } from "stores/modules";

// import NavigationService from "@navigations/NavigationService";

const isDev = process.env.NODE_ENV === "development";

const axiosConfig = isDev
  ? {
      baseURL: "http://localhost:8000/api/",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      withCredentials: false,
      timeout: 10000
    }
  : {
      baseURL: "http://15.164.186.13/api/",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Cache: "no-cache"
      },
      withCredentials: true,
      timeout: 5000
    };

const defaultClient = axios.create(axiosConfig);

defaultClient.interceptors.request.use(
  async config => {
    // Do something before request is sent
    const state = store.getState(); // state
    const authStore = state.auth;

    const authInfo = authStore.authInfo;

    if (!authInfo) {
      return console.warn("로그인을 다시 해 주세요.");
    }

    return Object.assign(config, {
      headers: {
        ...config.headers,
        Authorization: `${authInfo.token_type} ${authInfo.access_token}`
      }
    });
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
defaultClient.interceptors.response.use(
  function(response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function(error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error

    // console.log(error.response);
    console.error(error);
    if (error.response.status === 401) {
      // 권한문제
      console.log(
        "권한문제 발생.. 로그아웃을 진행합니다. 다시 로그인 해주십시요."
      );
      store.dispatch(authActions.feLogout());
      // NavigationService.navigate("Login");
    }

    return Promise.reject(error);
  }
);

export default defaultClient;
// export { getDefaultClient };
