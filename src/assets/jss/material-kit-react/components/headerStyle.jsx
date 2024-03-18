import {
  container,
  defaultFont,
  primaryColor,
  infoColor,
  successColor,
  warningColor,
  dangerColor,
  roseColor,
  transition,
  boxShadow,
  drawerWidth
} from "assets/jss/material-kit-react.jsx";

const headerStyle = {
  appBar: {
    flexDirection: "column",
    display: "flex",
    border: "0",
    marginBottom: "20px",
    color: "#555",
    width: "100%",
    backgroundColor: "#fff",
    boxShadow:
      "0 4px 18px 0px rgba(0, 0, 0, 0.12), 0 7px 10px -5px rgba(0, 0, 0, 0.15)",
    transition: "all 150ms ease 0s",
    alignItems: "center",
    flexFlow: "row nowrap",
    justifyContent: "flex-start",
    position: "relative",
    zIndex: "unset"
  },
  otherPage: {
    backgroundColor: "#000000 !important",
    padding: "20px 0px !important"
  },
  notMainContainer: {
    display: "flex",
    justifyContent: "space-between",
    marginLeft: "10px",
    marginRight: "40px",
    width: "100%",
    "@media (max-width: 1600px)": {
      marginLeft: "30px",
      marginRight: "30px"
    },
    "@media (min-width: 992px)": {
      marginLeft: "30px",
      marginRight: "5px"
    }
  },
  absolute: {
    position: "absolute"
  },
  fixed: {
    position: "fixed",
    zIndex: "1100"
  },
  container: {
    ...container,
    minHeight: "50px",
    width: "100%",
    flex: "1",
    alignItems: "center",
    justifyContent: "space-between",
    display: "flex",
    flexWrap: "nowrap",
    margin: "0px 160px",
    height: "50px",
    paddingRight: "0px",
    "@media (min-width: 1200px)": {
      maxWidth: "83.333%"
    },
    "@media (max-width: 599px)": {
      minHeight: "40px",
      height: "40px"
    }
  },
  otherPageContainer: {
    ...container,
    minHeight: "40px",
    width: "100%",
    flex: "1",
    alignItems: "center",
    justifyContent: "space-between",
    display: "flex",
    flexWrap: "nowrap",
    margin: "0px 160px",
    height: "40px",
    paddingRight: "0px",
    "@media (min-width: 1200px)": {
      maxWidth: "97% !important"
    },
    "@media (min-width: 992px)": {
      maxWidth: "98% !important"
    },
    "@media (min-width: 768px)": {
      maxWidth: "98% !important"
    },
    "@media (min-width: 576px)": {
      maxWidth: "97% !important"
    },
    "@media (max-width: 599px)": {
      minHeight: "40px",
      height: "40px"
    }
  },
  navBar: {
    display: "flex",
    width: "445px",
    height: "18px",
    margin: "auto",
    textAlign: "center",
    justifyContent: "space-between",
    fontSize: "16px",
    fontWeight: "500px",
    fontStyle: "normal",
    fontStretch: "normal",
    lineHeight: "1",
    "@media (max-width: 991px)": {
      height: "14px",
      fontSize: "14px",
      width: "300px"
    },
    "@media (max-width: 767px)": {
      display: "none"
    }
  },
  navBarOtherContainer: {
    margin: "auto 0px",
    "@media (max-width: 767px)": {
      margin: "auto"
    }
  },
  navBarOther: {
    display: "flex",
    width: "445px",
    height: "16px",
    margin: "auto",
    textAlign: "center",
    justifyContent: "space-between",
    fontSize: "16px",
    fontWeight: "500px",
    fontStyle: "normal",
    fontStretch: "normal",
    lineHeight: "1",
    "@media (max-width: 1600px)": {
      width: "300px",
      display: "flex"
    },
    "@media (max-width: 1200px)": {
      height: "14px",
      fontSize: "14px",
      width: "270px",
      display: "flex"
    },
    "@media (max-width: 991px)": {
      display: "none"
    }
  },
  link: {
    transition: "0.3s",
    color: "inherit !important",
    "&:hover": {
      color: "inherit !important",
      fontWeight: "700"
    }
  },
  flex: {
    flex: 1
  },
  mobileDrawer: {
    display: "none",
    flexDirection: "row",
    flex: 1,
    "@media (min-width: 1200px)": {
      display: "none"
    },
    "@media (max-width: 599px)": {
      display: "flex"
    }
  },
  mobileDrawerRight: {
    display: "flex",
    justifyContent: "space-between",
    height: "50px",
    width: "204px !important",
    minWidth: "204px",
    "@media (max-width: 991px)": {
      width: "180px !important",
      minWidth: "180px"
    },
    "@media (max-width: 599px)": {
      display: "none"
    }
  },
  mobileDrawerRightOther: {
    display: "flex",
    justifyContent: "space-between",
    height: "50px",
    width: "204px !important",
    minWidth: "204px",
    "@media (max-width: 1200px)": {
      width: "142.875px !important",
      minWidth: "142.875px"
    },
    "@media (max-width: 599px)": {
      display: "none"
    }
  },
  list2: {
    width: "100%",
    height: "100%",
    paddingRight: "0px",
    paddingLeft: "0px",
    paddingTop: "0px",
    paddingBottom: "0px",
    margin: "0px"
  },
  list1: {
    width: "auto",
    height: "35px",
    "@media (max-width: 768px)": {
      height: "30px"
    },
    "@media (max-width: 599px)": {
      height: "25px"
    }
  },

  title: {
    ...defaultFont,
    lineHeight: "30px",
    fontSize: "18px",
    borderRadius: "3px",
    textTransform: "none",
    color: "inherit",
    "&:hover,&:focus": {
      color: "inherit",
      background: "transparent"
    }
  },
  appResponsive: {},
  primary: {
    backgroundColor: primaryColor,
    color: "#FFFFFF",
    borderRadius: "1rem",
    boxShadow:
      "0 4px 20px 0px rgba(0, 0, 0, 0.14), 0 7px 12px -5px rgba(156, 39, 176, 0.46)"
  },
  info: {
    backgroundColor: infoColor,
    color: "#FFFFFF",
    boxShadow:
      "0 4px 20px 0px rgba(0, 0, 0, 0.14), 0 7px 12px -5px rgba(0, 188, 212, 0.46)"
  },
  success: {
    backgroundColor: successColor,
    color: "#FFFFFF",
    boxShadow:
      "0 4px 20px 0px rgba(0, 0, 0, 0.14), 0 7px 12px -5px rgba(76, 175, 80, 0.46)"
  },
  warning: {
    backgroundColor: warningColor,
    color: "#FFFFFF",
    boxShadow:
      "0 4px 20px 0px rgba(0, 0, 0, 0.14), 0 7px 12px -5px rgba(255, 152, 0, 0.46)"
  },
  danger: {
    backgroundColor: dangerColor,
    color: "#FFFFFF",
    boxShadow:
      "0 4px 20px 0px rgba(0, 0, 0, 0.14), 0 7px 12px -5px rgba(244, 67, 54, 0.46)"
  },
  rose: {
    backgroundColor: roseColor,
    color: "#FFFFFF",
    boxShadow:
      "0 4px 20px 0px rgba(0, 0, 0, 0.14), 0 7px 12px -5px rgba(233, 30, 99, 0.46)"
  },
  transparent: {
    backgroundColor: "transparent",
    boxShadow: "none",
    paddingTop: "32px",
    color: "#FFFFFF",
    "@media (max-width: 599px)": {
      padding: "10px 0px !important"
    }
  },
  dark: {
    color: "#FFFFFF",
    backgroundColor: "#212121 !important",
    boxShadow:
      "0 4px 20px 0px rgba(0, 0, 0, 0.14), 0 7px 12px -5px rgba(33, 33, 33, 0.46)"
  },
  white: {
    border: "0",
    padding: "5px 0px",
    marginBottom: "20px",
    color: "#555",
    backgroundColor: "#fff !important",
    boxShadow:
      "0 4px 18px 0px rgba(0, 0, 0, 0.12), 0 7px 10px -5px rgba(0, 0, 0, 0.15)",
    "@media (max-width: 599px)": {
      padding: "0px !important",
      height: "40px"
    }
  },
  drawerPaper: {
    border: "none",
    bottom: "0",
    transitionProperty: "top, bottom, width",
    transitionDuration: ".2s, .2s, .35s",
    transitionTimingFunction: "linear, linear, ease",
    width: drawerWidth,
    ...boxShadow,
    position: "fixed",
    display: "block",
    top: "0",
    height: "100vh",
    maxHeight: "1200px",
    right: "auto",
    left: "0",
    visibility: "visible",
    overflowY: "visible",
    borderTop: "none",
    textAlign: "left",
    paddingRight: "0px",
    paddingLeft: "0",
    background: "#121621",
    ...transition
  },
  initial: {
    paddingTop: "82px"
  },
  scrollTop: {
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    paddingTop: "6px",
    color: "#dbdbdb",
    marginTop: "20px",
    "&,&::placeholder": {
      color: "white"
    }
  },

  scrollDown: {
    paddingTop: "6px", //73
    backgroundColor: "white",
    borderTop: "1px rgba(0, 0, 0, 0.1)",
    color: "black",
    "&,&::placeholder": {
      color: "black"
    }
  },

  headerSearchDown: {
    marginTop: "80px",
    "@supports (-ms-ime-align: auto)": {
      marginTop: "36px"
    }
  },
  headerSearchTop: {
    marginTop: "65px",
    "@supports (-ms-ime-align: auto)": {
      marginTop: "45px"
    }
  },

  testTop: {
    "@media (max-width: 959px)": {
      top: "92px !important"
    }
  },
  testDown: {
    "@media (max-width: 959px)": {
      top: "72px !important"
    }
  },
  buttonOpen: {
    width: "36px",
    height: "36px",
    padding: "0px"
  },
  buttonClose: {
    width: "36px",
    height: "36px",
    padding: "0px"
  },
  logo: {
    position: "relative",
    width: "142.875px",
    height: "35px",
    color: "transparent !important",
    "@media (max-width: 599px)": {
      position: "absolute",
      left: "0",
      right: "0",
      width: "103px",
      height: "25px",
      margin: "auto",
      top: "5px"
    }
  },
  searchLogo: {
    // width: "100%",
    textAlign: "left",
    alignItems: "left"
  },
  searchBarDown: {
    border: "1px solid rgba(0, 0, 0, 0.2)",
    color: "black"
  },
  searchBarUp: {
    border: "1px solid rgba(255, 255, 255, 0.8)",
    color: "white"
  }
};

export default headerStyle;
