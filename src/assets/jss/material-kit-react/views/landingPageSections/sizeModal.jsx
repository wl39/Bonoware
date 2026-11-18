const sizeModal = {
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
  },
  sizeContainer: {
    overflowY: "scroll",
    display: "grid",
    gridTemplateColumns: "25% 25% 25% 25%",
    gridTemplateRows: "60px 60px 60px 60px 60px 60px",
    gridGap: "20px 0px",
    justifyContent: "space-between",
    padding: "30px",
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
  gridValue: {
    textAlign: "center",
    lineHeight: "58px",
    width: "60px",
    fontSize: "18px",
    fontWeight: "300",
    border: "1px solid #2a2a2a",
    color: "#2a2a2a",
    alignSelf: "center",
    justifySelf: "center",
    "&:hover": {
      fontWeight: "500",
      border: "2px solid black",
      color: "black"
    }
  },
  gridValueActive: {
    textAlign: "center",
    lineHeight: "58px",
    width: "60px",
    fontSize: "18px",
    fontWeight: "600",
    border: "2px solid black",
    color: "black",
    alignSelf: "center",
    justifySelf: "center"
  }
};

export default sizeModal;
