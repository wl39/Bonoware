const priceHistoryModal = {
  paper: {
    background: "white",
    width: "inherit",
    height: "inherit",
    color: "black",
    display: "flex",
    flexDirection: "column"
  },
  modalHeader: {
    background: "#1b202d",
    fontSize: "21px",
    fontWeight: "500",
    textAlign: "center",
    height: "80px",
    lineHeight: "80px",
    color: "white"
  },
  detailText: {
    fontWeight: 300,
    margin: "0px auto"
  },
  priceToChange: {
    fontWeight: 600,
    margin: "10px auto",
    display: "flex"
  },
  priceToChangeHeader: {
    paddingRight: "12px"
  },
  priceHistoryHeader: {
    fontSize: "16px",
    fontWeight: "500",
    color: "#2a2a2a",
    letterSpacing: "-0.8px",
    height: "65px",
    borderBottom: "1px solid #ebebeb",
    lineHeight: "65px",
    position: "relative",
    minHeight: "65px"
  },
  size: {
    position: "absolute",
    left: "10%",
    width: "50px",
    textAlign: "center"
  },
  price: {
    position: "absolute",
    left: "50%",
    right: "50%",
    width: "100px",
    marginLeft: "-50px",
    textAlign: "center"
  },
  stock: {
    width: "50px",
    position: "absolute",
    right: "10%",
    textAlign: "center"
  },
  priceHistoryContainer: {
    display: "grid",
    overflowY: "scroll",
    "&::-webkit-scrollbar": {
      width: "2px"
    },
    "&::-webkit-scrollbar-track": {
      background: "#white"
    },
    "&::-webkit-scrollbar-thumb": {
      background: "#b7b7b7",
      borderRadius: "1.5px"
    },
    "&::-webkit-scrollbar-thumb:hover": {
      background: "#4d4d4d"
    }
  },
  priceHistoryDetail: {
    display: "flex",
    height: "55px",
    lineHeight: "55px",
    fontSize: "16px",
    fontWeight: "600",
    borderBottom: "1px solid #ebebeb",
    color: "black",
    position: "relative"
  },
  editPriceButton: {
    height: "50px",
    width: "300px",
    background: "black",
    color: "white",
    borderRadius: "0px",
    margin: "auto",
    display: "flex",
    "&:hover": {
      color: "black",
      background: "white",
      border: "1px solid black"
    }
  }
};

export default priceHistoryModal;
