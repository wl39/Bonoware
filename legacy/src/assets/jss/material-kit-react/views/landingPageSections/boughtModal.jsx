const boughtModal = {
  paper: {
    background: "white",
    width: "calc(100% - 290px)",
    position: "absolute",
    color: "black",
    top: "220px",
    left: "270px",
    padding: "25px 20px",
    height: "calc(100% - 240px)",
    "@media (max-width: 1200px)": {
      width: "calc(100% - 40px)",
      left: "20px",
      top: "105px"
    },
    "@media (max-width: 959px)": {
      overflowY: "scroll"
    },
    "@media (max-width: 599px)": {
      width: "100%",
      left: "0px",
      top: "105px",
      padding: "0px"
    },
    "&::-webkit-scrollbar": {
      width: "2px"
    },

    /* Track */
    "&::-webkit-scrollbar-track": {
      background: "white"
    },

    /* Handle */
    "&::-webkit-scrollbar-thumb": {
      background: "#1b202d"
    },

    /* Handle on hover */
    "&::-webkit-scrollbar-thumb:hover": {
      background: " black"
    }
  },
  recpitContainer: {
    background: "#1b202d",
    display: "flex",
    height: "80px",
    minHeight: "80px",
    color: "white",
    fontSize: "18px",
    padding: "0px 30px",
    justifyContent: "space-between",
    marginBottom: "40px",
    "@media (max-width: 599px)": {
      padding: "0px 5px"
    }
  },
  orderContainer: {
    display: "flex",
    margin: "auto 0px",
    "@media (max-width: 1200px)": {
      flexDirection: "column"
    }
  },
  order: {
    display: "flex",
    height: "18px",
    margin: "auto",
    "@media (max-width: 1200px)": {
      margin: "initial",
      fontSize: "14px"
    }
  },
  divider: {
    margin: "0px 50px",
    borderRight: "1px solid white",
    height: "30px",
    "@media (max-width: 1200px)": {
      display: "none"
    }
  },
  orderHeader: {
    lineHeight: "18px",
    fontWeight: "600",
    letterSpacing: "-0.45px",
    paddingRight: "30px",
    "@media (max-width: 1200px)": {
      paddingRight: "10px",
      fontWeight: "500"
    }
  },
  orderDate: {
    lineHeight: "18px",
    fontWeight: "400"
  },
  recpitButton: {
    padding: "0px",
    borderRadius: "0px",
    border: "1px solid white",
    color: "white",
    height: "35px",
    width: "120px",
    fontSize: "12px",
    fontWeight: "300",
    transion: "0.3s",
    margin: "auto 0px",
    "&:hover": {
      border: "2px solid white",
      fontWeight: "500"
    },
    "@media (max-width: 1200px)": {
      width: "100px"
    },
    "@media (max-width: 599px)": {
      width: "60px",
      minWidth: "60px"
    }
  },
  buttonLabel: {
    "@media (max-width: 599px)": {
      whiteSpace: "pre-line"
    }
  },
  orderProductTable: {
    marginBottom: "50px",
    "@media (max-width: 959px)": {
      marginBottom: "20px"
    }
  },
  orderDetailColumn: {
    height: "50px",
    display: "grid",
    gridTemplateColumns: "55% 15% 15% 15%",
    borderTop: "1px solid #b7b7b7",
    borderBottom: "1px solid #b7b7b7",
    "@media (max-width: 599px)": {
      gridTemplateColumns: "100%"
    }
  },
  orderDetailHeader: {
    fontSize: "16px",
    fontWeight: "300",
    margin: "auto"
  },
  orderDetailHeaderHidden: {
    fontSize: "16px",
    fontWeight: "300",
    margin: "auto",
    "@media (max-width: 599px)": {
      display: "none"
    }
  },
  orderProductContainer: {
    height: "150px",
    borderBottom: "1px solid #b7b7b7",
    display: "grid",
    gridTemplateColumns: "55% 15% 15% 15%",
    "@media (max-width: 599px)": {
      gridTemplateColumns: "none",
      gridTemplateRows: "200px 50px",
      height: "250px"
    }
  },
  productImgWrapper: {
    display: "flex"
  },
  image: {
    width: "80px !important",
    height: "80px !important",
    margin: "auto 20px auto 0px",
    objectFit: "contain",
    "@media (max-width: 599px)": {
      width: "45% !important",
      height: "auto !important"
    }
  },
  productModelWrapper: {
    margin: "auto 0px",
    textTransform: "capitalize",
    color: "black"
  },
  modelKR: {
    fontWeight: "700",
    letterSpacing: "-0.4px"
  },
  shoePrice: {
    margin: "auto",
    fontWeight: "300",
    "@media (max-width: 599px)": {
      display: "none"
    }
  },
  deliveryFee: {
    margin: "auto",
    fontWeight: "300",
    "@media (max-width: 599px)": {
      display: "none"
    }
  },
  progStatus: {
    margin: "auto",
    fontWeight: "300"
  },
  personalDetail: {
    display: "grid",
    gridTemplateColumns: "calc(50% - 10px) calc(50% - 10px)",
    gridGap: "20px",
    "@media (max-width: 959px)": {
      gridTemplateColumns: "auto"
    }
  },
  personalDetailHeader: {
    fontSize: "18px",
    fontWeight: "600",
    letterSpacing: "-0.4px",
    lineHeight: "18px",
    paddingBottom: "20px",
    borderBottom: "1px solid #b7b7b7",
    "@media (max-width: 959px)": {
      textAlign: "center"
    }
  },
  personalDetailContainer: {
    margin: "30px 0px 30px 30px",
    height: "135px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between"
  },
  detailContainer: {
    display: "flex"
  },
  detailHeader: {
    fontWeight: "500",
    letterSpacing: "-0.4px",
    width: "180px",
    minWidth: "180px",
    "@media (max-width: 599px)": {
      width: "120px",
      minWidth: "120px"
    }
  },
  detailValue: {
    color: "#1b202d",
    fontWeight: "400"
  },
  payMethod: {
    fontWeight: "600"
  },
  paidBox: {
    display: "flex",
    height: "80px",
    background: "#1b202d",
    color: "white",
    padding: "0px 30px"
  },
  paidHeader: {
    fontSize: "16px",
    fontWeight: "300",
    margin: "auto 0px"
  },
  paidDetail: {
    fontSize: "30px",
    margin: "auto",
    fontWeight: "900"
  },
  orderInfoBox: {
    height: "80px",
    borderTop: "1px solid #b7b7b7",
    borderBottom: "1px solid #b7b7b7",
    padding: "15px 30px"
  }
};

export default boughtModal;
