import React from "react";
import { createBrowserHistory } from "history";

import { Provider } from "react-redux";

import { Router, Route, Switch, Redirect } from "react-router-dom";

import store from "stores";

import AuthLayout from "layouts/Auth.js";
import RtlLayout from "layouts/RTL.js";
import AdminLayout from "layouts/Admin.js";

import "assets/scss/material-dashboard-pro-react.scss?v=1.8.0";

const hist = createBrowserHistory();

function App() {
  // Layout Routing (레이아웃 라우터)
  return (
    <Provider store={store}>
      <Router history={hist}>
        <Switch>
          {/* <Route path="/rtl" component={RtlLayout} /> */}
          <Route path="/auth" component={AuthLayout} />
          <Route path="/admin" component={AdminLayout} />
          <Redirect from="/" to="/admin/dashboard" />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
