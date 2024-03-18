const resetModal = {
  paper: {
    background: "white",
    width: "600px",
    height: "400px",
    position: "absolute",
    color: "black"
  },
  inputContainer: {
    position: "relative",
    display: "flex",
    padding: "40px 30px"
  },
  inputLabel: {
    width: "100px",
    height: "50px",
    fontSize: "16px",
    letterSpacing: "-0.8px",
    textAlign: "center",
    color: "#2a2a2a",
    lineHeight: "50px",
    margin: "auto 0px",
    position: "absolute",
    top: "40px",
    fontWeight: "500"
  },
  addressInputWrapper: {
    width: "300px",
    margin: "0px auto",
    display: "flex",
    flexDirection: "column",
    height: "170px",
    justifyContent: "space-between",
    "@media (max-width: 992px)": {
      // width: "45%",
      // margin: "0px 20%"
    }
  },
  addressInputContainer: {
    position: "relative"
  },
  focused: {
    border: "2px solid black !important"
  },
  addressSearchButton: {
    position: "absolute",
    top: "40px",
    right: "30px",
    width: "100px",
    height: "50px",
    padding: "0px",
    background: "white",
    color: "black",
    borderRadius: "0px",
    border: "1px solid black",
    fontWeight: "200",
    "@media (max-width: 992px)": {
      left: "72%"
    }
  },
  root: {
    height: "50px",
    transition:
      "border-color 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms,border-width 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms",
    paddingLeft: "10px",
    border: "1px solid #ebebeb",
    "&:hover": {
      border: "1px solid #a2a9af"
    }
  },
  rootDisabled: {
    height: "50px",
    paddingLeft: "10px",
    border: "1px solid #f2f2f2"
  },
  addressAddButton: {
    height: "50px",
    width: "300px",
    background: "black",
    color: "white",
    borderRadius: "0px",
    margin: "auto",
    display: "flex",
    "&:hover": {
      color: "black",
      background: "white",
      border: "1px solid black"
    }
  },
  nameInputContainer: {
    display: "flex",
    marginBottom: "20px"
  },
  accountInputLabel: {
    width: "120px",
    minWidth: "120px",
    marginLeft: "40px",
    textAlign: "left",
    fontWeight: "500",
    letterSpacing: "-0.8px",
    fontSize: "16px",
    height: "50px",
    lineHeight: "50px"
  },
  accountAddButton: {
    height: "50px",
    width: "auto",
    background: "black",
    color: "white",
    borderRadius: "0px",
    marginLeft: "160px",
    marginTop: "30px",
    display: "flex",
    "&:hover": {
      color: "black",
      background: "white",
      border: "1px solid black"
    }
  }
};

export default resetModal;
