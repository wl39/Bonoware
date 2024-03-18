const newReleasesPage = {
  container: {
    display: "flex",
    flexDirection: "column",
    paddingTop: "100px",
    zIndex: "3",
    position: "relative",
    background: "#FFFFFF",
    marginLeft: "auto",
    marginRight: "auto",
    paddingLeft: "15px",
    paddingRight: "15px",
    paddingBottom: "10px",
    width: "100%",
    maxWidth: "1200px",
    "@media (max-width: 992px)": {
      maxWidth: "90%",
      padding: "87px 10px 0px 10px"
    },
    "@media (max-width: 768px)": {
      maxWidth: "100%"
    },
    "@media (max-width: 599px)": {
      maxWidth: "100%",
      paddingTop: "60px",
      paddingLeft: "0",
      paddingRight: "0"
    }
  },
  header: {
    color: "black"
  },
  titleContainer: {
    height: "120px",
    paddingTop: "10px",
    paddingLeft: "5px",
    display: "flex",
    flexDirection: "column"
  },
  title: {
    height: "40px",
    fontSize: "40px",
    lineHeight: "40px",
    letterSpacing: "-5px",
    marginTop: "auto"
  },
  subTitle: {
    fontSize: "12px",
    letterSpacing: "-1px",
    lineHeight: "16px",
    paddingLeft: "5px",
    marginBottom: "auto"
  },
  contentsContainer: {
    display: "flex",
    flexDirection: "row",
    "@media (max-width: 768px)": {
      flexDirection: "column",
      fontSize: "14px"
    }
  }
};

export default newReleasesPage;
