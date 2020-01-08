import React from "react";

import { makeStyles, FormControl } from "@material-ui/core";

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

import Select from "react-select";
// core components
import CustomInput from "components/CustomInput/CustomInput.js";
import CustomSelect from "components/CustomInput/CustomSelect.js";
import Button from "components/CustomButtons/Button.js";
import CardText from "components/Card/CardText.js";
import CardFooter from "components/Card/CardFooter.js";

import SupplyListTableContainer from "containers/DirectPurchase/SupplyListTableContainer";
import styles from "assets/jss/material-dashboard-pro-react/views/validationFormsStyle.js";

import { fetchSupplyGroup } from "services/directPurchase/supply";

const useStyles = makeStyles(styles);

export default function SupplyCreateFormContainer(props) {
  const classes = useStyles();

  const [shopGroupOptions, setShopGroupOptions] = React.useState([]);

  const getShopGroup = React.useEffect(() => {
    fetchSupplyGroup();
    console.log("getshopGroup");
  }, []);
  // const getShopGroup = React.useEffect(async () => {
  //   console.log("GetshopGroup");

  //   fetchSupplyGroup();

  //   setShopGroupOptions();
  //   // console.log(fetchSupplyGroup());
  // }, []);

  return (
    <form>
      <GridContainer justify="center" alignItems="center">
        <GridItem xs={12} sm={10} md={6}>
          <GridContainer>
            <GridItem xs={12} sm={2}>
              <FormLabel className={classes.labelHorizontal}>샵 그룹</FormLabel>
            </GridItem>
            <GridItem xs={12} sm={10}>
              <CustomSelect
                classNamePrefix="select"
                formControlProps={{
                  fullWidth: true
                }}
                // defaultValue={colourOptions[0]}
                // isDisabled={isDisabled}
                // isLoading={isLoading}
                // isClearable={isClearable}
                // isRtl={isRtl}
                isSearchable={true}
                // name="color"
                // options={colourOptions}
              />
            </GridItem>

            <GridItem xs={12} sm={2}>
              <FormLabel className={classes.labelHorizontal}>샵 이름</FormLabel>
            </GridItem>
            <GridItem xs={12} sm={10}>
              <CustomInput
                // success={minLengthState === "success"}
                // error={minLengthState === "error"}
                id="shop_name"
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

            <GridItem xs={12} sm={2}>
              <FormLabel className={classes.labelHorizontal}>세부</FormLabel>
            </GridItem>
            <GridItem xs={12} sm={10}>
              <CustomInput
                // success={minLengthState === "success"}
                // error={minLengthState === "error"}
                id="detail"
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

            <GridItem xs={12} sm={2}>
              <FormLabel className={classes.labelHorizontal}>URL</FormLabel>
            </GridItem>
            <GridItem xs={12} sm={10}>
              <CustomInput
                // success={minLengthState === "success"}
                // error={minLengthState === "error"}
                id="shop_name"
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

            <GridItem xs={12} sm={2}>
              <FormLabel className={classes.labelHorizontal}>국가</FormLabel>
            </GridItem>
            <GridItem xs={12} sm={10}>
              <CustomSelect
                classNamePrefix="select"
                formControlProps={{
                  fullWidth: true
                }}
                // defaultValue={colourOptions[0]}
                // isDisabled={isDisabled}
                // isLoading={isLoading}
                // isClearable={isClearable}
                // isRtl={isRtl}
                // isSearchable={isSearchable}
                // name="color"
                // options={colourOptions}
              />
            </GridItem>

            <GridItem xs={12} sm={2}>
              <FormLabel className={classes.labelHorizontal}>도시</FormLabel>
            </GridItem>
            <GridItem xs={12} sm={10}>
              <CustomSelect
                classNamePrefix="select"
                formControlProps={{
                  fullWidth: true
                }}
                // defaultValue={colourOptions[0]}
                // isDisabled={isDisabled}
                // isLoading={isLoading}
                // isClearable={isClearable}
                // isRtl={isRtl}
                // isSearchable={isSearchable}
                // name="color"
                // options={colourOptions}
              />
            </GridItem>
          </GridContainer>
        </GridItem>
      </GridContainer>
    </form>
  );
}
