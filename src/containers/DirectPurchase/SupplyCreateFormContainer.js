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
import styles from "assets/jss/material-dashboard-pro-react/views/validationFormsStyle.js";

const useStyles = makeStyles(styles);
function SupplyCreateFormContainer(props) {
  const classes = useStyles();

  return (
    <form>
      <GridContainer>
        <GridItem xs={12} sm={2}>
          <FormLabel className={classes.labelHorizontal}>Min Length</FormLabel>
        </GridItem>
        <GridItem xs={12} sm={7}>
          <CustomInput
            // success={minLengthState === "success"}
            // error={minLengthState === "error"}
            id="minlength"
            formControlProps={{
              fullWidth: true
            }}
            inputProps={{
              onChange: event => {
                // if (verifyLength(event.target.value, 5)) {
                //   setminLengthState("success");
                // } else {
                //   setminLengthState("error");
                // }
                // setminLength(event.target.value);
              },
              type: "text"
              // endAdornment:
              //   minLengthState === "error" ? (
              //     <InputAdornment position="end">
              //       <Close className={classes.danger} />
              //     </InputAdornment>
              //   ) : (
              //     undefined
              //   )
            }}
          />
        </GridItem>
      </GridContainer>
    </form>
  );
}
