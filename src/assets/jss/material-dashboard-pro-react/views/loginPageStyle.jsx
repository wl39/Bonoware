// ##############################
// // // LoginPage view styles
// #############################

import {
  container,
  cardTitle
} from "assets/jss/material-dashboard-pro-react.jsx";

const loginPageStyle = {
  container,
  cardTitle: {
    ...cardTitle,
    color: "#FFFFFF"
  },
  textCenter: {
    textAlign: "center"
  },
  content: {
    paddingTop: "18vh",
    minHeight: "calc(100vh - 80px)",
    position: "relative",
    zIndex: "4"
  },
  inputContainerWrapper: {
    display: "flex",
    flexDirection: "column",
    height: "120px",
    justifyContent: "space-between"
  },
  inputContainer: {
    display: "flex",
    flexDirection: "row",
    height: "50px"
  },
  inputHeader: {
    fontSize: "16px",
    height: "16px",
    lineHeight: "16px",
    width: "120px",
    margin: "auto 0px",
    textAlign: "left",
    fontWeight: "500",
    letterSpacing: "-0.8px"
  },
  inputArea: {
    height: "50px"
  },
  justifyContentCenter: {
    justifyContent: "center !important"
  },
  customButtonClass: {
    "&,&:focus,&:hover": {
      color: "#FFFFFF"
    },
    marginLeft: "5px",
    marginRight: "5px"
  },
  inputAdornment: {
    marginRight: "18px"
  },
  inputAdornmentIcon: {
    color: "#555"
  },
  cardHidden: {
    opacity: "0",
    transform: "translate3d(0, -60px, 0)"
  },
  cardHeader: {
    marginBottom: "20px"
  },
  socialLine: {
    padding: "0.9375rem 0"
  }
};

export default loginPageStyle;
