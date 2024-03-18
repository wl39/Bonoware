const detailSell = {
  container: {
    maxWidth: "59.375%",
    transition: "0.3s",
    margin: "200px auto 240px",
    "@media (max-width: 1199px)": {
      maxWidth: "70%"
    },
    "@media (max-width: 992px)": {
      maxWidth: "95%"
    },
    "@media (max-width: 599px)": {
      maxWidth: "100%",
      margin: "100px auto 140px"
    }
  },
  indexLeft: {
    position: "absolute",
    fontSize: "300px",
    fontWeight: "bold",
    color: "rgba(42, 42, 42, 0.5)",
    left: "5.333%",
    top: "280px",
    opacity: "0.1",
    lineHeight: "200px",
    "@media (max-width: 1199px)": {
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
  indexRight: {
    position: "absolute",
    fontSize: "300px",
    fontWeight: "bold",
    color: "rgba(42, 42, 42, 0.5)",
    right: "5.333%",
    top: "280px",
    opacity: "0.1",
    lineHeight: "200px",
    "@media (max-width: 1199px)": {
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
  },
  cardContainer: {
    display: "flex",
    "@media (max-width: 599px)": {
      flexDirection: "column"
    }
  },
  cardLeft: {
    display: "inline-block",
    position: "relative",
    width: "50%",
    color: "black",
    background: "#ffffff",
    minHeight: "410px",
    boxShadow: "none",
    border: "0px",
    borderRadius: "0px",
    marginBottom: "70px",
    marginRight: "30px",
    borderBottom: "1px solid #b7b7b7",
    "@media (max-width: 599px)": {
      width: "100%",
      marginRight: "0px",
      minHeight: "300px",

      paddingLeft: "5px",
      paddingRight: "5px"
    }
  },
  cardRight: {
    display: "inline-block",
    position: "relative",
    width: "50%",
    color: "black",
    background: "#ffffff",
    minHeight: "410px",
    boxShadow: "none",
    border: "0px",
    borderRadius: "0px",
    marginBottom: "70px",
    marginLeft: "30px",
    borderBottom: "1px solid #b7b7b7",
    "@media (max-width: 599px)": {
      width: "100%",
      marginLeft: "0px",
      paddingLeft: "5px",
      paddingRight: "5px"
    }
  },
  title: {
    fontSize: "30px",
    lineHeight: "30px",
    color: "#2a2a2a",
    margin: "0px",
    marginBottom: "70px",
    textAlign: "center",
    fontWeight: "bold"
  },
  subtitle: {
    textAlign: "center",
    color: "#2a2a2a",
    fontSize: "21px",
    lineHeight: "21px",
    fontWeight: "bold",
    letterSpacing: "-1.2px",
    margin: "0px",
    paddingBottom: "20px",
    borderBottom: "1px solid #b7b7b7",
    marginBottom: "40px"
  },
  inputContainer: {
    position: "relative",
    display: "flex",
    marginBottom: "10px",
    height: "50px"
  },
  inputLabel: {
    width: "20%",
    height: "16px",
    fontSize: "16px",
    letterSpacing: "-0.8px",
    textAlign: "left",
    color: "#2a2a2a",
    lineHeight: "16px",
    margin: "auto 0px",
    position: "absolute",
    top: "17px",
    fontFamily: "'Nanum Barun Gothic', sans-serif"
  },
  label: {
    "@media (max-width: 959px)": {
      marginRight: "0px"
    }
  },
  inputWrapper: {
    width: "70%",
    margin: "0px 0px 0px auto",
    "@media (max-width: 992px)": {
      width: "72%",
      margin: "0px 0px 0px 30%"
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
  focused: {
    border: "2px solid black !important"
  },
  textField: {
    width: "75%",
    margin: "16px auto 8px auto"
  },
  filterOptionContainer: {
    display: "flex",
    width: "70%",
    border: "1px solid #dbdbdb",
    height: "50px",
    justifyContent: "space-between",
    color: "#a2a9af",
    cursor: "pointer",
    position: "absolute",
    paddingLeft: "15px",
    right: "0",
    "&:hover": {
      border: "1px solid #bfbfbf",
      color: "#75808a"
    }
  },
  filterOption: {
    height: "16px",
    fontSize: "16px",
    lineHeight: "16px",
    margin: "auto 0px",
    color: "inherit",
    fontWeight: "200"
  },
  filterOptionSelected: {
    height: "16px",
    fontSize: "16px",
    lineHeight: "16px",
    margin: "auto 0px",
    color: "black",
    fontWeight: "500"
  },
  filterIcon: {
    margin: "auto 0px",
    color: "#inherit"
  },
  filterViewIconActive: {
    color: "black",
    fontSize: "40px",
    margin: "auto 0px"
  },
  filterViewIconUnactive: {
    color: "#dbdbdb",
    cursor: "pointer",
    fontSize: "40px",
    margin: "auto 0px",
    "&:hover": {
      color: "#bfbfbf"
    }
  },
  filterActive: {
    flexDirection: "column",
    position: "absolute",
    background: "white",
    WebkitTransition: "height 0.3s, -webkit-transform 0.3s",
    transition: "height 0.3s, transform 0.3s",
    zIndex: "50",
    top: "44px",
    left: "-1px",
    width: "calc(100% + 2px)",
    height: "150px",
    overflowY: "scroll",
    border: "1px solid #ebebeb",
    "&::-webkit-scrollbar": {
      width: "2px"
    },
    "&::-webkit-scrollbar-track": {
      background: "#ebebeb"
    },
    "&::-webkit-scrollbar-thumb": {
      background: "black"
    },
    "&::-webkit-scrollbar-thumb:hover": {
      background: "#bfbfbf"
    }
  },
  filterDeactive: {
    height: "0px",
    width: "calc(100% + 2px)",
    position: "absolute",
    overflow: "hidden",
    top: "47px",
    left: "-1px",
    zIndex: "50",
    border: "0px solid #ebebeb",
    WebkitTransition: "height 0.3s, -webkit-transform 0.3s, border 0.3s",
    transition: "height 0.3s, transform 0.3s, border 0.3s"
  },
  filterOptionActive: {
    height: "65px",
    width: "100%",
    padding: "10px 15px",
    display: "flex",
    flexDirection: "column",
    borderBottom: "1px solid #ebebeb",
    marginBottom: "-1px",
    WebkitTransition: "height 0.3s, -webkit-transform 0.3s",
    transition: "height 0.3s, transform 0.3s",
    color: "#808080 !important",
    "&:hover": {
      color: "black !important"
    }
  },
  filterOptionDeactive: {
    height: "0px",
    padding: "10px 15px",
    width: "100%",
    overflow: "hidden",
    WebkitTransition: "height 0.3s, -webkit-transform 0.3s",
    transition: "height 0.3s, transform 0.3s"
  },
  filterOptionTitle: {
    fontSize: "16px",
    padding: "10px 0px",
    color: "inherit",
    fontWeight: "600"
  },
  accountInfoContainer: {
    display: "flex",
    flexDirection: "row",
    borderBottom: "solid 1px #eee",
    paddingBottom: "17px",
    marginBottom: "25px",
    "@media (max-width: 992px)": {
      flexDirection: "column"
    }
  },
  accountTextField: {
    height: "272px",

    display: "flex",
    flexDirection: "column",
    width: "50%",
    paddingLeft: "10px",
    paddingRight: "75px",
    "@media (max-width: 992px)": {
      width: "100%",
      alignItems: "center",
      paddingLeft: "0px",
      paddingRight: "0px"
    }
  },
  accountCSSContainer: {
    border: "solid 1px #eee",
    width: "50%",
    margin: "20px 10px 0px 10px",
    "@media (max-width: 992px)": {
      width: "75%",
      margin: "auto"
    },
    "@media (max-width: 576px)": {
      display: "none"
    }
  },
  shoeInfoContainer: {
    display: "flex",
    flexDirection: "row",
    "@media (max-width: 992px)": {
      flexDirection: "column"
    }
  },
  shoeTextField: {
    justifyContent: "space-between",
    height: "272px",
    display: "flex",
    flexDirection: "column",
    width: "50%",
    paddingLeft: "10px",
    paddingRight: "75px",
    "@media (max-width: 992px)": {
      width: "100%",
      alignItems: "center",
      paddingLeft: "0px",
      paddingRight: "0px"
    }
  },
  priceContainer: {
    display: "flex",
    margin: "16px auto 8px auto"
  },
  priceTextField: {
    margin: "0px",
    width: "75%"
  },
  prices: {
    fontSize: "10px",
    margin: "auto auto auto 10px"
  },
  lowest: {
    color: "green"
  },
  highest: {
    color: "red"
  },
  shoeImageText: {
    border: "solid 1px #eee",
    width: "100%",
    textAlign: "center",
    margin: "0px auto",
    height: "250px",
    lineHeight: "250px",
    marginBottom: "10px",
    "@media (max-width: 599px)": {
      height: "fit-content",
      minHeight: "330px"
    }
  },
  shoeImage: {
    border: "solid 1px #eee",
    width: "100%",
    textAlign: "center",
    margin: "0px auto",
    height: "250px",
    marginBottom: "10px",
    "@media (max-width: 599px)": {
      height: "fit-content",
      minHeight: "330px"
    }
  },
  imgPreview: {
    height: "248px",
    width: "100%",
    objectFit: "contain",
    "@media (max-width: 599px)": {
      height: "328px"
    }
  },
  next: {
    height: "50px",
    maxHeight: "50px",
    boxShadow: "none",
    background: "black",
    borderRadius: "0px",
    transition: "0.2s",
    width: "50%",
    margin: "0px auto",
    color: "white",
    display: "flex",
    "&:hover": {
      background: "#4d4d4d"
    }
  }
};

export default detailSell;
