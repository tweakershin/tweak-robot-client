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

import MyRobotTableContainer from "containers/Tables/MyRobotTableContainer";

const styles = {
  cardIconTitle: {
    ...cardTitle,
    marginTop: "15px",
    marginBottom: "0px"
  }
};
const useStyles = makeStyles(styles);

export default function MyRobotListPage(props) {
  const classes = useStyles();
  console.log("MyRobotListPage");
  console.log(props);
  return (
    <div>
      <GridContainer>
        <GridItem xs={12}>
          <Card>
            <CardHeader color="primary" icon>
              <CardIcon color="primary">
                <Assignment />
              </CardIcon>
              <h4 className={classes.cardIconTitle}>My Project</h4>
            </CardHeader>
            <CardBody>
              <MyRobotTableContainer {...props} />
              {/* <ReactTable></ReactTable> */}
            </CardBody>
          </Card>
        </GridItem>
        {/* <GridItem xs={12} md={6}>
          <Card>
            <CardBody style={{ textAlign: "center" }}>sample2</CardBody>
          </Card>
        </GridItem> */}
      </GridContainer>
    </div>
  );
}
