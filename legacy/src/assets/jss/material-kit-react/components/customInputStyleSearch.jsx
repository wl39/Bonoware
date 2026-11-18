import {
  dangerColor,
  defaultFont,
  grayColor,
  successColor
} from "assets/jss/material-kit-react.jsx";

const customInputStyle = {
  paddingChange: {
    paddingBottom: "0px"
  },
  disabled: {
    "&:before": {
      borderColor: "transparent !important"
    }
  },
  underline: {
    "&:hover:not($disabled):before,&:before": {
      borderColor: "#D2D2D2 !important",
      borderWidth: "1px !important"
    },
    "&:after": {
      borderColor: grayColor
    }
  },
  underlineError: {
    "&:after": {
      borderColor: dangerColor
    }
  },
  underlineSuccess: {
    "&:after": {
      borderColor: successColor
    }
  },
  labelRoot: {
    ...defaultFont,
    color: "#AAAAAA !important",
    fontWeight: "400",
    fontSize: "14px",
    lineHeight: "1.42857",
    top: "10px",
    "& + $underline": {
      marginTop: "0px"
    }
  },
  labelRootError: {
    color: dangerColor + " !important"
  },
  labelRootSuccess: {
    color: successColor + " !important"
  },
  feedback: {
    position: "absolute",
    bottom: "3px",
    right: "0",
    zIndex: "2",
    display: "block",
    width: "1em",
    height: "1em",
    textAlign: "center",
    pointerEvents: "none"
  },
  feedbackRight: {
    marginRight: "22px"
  },
  formControl: {
    alignItems: "left",
    textAlign: "center",
    display: "none",
    flexDirection: "row",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    color: "white",
    border: "1px solid rgba(255, 255, 255, 0.8)",
    height: "60px",
    width: "800px",
    "@media (min-width: 480px)": {
      display: "flex",
      height: "48px",
      width: "100%"
    },
    "@media (min-width: 768px)": {
      display: "flex",
      height: "48px",
      width: "100%"
    },
    "@media (min-width: 992px)": {
      display: "flex",
      height: "48px",
      width: "58%",
      marginRight: "5px"
    },
    "@media (min-width: 1200px)": {
      display: "flex",
      height: "60px",
      width: "58%"
    },
    "@media (max-width: 599px)": {
      display: "none !important"
    },
    "& svg,& .fab,& .far,& .fal,& .fas": {
      color: "inherit"
    }
  },
  formControlMain: {
    alignItems: "left",
    textAlign: "center",
    display: "none",
    flexDirection: "row",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    color: "white",
    border: "1px solid rgba(255, 255, 255, 0.8)",
    height: "65px",
    width: "630px",
    "@media (min-width: 600px)": {
      display: "none",
      height: "48px",
      width: "440px"
    },
    "@media (min-width: 768px)": {
      display: "none",
      height: "48px",
      width: "440px"
    },
    "@media (min-width: 992px)": {
      display: "none",
      height: "48px",
      width: "440px"
    },
    "@media (min-width: 1200px)": {
      display: "none",
      height: "65px",
      width: "630px"
    },
    "@media (max-width: 599px)": {
      display: "none"
    },
    "& svg,& .fab,& .far,& .fal,& .fas": {
      color: "inherit"
    }
  },
  inputBase: {
    marginLeft: 21,
    flex: 1,
    height: "65px",
    color: "white",
    "@media (min-width: 480px)": {
      // display: "none",
    },
    "@media (min-width: 768px)": {
      display: "flex",
      height: "48px"
    },
    "@media (min-width: 992px)": {
      display: "flex",
      height: "48px"
    },
    "@media (min-width: 1200px)": {
      display: "flex",
      height: "65px"
    }
  },
  searchIconContainer: {
    margin: "16px 16px 10px 0px",
    height: "20px",
    "@media (min-width: 480px)": {
      // display: "none",
    },
    "@media (min-width: 768px)": {
      margin: "16px 16px 10px 0px"
    },
    "@media (min-width: 992px)": {
      margin: "16px 16px 10px 0px"
    },
    "@media (min-width: 1200px)": {
      margin: "22px 30px 22px 0px"
    }
  },
  blackUnderline: {
    // 해더 검색바 색깔
    "&:before": {
      borderBottomColor: "black"
    },
    "&:after": {
      borderBottomColor: "black"
    }
  },
  whiteUnderline: {
    "&:hover:not($disabled):before,&:before": {
      borderColor: "#FFFFFF"
    },
    "&:after": {
      borderColor: "#FFFFFF"
    }
  },
  input: {
    color: "inherit !important",
    "&,&::placeholder": {
      color: "inherit !important",
      fontSize: "20px",
      fontFamily: "inherit",
      //fontWeight: "400",
      lineHeight: "1.42857"
    },
    "&::placeholder": {
      color: "inherit !important"
      //textShadow: "1px 1px #000000"
    }
  },
  whiteInput: {
    "&,&::placeholder": {
      color: "#FFFFFF",
      opacity: "1"
    }
  },
  greenColor: {
    backgroundImage: ""
  },
  window: {
    marginTop: "40px",
    marginLeft: "auto",
    marginRight: "auto",
    width: "inherit",
    display: "grid",
    position: "absolute",
    zIndex: "10",
    overflowY: "scroll",
    maxHeight: "420px",
    left: "0",
    right: "0",
    boxShadow: "0px 2px 2px rgba(0, 0, 0, 0.2)",
    "&::-webkit-scrollbar": {
      width: "2px"
    },

    /* Track */
    "&::-webkit-scrollbar-track": {
      background: "#f1f1f1"
    },

    /* Handle */
    "&::-webkit-scrollbar-thumb": {
      background: "black"
    },

    /* Handle on hover */
    "&::-webkit-scrollbar-thumb:hover": {
      background: "black"
    },
    "@media (min-width: 1200px)": {
      width: "920px !important"
    }
  },
  windowHeader: {
    marginTop: "47px",
    marginLeft: "auto",
    marginRight: "auto",
    width: "90vw",
    display: "grid",
    position: "fixed",
    zIndex: "10",
    overflowY: "scroll",
    maxHeight: "420px",
    left: "0",
    right: "0",
    boxShadow: "0px 2px 2px rgba(0, 0, 0, 0.2)",
    "&::-webkit-scrollbar": {
      width: "2px"
    },

    /* Track */
    "&::-webkit-scrollbar-track": {
      background: "#f1f1f1"
    },

    /* Handle */
    "&::-webkit-scrollbar-thumb": {
      background: "black"
    },

    /* Handle on hover */
    "&::-webkit-scrollbar-thumb:hover": {
      background: "black"
    },
    "@media (min-width: 480px)": {
      // display: "none",
    },
    "@media (min-width: 768px)": {},
    "@media (min-width: 992px)": {},
    "@media (min-width: 1200px)": {
      marginTop: "64px"
    }
  },
  mainPage: {
    position: "absolute",
    marginLeft: "-2px",
    maxHeight: "364px",
    width: "630px"
  },
  mobileSearchBar: {
    position: "fixed",
    top: "34px",
    left: "0",
    right: "0",
    zIndex: "1000",
    transition: "all 150ms ease 0s",
    width: "auto"
  },
  mobile: {
    top: "92px",
    width: "100%",
    maxHeight: "180px",
    overflowY: "scroll",
    display: "grid",
    left: "0",
    right: "0",
    position: "fixed",
    zIndex: "10",
    boxShadow: "0px 2px 2px rgba(0, 0, 0, 0.2)"
  },
  probePink: {
    "&:after": {
      borderBottomColor: "black"
    }
  },
  custom: {
    flexGrow: "1",
    marginTop: "-15px",
    alignItems: "center",
    color: "inherit",
    paddingBottom: "2px !important",
    "@media (min-width: 1200px)": {
      width: "920px !important"
    }
  },
  customHeader: {
    maxWidth: "80%",
    flexGrow: "1",
    marginTop: "-15px",
    alignItems: "center",
    color: "inherit",
    paddingBottom: "2px !important"
  },
  cssLabel: {
    "&$cssFocused": {
      color: "#232020"
    }
  },
  cssFocused: {},
  cssOutlinedInput: {
    background: "white",
    borderRadius: "4px",
    "&$cssFocused $notchedOutline": {
      borderColor: "#232020"
    }
  },
  notchedOutline: {}
};

export default customInputStyle;
