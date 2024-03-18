const recap = {
  container: {
    margin: "30px auto",
    width: "100%",
    position: "relative",
    paddingLeft: "20px",
    "@media (max-width: 576px)": {
      width: "100%",
      paddingLeft: "0px"
    }
  },
  greeting: {
    textAlign: "left",
    paddingBottom: "4px"
  },
  sectionHeader: {
    width: "100%",
    padding: "0px 0px 10px 25px",
    marginTop: "15px",
    display: "flex",
    justifyContent: "space-between",
    color: "black"
  },
  headerName: {
    lineHeight: "36px"
  },
  // headerButton: {
  //     padding: "0px"
  // },
  buyingContents: {
    height: "250px",
    textAlign: "center",
    borderLeft: "3px solid red",
    marginBottom: "5px",
    overflowY: "scroll",
    "&::-webkit-scrollbar": {
      width: "5px"
    },

    /* Track */
    "&::-webkit-scrollbar-track": {
      background: "#f1f1f1"
    },

    /* Handle */
    "&::-webkit-scrollbar-thumb": {
      background: "#888",
      borderRadius: "10px"
    },

    /* Handle on hover */
    "&::-webkit-scrollbar-thumb:hover": {
      background: " #555"
    }
  },
  shoeDetails: {
    height: "138px",
    minHeight: "138px",
    display: "flex",
    flexDirection: "column"
  },
  priceContainer: {
    height: "24px",
    minHeight: "24px",
    margin: "auto 0px"
  },
  priceHeader: {
    display: "flex",
    height: "12px",
    lineHeight: "12px",
    fontSize: "12px",
    justifyContent: "space-between"
  },
  sellingContents: {
    height: "250px",
    textAlign: "center",
    borderLeft: "3px solid skyblue",
    marginBottom: "5px",
    overflowY: "scroll",
    "&::-webkit-scrollbar": {
      width: "5px"
    },

    /* Track */
    "&::-webkit-scrollbar-track": {
      background: "#f1f1f1"
    },

    /* Handle */
    "&::-webkit-scrollbar-thumb": {
      background: "#888",
      borderRadius: "10px"
    },

    /* Handle on hover */
    "&::-webkit-scrollbar-thumb:hover": {
      background: " #555"
    }
  },
  contentsCard: {
    width: "95%",
    height: "150px",
    flexDirection: "row",
    display: "flex",
    margin: "5px auto",
    padding: "5px 0px 5px 5px",
    border: "1px solid #eeeeee",
    borderRadius: "10px"
  },
  shoeImage: {
    height: "96px",
    margin: "auto 0px"
  },
  detailHeader: {
    textAlign: "right",
    fontSize: "12px",
    display: "flex",
    flexDirection: "column",
    minWidth: "65px",
    paddingLeft: "10px",
    margin: "auto 0px"
  },
  details: {
    margin: "auto",
    fontSize: "12px",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden"
  },
  chartContents: {
    height: "250px",
    textAlign: "center",
    borderLeft: "3px solid mediumseagreen",
    marginBottom: "5px",
    overflowY: "scroll",
    "&::-webkit-scrollbar": {
      width: "5px"
    },

    /* Track */
    "&::-webkit-scrollbar-track": {
      background: "#f1f1f1"
    },

    /* Handle */
    "&::-webkit-scrollbar-thumb": {
      background: "#888",
      borderRadius: "10px"
    },

    /* Handle on hover */
    "&::-webkit-scrollbar-thumb:hover": {
      background: " #555"
    }
  },
  buyingNull: {
    height: "250px",
    lineHeight: "250px",
    textAlign: "center",
    borderLeft: "3px solid #b1c5c6",
    color: "darkgray",
    marginBottom: "5px"
  },
  sellingNull: {
    height: "250px",
    lineHeight: "250px",
    textAlign: "center",
    borderLeft: "3px solid #c6b1b1",
    color: "darkgray",
    marginBottom: "5px"
  },
  chartNull: {
    height: "250px",
    lineHeight: "250px",
    textAlign: "center",
    borderLeft: "3px solid darkgray",
    color: "darkgray",
    marginBottom: "5px"
  }
};

export default recap;
