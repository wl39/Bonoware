const releasesContentsStyle = {
  container: {
    margin: "10px 0px",
    display: "flex",
    flexFlow: "row wrap",
    width: "100%"
  },
  item: {
    width: "25%",
    padding: "0px 8px 16px",
    display: "flex",
    flexDirection: "column",
    "@media (max-width: 992px)": {
      width: "33%"
    },
    "@media (max-width: 768px)": {
      width: "50%"
    },
    "@media (max-width: 599px)": {
      width: "50%",
      padding: "0px 4px 8px"
    }
  },
  dateContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: "5px",
    paddingRight: "5px",
    borderRight: "1px solid #eee",
    borderLeft: "1px solid #eee",
    borderTop: "1px solid #eee"
  },
  date: {
    fontSize: "18px",
    fontWeight: "500",
    paddingLeft: "10px",
    display: "flex"
  },
  calendar: {
    width: "18px",
    height: "24px",
    marginRight: "4px",
    color: "black"
  },
  icon: {
    padding: "0px",
    width: "24px",
    height: "24px",
    color: "black"
  },
  imageContainer: {
    borderLeft: "1px solid #eee",
    borderRight: "1px solid #eee",
    borderBottom: "1px solid #eee",
    padding: "20px 0px"
  },
  img: {
    padding: "0px 5px",
    width: "100%"
  },
  detailsContainer: {
    textAlign: "left",
    background: "white",
    color: "black",
    borderBottom: "1px solid #b7b7b7"
  },
  brand: {
    fontSize: "15px",
    fontWeight: "300",
    marginBottom: "10px"
  },
  model: {
    fontSize: "16px",
    lineHeight: "20px",
    fontWeight: "500",
    height: "40px",
    overflow: "hidden",
    letterSpacing: "-0.5px",
    marginBottom: "15px"
  },
  modelEN: {
    fontWeight: "400",
    height: "20px",
    overflow: "hidden"
  },
  modelKR: {
    fontWeight: "300",
    height: "20px",
    overflow: "hidden"
  },
  priceContainer: {
    paddingBottom: "12px"
  },
  price: {
    fontWeight: "600"
  },
  empty: {
    margin: "auto"
  }
};

export default releasesContentsStyle;
