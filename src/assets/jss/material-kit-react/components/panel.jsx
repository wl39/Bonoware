const panel = {
  container: {
    height: "100%",
    display: "flex",
    flexDirection: "column",

    "@media (max-width: 959px)": {
      flexDirection: "row",
      height: "174px"
    }
  },
  child: {
    height: "25%",
    fontSize: "14px",
    "@media (max-width: 959px)": {
      height: "100%",
      width: "25%",
      textAlign: "center"
    }
  },
  shoeContainer: {
    display: "flex",
    flexDirection: "row",
    padding: "3px 5px",
    margin: "0px",
    minHeight: "30px"
  },
  img: {
    height: "24px",
    marginRight: "2px"
  },
  text: {
    height: "24px",
    lineHeight: "24px",
    overflow: "hidden",
    letterSpacing: "-1.2px",
    textAlign: "left"
  },
  title: {
    width: "95%",
    padding: "0px 6px",
    background: "#232020",
    color: "white",
    borderRadius: "7px",
    textAlign: "center",
    margin: "auto",
    "@media (max-width: 959px)": {
      width: "85%"
    }
  },
  flatTitle: {
    width: "95%",
    padding: "0px 6px",
    background: "#232020",
    color: "white",
    borderRadius: "7px",
    textAlign: "center",
    margin: "auto",
    "@media (max-width: 959px)": {
      width: "85%"
    },
    "@media (max-width: 576px)": {
      width: "100%",
      padding: "0px",
      background: "inherit",
      color: "inherit",
      cursor: "pointer"
    }
  },
  link: {
    textTransform: "capitalize",
    color: "inherit",
    display: "flex",
    width: "100%",
    "&:hover": {
      color: "black"
    }
  },
  tooltipAlert: {
    color: "black",
    fontSize: "1.5rem"
  },
  tooltipButton: {
    overflow: "visible",
    width: "auto",
    height: "auto"
  },

  header: {
    position: "absolute",
    marginTop: "-33px !important",
    marginLeft: "-8px",
    fontSize: "14px"
  },
  hidden: {
    "@media (max-width: 576px)": {
      display: "none"
    }
  },
  leftShow: {
    "@media (max-width: 576px)": {
      width: "200%"
    }
  },
  RightShow: {
    "@media (max-width: 576px)": {
      width: "200%",
      left: "-100%",
      position: "relative"
    }
  }
};

export default panel;
