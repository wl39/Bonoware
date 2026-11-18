const bottomPageStyle = {
  containerContents: {
    width: "90%",
    margin: "0 auto",
    padding: "clamp(24px, 3vw, 44px) 0 clamp(32px, 4vw, 60px)",
    "@media (min-width: 1200px)": { width: "83.333%" },
    "@media (max-width: 599px)": { width: "calc(100% - 32px)" },
  },
  shoeContainer: {
    display: "grid",
    gridTemplateColumns: "minmax(0, 1fr)",
    gap: "clamp(28px, 3.6vw, 56px)",
    "& > *": { margin: 0, padding: 0 },
  },
  link: {
    display: "flex",
    justifyContent: "center",
    maxWidth: "700px",
    margin: "clamp(24px, 3vw, 40px) auto 0",
  },
  buttonLink: {
    width: "100%",
    height: "60px",
    padding: "0px",
    fontSize: "18px",
    fontWeight: "300",
    background: "black",
    color: "#FFFFFF",
    borderRadius: "0px",
    "&:hover": {
      background: "white",
      color: "black",
      border: "1px solid black",
    },
    "@media (max-width: 768px)": {
      height: "50px",
    },
    "@media (max-width: 576px)": {
      height: "30px",
    },
  },
};

export default bottomPageStyle;
