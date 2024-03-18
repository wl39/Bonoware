const bottomPageStyle = {
  containerContentsShoes: {
    paddingRight: "15px",
    paddingLeft: "15px",
    marginRight: "auto",
    marginLeft: "auto",
    width: "100%",
    "@media (min-width: 768px)": {
      maxWidth: "100"
    },
    "@media (min-width: 1200px)": {
      maxWidth: "100%"
    },
    "@media (max-width: 600px)": {
      maxWidth: "100%",
      paddingRight: "0px",
      paddingLeft: "0px",
      marginRight: "0px",
      marginLeft: "0px"
    }
  },
  containerContents: {
    marginRight: "auto",
    marginLeft: "auto",
    marginBottom: "60px",
    width: "100%",
    "@media (min-width: 768px)": {
      maxWidth: "90%"
    },
    "@media (min-width: 1200px)": {
      maxWidth: "83.333%",
    },
    "@media (max-width: 600px)": {
      maxWidth: "100%",
      paddingRight: "0px",
      paddingLeft: "0px",
      marginRight: "0px",
      marginLeft: "0px",
      marginBottom: "30px",
    }
  },
  panelContainer: {
    padding: "8px",
    maxWidth: "20%",
    flexBasis: "20%",
    border: "1px solid rgba(0, 0, 0, 0.2)",
    borderRadius: "6px",
    margin: "40px 0px",
    boxShadow: "0 1px 4px 0 rgba(0, 0, 0, 0.14)",
    "@media (max-width: 959px)": {
      maxWidth: "100%",
      flexBasis: "100%",
      margin: "0px"
    }
  },
  shoeContainer: {
    padding: "0px",
    maxWidth: "100%",
    flexBasis: "100%",
    "@media (max-width: 959px)": {
      padding: "0px",
      maxWidth: "100%",
      flexBasis: "100%"
    }
  },
  sectionContainer: {
    // marginBottom: "60px",
    "@media (min-width: 1200px)": {
      marginBottom: "170px"
    },
    "@media (min-width: 992px)": {
      marginBottom: "150px"
    },
    "@media (min-width: 768px)": {
      marginBottom: "110px"
    },
    "@media (min-width: 576px)": {
      marginBottom: "50px"
    }
  },
  sectionContainerLast: {
    marginBottom: "50px",
    "@media (max-width: 1200px)": {
      marginBottom: "50px"
    },
    "@media (max-width: 992px)": {
      marginBottom: "50px"
    },
    "@media (max-width: 768px)": {
      marginBottom: "30px"
    },
    "@media (max-width: 576px)": {
      marginBottom: "0px"
    }
  },
  link: {
    display: "flex",
    maxWidth: '700px',
    width: "100%",
    margin: "0px auto",
    "@media (max-width: 768px)": {
      width: "90%",
    },
  },
  buttonLink: {
    width: "100%",
    height: "60px",
    padding: "0px",
    fontSize: "18px",
    fontWeight: "300",
    background: "black",
    color: "#FFFFFF",
    borderRadius: "0px",
    "&:hover": {
      background: "white",
      color: "black",
      border: "1px solid black"
    },
    "@media (max-width: 768px)": {
      height: "50px",
    },
    "@media (max-width: 576px)": {
      height: "30px",
    }
  }
};

export default bottomPageStyle;
