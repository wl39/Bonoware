const CustomCheckTextStyle = {
  checked: {
    cursor: "pointer",
    width: "45px",
    height: "35px",
    fontSize: "14px",
    fontWeight: "500",
    margin: "auto",
    lineHeight: "32px",
    border: "1px solid black",
    padding: "1px",
    background: "white",
    color: "black"
  },
  unchecked: {
    cursor: "pointer",
    width: "45px",
    height: "35px",
    fontSize: "14px",
    fontWeight: "500",
    margin: "auto",
    lineHeight: "32px",
    border: "1px solid #dbdbdb",
    padding: "1px",
    background: "white",
    color: "#bfbfbf",
    transition: "0.3s",
    "&:hover": {
      color: "#666666",
      border: "1px solid #bfbfbf"
    }
  }
};

export default CustomCheckTextStyle;
