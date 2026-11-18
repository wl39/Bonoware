const editPriceModal = {
  paper: {
    background: "white",
    width: "600px",
    height: "400px",
    position: "absolute",
    color: "black"
  },
  modalHeader: {
    margin: "0px auto",
    fontSize: "26px",
    fontWeight: "600",
    paddingBottom: "30px"
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

export default editPriceModal;
