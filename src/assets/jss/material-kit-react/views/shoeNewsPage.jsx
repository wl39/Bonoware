const shoeNewsPage = {
  container: {
    display: "flex",
    flexDirection: "column",
    paddingTop: "200px",
    position: "relative",
    background: "#FFFFFF",
    marginLeft: "auto",
    marginRight: "auto",
    paddingBottom: "10px",
    width: "100%",
    maxWidth: "86.666%",
    "@media (max-width: 1199px)": {
      maxWidth: "90%",
      paddingTop: "150px"
    },
    "@media (max-width: 992px)": {
      maxWidth: "90%",
      paddingTop: "150px"
    },
    "@media (max-width: 768px)": {
      maxWidth: "90%",
      paddingTop: "150px"
    },
    "@media (max-width: 599px)": {
      maxWidth: "100%",
      paddingTop: "72px",
      paddingLeft: "0",
      paddingRight: "0"
    }
  },

  headlineContainer: {
    display: "flex",
    flexDirection: "row",
    marginBottom: "100px",
    "@media (max-width: 1199px)": {
      flexDirection: "column",
      padding: "0px 10px"
    }
  },
  headlineLeft: {
    width: "50%",
    display: "flex",
    flexDirection: "row",
    paddingRight: "35px",
    "@media (max-width: 1199px)": {
      width: "100%",
      paddingRight: "0px",
      marginBottom: "40px"
    }
  },
  headlineImageContainer: {
    width: "30vw",
    height: "570px",
    border: "1px solid #b7b7b7",
    "@media (max-width: 1199px)": {
      width: "50vw"
    }
  },
  headlineImage: {
    height: "568px",
    objectFit: "cover",
    width: "100%",
    margin: "auto"
  },
  headlineTitleHeader: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    justifyContent: "space-between",
    position: "relative",
    width: "50%",
    color: "#2a2a2a"
  },
  headlineTitleContainer: {
    height: "52px",
    fontWeight: "bold",
    display: "flex",
    position: "absolute",
    top: "130px",
    color: "#2a2a2a"
  },
  headlineIndex: {
    fontSize: "16px",
    lineHeight: "52px",
    paddingRight: "20px",
    fontWeight: "900"
  },
  headlineTitle: {
    lineHeight: "50px",
    fontSize: "52px",
    fontWeight: "700",
    whiteSpace: "nowrap",
    maxWidth: "30vw",
    overflow: "hidden",
    textShadow: "1px 1px 4px white",
    "@media (max-width: 1199px)": {
      maxWidth: "50vw"
    },
    "@media (max-width: 599px)": {
      maxWidth: "90vw"
    }
  },
  headlineDetailsContainer: {
    display: "flex",
    flexDirection: "row",
    height: "18px",
    lineHeight: "16px",
    fontSize: "16px",
    position: "absolute",
    bottom: "0",
    width: "15vw",
    justifyContent: "space-between",
    color: "#010101",
    "@media (max-width: 1899px)": {
      flexDirection: "column",
      height: "40px"
    },
    "@media (max-width: 1199px)": {
      flexDirection: "row",
      height: "18px",
      bottom: "-570px",
      width: "40vw"
    },
    "@media (max-width: 768px)": {
      flexDirection: "column",
      height: "40px"
    }
  },
  headlineDetailsLeft: {
    letterSpacing: "-0.2px",
    "@media (max-width: 1899px)": {
      letterSpacing: "-1px"
    },
    "@media (max-width: 1199px)": {
      letterSpacing: "0px"
    }
  },
  unknown: {
    position: "absolute",
    top: "250px",
    width: "15vw",
    "@media (max-width: 1199px)": {
      width: "40vw"
    }
  },
  headlineButton: {
    minHeight: "24px",
    padding: "6px 0px"
  },
  headlineContent: {
    height: "2rem",
    lineHeight: "1rem",
    overflow: "hidden",
    marginTop: "6px",
    WebkitLineClamp: "2",
    display: "block",
    display: "-webkit-box",
    WebkitBoxOrient: "vertical"
  },
  headlineRight: {
    width: "50%",
    display: "flex",
    flexDirection: "row",
    paddingLeft: "35px",
    "@media (max-width: 1199px)": {
      width: "100%",
      paddingLeft: "0px"
    }
  },
  subHeadlinesContainer: {
    display: "flex",
    flex: "1",
    maxnHeight: "192px",
    paddingLeft: "5px",
    paddingTop: "5px",
    borderBottom: "1px solid #eee"
  },
  subHeadlineLast: {
    borderBottom: "0px"
  },
  subHeadlineContainer: {
    display: "flex",
    flexDirection: "row"
  },
  subHeadlineImageContainer: {
    height: "180px",
    width: "180px"
  },
  subHeadlineImage: {
    height: "180px",
    objectFit: "contain",
    width: "180px",
    margin: "auto"
  },
  subInfoConatiner: {
    display: "flex",
    flexDirection: "column",
    margin: "0px 8px",
    justifyContent: "space-between"
  },
  subTitleHeader: {
    display: "flex",
    justifyContent: "space-between"
  },
  subTitle: {
    overflow: "hidden",
    height: "48px",
    lineHeight: "24px",
    fontSize: "24px"
  },
  subDetailsContainer: {
    display: "flex",
    flexDirection: "row",
    height: "12px",
    lineHeight: "12px",
    fontSize: "12px",
    justifyContent: "space-between",
    marginBottom: "5px"
  },
  subContent: {
    height: "112px",
    fontSize: "14px",
    lineHeight: "22px",
    paddingBottom: "4px",
    overflow: "hidden",
    WebkitLineClamp: "5",
    display: "block",
    display: "-webkit-box",
    WebkitBoxOrient: "vertical"
  },
  newsTypeContainer: {
    display: "flex",
    flexDirection: "row",
    textTransform: "uppercase",
    margin: "auto",
    marginBottom: "40px",
    justifyContent: "space-between",
    width: "520px",
    "@media (max-width: 599px)": {
      width: "100%",
      padding: "0px 20px",
      marginBottom: "20px"
    }
  },
  newsCardContainer: {
    display: "grid",
    gridTemplateColumns: "25% 25% 25% 25%",
    gridTemplateRows: "650px 650px",
    color: "#2a2a2a",
    marginBottom: "50px",
    "@media (max-width: 1600px)": {
      gridTemplateRows: "630px 630px"
    },
    "@media (max-width: 1400px)": {
      gridTemplateRows: "590px 590px"
    },
    "@media (max-width: 1199px)": {
      gridTemplateRows: "550px 550px",
      gridTemplateColumns: "33.33% 33.33% 33.33%"
    },
    "@media (max-width: 959px)": {
      gridTemplateRows: "520px 520px",
      gridTemplateColumns: "33.33% 33.33% 33.33%"
    },
    "@media (max-width: 599px)": {
      gridTemplateRows: "520px 520px 520px",
      gridTemplateColumns: "50% 50%"
    },
    "@media (max-width: 499px)": {
      gridTemplateRows: "390px 390px 390px"
    }
  },
  newsCard: {
    padding: "0px 10px",
    color: "#2a2a2a",
    cursor: "pointer",
    "&:hover": {
      color: "#2a2a2a"
    }
  },
  newsCardImg: {
    width: "100%",
    height: "430px",
    objectFit: "contain",
    marginBottom: "20px",
    "@media (max-width: 1600px)": {
      height: "410px"
    },
    "@media (max-width: 1400px)": {
      height: "370px"
    },
    "@media (max-width: 1199px)": {
      height: "350px"
    },
    "@media (max-width: 959px)": {
      height: "320px"
    },
    "@media (max-width: 499px)": {
      height: "220px"
    }
  },
  category: {
    fontSize: "14px",
    height: "10px",
    lineHeight: "10px",
    color: "#a2a9af",
    marginBottom: "15px",
    letterSpacing: "0.14px",
    fontWeight: "300"
  },
  newsCardTitle: {
    height: "60px",
    lineHeight: "30px",
    fontSize: "21px",
    fontWeight: "600",
    letterSpacing: "-1.05px",
    "@media (max-width: 992px)": {
      fontSize: "18px",
      lineHeight: "24px",
      height: "52px"
    }
  },
  newsCardDetailsContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    fontSize: "16px",
    lineHeight: "16px",
    marginTop: "25px",
    color: "#010101",
    letterSpacing: "0.16px",
    "@media (max-width: 1199px)": {
      height: "40px",
      flexDirection: "column"
    },
    "@media (max-width: 992px)": {
      fontSize: "14px",
      lineHeight: "14px",
      height: "36px"
    }
  }
};

export default shoeNewsPage;
