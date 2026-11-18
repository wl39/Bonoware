const mostPopularBrand = {
  container: {
    marginTop: "25px",
    marginBottom: "20px",
    "@media (max-width: 992px)": {
      marginTop: "40px",
      marginBottom: "40px"
    },
    "@media (max-width: 768px)": {
      marginTop: "15px",
      marginBottom: "10px",
      padding: "0px 10px"
    },
    "@media (max-width: 576px)": {
      marginTop: "15px",
      marginBottom: "10px",
      padding: "0px 10px"
    }
  },
  title: {
    fontSize: "22px",
    fontWeight: "bold",
    lineHeight: "23px",
    color: 'black',
    letterSpacing: "-0.6px",
    textAlign: "left",
    marginBottom: "25px",
    "@media (max-width: 599px)": {
      fontSize: "20px",
      marginRight: "5px",
      marginBottom: "10px",
    }
  },
  brandContainer: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    height: "90%",
    paddingBottom: "10px",
    "@media (max-width: 599px)": {
      flexDirection: "column"
    }
  },
  firstRow: {
    display: "flex",
    "@media (max-width: 599px)": {
      marginBottom: "7px"
    }
  },
  secondRow: {
    display: "flex",
    "@media (max-width: 599px)": {
      marginTop: "7px"
    }
  },
  firstBrand: {
    flexBasis: "50%",
    marginRight: "7px",
    height: "100%",
    boxShadow: "0 0 9px 1px rgba(4, 0, 0, 0.1)",
    padding: "30px 15px 0px 15px",
    display: "flex",
    flexDirection: "column",
    position: "relative",
    transition: "0.3s",
    cursor: "pointer",
    "&:hover": {
      flexBasis: "52%",
      height: "102%",
      marginTop: "-1%"
    },
    "@media (max-width: 599px)": {
      flexBasis: "50%",
      "&:hover": {
        flexBasis: "52%",
        height: "102%",
        marginTop: "-1%"
      }
    }
  },
  middleBrandLeft: {
    flexBasis: "50%",
    margin: "0px 7px",
    height: "100%",
    boxShadow: "0 0 9px 1px rgba(4, 0, 0, 0.1)",
    padding: "30px 15px 0px 15px",
    display: "flex",
    flexDirection: "column",
    position: "relative",
    transition: "0.3s",
    cursor: "pointer",
    "&:hover": {
      flexBasis: "52%",
      height: "102%",
      marginTop: "-1%"
    },
    "@media (max-width: 599px)": {
      flexBasis: "50%",
      marginRight: "0px",
      "&:hover": {
        flexBasis: "52%",
        height: "102%",
        marginTop: "-1%"
      }
    }
  },
  middleBrandRight: {
    flexBasis: "50%",
    margin: "0px 7px",
    height: "100%",
    boxShadow: "0 0 9px 1px rgba(4, 0, 0, 0.1)",
    padding: "30px 15px 0px 15px",
    display: "flex",
    flexDirection: "column",
    position: "relative",
    transition: "0.3s",
    cursor: "pointer",
    "&:hover": {
      flexBasis: "52%",
      height: "102%",
      marginTop: "-1%"
    },
    "@media (max-width: 599px)": {
      flexBasis: "50%",
      marginLeft: "0px",
      "&:hover": {
        flexBasis: "52%",
        height: "102%",
        marginTop: "-1%"
      }
    }
  },
  lastBrand: {
    flexBasis: "50%",
    marginLeft: "7px",
    height: "100%",
    boxShadow: "0 0 9px 1px rgba(4, 0, 0, 0.1)",
    padding: "30px 15px 0px 15px",
    display: "flex",
    flexDirection: "column",
    position: "relative",
    transition: "0.3s",
    cursor: "pointer",
    "&:hover": {
      flexBasis: "52%",
      height: "102%",
      marginTop: "-1%"
    },
    "@media (max-width: 599px)": {
      flexBasis: "50%",
      "&:hover": {
        flexBasis: "52%",
        height: "102%",
        marginTop: "-1%"
      }
    }
  },
  shoeImg: {
    width: "100%",
    height: "auto"
  },
  brandImg: {
    position: "releative",
    bottom: "0",
    left: "0",
    right: "0",
    margin: "0px auto",
    width: "30%"
  }
};

export default mostPopularBrand;
