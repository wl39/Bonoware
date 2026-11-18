const newsPanel = {
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
  },
  container: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "column",
    flexBasis: "20%",
    borderBottom: "1px solid rgba(255, 255, 255, 0.6)",
    padding: "40px 0px",
    "@media (max-width: 768px)": {
      padding: "15px 0px"
    }
  },
  newsPanelContainer: {
    height: "100%",
    display: "flex",
    flexDirection: "column"
  },
  newsContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    height: "100%"
  },
  mainInfo: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  title: {
    fontWeight: "600",
    height: "15px",
    minHeight: "15px",
    lineHeight: "15px",
    fontSize: "15px",
    overflow: "hidden",
    letterSpacing: "0.21px"
  },
  details: {
    display: "flex",
    fontSize: "16px",
    lineHeight: "16px",
    flexDirection: "row",
    fontWeight: "200"
  },
  viewValue: {
    fontSize: "16px",
    height: "16px",
    lineHeight: "10px",
    letterSpacing: "0.16px",
    fontWeight: "200",
    minWidth: "60px",
    "@media (max-width: 599px)": {
      fontSize: "12px",
      lineHeight: "14px"
    }
  },
  icon: {
    fontSize: "9px",
    height: "12px",
    paddingTop: "3px"
  },
  label: {
    flexDirection: "column"
  },
  link: {
    margin: "0px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    height: "100%",
    color: "#d9d9d9 !important",
    "&:hover": {
      color: "white !important"
    }
  },
  cardHeader: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: "14px",
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
  newsLink: {
    display: "flex",
    color: "#bfbfbf",
    height: "45px",
    width: "150px",
    borderRadius: "22.5px",
    border: "1px solid #bfbfbf",
    transition: "0.3s",
    "&:hover": {
      border: "1px solid white",
      fontWeight: "700",
      color: "white"
    },
    "@media (max-width: 992px)": {
      width: "135px",
      height: "45px"
    },
    "@media (max-width: 599px)": {
      width: "100px",
      height: "30px"
    },
  },
  seeAll: {
    margin: "auto",
    textAlign: "center",
    fontSize: "14px",
    "@media (max-width: 599px)": {
      fontSize: "12px"
    }
  }
};

export default newsPanel;
