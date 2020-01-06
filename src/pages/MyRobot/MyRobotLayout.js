import React from "react";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import Card from "components/Card/Card";
import CardBody from "components/Card/CardBody";
import CardHeader from "components/Card/CardHeader";
import CardIcon from "components/Card/CardIcon";

import Assignment from "@material-ui/icons/Assignment";

import { cardTitle } from "assets/jss/material-dashboard-pro-react.js";

import ReactTable from "react-table";

import  from "containers/Tables/MyRobotTableContainer";
import {
  Router,
  Route,
  Switch,
  Redirect,
  useHistory,
  useLocation,
  useParams
} from "react-router-dom";

import MyRobotListPage from "./MyRobotListPage";

import MyRobotDetailPage from "./MyRobotDetailPage";
import MyRobotProjectDetailPage from "./MyRobotProjectDetail";

const baseRouterPath = "/admin/my-robot";

export default function MyRobotLayout(props) {
  return (
    <div>
      {/* <Route exact path={`${baseRouterPath}/robots/:id`}>
        <Modal {...props}>
          <MyRobotDetailPage />
        </Modal>
      </Route> */}

      <Switch>
        <Route
          path={`${baseRouterPath}/robots/:id`}
          component={MyRobotDetailPage}
        ></Route>
        <Route path={`${baseRouterPath}`}>
          <MyRobotListPage {...props} />
        </Route>
        <Redirect to={`${baseRouterPath}`} />
      </Switch>
    </div>
  );
}

function Modal(props) {
  let back = e => {
    e.stopPropagation();
    if (props.history.prev) {
      props.history.goBack();
    } else {
      props.history.push("/admin/my-robot/");
    }
  };

  return (
    <div
      onClick={back}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        background: "rgba(0, 0, 0, 0.15)",
        zIndex: 400
      }}
    >
      <div
        className="modal"
        style={{
          position: "fixed",
          background: "#fff",
          top: 25,
          left: "10%",
          right: "10%",
          padding: 15,
          border: "2px solid #444"
        }}
      >
        <button type="button" onClick={back}>
          Close
        </button>
        {props.children}
      </div>
    </div>
  );
}
