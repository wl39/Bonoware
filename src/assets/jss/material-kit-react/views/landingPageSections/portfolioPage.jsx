const portfolioPage = {
  container: {
    width: "100%"
  },
  greeting: {
    margin: "15px 0px",
    textAlign: "center",
    fontSize: "18px",
    "@media (max-width: 875px)": {
      fontSize: "14px",
      marginBottom: "0px"
    }
  },
  mobile: {
    display: "none",
    fontSize: "12px",
    textAlign: "center",
    "@media (max-width: 875px)": {
      display: "block",
      marginBottom: "15px"
    }
  },
  histogramsContainer: {
    display: "flex",
    width: "100%",
    marginLeft: "-15px",
    "@media (max-width: 875px)": {
      flexDirection: "column"
    }
  },
  histogramContainer: {
    display: "flex",
    flexDirection: "column",
    width: "50%",
    "@media (max-width: 875px)": {
      width: "100%"
    }
  },
  detailsContainer: {
    width: "200%"
  }
};

export default portfolioPage;
