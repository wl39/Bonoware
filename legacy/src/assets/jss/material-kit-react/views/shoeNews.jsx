const shoeNews = {
  container: {
    display: "flex",
    flexDirection: "column",
    paddingTop: "200px",
    zIndex: "3",
    background: "#FFFFFF",
    marginLeft: "auto",
    marginRight: "auto",
    paddingBottom: "10px",
    width: "100%",
    maxWidth: "86.666%",
    "@media (max-width: 992px)": {
      maxWidth: "90%"
    },
    "@media (max-width: 768px)": {
      maxWidth: "90%"
    },
    "@media (max-width: 599px)": {
      maxWidth: "100%",
      paddingTop: "72px",
      paddingLeft: "0",
      paddingRight: "0"
    }
  },
  newsContainer: {
    width: "100%",
    borderBottom: "1px solid #d4d4d4"
  },
  category: {
    height: "100px",
    borderBottom: "1px solid #d4d4d4",
    position: "absolute",
    top: "100px",
    left: "0",
    right: "0",
    width: "100%",
    display: "flex"
  },
  newsHeader: {
    padding: "70px 0px"
  },
  headerCategory: {
    textTransform: "uppercase",
    fontWeight: "300",
    color: "#a2a9af",
    fontSize: "14px",
    height: "10px",
    lineHeight: "10px",
    marginBottom: "30px"
  },
  title: {
    fontSize: "36px",
    lineHeight: "36px",
    letterSpacing: "-1.8px",
    fontWeight: "600",
    color: "#2a2a2a",
    marginBottom: "20px"
  },
  info: {
    display: "flex",
    justifyContent: "space-between",
    width: "320px",
    color: "#010101",
    fontSize: "16px",
    lineHeight: "16px",
    letterSpacing: "0.16px"
  },
  calendar: {
    fontSize: "11px",
    height: "24px",
    paddingTop: "1px"
  },
  people: {
    fontSize: "12px",
    height: "24px",
    paddingTop: "1px"
  },
  date: {
    fontSize: "12px",
    paddingRight: "1px"
  },
  iconContainer: {
    display: "flex"
  },
  view: {
    fontSize: "12px",
    paddingRight: "1px"
  },
  contentsContainer: {
    padding: "5px 15px 0px 15px"
  },
  imgContainer: {
    textAlign: "center",
    height: "800px",
    lineHeight: "800px"
  },
  img: {
    display: "inline-block !important",
    maxHeight: "800px",
    maxWidth: "100%"
  },
  contents: {
    whiteSpace: "pre-wrap",
    paddingTop: "40px",
    paddingBottom: "100px"
  }
};

export default shoeNews;
