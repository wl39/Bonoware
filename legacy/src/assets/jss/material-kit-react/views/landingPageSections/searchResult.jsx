const searchResult = {
  container: {
    height: "0px",
    textAlign: "center",
    margin: "0px auto"
  },
  results: {
    height: "250px",
    zIndex: "5",
    position: "relative",
    background: "white",
    overflowY: "scroll",
    textAlign: "left",
    border: "1px solid #ebebeb",
    WebkitTransition: "height 0.3s, -webkit-transform 0.3s",
    transition: "height 0.3s, transform 0.3s",
    "&::-webkit-scrollbar": {
      width: "2px"
    },
    "&::-webkit-scrollbar-track": {
      background: "#ebebeb"
    },
    "&::-webkit-scrollbar-thumb": {
      background: "black"
    },
    "&::-webkit-scrollbar-thumb:hover": {
      background: "#bfbfbf"
    },
    top: "-10px"
  },
  itemContainer: {
    borderBottom: "1px solid #ebebeb",
    padding: "10px 5px"
  },
  itemEnglish: {
    fontSize: "16px",
    fontWeight: "bold",
    overflow: "hidden"
  },
  itemKorean: {
    fontSize: "14px",
    fontWeight: "300",
    overflow: "hidden"
  }
};

export default searchResult;
