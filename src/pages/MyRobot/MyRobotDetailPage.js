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

export default function MyRobotDetailPage(props) {
  const classes = useStyles();

  const robotId = props.match.params.id;

  return (
    <div>
      <GridContainer>
        <GridItem xs={12}>
          <Card>
            <CardHeader color="primary" icon>
              <CardIcon color="primary">
                <Assignment />
              </CardIcon>

              <h4 className={classes.cardIconTitle}>RobotDetail: {robotId}</h4>
            </CardHeader>
            <CardBody>
              Detail {robotId}
              <br />
              요기는 다이어그램
              <br /> 요 아래는 프로젝트 정보
              <br /> 관련태스크 등{/* <ReactTable></ReactTable> */}
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
