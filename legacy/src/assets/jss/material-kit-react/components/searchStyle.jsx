const searchStyle = {
  container: {
    top: "95px",
    width: "100%",
    //maxHeight: "180px",
    height: "500px",
    overflowY: "scroll",
    display: "grid",
    left: "0",
    right: "0",
    position: "fixed",
    zIndex: "10",
    boxShadow: "0px 2px 2px rgba(0, 0, 0, 0.2)"
  },
  paperStyle: {
    width: "100%",
    position: "relative",
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    borderBottom: "1px solid rgba(255, 255, 255, 0.8)",
    "&:hover": {
      backgroundColor: "rgba(255, 255, 255, 0.3)",
      transition: "background-color .4s ease-out",
      "@media (max-width: 992px)": {
        backgroundColor: "rgba(0, 0, 0, 0.3)"
      }
    },
    "&:hover $redBar": {
      width: "10px",
      "@media (max-width: 969px)": {
        width: "5px"
      }
    },
    "@media (max-width: 992px)": {
      backgroundColor: "rgba(0, 0, 0, 0.5)"
    }
  },
  headerPaperStyle: {
    width: "100%",
    position: "relative",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderBottom: "1px solid rgba(255, 255, 255, 0.8)",
    "&:hover": {
      backgroundColor: "rgba(0, 0, 0, 0.3)",
      transition: "background-color .4s ease-out",
      "@media (max-width: 992px)": {
        backgroundColor: "rgba(0, 0, 0, 0.3)"
      }
    },
    "&:hover $redBar": {
      width: "10px",
      "@media (max-width: 969px)": {
        width: "5px"
      }
    },
    "@media (max-width: 992px)": {
      backgroundColor: "rgba(0, 0, 0, 0.5)"
    }
  },
  redBar: {
    height: "100%",
    right: "0px",
    position: "absolute",
    backgroundColor: "red",
    transition: "all .2s ease-in-out",
    width: "0px",
    zIndex: "15"
  },
  loader: {
    minHeight: "110px",
    textAlign: "center"
  },
  noResult: {
    minHegiht: "110px",
    textAlign: "center"
  },
  img: {
    width: "23%",
    maxWidth: "23%",
    float: "left"
  },
  detailsContainer: {
    height: "100%",
    width: "75%",
    position: "absolute",
    left: "25%",
    flexDirection: "column",
    textAlign: "center",
    display: "flex",
    justifyContent: "space-around"
  },
  dummyContainer: {
    height: "43px",
    margin: "auto",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between"
  },
  model: {
    textAlign: "left",
    color: "white",
    lineHeight: "20px !important",
    height: "40px !important",
    fontSize: "16px !important",
    overflowY: "hidden",
    fontWeight: "bold",
    marginBottom: "10px",
    "@media (max-width: 1199px)": {
      fontSize: "16px !important",
      height: "36px"
    }
  },
  modelEn: {
    fontSize: "14px",
    textTransform: "capitalize",
    fontWeight: "200",
    height: "20px",
    paddingBottom: "5px"
  },
  price: {
    textAlign: "left",
    color: "white",
    fontWeight: "normal",
    height: "14px",
    fontSize: "14px",
    lineHeight: "14px !important"
  },
  button: {
    display: "flex",
    padding: "0px",
    height: "100%"
  },
  link: {
    display: "flex",
    width: "100%",
    color: "inherit"
  },
  moreButton: {
    background: "#323232",
    color: "white",
    borderRadius: "0px",
    borderBottomLeftRadius: "8px",
    borderBottomRightRadius: "8px",
    "&:hover": {
      backgroundColor: "black",
      transition: "background-color .4s ease-out"
    }
  }
};

export default searchStyle;
