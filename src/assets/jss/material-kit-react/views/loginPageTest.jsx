import { container } from "assets/jss/material-kit-react.jsx";

const signupPageStyle = {
  container: {
    ...container,
    zIndex: "2",
    position: "relative",
    paddingTop: "20vh",
    color: "#FFFFFF"
  },
  paper: {
    position: "absolute",
    width: "600px",
    height: "470px",
    padding: "70px 43px",
    background: "white",
    "@media (max-width: 599px)": {
      width: "100%",
      padding: "20px 10px",
      height: "fit-content"
    }
  },
  cardHidden: {
    opacity: "0",
    transform: "translate3d(0, -60px, 0)"
  },
  pageHeader: {
    minHeight: "100vh",
    maxHeight: "1200px",
    height: "auto",
    display: "inherit",
    position: "relative",
    margin: "0",
    padding: "0",
    border: "0",
    alignItems: "center",
    "&:before": {
      background: "rgba(0, 0, 0, 0.5)"
    },
    "&:before,&:after": {
      position: "absolute",
      zIndex: "1",
      width: "100%",
      height: "100%",
      display: "block",
      left: "0",
      top: "0",
      content: '""'
    },
    "& footer li a,& footer li a:hover,& footer li a:active": {
      color: "#FFFFFF"
    }
  },
  form: {
    margin: "0"
  },
  cardHeader: {
    width: "40%",
    alignItems: "center",
    textAlign: "center",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "-40px",
    padding: "20px 0",
    marginBottom: "15px",
    background: "#999",
    boxShadow:
      "0 4px 20px 0px rgba(0, 0, 0, 0.14), 0 7px 10px -5px rgba(0, 0, 0, 0.2)"
  },
  socialIcons: {
    maxWidth: "24px",
    marginTop: "0",
    width: "100%",
    transform: "none",
    left: "0",
    top: "0",
    height: "100%",
    lineHeight: "41px",
    fontSize: "20px"
  },
  divider: {
    marginTop: "30px",
    marginBottom: "0px",
    textAlign: "center"
  },
  cardFooter: {
    marginTop: "60px",
    height: "110px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between"
  },
  socialLine: {
    marginTop: "1rem",
    textAlign: "center",
    padding: "0"
  },
  hideIcon: {
    display: "none"
  },
  inputIconsColor: {
    color: "#495057"
  },
  modalCloseButton: {
    color: "#999999",
    // marginTop: "-10px",
    // marginLeft: "-10px",
    cursor: "pointer",
    fontSize: "inherit",
    // opacity: ".9",
    lineHeight: "1",
    float: "right",
    zIndex: "500",
    position: "absolute",
    top: "-60px",
    right: "0",
    padding: "0px"
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
    minWidth: "120px",
    margin: "auto 0px",
    textAlign: "left",
    fontWeight: "500",
    letterSpacing: "-0.8px",
    "@media (max-width: 599px)": {
      minWidth: "80px",
      width: "80px"
    }
  },
  inputArea: {
    height: "50px",
    width: "100%"
  },
  root: {
    height: "50px",
    transition:
      "border-color 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms,border-width 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms",
    paddingLeft: "10px",
    border: "1px solid #ebebeb",
    "&:hover": {
      border: "1px solid #a2a9af"
    }
  },
  focused: {
    border: "2px solid black !important"
  },
  checkboxContainer: {
    paddingLeft: "120px",
    "@media (max-width: 599px)": {
      paddingLeft: "80px"
    }
  },
  formControlLabel: {
    marginLeft: "0px",
    marginRight: "18px"
  },
  checkbox: {
    padding: "0px",
    marginRight: "10px"
  },
  loginButton: {
    height: "50px",
    maxHeight: "50px",
    boxShadow: "none",
    background: "black",
    borderRadius: "0px",
    transition: "0.2s",
    width: "80%",
    margin: "0px auto",
    "&:hover": {
      background: "#4d4d4d"
    }
  },
  link: {
    height: "50px",
    width: "80%",
    margin: "0px auto"
  },
  signInButton: {
    height: "50px",
    width: "100%",
    maxHeight: "50px",
    boxShadow: "none",
    margin: "0px",
    background: "white",
    borderRadius: "0px",
    border: "1px solid black",
    transition: "0.2s",
    "&:hover": {
      background: "b3b3b3"
    }
  },
  loginButtonLabel: {
    fontSize: "14px",
    height: "14px",
    lineHeight: "14px",
    color: "white"
  },
  signInButtonLabel: {
    fontSize: "14px",
    height: "14px",
    lineHeight: "14px",
    color: "black"
  },
  searchContainer: {
    display: "flex",
    marginTop: "20px",
    width: "fit-content",
    marginLeft: "auto",
    marginRight: "0"
  },
  idSearch: {
    fontSize: "14px",
    fontWeight: "300",
    color: "black !important",
    lineHeight: "14px",
    height: "14px",
    borderRight: "1px solid black",
    paddingRight: "20px"
  },
  pwSearch: {
    fontSize: "14px",
    fontWeight: "300",
    color: "black !important",
    lineHeight: "14px",
    height: "14px",
    paddingLeft: "20px"
  }
};

export default signupPageStyle;
