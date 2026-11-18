import { container } from "assets/jss/material-kit-react.jsx";
import image from "assets/img/newsPanel.jpg";
const mainPageStyle = {
  container,
  parallax: {
    // height: "28vh",
    // maxHeight: "400px",
    // overflow: "hidden",
    position: "relative",
    backgroundPosition: "center center",
    backgroundSize: "cover",
    height: "320px",
    margin: "0",
    padding: "0",
    border: "0",
    display: "flex",
    "@media (min-width: 480px)": {
      height: "400px"
    },
    "@media (min-width: 768px)": {
      height: "517px"
    },
    "@media (min-width: 992px)": {
      height: "625px"
    },
    "@media (min-width: 1200px)": {
      height: "750px"
    }
  },
  titleContainer: {
    ...container,
    position: "absolute",
    padding: "0px",
    top: "130px",
    height: "245px",
    left: "0",
    right: "0",
    "@media (min-width: 480px)": {
      maxWidth: "90%"
    },
    "@media (min-width: 768px)": {
      maxWidth: "90%"
    },
    "@media (min-width: 992px)": {
      top: "180px",
      maxWidth: "90%",
      height: "211px"
    },
    "@media (min-width: 1200px)": {
      top: "220px",
      maxWidth: "83.333%"
    }
  },
  brand: {
    color: "#FFFFFF",
    textAlign: "left",
    height: "137px",
    display: "flex",
    flexDirection: "row",
    "@media (min-width: 600px)": {
      height: "105px"
    },
    "@media (min-width: 768px)": {
      height: "115px"
    },
    "@media (min-width: 992px)": {
      height: "115px"
    },
    "@media (min-width: 1200px)": {
      height: "137px"
    }
  },
  gridDummy: {
    padding: "0px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    height: "185px",
    "@media (min-width: 600px)": {
      height: "185px"
    },
    "@media (min-width: 768px)": {
      height: "195px"
    },
    "@media (min-width: 992px)": {
      height: "211px"
    },
    "@media (min-width: 1200px)": {
      height: "251px"
    }
  },
  dotContainer: {
    height: "inherit",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    marginRight: "15px",
    "@media (min-width: 480px)": {
      // top: "400px"
    },
    "@media (min-width: 768px)": {
      // top: "517px"
    },
    "@media (min-width: 992px)": {
      marginRight: "34px"
    },
    "@media (min-width: 1200px)": {
      marginRight: "52px"
    }
  },
  dot: {
    width: "7px",
    height: "7px",
    background: "white",
    borderRadius: "50%",
    display: "none",
    "@media (min-width: 480px)": {
      display: "none"
    },
    "@media (min-width: 768px)": {
      display: "none"
    },
    "@media (min-width: 992px)": {
      width: "5px",
      height: "5px"
    },
    "@media (min-width: 1200px)": {
      width: "7px",
      height: "7px"
    }
  },
  titles: {
    height: "80px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    "@media (min-width: 480px)": {
      height: "80px"
    },
    "@media (min-width: 768px)": {
      height: "115px"
    },
    "@media (min-width: 992px)": {
      height: "115px"
    }
  },
  title: {
    fontSize: "2rem",
    margin: "0px",
    fontWeight: "bold",
    position: "center center",
    textAlign: "left",
    textShadow: "1px 1px 50px #000000",
    fontStyle: "normal",
    fontStretch: "normal",
    lineHeight: "1",
    letterSpacing: "1px",
    "@media (min-width: 600px)": {
      fontSize: "2rem"
    },
    "@media (min-width: 768px)": {
      fontSize: "2.5rem",
      letterSpacing: "-4px"
    },
    "@media (min-width: 992px)": {
      fontSize: "3rem",
      letterSpacing: "-4px"
    },
    "@media (min-width: 1200px)": {
      fontSize: "3rem",
      letterSpacing: "-4px"
    }
  },
  searchContainer: {
    display: "flex",
    flexDirection: "row",
    "@media (min-width: 480px)": {
      // top: "400px"
    },
    "@media (min-width: 768px)": {
      // top: "517px"
    },
    "@media (min-width: 992px)": {
      height: "48px"
    },
    "@media (min-width: 1200px)": {
      height: "80px"
    }
  },
  redDot: {
    width: "7px",
    height: "7px",
    background: "#FE0229",
    borderRadius: "50%",
    position: "absolute",
    bottom: "0",
    display: "none",
    "@media (min-width: 480px)": {
      display: "none"
    },
    "@media (min-width: 768px)": {
      display: "none"
    },
    "@media (min-width: 992px)": {
      width: "5px",
      height: "5px"
    },
    "@media (min-width: 1200px)": {
      width: "7px",
      height: "7px"
    }
  },
  subtitle: {
    fontSize: "1.313rem",
    maxWidth: "500px",
    margin: "10px 0 0"
  },
  main: {
    background: "#FFFFFF",
    position: "relative",
    zIndex: "3"
  },
  mainRaised: {
    margin: "0px 0px 0px",
    borderRadius: "0px",
    boxShadow: "none"
    // boxShadow:
    //     "0 16px 24px 2px rgba(0, 0, 0, 0.14), 0 6px 30px 5px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)"
  },
  link: {
    textDecoration: "none"
  },
  textCenter: {
    textAlign: "center"
  },
  graph: {
    height: "200px"
  },
  textContent: {
    paddingBottom: "0px !important",
    paddingTop: "0px !important",
    display: "right"
  },
  containerContents: {
    paddingRight: "15px",
    paddingLeft: "15px",
    marginRight: "auto",
    marginLeft: "auto",
    width: "100%",
    "@media (min-width: 768px)": {
      maxWidth: "90%"
    },
    "@media (min-width: 1200px)": {
      maxWidth: "80%"
    },
    "@media (max-width: 600px)": {
      maxWidth: "100%",
      paddingRight: "0px",
      paddingLeft: "0px",
      marginRight: "0px",
      marginLeft: "0px"
    }
  },
  containerContentsShoes: {
    paddingRight: "15px",
    paddingLeft: "15px",
    marginRight: "auto",
    marginLeft: "auto",
    width: "100%",
    "@media (min-width: 768px)": {
      maxWidth: "80%"
    },
    "@media (min-width: 1200px)": {
      maxWidth: "70%"
    },
    "@media (max-width: 600px)": {
      maxWidth: "100%",
      paddingRight: "0px",
      paddingLeft: "0px",
      marginRight: "0px",
      marginLeft: "0px"
    }
  },
  gridContainer: {
    display: "flex",
    flexDirection: "row",
    // marginBottom: "60px",
    "@media (max-width: 959px)": {
      flexDirection: "column",
      marginTop: "45px",
      marginBottom: "30px"
    },
    "@media (max-width: 600px)": {
      flexDirection: "column",
      marginTop: "30px",
      marginBottom: "0px"
    }
  },
  backgroundContainerLeft: {
    maxWidth: "50%",
    flexBasis: "50%",
    backgroundImage: "url(" + image + ")",
    backgroundSize: "cover",
    backgroundPosition: "50% 50%",
    "@media (max-width: 959px)": {
      maxWidth: "100%",
      flexBasis: "100%"
    }
  },
  backgroundBlack: {
    background: "black",
    opacity: "0.8"
  },
  backgroundContainerRight: {
    maxWidth: "50%",
    flexBasis: "50%",
    background: "white",
    boxShadow: "0 0 9px 1px rgba(4, 0, 0, 0.1)",
    "@media (max-width: 959px)": {
      maxWidth: "100%",
      flexBasis: "100%"
    }
  },
  newsContainer: {
    padding: "38px 100px 48px 0px",
    maxWidth: "83.33%",
    height: "794px",
    marginLeft: "auto",
    color: "white",
    "@media (max-width: 1199px)": {
      maxWidth: "90%"
    },
    "@media (max-width: 992px)": {
      maxWidth: "90%",
      flexBasis: "90%",
      margin: "auto",
      padding: "30px 0px"
    },
    "@media (max-width: 768px)": {
      maxWidth: "90%",
      flexBasis: "100%",
      margin: "auto",
      padding: "10px 0px",
      height: "450px"
    }
  },
  releaseDateContainer: {
    height: "794px",
    maxWidth: "83.33%",
    marginRight: "auto",
    padding: "38px 0px 48px 48px",
    marginLeft: "3px",
    "@media (max-width: 1199px)": {
      maxWidth: "90%"
    },
    "@media (max-width: 992px)": {
      maxWidth: "90%",
      flexBasis: "90%",
      margin: "auto",
      padding: "30px 0px",
      height: "100%"
    },
    "@media (max-width: 768px)": {
      maxWidth: "90%",
      flexBasis: "100%",
      margin: "auto",
      padding: "10px 0px",
      height: "100%"
    }
  }
};

export default mainPageStyle;
