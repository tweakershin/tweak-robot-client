import React, { useCallback } from "react";

import { useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";

import AdminNavbar from "components/Navbars/AdminNavbar";

import { actionCreators as uiAction } from "stores/modules/ui";

export default function AdminNavbarContainer(props) {
  const { ...rest } = props;
  /* Container Redux */
  // Use states from Redux store
  const reduxState = useSelector(state => ({
    miniActive: state.ui.miniActive,
    mobileOpen: state.ui.mobileOpen,
    sidebarImage: state.ui.sidebarImage,
    sidebarColor: state.ui.sidebarColor,
    sidebarBgColor: state.ui.sidebarBgColor,
    logo: state.ui.logo
  }));

  // Functions for redux action
  const dispatch = useDispatch();

  const sidebarMinimize = useCallback(
    () => dispatch(uiAction.setMiniActive()),
    [dispatch]
  );

  const handleDrawerToggle = React.useCallback(
    () => dispatch(uiAction.setMobileOpen(!reduxState.mobileOpen)),
    [reduxState.mobileOpen, dispatch]
  );

  // 자체 function
  // 현재 Route Tab Active 표시
  // adminNavBar에 표시
  const getActiveRoute = routes => {
    let activeRoute = "Default Brand Text";
    for (let i = 0; i < routes.length; i++) {
      if (routes[i].collapse) {
        // Check Route on collapse:True
        let collapseActiveRoute = getActiveRoute(routes[i].views);

        if (collapseActiveRoute !== activeRoute) {
          return collapseActiveRoute;
        }
      } else {
        // Check Route on collapse:False (Default)
        if (
          window.location.href.indexOf(routes[i].layout + routes[i].path) !== -1
        ) {
          return routes[i].name;
        }
      }
    }
    return activeRoute;
  };

  return (
    <AdminNavbar
      sidebarMinimize={sidebarMinimize}
      miniActive={reduxState.miniActive}
      handleDrawerToggle={handleDrawerToggle}
      brandText={getActiveRoute(props.routes)}
      {...rest}
    />
  );
}

AdminNavbarContainer.propTypes = {
  routes: PropTypes.array
};
