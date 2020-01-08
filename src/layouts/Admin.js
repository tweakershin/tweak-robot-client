import React from "react";
import cx from "classnames";
import { Switch, Route, Redirect } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { actionCreators as uiAction } from "stores/modules/ui";

// Create PerfectScrollbar
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// core components
import AdminNavbar from "components/Navbars/AdminNavbar.js";
import Footer from "components/Footer/Footer.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import FixedPlugin from "components/FixedPlugin/FixedPlugin.js";

import routes from "routes.js";

import styles from "assets/jss/material-dashboard-pro-react/layouts/adminStyle.js";
import SidebarContainer from "containers/Sidebar/SidebarContainer";
import AdminNavbarContainer from "containers/Navbar/AdminNavbarContainer";
import FixedPluginContainer from "containers/FixedPlugin/FixedPluginContainer";

var ps;

const useStyles = makeStyles(styles);

export default function Dashboard(props) {
  const { ...rest } = props;
  // States and Functions

  const reduxState = useSelector(state => ({
    miniActive: state.ui.miniActive,
    authInfo: state.auth.authInfo
  }));

  React.useEffect(() => {
    // console.log(rest.history);
    // console.log("실행되엇당.");

    // 로그인 안되어 있을시 이동
    if (!reduxState.authInfo.access_token) {
      if (rest.history.location.pathname) {
        return rest.history.push(
          `/auth/login?redirect=${rest.history.location.pathname}`
        );
      } else {
        return rest.history.push("/auth/login?redirect=/admin/dashboared");
      }
    }
  }, []);

  const dispatch = useDispatch();

  const setMobileOpen = React.useCallback(
    isOpen => dispatch(uiAction.setMobileOpen(isOpen)),
    [dispatch]
  );

  // Styles
  const classes = useStyles();
  const mainPanelClasses =
    classes.mainPanel +
    " " +
    cx({
      [classes.mainPanelSidebarMini]: reduxState.miniActive,

      // perfect scrollbar 사용 여부
      [classes.mainPanelWithPerfectScrollbar]:
        navigator.platform.indexOf("Win") > -1
    });

  // ref for main panel div
  const mainPanel = React.createRef();

  // effect instead of componentDidMount, componentDidUpdate and componentWillUnmount
  React.useEffect(() => {
    // Window일경우 PerefectScrollbar 사용
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(mainPanel.current, {
        suppressScrollX: true,
        suppressScrollY: false
      });
      document.body.style.overflow = "hidden";
    }
    window.addEventListener("resize", resizeFunction);

    // Specify how to clean up after this effect:
    return function cleanup() {
      if (navigator.platform.indexOf("Win") > -1) {
        ps.destroy();
      }
      window.removeEventListener("resize", resizeFunction);
    };
  });

  // Functions for changing the states from components

  // Check Autorization on a Route.
  const getRoute = () => {
    return window.location.pathname !== "/admin/full-screen-maps";
  };

  // Routes 가져오기
  const getRoutes = routes => {
    return routes.map((prop, key) => {
      if (prop.collapse) {
        return getRoutes(prop.views);
      }
      if (prop.layout === "/admin") {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
            exact={prop.exact}
          />
        );
      } else {
        return null;
      }
    });
  };

  const resizeFunction = () => {
    if (window.innerWidth >= 960) {
      setMobileOpen(false);
    }
  };

  return (
    <div className={classes.wrapper}>
      <SidebarContainer routes={routes} />

      <div className={mainPanelClasses} ref={mainPanel}>
        <AdminNavbarContainer routes={routes} {...rest} />
        {/* On the /maps/full-screen-maps route we want the map to be on full screen - this is not possible if the content and conatiner classes are present because they have some paddings which would make the map smaller */}

        {/* 아래는 Routing 창 */}
        {getRoute() ? (
          <div className={classes.content}>
            <div className={classes.container}>
              <Switch>
                {getRoutes(routes)}

                <Redirect from="/admin" to="/admin/dashboard" />
              </Switch>
            </div>
          </div>
        ) : (
          <div className={classes.map}>
            <Switch>
              {getRoutes(routes)}
              <Redirect from="/admin" to="/admin/dashboard" />
            </Switch>
          </div>
        )}

        {getRoute() ? <Footer fluid /> : null}
        <FixedPluginContainer />
      </div>
    </div>
  );
}
