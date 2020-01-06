import React from "react";

import { useSelector, useDispatch } from "react-redux";
import FixedPlugin from "components/FixedPlugin/FixedPlugin";

import { actionCreators as uiAction } from "stores/modules/ui";

export default function FixedPluginCotainer(props) {
  const reduxState = useSelector(state => ({
    miniActive: state.ui.miniActive,
    mobileOpen: state.ui.mobileOpen,
    sidebarImage: state.ui.sidebarImage,
    sidebarColor: state.ui.sidebarColor,
    sidebarBgColor: state.ui.sidebarBgColor,
    logo: state.ui.logo
  }));

  const dispatch = useDispatch();

  const sidebarMinimize = React.useCallback(
    () => dispatch(uiAction.setMiniActive()),
    [dispatch]
  );

  const handleImageClick = React.useCallback(
    image => dispatch(uiAction.handleSidebarImage(image)),
    [dispatch]
  );
  const handleColorClick = React.useCallback(
    color => dispatch(uiAction.handleSidebarColor(color)),
    [dispatch]
  );
  const handleBgColorClick = React.useCallback(
    bgColor => dispatch(uiAction.handleSidebarBgColor(bgColor)),
    [dispatch]
  );

  const [fixedClasses, setFixedClasses] = React.useState("dropdown");
  // The Click Event on fixedClass.
  const handleFixedClick = () => {
    if (fixedClasses === "dropdown") {
      setFixedClasses("dropdown show");
    } else {
      setFixedClasses("dropdown");
    }
  };

  return (
    <FixedPlugin
      handleImageClick={handleImageClick}
      handleColorClick={handleColorClick}
      handleBgColorClick={handleBgColorClick}
      color={reduxState.sidebarColor}
      bgColor={reduxState.sidebarBgColor}
      bgImage={reduxState.sidebarImage}
      handleFixedClick={handleFixedClick}
      fixedClasses={fixedClasses}
      sidebarMinimize={sidebarMinimize}
      miniActive={reduxState.miniActive}
    />
  );
}
