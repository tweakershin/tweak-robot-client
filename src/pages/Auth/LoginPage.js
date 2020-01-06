import React from "react";

import PropTypes from "prop-types";

// query-string
import queryString from "query-string";

// react-redux
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as AuthActions } from "stores/modules/auth";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";

// @material-ui/icons
import Face from "@material-ui/icons/Face";
// import LockOutline from "@material-ui/icons/LockOutline";

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CardFooter from "components/Card/CardFooter.js";

import styles from "assets/jss/material-dashboard-pro-react/views/loginPageStyle.js";

const useStyles = makeStyles(styles);

export default function LoginPage(props) {
  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");

  /* State */
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  /* Redux */
  // Use states from Redux store

  const reduxState = useSelector(state => ({
    authInfo: state.auth.authInfo
  }));

  const { redirect } = queryString.parse(props.history.location.search);
  React.useEffect(() => {
    if (reduxState.authInfo.access_token) {
      if (redirect) {
        props.history.push(redirect);
      } else {
        props.history.push("/admin/dashboard");
      }
    }
  });

  // Use Redux dispatch Function
  const dispatch = useDispatch();

  // Functions for redux action
  const handleLogin = React.useCallback(
    () => dispatch(AuthActions.serverLogin(username, password)),
    [dispatch, username, password]
  );

  setTimeout(function() {
    setCardAnimation("");
  }, 700);
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <GridContainer justify="center">
        <GridItem xs={12} sm={6} md={4}>
          <form>
            <Card login className={classes[cardAnimaton]}>
              <CardHeader
                className={`${classes.cardHeader} ${classes.textCenter}`}
                color="rose"
              >
                <h4 className={classes.cardTitle}>Log in</h4>
                <div className={classes.socialLine}>
                  {[
                    "fab fa-facebook-square",
                    "fab fa-twitter",
                    "fab fa-google-plus"
                  ].map((prop, key) => {
                    return (
                      <Button
                        color="transparent"
                        justIcon
                        key={key}
                        className={classes.customButtonClass}
                        onClick={() => {
                          alert("준비중입니다.");
                        }}
                      >
                        <i className={prop} />
                      </Button>
                    );
                  })}
                </div>
              </CardHeader>
              <CardBody>
                <CustomInput
                  labelText="아이디"
                  id="username"
                  formControlProps={{
                    fullWidth: true
                  }}
                  onChange={() => {
                    console.log("A");
                  }}
                  inputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <Face className={classes.inputAdornmentIcon} />
                      </InputAdornment>
                    ),
                    onChange: e => {
                      setUsername(e.target.value);
                    }
                  }}
                />
                <CustomInput
                  labelText="Password"
                  id="password"
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <Icon className={classes.inputAdornmentIcon}>
                          lock_outline
                        </Icon>
                      </InputAdornment>
                    ),
                    onChange: e => {
                      setPassword(e.target.value);
                    },
                    type: "password",
                    autoComplete: "off"
                  }}
                />
              </CardBody>
              <CardFooter className={classes.justifyContentCenter}>
                <Button
                  onClick={handleLogin}
                  color="rose"
                  simple
                  size="lg"
                  block
                >
                  로그인
                </Button>
              </CardFooter>
            </Card>
          </form>
        </GridItem>
      </GridContainer>
    </div>
  );
}

LoginPage.propTypes = {
  history: PropTypes.object
};
