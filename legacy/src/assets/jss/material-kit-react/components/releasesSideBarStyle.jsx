const newReleasesPage = {
  sidebar: {
    width: "140px",
    minWidth: "140px",
    display: "flex",
    flexDirection: "column",
    "@media (max-width: 768px)": {
      flexDirection: "row",
      width: "100%"
    },
    "@media (max-width: 599px)": {
      flexDirection: "column"
    }
  },
  checkBoxType: {
    fontWeight: "900",
    margin: "10px 0px",
    lineHeight: "42px"
  },
  brandName: {
    "@media (max-width: 768px)": {
      display: "flex",
      margin: "0px auto",
      paddingRight: "0px !important"
    }
  },
  drawerContainer: {
    zIndex: "1"
  },
  checkBoxContainer: {
    display: "flex",
    "@media (max-width: 768px)": {
      background: "rgba(255, 255, 255, 0.875)",
      borderBottom: "1px solid #f7f7f7",
      letterSpacing: "-0.2px"
    }
  },
  lastCheckBoxContainer: {
    display: "flex",
    "@media (max-width: 768px)": {
      background: "rgba(255, 255, 255, 0.875)",
      borderBottomLeftRadius: "5px",
      borderBottomRightRadius: "5px",
      letterSpacing: "-0.2px"
    }
  },
  checkBox: {
    padding: "12px",
    width: "32px",
    height: "32px",
    margin: "auto 0px"
  },
  otherCheckBox: {
    padding: "12px",
    width: "32px",
    height: "32px",
    margin: "auto",
    marginRight: "24px",
    "@media (max-width: 768px)": {
      margin: "auto 8px"
    }
  },
  checkBoxName: {
    height: "32px",
    lineHeight: "32px",
    marginLeft: "5px",
    fontWeight: "lighter",
    "@media (max-width: 768px)": {
      height: "auto",
      lineHeight: "32px",
      paddingRight: "8px"
    }
  },
  otherContainer: {
    display: "flex",
    height: "42px",
    margin: "10px 0px"
  },
  otherText: {
    fontWeight: "900",
    margin: "0px",
    lineHeight: "42px",
    "@media (max-width: 768px)": {
      paddingLeft: "25px"
    }
  },
  mobile: {
    "@media (max-width: 768px)": {
      display: "flex",
      height: "48px",
      margin: "0px auto"
    }
  },
  newPrevContainer: {
    display: "flex",
    flexDirection: "column",
    "@media (max-width: 768px)": {
      flexDirection: "row"
    },
    "@media (max-width: 599px)": {
      height: "42px",
      justifyContent: "space-between"
    }
  },
  newPrevCheckBox: {
    display: "flex",
    flexDirection: "row",
    "@media (max-width: 768px)": {
      flexDirection: "row"
    }
  },
  newCheckBoxType: {
    "@media (max-width: 599px)": {
      margin: "0px",
      marginLeft: "20px"
    },
    margin: "10px 0px",
    fontWeight: "900",
    lineHeight: "42px"
  },
  prevCheckBoxType: {
    "@media (max-width: 599px)": {
      margin: "0px"
      //   marginLeft: "24px"
    },
    margin: "10px 0px",
    fontWeight: "900",
    lineHeight: "42px"
  }
};

export default newReleasesPage;
