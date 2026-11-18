const comments = {
  container: {
    fontSize: "14px",
    borderTop: "1px solid #b7b7b7",
    width: "100%",
    position: "relative",
    padding: "20px 0px",
    display: "flex",
    "@media (max-width: 599px)": {
      padding: "10px 0px"
    }
  },
  userIcon: {
    width: "40px",
    height: "40px",
    marginRight: "40px",
    "@media (max-width: 768px)": {
      width: "30px",
      height: "30px",
      marginRight: "20px"
    },
    "@media (max-width: 599px)": {
      width: "30px",
      height: "30px",
      marginRight: "10px",
      marginTop: "4px"
    }
  },
  detailsContainer: {
    height: "40px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    "@media (max-width: 768px)": {
      height: "30px"
    },
    "@media (max-width: 599px)": {
      height: "36px"
    }
  },
  commentsHeader: {
    display: "flex",
    width: "340px",
    justifyContent: "space-between",
    fontSize: "18px",
    lineHeight: "18px",
    "@media (max-width: 768px)": {
      fontSize: "14px",
      lineHeight: "14px",
      width: "250px"
    },
    "@media (max-width: 599px)": {
      flexDirection: "column"
    }
  },
  nickname: {
    width: "150px",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    overflow: "hidden",
    fontWeight: "600",
    "@media (max-width: 768px)": {
      width: "120px"
    },
    "@media (max-width: 599px)": {
      fontSize: "13px",
      letterSpacing: "-0.5px"
    }
  },
  contents: {
    height: "14px",
    fontSize: "14px",
    lineHeight: "14px",
    fontWeight: "300",
    "@media (max-width: 768px)": {
      height: "12px",
      fontSize: "12px",
      lineHeight: "12px"
    }
  },
  date: {
    fontSize: "14px",
    height: "14px",
    lineHeight: "14px",
    width: "180px",
    textAlign: "end",
    borderLeft: "1px solid #2a2a2a",
    margin: "auto 0px",
    fontWeight: "300",
    "@media (max-width: 768px)": {
      fontSize: "12px",
      height: "12px",
      lineHeight: "12px",
      width: "130px"
    },
    "@media (max-width: 599px)": {
      fontSize: "10px",
      height: "10px",
      lineHeight: "10px",
      width: "90px",
      textAlign: "left",
      borderLeft: "0px"
    }
  },
  likeButton: {
    position: "absolute",
    right: "93px",
    top: "0",
    bottom: "0",
    color: "#fe0b31",
    width: "34px",
    height: "34px",
    padding: "5px",
    margin: "auto"
  },
  dislikeButton: {
    position: "absolute",
    right: "28px",
    top: "0",
    bottom: "0",
    color: "black",
    width: "34px",
    height: "34px",
    padding: "5px",
    margin: "auto"
  },
  likeNum: {
    color: "#fe0b31",
    width: "32px",
    position: "absolute",
    top: "0",
    bottom: "0",
    fontSize: "14px",
    lineHeight: "14px",
    height: "14px",
    margin: "auto",
    textAlign: "center",
    right: "63px",
    fontWeight: "300"
  },
  dislikeNum: {
    color: "black",
    width: "32px",
    position: "absolute",
    top: "0",
    bottom: "0",
    fontSize: "14px",
    lineHeight: "14px",
    height: "14px",
    margin: "auto",
    textAlign: "center",
    right: "0",
    fontWeight: "300"
  }
};

export default comments;
