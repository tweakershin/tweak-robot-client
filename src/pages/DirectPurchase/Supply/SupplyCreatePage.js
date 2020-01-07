import React from "react";

import { makeStyles } from "@material-ui/core";

import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import Card from "components/Card/Card";
import CardHeader from "components/Card/CardHeader";
import CardBody from "components/Card/CardBody";
import CardIcon from "components/Card/CardIcon";

import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import Checkbox from "@material-ui/core/Checkbox";
import InputAdornment from "@material-ui/core/InputAdornment";

// material ui icons
import MailOutline from "@material-ui/icons/MailOutline";
import Contacts from "@material-ui/icons/Contacts";
import Check from "@material-ui/icons/Check";
import Close from "@material-ui/icons/Close";

import Assignment from "@material-ui/icons/Assignment";
import { cardTitle } from "assets/jss/material-dashboard-pro-react.js";

// core components
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import CardText from "components/Card/CardText.js";
import CardFooter from "components/Card/CardFooter.js";

import SupplyListTableContainer from "containers/DirectPurchase/SupplyListTableContainer";
import ValidationFormstyles from "assets/jss/material-dashboard-pro-react/views/validationFormsStyle.js";

const styles = {
  cardIconTitle: {
    ...cardTitle,
    marginTop: "15px",
    marginBottom: "0px"
  }
};

const useStyles = makeStyles(styles);
export default function SupplyCreatePage(props) {
  const classes = useStyles();
  return (
    <div>
      <GridContainer>
        <GridItem xs={12}>
          <Card>
            <CardHeader color="primary" icon>
              <CardIcon color="primary">
                <Assignment />
              </CardIcon>
              <h4 className={classes.cardIconTitle}>공급처 추가</h4>
            </CardHeader>
            <CardBody></CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
