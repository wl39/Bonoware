const aboutPage = {
  container: {
    marginTop: "100px"
  },
  firstDiv: {
    height: "500px",
    display: "flex",
    background: "#121621",
    opacity: "0.9"
  },
  brandTitle: {
    margin: "auto",
    color: "white",
    fontWeight: "600",
    fontSize: "60px",
    TextAlign: "center"
  },
  brandDescriptionContainer: {
    height: "600px",
    display: "flex",
    position: "relative"
  },
  subContainer: {
    margin: "auto 0px",
    position: "absolute",
    left: "50%",
    top: "50%",
    bottom: "50%",
    transform: "translateY(-50%)",
    height: "min-content"
  },
  brandDescriptionHeader: {
    fontSize: "36px",
    lineHeight: "36px",
    fontWeight: "600",
    color: "#121621",
    marginBottom: "50px"
  },
  brandDescription: {
    letterSpacing: "-0.4px",
    whiteSpace: "pre-line",
    fontSize: "16px",
    fontWeight: "300",
    lineHeight: "1.88"
  },
  howToUse: {
    display: "grid",
    gridTemplateColumns: "33.333% 33.333% 33.333%"
  },
  square: {
    position: "relative",
    "&:before": {
      content: `""`,
      display: "block",
      paddingTop: "100%"
    }
  },
  firstStep: {
    position: "absolute",
    top: "0",
    bottom: "0",
    left: "0",
    right: "0",
    paddingTop: "25%",
    paddingLeft: "50px",
    background: "#eeeeee",
    color: "#121621",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    paddingBottom: "31.25%"
  },
  secondStep: {
    position: "absolute",
    top: "0",
    bottom: "0",
    left: "0",
    right: "0",
    paddingTop: "25%",
    paddingLeft: "50px",
    background: "#1b202d",
    color: "white",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    paddingBottom: "31.25%"
  },
  lastStep: {
    position: "absolute",
    top: "0",
    bottom: "0",
    left: "0",
    right: "0",
    paddingTop: "25%",
    paddingLeft: "50px",
    background: "#eeeeee",
    color: "#121621",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    paddingBottom: "31.25%"
  },
  stepHeader: {
    fontSize: "36px",
    fontWeight: "600",
    lineHeight: "1",
    marginBottom: "50px"
  },
  stepsContainer: {
    display: "grid",
    gridTemplateColumns: "28.125% 28.125% 28.125%",
    fontSize: "16px",
    letterSpacing: "-0.4px",
    color: "black",
    fontWeight: "300",
    whiteSpace: "pre-line"
  },
  stepsContainerWhite: {
    display: "grid",
    gridTemplateColumns: "28.125% 28.125% 28.125%",
    fontSize: "16px",
    letterSpacing: "-0.4px",
    color: "white",
    fontWeight: "300",
    whiteSpace: "pre-line"
  },
  stepIndex: {
    fontWeight: "600",
    marginBottom: "50px"
  }
};

export default aboutPage;
