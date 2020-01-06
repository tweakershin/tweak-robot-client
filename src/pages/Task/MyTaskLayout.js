import React from "react";

import {
  Router,
  Route,
  Switch,
  Redirect,
  useHistory,
  useLocation,
  useParams
} from "react-router-dom";

import MyTaskDetailPage from "./MyTaskDetailPage";
import MyTaskListPage from "./MyTaskListPage";

const baseRouterPath = "/admin/my-tasks";
export default function MyTaskLayout() {
  return (
    <div>
      <Switch>
        <Route
          path={`${baseRouterPath}/task/:taskId`}
          component={MyTaskDetailPage}
        ></Route>
        <Route
          // Collection Page로 이동.
          path={`${baseRouterPath}/collection/:collectionId`}
          component={MyTaskDetailPage}
        />
        <Route path={`${baseRouterPath}`} component={MyTaskListPage} />
        <Redirect to={`${baseRouterPath}`} />\
      </Switch>
    </div>
  );
}
