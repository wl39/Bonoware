const releaseDatePanel = {
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    height: "100%",
    overflow: "hidden"
  },
  tooltipAlert: {
    color: "black",
    fontSize: "1.5rem"
  },
  tooltipButton: {
    overflow: "visible",
    marginRight: "-12px",
    width: "auto",
    height: "auto"
  },
  tooltip: {
    minWidth: "max-content"
  },
  header: {
    position: "absolute",
    marginTop: "-33px !important",
    fontSize: "14px",
    color: "white"
    // "@media (max-width: 576px)": {
    //   position: "relative",
    //   left: "-50%"
    // }
  },
  cardHeader: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: "10px",
    borderBottom: "1px solid rgba(255, 255, 255, 0.6)"
  },
  cardHeaderName: {
    textAlign: "center",
    margin: "auto 0px",
    height: "24px",
    fontSize: "24px",
    fontWeight: "500",
    lineHeight: "24px",
    letterSpacing: "-0.6px",
    "@media (max-width: 599px)": {
      fontSize: "18px",
      height: "18px",
      lineHeight: "18px"
    }
  },
  releaseLink: {
    display: "flex",
    color: "black",
    height: "45px",
    width: "150px",
    borderRadius: "22.5px",
    border: "1px solid #ebebeb",
    transition: "0.3s",
    "&:hover": {
      border: "1px solid black",
      fontWeight: "700",
      color: "black"
    },
    "@media (max-width: 992px)": {
      width: "135px",
      height: "45px"
    },
    "@media (max-width: 599px)": {
      width: "100px",
      height: "30px"
    }
  },
  seeAll: {
    margin: "auto",
    textAlign: "center",
    fontSize: "14px",
    "@media (max-width: 599px)": {
      fontSize: "12px"
    }
  },
  rowsContainer: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    border: "1px solid #cfcfcf"
  },
  rowContainer: {
    display: "grid",
    height: "100%",
    marginRight: "-1px",
    marginBottom: "-1px",
    gridTemplateColumns: "33.333% 33.333% 33.333%",
    gridTemplateRows: "326px 326px",
    "@media (max-width: 599px)": {
      display: "grid",
      gridTemplateColumns: "50% 50%",
      gridTemplateRows: "50% 50%"
    }
  },
  itemContainerFirstRow: {
    display: "flex",
    flexDirection: "column",
    padding: "25px 20px 35px 20px",
    justifyContent: "space-between",
    borderRight: "1px solid #cfcfcf",
    borderBottom: "1px solid #cfcfcf",
    height: "100%",
    marginTop: "auto",
    "@media (max-width: 1199px)": {
      padding: "15px 10px 25px 10px"
    },
    "@media (max-width: 959px)": {
      marginBottom: "0px",
      padding: "25px 20px 35px 20px"
    },
    "@media (max-width: 768px)": {
      padding: "12px 10px 17px 10px"
    }
  },
  itemContainerFirstRowLast2: {
    display: "flex",
    flexDirection: "column",
    padding: "25px 20px 35px 20px",
    justifyContent: "space-between",
    borderRight: "1px solid #cfcfcf",
    borderBottom: "1px solid #cfcfcf",
    height: "100%",
    marginTop: "auto",
    "@media (max-width: 1199px)": {
      padding: "15px 10px 25px 10px"
    },
    "@media (max-width: 959px)": {
      marginBottom: "0px",
      padding: "25px 20px 35px 20px"
    },
    "@media (max-width: 768px)": {
      padding: "12px 10px 17px 10px"
    },
    "@media (max-width: 599px)": {
      display: "none"
    }
  },
  itemContainerFirstRowLast: {
    display: "flex",
    flexDirection: "column",
    padding: "25px 20px 35px 20px",
    justifyContent: "space-between",
    borderBottom: "1px solid #cfcfcf",
    borderRight: "1px solid #cfcfcf",
    "@media (max-width: 1199px)": {
      padding: "15px 10px 25px 10px"
    },
    "@media (max-width: 959px)": {
      marginBottom: "0px",
      padding: "25px 20px 35px 20px"
    },
    "@media (max-width: 768px)": {
      padding: "12px 10px 17px 10px"
    },
    "@media (max-width: 599px)": {
      display: "none"
    }
  },
  itemContainerSecondRow: {
    display: "flex",
    flexDirection: "column",
    width: "33.333%",
    padding: "25px 20px 35px 20px",
    justifyContent: "space-between",
    borderRight: "1px solid #cfcfcf",
    "@media (max-width: 768px)": {
      padding: "12px 10px 17px 10px"
    }
  },
  itemContainerSecondRowLast: {
    display: "flex",
    flexDirection: "column",
    width: "33.333%",
    padding: "25px 20px 35px 20px",
    justifyContent: "space-between",
    "@media (max-width: 768px)": {
      padding: "12px 10px 17px 10px"
    }
  },

  headerContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    height: "25px",
    marginBottom: "18px"
  },
  dateContainer: {
    display: "flex",
    flexDirection: "row"
  },
  dateDetailContainer: {
    display: "flex",
    flexDirection: "column",
    fontSize: "14px",
    lineHeight: "16px"
  },
  year: {
    margin: "auto",
    fontSize: "18px",
    fontWeight: "500",
    lineHeight: "18px",
    letterSpacing: "-0.53",
    "@media (max-width: 1199px)": {
      height: "25px",
      lineHeight: "25px"
    },
    "@media (max-width: 959px)": {
      height: "18px",
      lineHeight: "18px"
    }
  },
  date: {
    lineHeight: "32px",
    fontSize: "16px",
    marginRight: "5px"
  },
  icon: {
    padding: "0px",
    width: "25px",
    height: "25px",
    marginLeft: "2px",
    color: "black"
  },
  iconFont: {
    fontSize: "25px"
  },
  imageContainer: {
    margin: "auto",
    marginBottom: "20px",
    "@media (max-width: 768px)": {
      margin: "10px 0px"
    }
  },
  image: {
    width: "100%",
    maxHeight: "130px",
    objectFit: "contain",
    padding: "0px 13px"
  },
  name: {
    marginTop: "-5px",
    fontSize: "15px",
    fontWeight: "normal",
    lineHeight: "1.1",
    height: "75px",
    textAlign: "left",
    overflow: "hidden",
    width: "100%",
    letterSpacing: "normal",
    "@media (max-width: 768px)": {
      height: "56px"
    }
  },
  modelEn: {
    height: "33px",
    overflow: "hidden"
  },
  modelKr: {
    fontWeight: "100",
    height: "33px",
    overflow: "hidden",
    "@media (max-width: 768px)": {
      height: "16px"
    }
  },
  price: {
    width: "100%",
    textAlign: "left",
    fontSize: "18px",
    fontWeight: "bold",
    height: "18px",
    lineHeight: "18px",
    "@media (max-width: 768px)": {
      fontSize: "16px"
    }
  },
  newsLink: {
    display: "flex",
    height: "0px"
  },
  allButton: {
    height: "30px",
    minHeight: "30px",
    position: "relative",
    left: "calc(100% - 75px)",
    top: "-38px",
    color: "#232020"
  },
  eachLink: {
    height: "100%",
    width: "100%",
    display: "flex"
  },
  eachButton: {
    width: "100%",
    height: "100%",
    padding: "4px 0px 0px 0px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between"
  },
  flexButton: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    height: "100%"
  }
};

export default releaseDatePanel;
