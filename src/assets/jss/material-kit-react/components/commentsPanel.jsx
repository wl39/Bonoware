const commentsPanel = {
  container: {
    color: "#2a2a2a",
    paddingBottom: "70px",
    paddingTop: "80px",
    "@media (max-width: 599px)": {
      paddingTop: "30px",
      paddingBottom: "20px"
    }
  },
  sortPanel: {
    width: "120px",
    color: "#2a2a2a",
    fontSize: "16px",
    lineHeight: "16px",
    display: "flex",
    justifyContent: "space-between",
    letterSpacing: "-0.8px",
    fontWeight: "300",
    transition: "0.3s",
    marginBottom: "20px"
  },
  active: {
    transition: "0.3s",
    fontWeight: "600"
  },
  deactive: {
    transition: "0.3s",
    "&:hover": {
      fontWeight: "500"
    }
  },
  header: {
    fontSize: "16px",
    color: "#2a2a2a",
    padding: "30px 0px",
    borderTop: "1px solid #b7b7b7",
    textAlign: "center",
    lineHeight: "16px",
    letterSpacing: "-0.8px",
    fontWeight: "300"
  },
  addContainer: {
    paddingTop: "10px",
    borderTop: "1px solid #b7b7b7"
  },
  commentsContainer: {
    padding: "10px"
  },
  addCommentsLabel: {
    "&$focused": {
      color: "black"
    }
  },
  focused: {},
  button: {
    left: "calc(100% - 64px)"
  },
  overflowsHidden: {
    overflow: "hidden"
  },
  addComentsUnderLine: {
    "&:after": {
      borderBottomColor: "black"
    }
  }
};

export default commentsPanel;
