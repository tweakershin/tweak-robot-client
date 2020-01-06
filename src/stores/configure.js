import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { createLogger } from "redux-logger";
import { createPromise } from "redux-promise-middleware";

import modules from "./modules";

const isDev = process.env.NODE_ENV === "development";

const devTools = isDev && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
const composeEnhancers = devTools || compose;

const logger = createLogger();
const customizedPromiseMiddleware = createPromise({
  promiseTypeSuffixes: ["PENDING", "SUCCESS", "FAILURE"]
});

const middlewares = [isDev && logger, thunk, customizedPromiseMiddleware];

const configure = preloadedState => {
  return createStore(
    modules,
    preloadedState,
    composeEnhancers(applyMiddleware(...middlewares))
  );
};

export default configure;
