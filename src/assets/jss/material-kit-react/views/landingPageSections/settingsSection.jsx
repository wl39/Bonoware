const settingsSection = {
  settings: {
    width: "100%",
    margin: "60px 55px 100px 15px",
    "@media (max-width: 1200px)": {
      marginRight: "20px"
    },
    "@media (max-width: 875px)": {
      marginRight: "5px",
      marginLeft: "5px"
    },
    "@media (max-width: 599px)": {
      marginTop: "30px"
    }
  },
  settingsHeader: {
    fontSize: "30px",
    fontWeight: "600",
    color: "#2a2a2a",
    width: "100%",
    textAlign: "center",
    height: "30px",
    lineHeight: "30px",
    marginBottom: "40px"
  },
  settingsContentContainer: {
    border: "1px solid #b7b7b7",
    marginBottom: "130px",
    transition: "0.3s"
  },
  settingContentHeader: {
    display: "flex",
    justifyContent: "space-between",
    height: "30px",
    lineHeight: "30px",
    fontSize: "24px",
    fontWeight: "600",
    color: "#2a2a2a",
    marginBottom: "70px",
    marginTop: "40px",
    marginLeft: "30px",
    marginRight: "30px",
    "@media (max-width: 959px)": {
      marginLeft: "20px",
      marginRight: "20px"
    },
    "@media (max-width: 599px)": {
      marginLeft: "10px",
      marginRight: "10px"
    }
  },
  editButton: {
    padding: "0px",
    height: "30px",
    minHeight: "30px",
    width: "100px",
    minWidth: "100px",
    background: "black",
    color: "white",
    fontSize: "12px",
    borderRadius: "0px",
    fontWeight: "300",
    "&:hover": {
      background: "white",
      color: "black",
      border: "1px solid black"
    }
  },
  editActived: {
    padding: "0px",
    height: "30px",
    minHeight: "30px",
    width: "100px",
    minWidth: "100px",
    background: "white",
    color: "black",
    border: "1px solid black",
    fontSize: "12px",
    borderRadius: "0px",
    fontWeight: "300",
    "&:hover": {
      background: "black",
      color: "white"
    }
  },
  profileContentsContainer: {
    display: "flex",
    height: "60px",
    lineHeight: "18px",
    color: "#2a2a2a",
    marginBottom: "18px",
    marginLeft: "30px",
    marginRight: "30px",
    flexWrap: "wrap",
    "@media (max-width: 959px)": {
      marginLeft: "20px",
      marginRight: "20px"
    },
    "@media (max-width: 599px)": {
      marginLeft: "10px",
      marginRight: "10px"
    }
  },
  contentsContainer: {
    display: "flex",
    "@media (max-width: 959px)": {
      width: "50%"
    }
  },
  resetButtonContainer: {
    display: "flex",
    paddingLeft: "30px",
    paddingRight: "30px",
    paddingBottom: "110px",
    borderBottom: "1px solid #b7b7b7",
    "@media (max-width: 959px)": {
      paddingBottom: "70px",
      paddingRight: "20px",
      paddingLeft: "20px"
    },
    "@media (max-width: 599px)": {
      paddingBottom: "40px",
      paddingRight: "10px",
      paddingLeft: "10px"
    }
  },
  contentsHeader: {
    fontWeight: "600",
    fontSize: "18px",
    marginRight: "18px"
  },
  contents: {
    fontSize: "16px",
    lineHeight: "16px",
    marginRight: "100px",
    fontWeight: "300",
    "@media (max-width: 1400px)": {
      marginRight: "30px"
    },
    "@media (max-width: 959px)": {
      marginRight: "0px"
    }
  },
  contentsLast: {
    fontSize: "16px",
    lineHeight: "16px",
    fontWeight: "300"
  },
  resetButton: {
    padding: "0px",
    height: "30px",
    minHeight: "30px",
    width: "230px",
    minWidth: "230px",
    background: "white",
    color: "#fe0229",
    fontSize: "12px",
    borderRadius: "0px",
    fontWeight: "300",
    border: "1px solid #fe0229",
    marginTop: "-3px",
    "@media (max-width: 599px)": {
      width: "180px",
      minWidth: "180px"
    },
    "&:hover": {
      color: "red",
      background: "white",
      border: "1px solid red"
    }
  },
  personalInfoContainer: {
    display: "flex",
    height: "320px"
  },
  shippingInfo: {
    width: "50%",
    borderRight: "1px solid #b7b7b7"
  },
  accountInfo: {
    width: "50%"
  },
  personalInfo: {
    margin: "0px 30px"
  },
  notificationSetting: {
    borderTop: "1px solid #b7b7b7",
    paddingTop: "40px"
  },
  notificationLeft: {
    width: "50%",
    borderRight: "1px dashed #b7b7b7"
  },
  notificationRight: {
    width: "50%"
  },
  inputWrapper: {
    width: "100px",
    height: "40px",
    display: "flex",
    marginTop: "-11px",
    marginRight: "61px",
    marginLeft: "-11px",
    "@media (max-width: 959px)": {
      height: "30px",
      marginRight: "0px"
    }
  },
  root: {
    height: "50px",
    transition:
      "border-color 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms,border-width 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms",
    paddingLeft: "10px",
    border: "1px solid #ebebeb",
    "@media (max-width: 959px)": {
      minHeight: ""
    },
    "&:hover": {
      border: "1px solid #a2a9af"
    }
  },
  error: {
    height: "50px",
    transition:
      "border-color 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms,border-width 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms",
    paddingLeft: "10px",
    border: "1px solid rgba(254, 2, 41, 0.5)",
    "&:hover": {
      border: "1px solid #fe0229"
    },
    "&:active": {
      border: "1px solid #fe0229"
    }
  }
};

export default settingsSection;
