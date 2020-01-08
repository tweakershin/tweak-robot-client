// import { getAuthToken } from "@utils/auth";
import axios from "axios";
import queryString from "query-string";
// 로그인은 defaultClient사용 안함.
// import axios from "@services/defaultClient";

import Storage from "storage";

const isDev = process.env.NODE_ENV === "development";

const BASE_URL = isDev ? "http://localhost:8000" : "http://15.164.186.13";
const LOGIN_URL = `${BASE_URL}/o/token/`;
const LOGOUT_URL = `${BASE_URL}/o/revoke_token/`;

const CLIENT_ID = "Nx9xF4FMp760XnRPpon9ByrcTXAY77DLhmWFifIX";
const CLIENT_SECRET =
  "teD2sdf7d98pMKML0K4f2oL62nGsAgJPzVdBKq7phyRlZLaBfdI4B2j6NLw5ltTHQuCr9g3l4kzQQ698s9nZv3czGRImCZrzRJLIJh02ZKImEao2iMkgBBFRLoulSgt5";

const authConfig = {
  headers: {
    "Content-Type": "application/x-www-form-urlencoded"
  }
};

export const login = async (username, password) => {
  // query String 만들기
  const requestBody = {
    grant_type: "password",
    username: username,
    password: password,
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET
  };
  return axios
    .post(LOGIN_URL, queryString.stringify(requestBody), authConfig)
    .then(resp => {
      const authInfo = resp.data;
      console.log(resp);

      Storage.set("authInfo", authInfo, "local");

      return authInfo;
    })
    .catch(e => {
      console.error(e);
      return Promise.reject(e);
    });
};

export const logout = accessToken => {
  // query String 만들기
  const requestBody = {
    token: accessToken,
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET
  };

  Storage.remove("authInfo");

  return axios
    .post(LOGOUT_URL, queryString.stringify(requestBody), authConfig)
    .then(resp => {
      return resp.data;
    })
    .catch(e => {
      console.error(e);
      return Promise.reject(e);
    });
};
