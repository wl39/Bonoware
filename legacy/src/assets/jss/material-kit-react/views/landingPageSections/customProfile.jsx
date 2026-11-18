const customProfile = {
  container: {
    paddingTop: "100px",
    display: "flex",
    "@media (max-width: 1199px)": {
      paddingTop: "90px"
    },
    "@media (max-width: 875px)": {
      margin: "0px",
      flexDirection: "row"
    },
    "@media (max-width: 599px)": {
      paddingTop: "60px"
    }
  },
  drawer: {
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    width: "250px",
    minWidth: "250px",
    background: "#121621",
    color: "white",
    "@media (max-width: 1200px)": {
      width: "150px",
      minWidth: "150px"
    },
    "@media (max-width: 599px)": {
      display: "none"
    }
  },
  profileName: {
    height: "200px",
    color: "white !important",
    fontSize: "30px",
    fontWeight: "600",
    background: "#1b202d",
    display: "flex",
    flexDirection: "column",
    marginBottom: "20px",
    "@media (max-width: 1200px)": {
      height: "150px"
    }
  },
  accountIcon: {
    margin: "60px auto 10px auto",
    width: "30px",
    height: "30px",
    "@media (max-width: 1200px)": {
      marginTop: "40px"
    }
  },
  focused: {
    color: "white !important",
    display: "flex",
    padding: "20px 50px",
    fontSize: "18px",
    fontWeight: "600",
    textAlign: "center",
    transition: "0.3s",
    "@media (max-width: 1200px)": {
      letterSpacing: "-1.5px",
      padding: "20px 5px"
    },
    "@media (max-width: 576px)": {
      fontSize: "13px"
    },
    "&:hover": {
      color: "white  !important"
    }
  },
  drawerContent: {
    color: "#4f5666 !important",
    cursor: "pointer",
    transition: "0.3s",
    height: "60px",
    padding: "20px 50px",
    display: "flex",
    fontSize: "18px",
    "&:hover": {
      color: "#b7b7b7 !important"
    },
    // "&:focus": {
    //   color: "black"
    // },
    // "&:active": {
    //   background: "white"
    // },
    "@media (max-width: 1200px)": {
      letterSpacing: "-1.5px",
      padding: "20px 5px"
    },
    "@media (max-width: 576px)": {
      letterSpacing: "-1.5px",
      fontSize: "13px"
    }
  },
  contentIcon: {
    width: "20px",
    height: "20px",
    marginRight: "20px"
  },
  contentText: {
    lineHeight: "18px",
    height: "18px",
    margin: "auto 0px"
  },
  shoeContainer: {
    display: "grid",
    gridTemplateColumns: "30% 70%",
    borderBottom: "1px solid #c0c0c0",
    width: "100%",
    height: "120px",
    "@media (max-width: 992px)": {
      gridTemplateColumns: "55% 45%"
    },
    "@media (max-width: 480px)": {
      gridTemplateColumns: "70% 30%"
    }
  },
  soldShoeButton: {
    padding: "0px",
    width: "100%",
    textAlign: "left",
    fontSize: "16px"
  },
  followingShoeContainer: {
    display: "grid",
    gridTemplateColumns: "60% 40%",
    borderBottom: "1px solid #c0c0c0",
    width: "100%",
    height: "120px",
    "@media (max-width: 992px)": {
      gridTemplateColumns: "60% 40%"
    },
    "@media (max-width: 480px)": {
      gridTemplateColumns: "70% 30%"
    }
  },
  details: {
    display: "grid",
    gridTemplateColumns: "25% 25% 25% 25%",
    width: "100%",
    "@media (max-width: 992px)": {
      gridTemplateColumns: "50% 50%"
    },
    "@media (max-width: 480px)": {
      gridTemplateColumns: "100%"
    }
  },
  followingDetails: {
    display: "grid",
    gridTemplateColumns: "50% 50%",
    width: "100%",
    "@media (max-width: 992px)": {
      gridTemplateColumns: "50% 50%"
    },
    "@media (max-width: 480px)": {
      gridTemplateColumns: "100%"
    }
  },
  detail: {
    margin: "auto 0px",
    width: "100%",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    padding: "0px 10px",
    justifyContent: "space-between",
    "@media (max-width: 599px)": {
      padding: "0px 5px",
      width: "100%",
      flexDirection: "row",
      overflow: "hidden",
      borderBottom: "1px solid #f7f7f7"
    }
  },
  detailHidden: {
    margin: "auto 0px",
    width: "100%",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    padding: "0px 10px",
    justifyContent: "space-between",
    "@media (max-width: 992px)": {
      display: "none"
    }
  },
  shoeModelContainer: {
    fontWeight: "300",
    height: "48px",
    display: "flex",
    margin: "auto 0px",
    flexDirection: "column",
    justifyContent: "space-between",
    fontSize: "16px",
    lineHeight: "30px"
  },
  brand: {
    height: "24px",
    textTransform: "capitalize"
  },
  model: {
    letterSpacing: "-1px",
    height: "24px",
    fontWeight: "600",
    whiteSpace: "pre-line",
    display: "-webkit-box",
    WebkitLineClamp: "1",
    WebkitBoxOrient: "vertical",
    overflow: "hidden"
  },
  followingModel: {
    letterSpacing: "-1px",
    height: "60px",
    lineHeight: "60px",
    fontWeight: "600",
    whiteSpace: "pre-line",
    display: "-webkit-box",
    WebkitLineClamp: "1",
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
    margin: "auto 0px",
    "@media (max-media: 599px)": {
      height: "48px",
      lineHeight: "48px"
    }
  },
  size: {
    display: "flex",
    fontSize: "12px",
    justifyContent: "space-between",
    "@media (max-width: 599px)": {
      minWidth: "60px"
    }
  },
  price: {
    width: "100%",
    fontWeight: "800",
    display: "flex",
    flexDirection: "column",
    padding: "0px 10px",
    margin: "auto",
    textAlign: "center",
    justifyContent: "space-between",
    fontSize: "16px",
    "@media (max-width: 599px)": {
      fontSize: "14px"
    }
  },
  sentTime: {
    letterSpacing: "-0.5px",
    display: "flex",
    margin: "auto",
    height: "16px",
    lineHeight: "16px",
    fontWeight: "400",
    "@media (max-width: 1399px)": {
      flexDirection: "column",
      height: "40px",
      justifyContent: "space-between"
    },
    "@media (max-width: 599px)": {
      height: "12px",
      lineheight: "12px",
      fontSize: "12px"
    }
  },
  timeLeft: {
    paddingRight: "15px",
    borderRight: "1px solid black",
    "@media (max-width: 1399px)": {
      paddingRight: "0px",
      borderRight: "0px"
    }
  },
  timeRight: {
    paddingLeft: "15px",
    "@media (max-width: 1399px)": {
      paddingLeft: "0px",
      borderRight: "0px"
    }
  },
  pid: {
    display: "flex",
    fontSize: "12px",
    justifyContent: "space-between",
    "@media (max-width: 1200px)": {
      height: "24px",
      lineHeight: "12px",
      flexDirection: "column",
      textAlign: "right"
    }
  },
  profit: {
    width: "100%",
    display: "flex",
    padding: "0px 10px",
    margin: "auto",
    textAlign: "center",
    flexDirection: "column",
    "@media (max-width: 480px)": {
      display: "none"
    }
  },
  content: {
    margin: "auto"
  },
  modelContainer: {
    width: "100%",
    display: "flex"
  },
  image: {
    width: "80px !important",
    height: "60px !important",
    objectFit: "contain",
    margin: "auto 20px auto 0px"
    // "@media (max-width: 1200px)": {
    //   height: "150px"
    // },
    // "@media (max-width: 875px)": {
    //   width: "100%",
    //   height: "auto"
    // }
  },
  editPrice: {
    display: "flex",
    flexDirection: "column",
    height: "120px",
    justifyContent: "space-between",
    "@media (max-width: 599px)": {
      height: "48px",
      flexDirection: "row",
      width: "100%"
    }
  },
  updateButton: {
    padding: "0px",
    width: "auto",
    margin: "0px auto",
    borderRadius: "0px",
    border: "1px solid #1b202d",
    color: "#1b202d",
    minHeight: "30px",
    fontWeight: "300",
    marginTop: "10px",
    "&:hover": {
      border: "0px",
      color: "white",
      background: "black"
    },
    "&:disabled": {
      padding: "0px",
      width: "auto",
      margin: "0px auto",
      borderRadius: "0px",
      border: "0px solid #1b202d",
      color: "white",
      minHeight: "30px",
      fontWeight: "600",
      marginTop: "10px",
      background: "#b7b7b7",
      cursor: "default",
      "&:hover": {
        background: "a6a6a6",
        color: "white"
      }
    }
  },
  updateDisbledButton: {
    padding: "0px",
    width: "auto",
    margin: "0px auto",
    borderRadius: "0px",
    border: "1px solid #1b202d",
    color: "#1b202d",
    minHeight: "30px",
    fontWeight: "300",
    marginTop: "10px",
    background: "#b7b7b7",
    "&:hover": {
      background: "a6a6a6"
    }
  },
  updateButtonActive: {
    padding: "0px",
    width: "auto",
    margin: "0px 15px",
    borderRadius: "0px",
    border: "1px solid #1b202d",
    color: "#1b202d",
    minHeight: "30px",
    fontWeight: "300",
    marginTop: "3px",
    "&:hover": {
      border: "0px",
      color: "white",
      background: "black"
    }
  },
  buying: {
    width: "100%",
    marginTop: "60px",
    marginLeft: "20px",
    marginRight: "50px",
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
  selling: {
    width: "100%",
    marginTop: "60px",
    marginLeft: "20px",
    marginRight: "50px",
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
  following: {
    width: "100%",
    marginTop: "60px",
    marginLeft: "20px",
    marginRight: "50px",
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
  pageName: {
    fontSize: "30px",
    textAlign: "center",
    color: "#2a2a2a",
    fontWeight: "600",
    height: "30px",
    lineHeight: "30px",
    marginBottom: "60px",
    "@media (max-width: 599px)": {
      marginBottom: "30px"
    }
  },
  table: {
    display: "flex",
    flexDirection: "column"
  },
  tableName: {
    display: "flex",
    flexDirection: "row",
    marginBottom: "15px"
  },
  dummy: {
    width: "20%",
    "@media (max-width: 599px)": {
      display: "none"
    }
  },
  sellingDummyContainer: {
    width: "100%",
    marginBottom: "20px",
    height: "600px"
  },
  nameBuying: {
    marginRight: "15px",
    padding: "0px 5px",
    borderBottom: "5px solid red"
  },
  nameSelling: {
    marginLeft: "15px",
    marginRight: "15px",
    padding: "0px 5px",
    fontSize: "18px",
    fontWeight: "600",
    borderRadius: "0px",
    "@media (max-width: 599px)": {
      fontSize: "16px"
    }
  },
  activedPage: {
    cursor: "default",
    fontWeight: "800",
    borderBottom: "3px solid #fe0229",
    width: "15px",
    textAlign: "center",
    margin: "3px 10px 0px 10px"
  },
  clickablePage: {
    cursor: "pointer",
    fontWeight: "400",
    width: "15px",
    textAlign: "center",
    margin: "auto 10px",
    borderBottom: "0px"
  },
  pageHandlerContainer: {
    display: "flex",
    margin: "0px auto",
    marginBottom: "150px"
  },
  pageButton: {
    padding: "0px",
    width: "24px",
    height: "24px",
    margin: "4px 0px 0px 0px"
  },
  nameBought: {
    marginRight: "15px",
    padding: "0px 5px"
  },
  nameSold: {
    marginLeft: "15px",
    marginRight: "15px",
    padding: "0px 5px",
    fontSize: "18px",
    fontWeight: "400",
    borderRadius: "0px",
    "@media (max-width: 599px)": {
      fontSize: "16px"
    },
    "&:hover": {
      fontWeight: "500"
    }
  },
  tableHeader: {
    display: "grid",
    textAlign: "center",
    height: "55px",
    borderTop: "1px solid #b7b7b7",
    borderBottom: "1px solid #b7b7b7",
    gridTemplateColumns: "30% 17.5% 17.5% 17.5% 17.5%",
    gridTemplateRows: "55px",
    "@media (max-width: 992px)": {
      gridTemplateColumns: "55% 22.5% 22.5%"
    },
    "@media (max-width: 480px)": {
      gridTemplateColumns: "70% 30%"
    }
  },
  followingTableHeader: {
    display: "grid",
    textAlign: "center",
    height: "55px",
    borderTop: "1px solid #b7b7b7",
    borderBottom: "1px solid #b7b7b7",
    gridTemplateColumns: "60% 20% 20%",
    gridTemplateRows: "55px",
    "@media (max-width: 480px)": {
      gridTemplateColumns: "70% 30%"
    }
  },
  headerContainer: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    position: "relative",
    borderRight: "1px solid #b7b7b7",
    height: "25px",
    margin: "auto",
    "@media (max-width: 875px)": {
      letterSpacing: "-1px",
      fontSize: "14px"
    },
    "@media (max-width: 599px)": {
      width: "100%",
      fontSize: "12px",
      letterSpacing: "-1.5px"
    }
  },
  headerContainerMobileHidden: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    position: "relative",
    borderRight: "1px solid #b7b7b7",
    height: "25px",
    margin: "auto",
    "@media (max-width: 480px)": {
      display: "none"
    }
  },
  headerContainerHidden: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    position: "relative",
    borderRight: "1px solid #b7b7b7",
    height: "25px",
    margin: "auto",
    "@media (max-width: 992px)": {
      display: "none"
    }
  },
  headerName: {
    lineHeight: "25px",
    width: "100%",
    fontSize: "16px",
    letterSpacing: "-0.8px",
    color: "#2a2a2a"
  },
  arrowsContainer: {
    display: "flex",
    flexDirection: "column",
    margin: "auto 0px",
    position: "absolute",
    right: "12px",
    top: "4px",
    "@media (max-width: 875px)": {
      right: "4px",
      top: "4px"
    },
    "@media (max-width: 599px)": {
      right: "2px",
      top: "4px"
    }
  },
  arrowsButton: {
    height: "18px",
    width: "18px",
    padding: "0px"
  },
  arrows: {
    fontSize: "18px",
    color: "lightgray"
  },
  arrowsActivated: {
    fontSize: "18px",
    color: "black"
  },
  arrowsSellingActivated: {
    fontSize: "18px",
    color: "black"
  },
  arrowsDefault: {
    display: "none"
  },
  root: {
    height: "32px",
    width: "auto",
    margin: "0px 15px",
    transition:
      "border-color 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms,border-width 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms",
    paddingLeft: "10px",
    border: "1px solid #ebebeb",
    "&:hover": {
      border: "1px solid #a2a9af"
    }
  },
  priceFocused: {
    border: "2px solid #1b202d"
  },
  error: {
    height: "32px",
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
  },
  priceInput: {
    textAlign: "center"
  }
};

export default customProfile;
