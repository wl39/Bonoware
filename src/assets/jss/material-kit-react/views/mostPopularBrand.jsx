const mostPopularBrand = {
  container: {
    marginTop: "25px",
    marginBottom: "20px",
    "@media (max-width: 992px)": {
      marginTop: "40px",
      marginBottom: "40px"
    },
    "@media (max-width: 768px)": {
      marginTop: "15px",
      marginBottom: "10px",
      padding: "0px 10px"
    },
    "@media (max-width: 576px)": {
      marginTop: "15px",
      marginBottom: "10px",
      padding: "0px 10px"
    }
  },
  title: {
    fontSize: "22px",
    fontWeight: "bold",
    lineHeight: "23px",
    color: 'black',
    letterSpacing: "-0.6px",
    textAlign: "left",
    marginBottom: "25px",
    "@media (max-width: 599px)": {
      fontSize: "20px",
      marginRight: "5px",
      marginBottom: "10px",
    }
  },
  brandContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
    gap: "14px",
    "@media (max-width: 599px)": {
      gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
      gap: "12px"
    }
  },
  brandCard: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "clamp(12px, 2vw, 28px) 12px 6px",
    background: "white",
    boxShadow: "0 1px 8px rgba(0, 0, 0, .12)",
    transition: "box-shadow 150ms ease",
    "&:hover, &:focus-visible": {
      boxShadow: "0 2px 12px rgba(0, 0, 0, .22)"
    }
  },
  shoeImg: {
    width: "100%",
    aspectRatio: "7 / 5",
    objectFit: "contain"
  },
  brandImg: {
    objectFit: "contain",
    aspectRatio: "7 / 5",
    margin: "0px auto",
    width: "30%"
  }
};

export default mostPopularBrand;
