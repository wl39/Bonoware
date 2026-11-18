const buyStepperStyle = {
  webModalBuy: {
    width: "600px",
    position: "absolute",
    top: "45%",
    left: "50%",
    background: "white",
    transform: "translate(-50%, -50%)",
    "@media (max-width: 599px)": {
      width: "100%"
    }
  },
  stepper: {
    justifyContent: "space-between",
    padding: "40px 20px",
    "@media (max-width: 599px)": {
      padding: "15px 5px"
    }
  },
  stepTest: {
    maxWidth: "fit-content",
    padding: "0px"
  },
  textContainer: {
    background: "white",
    padding: "0px 40px",
    color: "black",
    paddingBottom: "40px",
    "@media (max-width: 599px)": {
      padding: "0px 5px",
      paddingBottom: "15px",
      paddingTop: "6px"
    }
  },
  modelContainer: {
    height: "40px",
    marginBottom: "20px",
    display: "flex",
    "@media (max-width: 599px)": {
      height: "62px"
    }
  },
  sizeContainer: {
    marginBottom: "20px",
    display: "flex"
  },
  priceContainer: {
    marginBottom: "20px",
    display: "flex"
  },
  itemHeader: {
    width: "80px",
    borderRight: "2px solid black",
    textAlign: "left",
    marginBottom: "auto",
    height: "16px",
    lineHeight: "16px",
    fontWeight: "600",
    "@media (max-width: 599px)": {
      width: "60px",
      minWidth: "60px"
    }
  },
  modelNameContainer: {
    paddingLeft: "40px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    "@media (max-width: 599px)": {
      paddingLeft: "10px"
    }
  },
  modelEn: {
    fontSize: "16px",
    fontWeight: "600",
    lineHeight: "16px",
    textTransform: "capitalize"
  },
  modelKr: {
    fontSize: "14px",
    fontWeight: "300",
    lineHeight: "14px"
  },
  size: {
    fontSize: "16px",
    fontWeight: "600",
    lineHeight: "16px",
    paddingLeft: "40px",
    "@media (max-width: 599px)": {
      paddingLeft: "10px"
    }
  },
  addressSearchButton: {
    width: "120px",
    height: "50px",
    padding: "0px",
    background: "white",
    color: "black",
    borderRadius: "0px",
    border: "1px solid black",
    fontWeight: "200",
    "@media (max-width: 599px)": {
      width: "80px",
      minWidth: "80px",
      marginLeft: "10px"
    }
  },
  inputLabel: {
    width: "80px",
    textAlign: "left",
    marginBottom: "auto",
    height: "16px",
    lineHeight: "16px",
    fontWeight: "600",
    "@media (max-width: 599px)": {
      width: "70px",
      minWidth: "70px"
    }
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
  rootDisabled: {
    height: "50px",
    paddingLeft: "10px",
    border: "1px solid #f2f2f2"
  },
  price: {
    fontSize: "16px",
    fontWeight: "600",
    lineHeight: "16px",
    paddingLeft: "40px",
    "@media (max-width: 599px)": {
      paddingLeft: "10px"
    }
  },
  radioContainer: {
    background: "white",
    padding: "20px",
    color: "black"
  },
  buttonContainer: {
    justifyContent: "space-between",
    margin: "10px 0px 35px",
    display: "flex",
    flexDirection: "column-reverse",
    height: "120px",
    "@media (max-width: 599px)": {
      height: "50px",
      flexDirection: "row",
      marginBottom: "15px"
    }
  },
  next: {
    padding: "0px",
    width: "400px",
    height: "55px",
    background: "black",
    color: "white",
    borderRadius: "0px",
    display: "flex",
    margin: "auto",
    fontWeight: "300",
    boxShadow: "none",
    "&:hover": {
      background: "#4d4d4d"
    },
    "@media (max-width: 599px)": {
      width: "40%",
      height: "50px"
    }
  },
  prev: {
    padding: "0px",
    width: "400px",
    height: "55px",
    background: "white",
    color: "black",
    borderRadius: "0px",
    display: "flex",
    margin: "auto",
    fontWeight: "300",
    border: "1px solid black",
    boxShadow: "none",
    "&:hover": {
      background: "#e6e6e6"
    },
    "@media (max-width: 599px)": {
      width: "40%"
    }
  },
  inputContainer: {
    background: "white",
    display: "flex",
    flexDirection: "column",
    padding: "0px 40px 40px",
    "@media (max-width: 599px)": {
      padding: "0px 10px 5px"
    }
  },
  inputWrapper: {
    width: "300px",
    height: "170px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    "@media (max-width: 599px)": {
      width: "calc(100% - 160px)"
    }
  },
  postCodeContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  textField: {
    marginBottom: "5px"
  },
  mobModalBuy: {
    top: "50%",
    width: "85%",
    left: "50%",
    position: "absolute",
    transform: "translate(-50%, -50%)",
    minWidth: "360px"
  },
  mobileLable: {
    background: "#3f51b5",
    color: "white",
    height: "24px",
    lineHeight: "24px",
    textAlign: "center"
  },
  mobileContent: {
    background: "#fafafa",
    height: "calc(95% - 48px)",
    color: "black"
  },
  confetti: {
    top: "150%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    position: "fixed !important"
  },
  recapContainer: {
    paddingTop: "30px",
    paddingLeft: "10px",
    fontSize: "14px"
  },
  recapHeader: {
    fontSize: "1rem",
    lineHeight: "1",
    color: "rgba(0, 0, 0, 0.54)"
  },
  recapContents: {
    height: "24px",
    overflow: "hidden"
  },
  connectorActive: {
    "& $connectorLine": {
      borderColor: "#fe0229"
    }
  },
  connectorCompleted: {
    "& $connectorLine": {
      borderColor: "black"
    }
  },
  connectorDisabled: {
    "& $connectorLine": {
      borderColor: "#b7b7b7"
    }
  },
  connectorLine: {
    transition: "0.3s",
    borderTopStyle: "dashed"
  },
  stepIconComplete: {
    color: "black",
    transition: "0.3s",
    width: "40px",
    height: "40px",
    border: "1px solid black",
    borderRadius: "40px",
    fontSize: "16px",
    fontWeight: "600",
    lineHeight: "36px",
    textAlign: "center",
    marginTop: "-7px",
    marginRight: "20px",
    marginLeft: "20px",
    display: "flex"
  },
  stepIconActive: {
    color: "#fe0229",
    transition: "0.3s",
    width: "40px",
    height: "40px",
    border: "1px solid #fe0229",
    borderRadius: "40px",
    fontSize: "16px",
    fontWeight: "900",
    lineHeight: "36px",
    textAlign: "center",
    marginTop: "-7px",
    marginRight: "20px",
    marginLeft: "20px"
  },
  stepIconDisable: {
    color: "#b7b7b7",
    transition: "0.3s",
    width: "40px",
    height: "40px",
    border: "1px solid #b7b7b7",
    borderRadius: "40px",
    fontSize: "16px",
    fontWeight: "600",
    lineHeight: "36px",
    textAlign: "center",
    marginTop: "-7px",
    marginRight: "20px",
    marginLeft: "20px"
  },
  stepLabelComplete: {
    color: "black !important",
    transition: "0.3s",
    marginTop: "6px !important"
  },
  stepLabelActive: {
    color: "#fe0229 !important",
    transition: "0.3s",
    marginTop: "6px !important"
  },
  stepLabelDisable: {
    color: "#b7b7b7 !important",
    transition: "0.3s",
    marginTop: "6px !important"
  },
  alternativeLabel: {
    top: "24px",
    left: "calc(-50% - 120px)",
    right: "calc(50% + 120px)",
    position: "absolute",
    width: "160px",
    "@media (max-width: 599px)": {
      display: "none"
    }
  }
};

export default buyStepperStyle;
