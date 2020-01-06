/**
 * store 입니다.
 */
import configure from "./configure";
import { persistStore } from "redux-persist";

let store = configure(
  typeof window === "undefined" ? undefined : window.__REDUX_STATE__
);

let persistor = persistStore(store);

export { store, persistor };

export default store;
