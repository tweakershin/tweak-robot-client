import React from "react";

import { useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";

import Sidebar from "components/Sidebar/Sidebar";

import { actionCreators as uiAction } from "stores/modules/ui";

export default function SidebarContainer(props) {
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

  // const uiStore = useSelector(state => state.ui);

  // Use Redux dispatch Function
  const dispatch = useDispatch();

  // Functions for redux action
  const handleDrawerToggle = React.useCallback(
    () => dispatch(uiAction.setMobileOpen(!reduxState.mobileOpen)),
    [reduxState.mobileOpen, dispatch]
  );

  const { routes, ...rest } = props;

  // const [miniActive, setMiniActive] = React.useState(false);

  //

  // // redux state 사용
  // const authState = useSelector(state => state.auth);

  // // react-router history 사용
  // let history = useHistory();
  // let location = useLocation();
  // let { from } = location.state || { from: { pathname: "/" } };

  // // Reducer호출
  // const dispatch = useDispatch();

  // const setUsernameInput = useCallback(
  //   username => dispatch(AuthActions.setUsernameInput(username)),
  //   [dispatch]
  // );
  // const setPasswordInput = useCallback(
  //   password => dispatch(AuthActions.setPasswordInput(password)),
  //   [dispatch]
  // );
  // const serverLogin = useCallback(
  //   (username, password) =>
  //     dispatch(AuthActions.serverLogin(username, password)),
  //   [dispatch]
  // );

  // if (authState.logined && authState.authInfo) {
  //   // 로그인 되어있을 시 이동.
  //   return <Redirect to={from} />;
  // }

  // console.log("SidebarContainer");

  // sidebar에 보여줄 것 확인
  // 재귀적으로 호출함
  // const filterViewSidebar = routes => {
  //   const newRoutes = routes.map((prop, idx) => {
  //     if (prop.views) {
  //       const newViews = filterViewSidebar(prop.views);
  //     }
  //     if (prop.isSidebar) {
  //       return true;
  //     } else {
  //       return false;
  //     }
  //   });
  //   return newRoutes;
  // };
  // const sidebarRoutes = filterViewSidebar(routes);

  return (
    <Sidebar
      routes={routes}
      logoText={"Creative Tim"}
      logo={reduxState.logo}
      image={reduxState.sidebarImage}
      open={reduxState.mobileOpen}
      color={reduxState.sidebarColor}
      bgColor={reduxState.sidebarBgColor}
      miniActive={reduxState.miniActive}
      handleDrawerToggle={handleDrawerToggle}
      {...rest}
    />
  );
}

SidebarContainer.propTypes = {
  routes: PropTypes.array
};
