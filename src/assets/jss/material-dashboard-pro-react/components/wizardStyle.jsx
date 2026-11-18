// ##############################
// // // Wizard component styles
// #############################

import {
  primaryColor,
  dangerColor,
  successColor,
  roseColor,
  infoColor,
  warningColor
} from "assets/jss/material-dashboard-pro-react.jsx";

const wizardStyle = {
  wizardContainer: {
    maxWidth: "36.458%",
    margin: "auto",
    "@media (max-width: 992px)": {
      maxWidth: "70%"
    },
    "@media (max-width: 599px)": {
      maxWidth: "100%"
    }
  },
  card: {
    display: "inline-block",
    position: "relative",
    width: "100%",
    color: "black",
    background: "#ffffff",
    minHeight: "410px",
    boxShadow: "none",
    border: "0px",
    borderRadius: "0px",
    marginTop: "100px",
    marginBottom: "250px"
  },
  wizardHeader: {
    textAlign: "center"
  },
  title: {
    fontSize: "30px",
    lineHeight: "30px",
    color: "#2a2a2a",
    margin: "0px",
    marginBottom: "70px"
  },
  subtitle: {
    textAlign: "center",
    fontSize: "21px",
    lineHeight: "21px",
    fontWeight: "bold",
    letterSpacing: "-1.2px",
    margin: "0px",
    paddingBottom: "20px",
    borderBottom: "1px solid #b7b7b7"
  },
  wizardNavigation: {
    position: "relative"
  },
  nav: {
    marginTop: "20px",
    paddingLeft: "0",
    marginBottom: "0",
    listStyle: "none",
    backgroundColor: "rgba(200, 200, 200, 0.2)",
    "&:after,&:before": {
      display: "table",
      content: '" "'
    },
    "&:after": {
      boxSizing: "border-box"
    }
  },
  steps: {
    marginLeft: "0",
    textAlign: "center",
    // float: "left",
    // display: "block",
    position: "relative",
    display: "inline-block"
  },
  stepsAnchor: {
    cursor: "pointer",
    position: "relative",
    display: "block",
    padding: "10px 15px",
    textDecoration: "none",
    transition: "all .3s",
    border: "0 !important",
    borderRadius: "30px",
    lineHeight: "18px",
    textTransform: "uppercase",
    fontSize: "12px",
    fontWeight: "500",
    minWidth: "100px",
    textAlign: "center",
    color: "#555555 !important"
  },
  content: {
    minHeight: "340px",
    padding: "40px 0px"
  },
  stepContent: {
    display: "none"
  },
  stepContentActive: {
    display: "block"
  },
  movingTab: {
    position: "absolute",
    textAlign: "center",
    padding: "12px",
    fontSize: "12px",
    textTransform: "uppercase",
    WebkitFontSmoothing: "subpixel-antialiased",
    top: "-4px",
    left: "0px",
    borderRadius: "4px",
    color: "#FFFFFF",
    cursor: "pointer",
    fontWeight: "500"
  },
  primary: {
    backgroundColor: primaryColor,
    boxShadow:
      "0 4px 20px 0px rgba(0, 0, 0, 0.14), 0 7px 10px -5px rgba(156, 39, 176, 0.4)"
  },
  warning: {
    backgroundColor: warningColor,
    boxShadow:
      "0 4px 20px 0px rgba(0, 0, 0, 0.14), 0 7px 10px -5px rgba(255, 152, 0, 0.4)"
  },
  danger: {
    backgroundColor: dangerColor,
    boxShadow:
      "0 4px 20px 0px rgba(0, 0, 0, 0.14), 0 7px 10px -5px rgba(244, 67, 54, 0.4)"
  },
  success: {
    backgroundColor: successColor,
    boxShadow:
      "0 4px 20px 0px rgba(0, 0, 0, 0.14), 0 7px 10px -5px rgba(76, 175, 80, 0.4)"
  },
  info: {
    backgroundColor: infoColor,
    boxShadow:
      "0 4px 20px 0px rgba(0, 0, 0, 0.14), 0 7px 10px -5px rgba(0, 188, 212, 0.4)"
  },
  rose: {
    backgroundColor: roseColor,
    boxShadow:
      "0 4px 20px 0px rgba(0, 0, 0, 0.14), 0 7px 10px -5px rgba(233, 30, 99, 0.4)"
  },
  footer: {
    display: "flex",
    flexDirection: "column",
    width: "100%"
  },
  up: {
    marginBottom: "10px"
  },
  next: {
    padding: "0px",
    width: "54.143%",
    height: "55px",
    background: "black",
    color: "white",
    borderRadius: "0px",
    display: "flex",
    margin: "auto",
    fontWeight: "300",
    "&:hover": {
      background: "#4d4d4d"
    }
  },
  prev: {
    padding: "0px",
    width: "54.143%",
    height: "55px",
    background: "white",
    color: "black",
    borderRadius: "0px",
    display: "flex",
    margin: "auto",
    border: "1px solid black",
    fontWeight: "300"
  },
  clearfix: {
    "&:after,&:before": {
      display: "table",
      content: '" "'
    },
    clear: "both"
  },
  wizardIndexLeft: {
    position: "absolute",
    fontSize: "300px",
    fontWeight: "bold",
    color: "rgba(42, 42, 42, 0.5)",
    left: "8.333%",
    top: "280px",
    opacity: "0.1",
    lineHeight: "200px",
    "@media (max-width: 992px)": {
      fontSize: "220px",
      top: "130px",
      left: "15%",
      lineHeight: "150px",
      zIndex: "5"
    },
    "@media (max-width: 599px)": {
      fontSize: "130px",
      top: "120px",
      left: "10%",
      lineHeight: "90px",
      zIndex: "5"
    }
  },
  wizardIndexRight: {
    position: "absolute",
    fontSize: "300px",
    fontWeight: "bold",
    color: "rgba(42, 42, 42, 0.5)",
    right: "8.333%",
    top: "280px",
    opacity: "0.1",
    lineHeight: "200px",
    "@media (max-width: 992px)": {
      fontSize: "220px",
      top: "130px",
      right: "15%",
      lineHeight: "150px",
      zIndex: "5"
    },
    "@media (max-width: 599px)": {
      fontSize: "130px",
      top: "120px",
      right: "10%",
      lineHeight: "90px",
      zIndex: "5"
    }
  }
};

export default wizardStyle;
