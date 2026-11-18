const sellPage = {
  container: {
    maxWidth: "36.458%",
    margin: "200px auto 240px",
    "@media (max-width: 992px)": {
      maxWidth: "70%"
    },
    "@media (max-width: 599px)": {
      maxWidth: "100%",
      margin: "100px auto 140px"
    }
  },
  indexLeft: {
    position: "absolute",
    fontSize: "300px",
    fontWeight: "bold",
    color: "rgba(42, 42, 42, 0.5)",
    left: "8.333%",
    top: "280px",
    opacity: "0.1",
    lineHeight: "200px",
    "@media (max-width: 992px)": {
      fontSize: "220px",
      top: "130px",
      left: "15%",
      lineHeight: "150px",
      zIndex: "5"
    },
    "@media (max-width: 599px)": {
      fontSize: "130px",
      top: "120px",
      left: "10%",
      lineHeight: "90px",
      zIndex: "5"
    }
  },
  indexRight: {
    position: "absolute",
    fontSize: "300px",
    fontWeight: "bold",
    color: "rgba(42, 42, 42, 0.5)",
    right: "8.333%",
    top: "280px",
    opacity: "0.1",
    lineHeight: "200px",
    "@media (max-width: 992px)": {
      fontSize: "220px",
      top: "130px",
      right: "15%",
      lineHeight: "150px",
      zIndex: "5"
    },
    "@media (max-width: 599px)": {
      fontSize: "130px",
      top: "120px",
      right: "10%",
      lineHeight: "90px",
      zIndex: "5"
    }
  },
  card: {
    display: "inline-block",
    position: "relative",
    width: "100%",
    color: "black",
    background: "#ffffff",
    minHeight: "410px",
    boxShadow: "none",
    border: "0px",
    borderRadius: "0px",
    marginBottom: "70px"
  },
  cardHeader: {
    textAlign: "center"
  },
  title: {
    fontSize: "30px",
    lineHeight: "30px",
    color: "#2a2a2a",
    margin: "0px",
    marginBottom: "70px",
    textAlign: "center",
    fontWeight: "bold"
  },
  disabled: {
    background: "#4d4d4d !important",
    color: "#cccccc !important"
  },
  next: {
    padding: "0px",
    width: "54.143%",
    height: "55px",
    background: "black",
    color: "white",
    borderRadius: "0px",
    display: "flex",
    margin: "auto",
    fontWeight: "300",
    "&:hover": {
      background: "#4d4d4d"
    }
  },
  subtitle: {
    textAlign: "center",
    color: "#2a2a2a",
    fontSize: "21px",
    lineHeight: "21px",
    fontWeight: "bold",
    letterSpacing: "-1.2px",
    margin: "0px",
    paddingBottom: "20px",
    borderBottom: "1px solid #b7b7b7"
  },
  contents: {
    height: "auto",
    marginTop: "40px",
    padding: "0px 20px"
  },
  checker: {
    textAlign: "right"
  }
};

export default sellPage;
