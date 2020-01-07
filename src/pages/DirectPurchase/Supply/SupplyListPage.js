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
import ReactTable from "react-table";

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
export default function SupplyListPage(props) {
  const classes = useStyles();

  const handleCreateButton = React.useCallback(() => {
    console.log(props);
    console.log("A");
    return props.history.push("/admin/direct-purchase/supply/create");
  }, [props]);
  const handleRemoveButton = React.useCallback(() => {
    console.log(props);
    console.log("B");
  }, [props]);

  return (
    <div>
      <GridContainer>
        <GridItem xs={12}>
          <Card>
            <CardHeader color="primary" icon>
              <CardIcon color="primary">
                <Assignment />
              </CardIcon>
              <h4 className={classes.cardIconTitle}>공급처 리스트</h4>
            </CardHeader>
            <CardBody>
              <div>
                <CustomButton
                  color="danger"
                  size="md"
                  style={{ float: "right" }}
                  onClick={handleRemoveButton}
                >
                  <strong>샵 삭제</strong>
                </CustomButton>
                <CustomButton
                  color="primary"
                  size="md"
                  style={{ float: "right" }}
                  onClick={handleCreateButton}
                >
                  <strong>샵 추가</strong>
                </CustomButton>
              </div>
              <SupplyListTableContainer {...props} />
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}

SupplyListPage.propTypes = {
  history: PropTypes.object
};
