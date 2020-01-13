import React from "react";

import PropTypes from "prop-types";

import { makeStyles } from "@material-ui/core";

import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import Card from "components/Card/Card";
import CardHeader from "components/Card/CardHeader";
import CardBody from "components/Card/CardBody";
import CardIcon from "components/Card/CardIcon";

import Assignment from "@material-ui/icons/Assignment";
import { cardTitle } from "assets/jss/material-dashboard-pro-react.js";

import CustomButton from "components/CustomButtons/Button";

import SupplyListTableContainer from "containers/DirectPurchase/SupplyListTableContainer";

const styles = {
  cardIconTitle: {
    ...cardTitle,
    marginTop: "15px",
    marginBottom: "0px"
  }
};

const useStyles = makeStyles(styles);

export default function SupplyDetailPage(props) {
  const classes = useStyles();

  return (
    <GridContainer>
      <GridItem xs={12}>
        <Card>
          <CardHeader color="primary" icon>
            <CardIcon color="primary">
              <Assignment />
            </CardIcon>
            <h4 className={classes.cardIconTitle}>공급처</h4>
          </CardHeader>
          <CardBody>
            <div>as</div>
            {/* <SupplyListTableContainer {...props} /> */}
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
}

SupplyDetailPage.propTypes = {
  history: PropTypes.object
};
