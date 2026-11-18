import { container } from "assets/jss/material-kit-react.jsx";

const footerStyle = {
  block: {
    color: "#a2a2a2 !important",
    height: "14px",
    textTransform: "uppercase",
    position: "relative",
    display: "block",
    fontSize: "14px",
    letterSpacing: "-0.35px",
    fontWeight: "300",
    lineHeight: "1",
    "&:hover": {
      color: "white !important"
    }
  },
  block2: {
    color: "#a2a2a2 !important",
    lineHeight: "1",
    height: "16px",
    textTransform: "uppercase",
    position: "relative",
    display: "block",
    fontSize: "16px",
    letterSpacing: "-0.35px",
    fontWeight: "600",
    padding: "0px 20px",
    "&:hover": {
      color: "white !important"
    }
  },
  left: {
    float: "left!important",
    display: "block",
    paddingBottom: "0px"
  },
  leftInfo: {
    float: "left!important",
    display: "block",
    paddingBottom: "0px",
    borderBottom: "1px solid black"
  },
  rightBottom: {
    color: "black",
    float: "right",
    bottom: "0px",
    fontWeight: "500",
    fontSize: "13px",
    padding: "0.5375rem"
  },
  footer: {
    height: "100%",
    padding: "0px",
    zIndex: "2",
    position: "relative",
    backgroundColor: "black",
    paddingBottom: "38px",
  },
  footerContainer: {
    margin: "0px auto",
    maxWidth: "83.333%",
    display: "flex",
    flexDirection: "column",
    paddingTop: "50px",
    paddingBottom: "50px",
    color: "#a2a2a2 !important",
    "@media (max-width: 1600px)": {
      paddingBottom: "20px"
    },
    "@media (max-width: 992px)": {
      maxWidth: "90%"
    },
    "@media (max-width: 768px)": {
      maxWidth: "90%"
    },
    "@media (max-width: 599px)": {
      maxWidth: "100%"
    }
  },
  call: {
    fontSize: "30px",
    height: "30px",
    fontWeight: "700",
    lineHeight: "1",
    letterSpacing: "normal",
    color: "#a2a2a2 !important",
    textAlign: "center",
    "@media (max-width: 992px)": {
      marginBottom: "10px"
    }
  },
  a: {
    color: "black",
    textDecoration: "none",
    backgroundColor: "transparent",
    "&,&:hover,&:focus": {
      color: "white !important"
    }
  },
  footerWhiteFont: {
    "&,&:hover,&:focus": {
      color: "white !important"
    }
  },
  firstRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: "20px",
    "@media (max-width: 992px)": {
      flexDirection: "column"
    }
  },
  container: {
    ...container,
    paddingLeft: "0px !important",
    paddingRight: "0px !important"
  },
  list: {
    marginBottom: "0",
    padding: "0",
    marginTop: "0",
    height: "16px",
    display: "flex",
    margin: "auto 0px",
    "@media (max-width: 992px)": {
      margin: "auto",
      height: "100%",
      justifyContent: "space-between",
      flexDirection: "column"
    }
  },
  listInfoContainer: {
    color: "white",
    "@media (max-width: 992px)": {
      display: "flex",
      flexDirection: "column",
      textAlign: "center"
    }
  },
  listInfo: {
    display: "flex",
    position: "absolute",
    height: "14px",
    lineHeight: "1",
    color: "#a2a2a2 !important",
    left: "0",
    right: "0",
    top: "54px",
    margin: "auto",
    width: "fit-content",
    "@media (max-width: 1600px)": {
      top: "20px"
    }
  },
  inlineBlock: {
    display: "inline-block",
    padding: "0px",
    width: "auto"
  },
  icon: {
    width: "18px",
    height: "18px",
    position: "relative",
    top: "3px"
  },
  infoBorder: {
    display: "inline-block",
    color: "#a2a2a2 !important",
    padding: "0px 25px",
    width: "auto",
    borderRight: "1px solid #a2a2a2 !important",
    "@media (max-width: 768px)": {
      padding: "0px 10px"
    }
  },
  infoBorderLast: {
    display: "inline-block",
    color: "#a2a2a2 !important",
    padding: "0px 25px",
    width: "auto"
  },
  contact: {
    fontSize: "12px",
    flex: "1",
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center"
  },
  secondRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    borderBottom: "1px solid #e1e0e0",
    paddingBottom: "40px",
    "@media (max-width: 768px)": {
      justifyContent: "normal",
      flexDirection: "column",
      textAlign: "center"
    }
  },
  firstBox: {
    marginRight: "50px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    height: "40px",
    "@media (max-width: 768px)": {
      marginRight: "5px",
      height: "100%"
    }
  },
  secondBox: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    height: "40px",
    "@media (max-width: 768px)": {
      height: "100%"
    }
  },
  boxDetails: {
    fontSize: "16px",
    lineHeight: "1",
    height: "1",
    color: "#a2a2a2 !important"
  },
  lastRow: {
    display: "flex",
    flexDirection: "row",
    height: "100%",
    justifyContent: "flex-start",
    paddingTop: "30px",
    "@media (max-width: 1600px)": {
      flexDirection: "column"
    }
  },
  detailsFirst: {
    fontSize: "14px",
    height: "14px",
    lineHeight: "1",
    fontWeight: "300",
    letterSpacing: "-0.35px",
    color: "#a2a2a2 !important",
    paddingRight: "15px",
    borderRight: "1px solid #a2a2a2 !important",
    "@media (max-width: 1600px)": {
      borderRight: "0px !important",
      textAlign: "center"
    }
  },
  details: {
    fontSize: "14px",
    height: "14px",
    lineHeight: "1",
    fontWeight: "300",
    letterSpacing: "-0.35px",
    color: "#a2a2a2 !important",
    padding: "0px 15px",
    borderRight: "1px solid #a2a2a2 !important",
    "@media (max-width: 1600px)": {
      borderRight: "0px !important",
      textAlign: "center"
    }
  },
  company: {
    color: "#a2a2a2 !important",
    lineHeight: "1",
    fontSize: "14px",
    height: "14px",
    paddingLeft: "15px",
    "&:hover": {
      color: "white !important"
    },
    "@media (max-width: 1600px)": {
      textAlign: "center"
    }
  }
};
export default footerStyle;
