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

import {
  fetchSupplyGroup,
  postSupplyGroup
} from "services/directPurchase/supply";
import { getCountryData, getSubdivisionData } from "services/countries";

const useStyles = makeStyles(styles);

export default function SupplyCreateFormContainer(props) {
  const classes = useStyles();

  // ShopGroupOption
  const [shopGroupOptions, setShopGroupOptions] = React.useState([]);
  const [shopGroupOptionValue, setShopGroupOptionValue] = React.useState({
    label: "",
    value: ""
  });

  // CountryDataOption
  const [countryOptions, setCountryOptions] = React.useState([]);
  const [countryOptionValue, setCountryOptionValue] = React.useState({
    label: "",
    value: ""
  });

  // SubdivisionData
  const [subDivisionOptions, setSubDvisitionOptions] = React.useState([]);
  const [subDivisionOptionValue, setSubDivisionOptionValue] = React.useState({
    label: "",
    value: ""
  });

  const makeGroupSelectOptions = React.useCallback(dataArr => {
    return dataArr.map((prop, idx) => {
      return {
        label: prop.name,
        value: prop.id
      };
    });
  }, []);

  const makeCountryDataSelectOptions = React.useCallback(dataArr => {
    return dataArr.map(prop => {
      return {
        label: prop.name,
        en_name: prop.en_name,
        ko_name: prop.ko_name,
        value: prop.alpha2
      };
    });
  }, []);

  const makeSubdivisionDataSelectOptions = React.useCallback(dataArr => {
    return dataArr.map(prop => {
      return {
        label: prop.name,
        type: prop.type,
        official_name: prop.official_name,
        en_name: prop.en_name,
        value: prop.code
      };
    });
  });

  const getShopGroup = React.useEffect(() => {
    fetchSupplyGroup().then(groupOptions => {
      const data = makeGroupSelectOptions(groupOptions);
      setShopGroupOptions(data);
    });
    console.log("getshopGroup");
  }, []);

  const createShopGroup = React.useCallback(name => {
    postSupplyGroup(name).then(groupOptions => {
      const data = makeGroupSelectOptions(groupOptions);
      setShopGroupOptions(data);
    });
  }, []);

  // Country Data
  const fetchCountryData = React.useEffect(() => {
    getCountryData().then(countryData => {
      const data = makeCountryDataSelectOptions(countryData);
      setCountryOptions(data);
    });
  }, []);

  const fetchSubdivisionData = React.useEffect(() => {
    getSubdivisionData(countryOptionValue.value).then(subDivisionData => {
      const data = makeSubdivisionDataSelectOptions(subDivisionData);
      console.log(data);
      setSubDvisitionOptions(data);
    });
    console.log("AVAVVASDFS");
  }, [countryOptionValue.value]);

  console.log("p----==-==========");
  console.log(subDivisionOptions);
  console.log(subDivisionOptions ? true : false);
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
                creatable
                inputProps={{
                  onInputChange: e => {
                    console.log("onInputChange");
                    console.log("onInputChange2");
                  },
                  onChange: optionValue => {
                    setShopGroupOptionValue(optionValue);
                  },
                  onCreateOption: text => {
                    createShopGroup(text);
                  },
                  options: shopGroupOptions,
                  value: shopGroupOptionValue
                }}
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
                inputProps={{
                  onChange: optionValue => {
                    setCountryOptionValue(optionValue);
                  },
                  options: countryOptions,
                  value: countryOptionValue
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
                inputProps={{
                  onChange: optionValue => {
                    setSubDivisionOptionValue(optionValue);
                  },
                  options: subDivisionOptions,
                  value: subDivisionOptionValue,
                  isDisabled: subDivisionOptions.length == 0
                }}
                // defaultValue={colourOptions[0]}
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
