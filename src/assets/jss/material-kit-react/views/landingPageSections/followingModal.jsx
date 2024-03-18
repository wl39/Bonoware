const followingModal = {
  paper: {
    background: "white",
    width: "600px",
    position: "absolute",
    color: "black",
    top: "50%",
    left: "50%",
    padding: "25px 20px",
    height: "360px",
    transform: "translate(-50%, -50%)",
    "@media (max-width: 599px)": {
      width: "100%",
      padding: "15px 5px"
    }
  },
  container: {
    display: "flex"
  },
  image: {
    width: "150px",
    height: "200px",
    objectFit: "contain",
    "@media (max-width: 480px)": {
      width: "100px"
    }
  },
  shoeDetailsContainer: {
    display: "flex",
    flexDirection: "column",
    margin: "auto",
    width: "100%",
    padding: "0px 20px"
  },
  brand: {
    textTransform: "capitalize"
  },
  modelKR: {
    fontWeight: "600",
    height: "24px",
    overflowY: "hidden"
  },
  sizePriceContainer: {
    display: "flex",
    height: "40px",
    justifyContent: "space-between",
    lineHeight: "40px"
  },
  sizePanelContainer: {
    border: "1px solid #b7b7b7",
    height: "35px",
    marginTop: "auto",
    transition: "0.3s",
    width: "55px",
    textAlign: "center",
    lineHeight: "35px",
    position: "relative"
  },
  sizePanelHidden: {
    overflowY: "hidden",
    height: "0px",
    transition: "0.3s",
    position: "absolute",
    top: "34px",
    left: "-1px"
  },
  sizePanelActive: {
    display: "grid",
    height: "150px",
    overflowY: "scroll",
    transition: "0.3s",
    position: "absolute",
    top: "34px",
    left: "-1px",
    zIndex: "5",
    "&::-webkit-scrollbar": {
      width: "2px"
    },

    /* Track */
    "&::-webkit-scrollbar-track": {
      background: "white"
    },

    /* Handle */
    "&::-webkit-scrollbar-thumb": {
      background: "#1b202d"
    }
  },
  sizeArray: {
    height: "35px",
    border: "1px solid #b7b7b7",
    borderTop: "0px",
    width: "55px",
    background: "white"
  },
  buttonContainer: {
    display: "flex",
    margin: "auto 40px 40px",
    justifyContent: "space-between",
    "@media (max-width: 599px)": {
      margin: "auto 15px 40px"
    }
  },
  isFollowed: {
    height: "50px",
    width: "45%",
    borderRadius: "0px",
    color: "white",
    background: "black",
    fontSize: "18px",
    fontWeight: "300",
    "&:hover": {
      color: "black",
      background: "white",
      border: "1px solid black"
    }
  },
  toFollow: {
    height: "50px",
    width: "45%",
    borderRadius: "0px",
    color: "black",
    background: "white",
    fontSize: "18px",
    fontWeight: "300",
    border: "1px solid black",
    "&:hover": {
      color: "white",
      background: "black"
    }
  },
  exit: {
    height: "50px",
    width: "45%",
    borderRadius: "0px",
    color: "black",
    background: "white",
    fontSize: "18px",
    fontWeight: "300",
    border: "1px solid black",
    "&:hover": {
      color: "white",
      background: "black"
    }
  }
};

export default followingModal;
