const soldModal = {
  paper: {
    background: "white",
    width: "calc(100% - 290px)",
    position: "absolute",
    color: "black",
    top: "220px",
    left: "270px",
    height: "calc(100% - 240px)",
    "@media (max-width: 1200px)": {
      width: "calc(100% - 190px)",
      left: "170px"
    },
    "@media (max-width: 599px)": {
      width: "100%",
      left: "0px",
      top: "150px"
    }
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

export default soldModal;
