const propageStyle = {
  container: {
    display: "flex",
    borderRadius: "6px",
    zIndex: "3",
    position: "relative",
    background: "#FFFFFF",
    marginLeft: "auto",
    marginRight: "auto",
    width: "100%",
    "@media (min-width: 600px)": {
      maxWidth: "97% !important",
      paddingLeft: "0",
      paddingRight: "0",
      paddingBottom: "50px"
    },
    "@media (min-width: 960px)": {
      maxWidth: "95% !important",
      paddingBottom: "100px"
    },
    "@media (min-width: 1200px)": {
      maxWidth: "83.333% !important",
      paddingBottom: "150px"
    }
  },
  detailPageConatiner: {
    display: "flex",
    borderRadius: "6px",
    zIndex: "3",
    position: "static",
    background: "#FFFFFF",
    marginLeft: "auto",
    marginRight: "auto",
    width: "100%",
    marginTop: "60px",
    "@media (min-width: 600px)": {
      maxWidth: "97% !important",
      paddingLeft: "0",
      paddingRight: "0",
      paddingBottom: "50px",
      marginTop: "90px"
    },
    "@media (min-width: 960px)": {
      maxWidth: "95% !important",
      paddingBottom: "100px",
      marginTop: "90px"
    },
    "@media (min-width: 1200px)": {
      maxWidth: "83.333% !important",
      paddingBottom: "150px",
      marginTop: "100px"
    }
  },
  pageHeaderContainer: {
    marginTop: "100px",
    height: "250px",
    display: "flex",
    flexDirection: "row",
    width: "100%",
    marginBottom: "100px",
    "@media (max-width: 1199px)": {
      marginTop: "90px",
      height: "250px",
      marginBottom: "50px"
    },
    "@media (max-width: 959px)": {
      marginTop: "90px",
      height: "150px",
      marginBottom: "50px"
    },
    "@media (max-width: 599px)": {
      marginTop: "40px",
      marginBottom: "20px",
      height: "150px"
    }
  },
  pageHeaderLeft: {
    backgroundColor: "#ebedec",
    display: "flex",
    flexBasis: "60%"
  },
  descriptionContainer: {
    display: "flex",
    height: "60px",
    flexDirection: "column",
    justifyContent: "space-between",
    width: "72.222%",
    margin: "auto"
  },
  type: {
    height: "22px",
    fontSize: "22px",
    lineHeight: "18px",
    color: "black",
    textTransform: "uppercase",
    letterSpacing: "3px"
  },
  headerDescription: {
    height: "18px",
    fontSize: "18px",
    lineHeight: "14px",
    color: "black"
  },
  pageHeaderRight: {
    backgroundColor: "#a2a9af",
    display: "flex",
    flexBasis: "40%",
    "&::before": {
      content: `''`,
      borderBottom: "250px solid #ebedec",
      borderRight: "250px solid transparent",
      "@media (max-width: 959px)": {
        borderBottom: "150px solid #ebedec",
        borderRight: "150px solid transparent"
      }
    }
  },
  productContainer: {
    display: "flex",
    flexWrap: "wrap",
    width: "100%",
    height: "fit-content"
  },
  productButtonContainer: {
    padding: "7.5px",
    margin: "5px"
  },
  productButtonContainerList: {
    padding: "0px",
    width: "100%"
  },
  label: {
    width: "100%"
  },
  productFilter: {
    flexBasis: "100%",
    display: "flex",
    justifyContent: "flex-end",
    paddingRight: "12.5px",
    height: "45px",
    marginBottom: "22.5px",
    "@media (max-width: 599px)": {
      paddingRight: "0px",
      marginBottom: "15px"
    }
  },
  filterOptionContainer: {
    display: "flex",
    width: "195px",
    border: "1px solid #dbdbdb",
    height: "45px",
    marginRight: "40px",
    paddingLeft: "16px",
    justifyContent: "space-between",
    color: "#a2a9af",
    cursor: "pointer",
    position: "relative",
    "&:hover": {
      border: "1px solid #bfbfbf",
      color: "#75808a"
    },
    "@media (max-width: 599px)": {
      width: "calc(100% - 135px)"
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
    zIndex: "4",
    top: "44px",
    left: "-1px",
    width: "270px",
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
    },
    "@media (max-width: 599px)": {
      width: "calc(100% + 2px)"
    }
  },
  filterDeactive: {
    height: "0px",
    width: "270px",
    position: "absolute",
    overflow: "hidden",
    top: "44px",
    left: "-1px",
    zIndex: "50",
    border: "0px solid #ebebeb",
    WebkitTransition: "height 0.3s, -webkit-transform 0.3s, border 0.3s",
    transition: "height 0.3s, transform 0.3s, border 0.3s"
  },
  filterOptionActive: {
    height: "110px",
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
    fontSize: "20px",
    padding: "10px 0px",
    color: "inherit",
    fontWeight: "600"
  },
  filterOptionDescription: {
    fontSize: "16px",
    lineHeight: "20px",
    letterSpacing: "0.2px",
    paddingBottom: "5px",
    fontWeight: "200"
  },
  product: {
    flexBasis: "25%",
    display: "flex",
    "@media (max-width: 959px)": {
      flexBasis: "33.333%"
    },
    "@media (max-width: 599px)": {
      flexBasis: "50%"
    }
  },
  listHeader: {
    width: "100%",
    display: "flex",
    height: "54px",
    justifyContent: "space-between",
    borderTop: "1px solid #a2a9af",
    borderBottom: "1px solid #a2a9af"
  },
  shoeName: {
    fontWeight: "100",
    color: "black",
    margin: "auto 0px",
    paddingLeft: "20px",
    fontSize: "16px",
    lineHeight: "16px"
  },
  headerPriceContainer: {
    fontWeight: "100",
    color: "black",
    margin: "auto 0px",
    fontSize: "16px",
    lineHeight: "16px",
    display: "flex",
    width: "300px",
    "@media (max-width: 1199px)": {
      width: "150px"
    },
    "@media (max-width: 959px)": {
      width: "300px"
    },
    "@media (max-width: 599px)": {
      width: "100px"
    }
  },
  headerLastSale: {
    textAlign: "center",
    margin: "0px auto",
    width: "120px",
    "@media (max-width: 1199px)": {
      display: "none"
    },
    "@media (max-width: 959px)": {
      display: "block"
    },
    "@media (max-width: 599px)": {
      display: "none"
    }
  },
  headerLowestPrice: {
    margin: "0px auto",
    textAlign: "center",
    width: "120px"
  },
  productList: {
    display: "flex",
    width: "100%",
    padding: "10px 0px",
    borderBottom: "1px solid #ebebeb"
  },
  noResults: {
    display: "flex",
    margin: "0px auto"
  },
  link: {
    color: "black !important"
  },
  linkList: {
    color: "black !important",
    height: "200px",
    display: "flex",
    width: "100%",
    position: "relative",
    justifyContent: "space-between",
    "@media (max-width: 959px)": {
      height: "150px"
    },
    "@media (max-width: 599px)": {
      height: "80px"
    }
  },
  productHeader: {
    border: "1px solid #ebebeb",
    padding: "50px 10px",
    "@media (max-width: 599px)": {
      padding: "10px"
    }
  },
  productHeaderList: {
    border: "1px solid #ebebeb",
    padding: "36px 10px",
    height: "200px",
    "@media (max-width: 959px)": {
      height: "150px"
    },
    "@media (max-width: 599px)": {
      height: "80px",
      width: "105px",
      padding: "10px"
    }
    // cursor: "pointer"
  },
  moreButton: {
    flexBasis: "50%",
    background: "black",
    color: "white",
    padding: "0px",
    height: "60px",
    margin: "70px auto",
    borderRadius: "0px",
    "&:hover": {
      background: "white",
      color: "black",
      border: "1px solid black"
    }
  },
  moreButtonList: {
    flexBasis: "50%",
    background: "black",
    color: "white",
    padding: "0px",
    height: "60px",
    margin: "20px auto",
    borderRadius: "0px",
    "&:hover": {
      background: "white",
      color: "black",
      border: "1px solid black"
    }
  },
  productBody: {
    minHeight: "40px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    textAlign: "left",
    margin: "20px 0px"
  },
  productBodyList: {
    minHeight: "40px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    textAlign: "left",
    margin: "auto auto auto 0px",
    paddingLeft: "20px",
    "@media (max-width: 599px)": {
      paddingLeft: "5px"
      // width: "calc(100vw - 205px)"
    }
  },
  productFooter: {
    justifyContent: "space-between",
    minHeight: "40px",
    display: "flex",
    flexDirection: "column",
    textAlign: "left"
  },
  productFooterList: {
    justifyContent: "space-between",
    minHeight: "40px",
    display: "flex",
    flexDirection: "row",
    textAlign: "center",
    margin: "auto 0px",
    width: "300px",
    minWidth: "300px",
    "@media (max-width: 1199px)": {
      width: "120px",
      minWidth: "120px"
    },
    "@media (max-width: 959px)": {
      width: "300px",
      minWidth: "300px"
    },
    "@media (max-width: 599px)": {
      width: "100px",
      minWidth: "100px"
    }
  },
  modelEn: {
    height: "34px",
    fontSize: "14px",
    lineHeight: "1.2",
    letterSpacing: "0.2px",
    overflow: "hidden",
    fontWeight: "300",
    marginBottom: "12px",
    "@media (max-width: 599px)": {
      fontSize: "14px",
      lineHeight: "1.1",
      height: "30px"
    }
  },
  modelEnList: {
    height: "34px",
    fontSize: "14px",
    lineHeight: "1.2",
    letterSpacing: "0.2px",
    overflow: "hidden",
    fontWeight: "300",
    marginBottom: "12px",
    "@media (max-width: 599px)": {
      fontSize: "14px",
      lineHeight: "1.1",
      height: "30px",
      marginBottom: "0px"
    }
  },
  modelKr: {
    fontWeight: "100",
    fontSize: "18px",
    width: "inherit",
    lineHeight: "18px",
    height: "18px",
    letterSpacing: "-0.45px",
    overflow: "hidden",
    "@media (max-width: 599px)": {
      fontSize: "12px",
      lineHeight: "12px",
      height: "12px"
      // whiteSpace: "nowrap",
      // textOverflow: "ellipsis"
    }
  },
  priceHeader: {
    fontSize: "14px",
    fontWeight: "300",
    height: "14px",
    lineHeight: "14px",
    letterSpacing: "-0.35px",
    color: "#a3a3a3"
  },
  lastSalePrice: {
    width: "120px",
    margin: "0px auto",
    fontSize: "18px",
    fontWeight: "900",
    height: "18px",
    lineHeight: "18px",
    letterSpacing: "0.21px",
    "@media (max-width: 1199px)": {
      display: "none"
    },
    "@media (max-width: 959px)": {
      display: "block"
    },
    "@media (max-width: 599px)": {
      display: "none"
    }
  },
  price: {
    fontSize: "18px",
    fontWeight: "900",
    height: "18px",
    lineHeight: "18px",
    letterSpacing: "0.21px"
  },
  priceList: {
    width: "120px",
    margin: "0px auto",
    fontSize: "18px",
    fontWeight: "900",
    height: "18px",
    lineHeight: "18px",
    letterSpacing: "0.21px",
    "@media (max-width: 599px)": {
      fontSize: "12px",
      lineHeight: "12px",
      height: "12px",
      margin: "auto"
    }
  },
  slider: {
    minWidth: "250px",
    width: "250px",
    marginRight: "65px",
    "@media (max-width: 959px)": {
      background: "rgba(0, 0, 0, 0.2)",
      left: "0",
      display: "flex",
      justifyContent: "center",
      position: "fixed",
      zIndex: "5",
      width: "54px",
      top: "120px",
      padding: "0",
      margin: "0",
      borderTopRightRadius: "10px",
      borderBottomRightRadius: "10px",
      minWidth: "54px"
    }
  },
  brandSearchContainer: {
    width: "250px",
    height: "250px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    padding: "40px 20px",
    background: "#a2a9af",
    "@media (max-width: 959px)": {
      display: "none"
    }
  },
  brandSearchValue: {
    color: "white",
    transition: "0.3s",
    fontWeight: "200",
    fontSize: "21px",
    "&:hover": {
      fontWeight: "500"
    }
  },
  brandSearchValueActive: {
    color: "white",
    fontWeight: "bold",
    fontSize: "21px"
  },
  settingButton: {
    fontSize: "30px"
  },
  priceRange: {
    display: "flex",
    justifyContent: "space-between",
    paddingBottom: "10px"
  },
  panel: {
    padding: "40px 15px",
    borderBottom: "1px solid #a2a9af"
  },
  panelHeader: {
    fontSize: "18px",
    fontWeight: "500",
    color: "black",
    marginLeft: "5px",
    marginBottom: "30px",
    textTransform: "uppercase"
  },
  dropdownContainer: {
    border: "1px solid rgba(0, 0, 0, 0.4)",
    borderRadius: "7px",
    boxShadow: "0px 2px 2px rgba(0, 0, 0, 0.2)",
    background: "white",
    left: "80px",
    top: "100px",
    width: "75%",
    minWidth: "250px",
    position: "fixed",
    height: "75%",
    overflowY: "scroll",
    "@media (max-width: 599px)": {
      left: "60px"
    }
  },
  dropdownContainerClose: {
    display: "none"
  },
  dropdownPriceRange: {
    display: "flex",
    padding: "30px 10px 10px 10px",
    justifyContent: "space-between",
    color: "black",
    fontWeight: "600"
  },
  dropdownSlider: {
    padding: "10px 20px 10px 25px"
  },
  applyButton: {
    right: "10px",
    minWidth: "0",
    minHeight: "0",
    padding: "8px 8px",
    marginTop: "10px"
  },
  applyButtonWeb: {
    minWidth: "0",
    minHeight: "0",
    padding: "8px 8px",
    marginTop: "10px"
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end"
  },
  shoeSizeContainer: {
    textAlign: "center",
    // padding: "10px 10px",
    "@media (max-width: 959px)": {
      padding: "10px 10px"
    }
  },
  containerItem: {
    padding: "5px"
  },
  boxesContainer: {
    display: "flex",
    flexWrap: "wrap",
    paddingLeft: "5px"
  },
  checkboxContainer: {
    display: "flex",
    flexBasis: "50%",
    margin: "10px 0px"
  },
  checkboxValue: {
    fontSize: "16px",
    lineHeight: "16px",
    fontWeight: "400",
    letterSpacing: "0.4px",
    margin: "auto 0px",
    paddingLeft: "10px"
  },
  checkboxValueChecked: {
    fontSize: "16px",
    lineHeight: "16px",
    fontWeight: "500",
    letterSpacing: "0.4px",
    margin: "auto 0px",
    paddingLeft: "10px"
  },
  root: {
    padding: "0px",
    height: "24px"
  },
  imageContainer: {
    display: "flex",
    position: "relative",
    flexDirection: "row",
    flexBasis: "60%",
    "@media (max-width: 1199px)": {
      flexBasis: "65%"
    },
    "@media (max-width: 959px)": {
      flexBasis: "50%",
      flexDirection: "column",
      maxWidth: "50%"
    },
    "@media (max-width: 599px)": {
      flexBasis: "100%",
      flexDirection: "column",
      height: "340px",
      maxWidth: "100%"
    }
  },
  //
  withImage: {
    padding: "70px 50px",
    paddingBottom: "30px",
    borderRight: "1px solid #ebebeb",
    display: "flex",
    width: "83.333%",
    height: "710px",
    transition: "0.3s",
    "@media (max-width: 1199px)": {
      height: "510px",
      padding: "40px 30px 30px"
    },
    "@media (max-width: 959px)": {
      height: "340px",
      width: "100%",
      padding: "40px 30px 10px"
    },
    "@media (max-width: 599px)": {
      flexDirection: "column",
      height: "325px",
      padding: "0px 5px"
    }
  },
  withImageActive: {
    padding: "70px 50px",
    paddingBottom: "30px",
    display: "flex",
    width: "83.333%",
    height: "710px",
    transition: "0.3s",
    background: "rgba(0, 0, 0, 0.65)",
    zIndex: "6",
    "@media (max-width: 1199px)": {
      height: "510px",
      padding: "40px 30px 30px"
    },
    "@media (max-width: 959px)": {
      height: "340px",
      width: "100%"
    },
    "@media (max-width: 599px)": {
      flexDirection: "column",
      height: "325px",
      padding: "15px 20px"
    }
  },
  imageWrapper: {
    background: "white",
    zIndex: "5",
    width: "100%",
    display: "flex",
    border: "1px solid #ebebeb",
    transition: "0.3s",
    "@media (max-width: 959px)": {
      width: "100%",
      paddingBottom: "60px",
      paddingLeft: "20px",
      paddingRight: "20px"
    },
    "@media (max-width: 599px)": {
      height: "100%",
      paddingBottom: "90px",
      overflow: "inherit",
      position: "inherit"
    }
  },
  imageWrapperOther: {
    background: "white",
    zIndex: "5",
    width: "100%",
    display: "flex",
    transition: "0.3s",
    "@media (max-width: 959px)": {
      width: "100%",
      zIndex: "10"
    },
    "@media (max-width: 599px)": {
      height: "100%",
      overflow: "inherit",
      position: "inherit"
    }
  },
  image: {
    width: "100%",
    height: "auto",
    objectFit: "contain",
    "@media (max-width: 599px)": {
      width: "100%",
      height: "100%"
    }
  },
  productImageList: {
    height: "100%",
    objectFit: "contain"
    // "@media (max-width: 959px)": {
    //   zIndex: "5"
    // },
    // "@media (max-width: 599px)": {}
  },
  imageList: {
    width: "16.667%",
    height: "calc(100% - 40px)",
    objectFit: "contain",
    display: "grid",
    padding: "0px 15px",
    gridGap: "10px",
    margin: "20px 0px",
    overflowY: "scroll",
    "&::-webkit-scrollbar": {
      width: "2px",
      height: "2px"
    },
    "&::-webkit-scrollbar-track": {
      background: "#white"
    },
    "&::-webkit-scrollbar-thumb": {
      background: "black"
    },
    "&::-webkit-scrollbar-thumb:hover": {
      background: "#bfbfbf"
    },
    "@media (max-width: 959px)": {
      width: "calc(100% - 60px)",
      padding: "0px 10px",
      margin: "0px 30px",
      bottom: "30px",
      position: "absolute",
      height: "60px",
      zIndex: "5",
      gridTemplateColumns: "20% 20% 20% 20% 20%",
      gridGap: "0px 10px"
    },
    "@media (max-width: 599px)": {
      bottom: "15px",
      padding: "0px 20px",
      margin: "0px 5px",
      width: "calc(100% - 10px)"
    }
  },
  imageListImage: {
    width: "100%",
    padding: "10px 0px",
    objectFit: "contain",
    margin: "auto",
    border: "1px solid #dbdbdb",
    "@media (max-width: 959px)": {
      height: "60px",
      padding: "0px"
    },
    "@media (max-width: 599px)": {
      height: "90px",
      padding: "0px",
      border: "0px"
    }
  },
  buttonLable: {
    width: "100%",
    display: "block",
    alignItems: "inherit",
    justifyContent: "inherit"
  },
  options: {
    transition: "0.3s",
    width: "100%",
    background: "black",
    display: "grid",
    gridTemplateColumns: "10% 25%",
    gridTemplateRows: "50% 50%",
    gridGap: "5px 10px",
    padding: "30px 10%",
    height: "200px",
    left: "0",
    right: "0",
    top: "610px",
    position: "absolute",
    // "@supports (-ms-ime-align: auto)": {
    //   justifyContent: "space-around"
    // },
    "@media (max-width: 1199px)": {
      gridTemplateColumns: "10% 20%",
      padding: "30px 2.666%",
      top: "430px",
      height: "170px"
    },
    "@media (max-width: 959px)": {
      padding: "30px 1.6%",
      gridTemplateColumns: "20% 78.5%"
    },
    "@media (max-width: 599px)": {
      width: "100%",
      height: "150px",
      padding: "15px 5px",
      top: "565px",
      gridTemplateColumns: "calc(30% - 5px) calc(70% - 5px)",
      gridTemplateRows: "55px 55px",
      gridGap: "10px 10px"
    }
  },
  optionsActive: {
    transition: "0.3s",
    width: "100%",
    background: "black",
    display: "grid",
    position: "absolute",
    // flexDirection: "column",

    height: "445px",
    paddingTop: "30px",
    paddingBottom: "40px",
    paddingLeft: "10%",
    paddingRight: "10%",
    left: "0",
    right: "0",
    top: "610px",
    gridTemplateColumns: "11.5% 11.5% 11.5%",
    gridGap: "10px 10px",
    // "@supports (-ms-ime-align: auto)": {
    //   justifyContent: "space-around"
    // },
    "@media (max-width: 1199px)": {
      padding: "30px 2.666%",
      top: "430px",
      height: "350px",
      gridTemplateColumns: "10% 10% 10%"
    },
    "@media (max-width: 959px)": {
      padding: "30px 1.6%",
      gridTemplateColumns: "33% 33% 33%",
      gridGap: "initial",
      justifyContent: "space-between"
    },
    "@media (max-width: 599px)": {
      width: "100%",
      height: "300px",
      padding: "15px 5px",
      top: "565px",
      justifyContent: "space-between",
      gridTemplateRows: "55px 205px",
      gridGap: "10px 0px"
    }
  },
  shoeContainer: {
    display: "flex",
    flexDirection: "row",
    height: "510px",
    marginBottom: "200px",
    transition: "0.3s",
    "@media (max-width: 1199px)": {
      height: "340px"
    },
    "@media (max-width: 599px)": {
      height: "505px",
      flexDirection: "column-reverse",
      marginBottom: "150px"
    }
  },
  shoeContainerActive: {
    display: "flex",
    flexDirection: "row",
    height: "510px",
    marginBottom: "445px",
    "@media (max-width: 1199px)": {
      height: "340px",
      marginBottom: "350px"
    },
    "@media (max-width: 599px)": {
      height: "505px",
      flexDirection: "column-reverse",
      marginBottom: "300px"
    }
  },
  containerLeft: {
    paddingTop: "70px",
    flexBasis: "40%",
    borderRight: "1px solid #ebebeb",
    position: "relative",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    "@media (max-width: 1199px)": {
      flexBasis: "35%",
      paddingTop: "40px"
    },
    "@media (max-width: 959px)": {
      flexBasis: "50%",
      paddingTop: "20px"
    },
    "@media (max-width: 599px)": {
      flexBasis: "100%",
      paddingTop: "5px",
      paddingLeft: "5px",
      paddingRight: "5px",
      maxHeight: "180px"
    }
  },
  optionModel: {
    display: "flex",
    width: "80%",
    flexDirection: "column",
    color: "black",
    fontSize: "30px",
    fontWeight: "600",
    lineHeight: "32px",
    height: "130px",
    justifyContent: "space-between",
    "@media (max-width: 1199px)": {
      fontSize: "24px",
      lineHeight: "30px",
      height: "120px"
    },
    "@media (max-width: 599px)": {
      fontSize: "26px",
      lineHeight: "32px",
      height: "fit-content",
      width: "100%",
      justifyContent: "normal",
      marginBottom: "10px"
    }
  },
  optionModelEnglish: {
    height: "90px",
    textTransform: "capitalize",
    "@media (max-width: 1199px)": {
      fontSize: "20px",
      lineHeight: "30px",
      height: "90px"
    },
    "@media (max-width: 599px)": {
      fontSize: "20px",
      lineHeight: "28px",
      height: "fit-content"
    }
  },
  optionModelKorean: {
    fontSize: "18px",
    lineHeight: "18px",
    fontWeight: "100",
    "@media (max-width: 1199px)": {
      fontSize: "16px",
      lineHeight: "16px"
    },
    "@media (max-width: 599px)": {
      fontSize: "18px",
      lineHeight: "18px",
      height: "auto",
      paddingTop: "5px"
    }
  },
  buttonDisabled: {
    // 품절 버튼 disabled 색깔 &:disabled
    "&:disabled": {
      color: "#eeeeee"
    }
  },
  lowestButton: {
    width: "100%",
    height: "65px",
    minHeight: "65px",
    color: "white",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    border: "1px solid white",
    fontWeight: "600",
    borderRadius: "0px",
    "&:hover": {
      backgroundColor: "rgba(255, 255, 255, 0.1)"
    },
    "@media (max-width: 1199px)": {
      // width: "30%",
      height: "55px",
      minHeight: "55px"
    },
    "@media (max-width: 959px)": {
      // width: "70%",
      height: "55px",
      minHeight: "55px",
      margin: "0px auto"
    },
    "@media (max-width: 599px)": {
      width: "100%",
      height: "55px",
      minHeight: "55px",
      margin: "0px auto",
      fontSize: "12px"
    }
  },
  sizeButton: {
    width: "100%",
    height: "65px",
    color: "white",
    backgroundColor: "#fe0229",
    borderRadius: "0px",
    "&:hover": {
      backgroundColor: "#CC0000"
    },
    "@media (max-width: 1199px)": {
      // width: "30%",
      height: "55px"
    },
    "@media (max-width: 959px)": {
      // width: "70%",
      height: "55px",
      margin: "0px auto"
    },
    "@media (max-width: 599px)": {
      width: "100%",
      height: "55px",
      margin: "0px auto"
    }
  },
  newReleasesButton: {
    position: "absolute",
    color: "black",
    zIndex: "1",
    top: "100px",
    right: "44px",
    padding: "0px",
    "@media (max-width: 1199px)": {
      top: "40px",
      right: "10px"
    },
    "@media (max-width: 599px)": {
      top: "-319px",
      right: "25px",
      zIndex: "10"
    }
  },
  icon: {
    fontSize: "36px"
  },
  shoppingCartButton: {
    right: "0",
    position: "absolute",
    color: "black",
    zIndex: "1"
  },
  sizeContainer: {
    height: "300px",
    width: "100%",
    justifyContent: "center",
    overflowY: "scroll",
    flexDirection: "column",
    background: "rgba(255, 255, 255, 0.2)",
    gridColumn: "1/4",
    "&::-webkit-scrollbar": {
      width: "2px"
    },
    "&::-webkit-scrollbar-track": {
      background: "#black"
    },
    "&::-webkit-scrollbar-thumb": {
      background: "white",
      borderRadius: "1.5px"
    },
    "&::-webkit-scrollbar-thumb:hover": {
      background: "#bfbfbf"
    },
    "@media (max-width: 1199px)": {
      height: "205px"
      // width: "30%"
    },
    "@media (max-width: 959px)": {
      // width: "70%",
      height: "205px",
      margin: "0px auto"
    },
    "@media (max-width: 599px)": {
      width: "100%",
      height: "205px"
    }
  },
  singleSizeContainerAvailable: {
    justifyContent: "space-between",
    display: "flex",
    flexDirection: "row",
    height: "60px",
    padding: "21px 20px",
    borderBottom: "1px solid rgba(255, 255, 255, 0.2)",
    cursor: "pointer",
    color: "white",
    lineHeight: "16px"
  },
  singleSizeContainer: {
    justifyContent: "space-between",
    display: "flex",
    flexDirection: "row",
    height: "60px",
    padding: "21px 20px",
    borderBottom: "1px solid rgba(255, 255, 255, 0.2)",
    color: "rgba(255, 255, 255, 0.2)",
    lineHeight: "16px"
  },
  description0: {
    color: "black",
    fontWeight: "100",
    width: "230px",
    display: "flex",
    flexDirection: "column",
    height: "160px",
    marginBottom: "70px",
    "@media (max-width: 1199px)": {
      marginBottom: "20px",
      height: "130px"
    },
    "@media (max-width: 599px)": {
      margin: "auto 0px",
      height: "75px",
      width: "100%",
      flexWrap: "wrap",
      flexDirection: "row"
    }
  },
  description: {
    padding: "0px 10px",
    margin: "0px 10px 10px 10px",
    paddingBottom: "10px",
    borderBottom: "1px solid #eee",
    color: "#7c7c7c"
  },
  detailsContainer: {
    justifyContent: "space-between",
    display: "flex",
    flexDirection: "row",
    height: "36px",
    "@media (max-width: 599px)": {
      height: "20px",
      width: "50%",
      padding: "0px 5px"
    }
  },
  detail: {
    width: "50%",
    paddingLeft: "20px",
    overflowY: "hidden",
    fontSize: "18px",
    lineHeight: "18px",
    height: "18px",
    "@media (max-width: 1199px)": {
      fontSize: "16px",
      lineHeight: "16px",
      height: "16px"
    },
    "@media (max-width: 599px)": {
      fontSize: "14px",
      lineHeight: "14px",
      height: "14px",
      textAlign: "right",
      paddingLeft: "0px"
    }
  },
  recommendButtonContainer: {
    display: "flex",
    margin: "auto",
    padding: "50px 0px",
    color: "black",
    "@media (max-width: 1199px)": {
      padding: "30px 0px"
    },
    "@media (max-width: 959px)": {
      padding: "20px 0px"
    },
    "@media (max-width: 599px)": {
      padding: "10px 0px"
    }
  },
  recommendContainerLeft: {
    marginRight: "20px"
  },
  recommendNumber: {
    textAlign: "center",
    marginBottom: "20px",
    fontSize: "48px",
    height: "48px",
    lineHeight: "48px",
    fontWeight: "900"
  },
  recommendButtonUp: {
    width: "400px",
    height: "65px",
    borderRadius: "0px",
    background: "#fe0229",
    color: "white",
    fontSize: "16px",
    "&:hover": {
      background: "#fe677d" //#fe677d
    },
    "@media (max-width: 1199px)": {
      width: "250px"
    },
    "@media (max-width: 959px)": {
      width: "200px"
    },
    "@media (max-width: 599px)": {
      width: "120px"
    }
  },
  recommendButtonDown: {
    width: "400px",
    height: "65px",
    borderRadius: "0px",
    background: "black",
    color: "white",
    fontSize: "16px",
    "&:hover": {
      background: "#595959"
    },
    "@media (max-width: 1199px)": {
      width: "250px"
    },
    "@media (max-width: 959px)": {
      width: "200px"
    },
    "@media (max-width: 599px)": {
      width: "120px"
    }
  },
  detailHeader: {
    width: "50%",
    fontSize: "18px",
    lineHeight: "18px",
    height: "18px",
    borderRight: "1px solid black",
    "@media (max-width: 1199px)": {
      fontSize: "16px",
      lineHeight: "16px",
      height: "16px"
    },
    "@media (max-width: 599px)": {
      fontSize: "14px",
      lineHeight: "14px",
      height: "14px",
      borderRight: "0px"
    }
  },
  modelDetail: {
    textAlign: "center",
    fontSize: "24px",
    marginBottom: "10px",
    color: "black"
  },
  recentSold: {
    textAlign: "left",
    fontSize: "24px",
    marginBottom: "10px",
    fontWeight: "600",
    color: "black",
    "@media (max-width: 599px)": {
      fontSize: "18px"
    }
  },
  webModalBuy: {
    width: "100px",
    hieght: "100px",
    position: "absolute",
    top: "50%",
    left: "50%",
    background: "white"
  },
  mobModalBuy: {
    width: "100px",
    hieght: "100px",
    position: "absolute",
    top: "50%",
    left: "50%",
    background: "white"
  }
};

export default propageStyle;
