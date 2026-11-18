const releaseDatePanel = {
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    minWidth: 0
  },
  tooltipAlert: {
    color: "black",
    fontSize: "1.5rem"
  },
  tooltipButton: {
    overflow: "visible",
    marginRight: "-12px",
    width: "auto",
    height: "auto"
  },
  tooltip: {
    minWidth: "max-content"
  },
  header: {
    position: "absolute",
    marginTop: "-33px !important",
    fontSize: "14px",
    color: "white"
    // "@media (max-width: 576px)": {
    //   position: "relative",
    //   left: "-50%"
    // }
  },
  cardHeader: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: "14px"
  },
  cardHeaderName: {
    textAlign: "center",
    margin: "auto 0px",
    height: "24px",
    fontSize: "24px",
    fontWeight: "500",
    lineHeight: "24px",
    letterSpacing: "-0.6px",
    "@media (max-width: 599px)": {
      fontSize: "18px",
      height: "18px",
      lineHeight: "18px"
    }
  },
  releaseLink: {
    display: "flex",
    color: "black",
    height: "45px",
    width: "150px",
    borderRadius: "22.5px",
    border: "1px solid #ebebeb",
    transition: "0.3s",
    "&:hover": {
      border: "1px solid black",
      fontWeight: "700",
      color: "black"
    },
    "@media (max-width: 992px)": {
      width: "135px",
      height: "45px"
    },
    "@media (max-width: 599px)": {
      width: "100px",
      height: "30px"
    }
  },
  seeAll: {
    margin: "auto",
    textAlign: "center",
    fontSize: "14px",
    "@media (max-width: 599px)": {
      fontSize: "12px"
    }
  },
  rowContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 150px), 1fr))",
    "@media (max-width: 599px)": {
      gridTemplateColumns: "repeat(2, minmax(0, 1fr))"
    }
  },
  itemContainerFirstRow: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    padding: "clamp(10px, 1.25vw, 18px)",
    border: "1px solid #dedede",
    minWidth: 0,
    marginRight: "-1px",
    marginBottom: "-1px"
  },
  headerContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "4px"
  },
  year: {
    fontWeight: 600,
    fontSize: "clamp(13px, 1.2vw, 17px)",
    fontVariantNumeric: "tabular-nums"
  },
  icon: {
    color: "#202020",
    padding: "3px"
  },
  iconFont: { fontSize: "22px" },
  eachLink: {
    display: "grid",
    gridTemplateRows: "auto 1fr auto",
    gridTemplateColumns: "minmax(0, 1fr)",
    minWidth: 0,
    flex: 1,
    gap: "8px",
    color: "#232020 !important",
    textDecoration: "none",
    "&:hover $modelEn, &:focus-visible $modelEn": { textDecoration: "underline" }
  },
  image: {
    width: "100%",
    height: "clamp(80px, 9vw, 138px)",
    objectFit: "contain"
  },
  modelEn: {
    fontSize: "clamp(13px, 1.1vw, 15px)",
    fontWeight: 500,
    lineHeight: 1.45,
    display: "-webkit-box",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical",
    overflow: "hidden"
  },
  modelKr: {
    color: "#595959",
    fontSize: "clamp(12px, 1vw, 14px)",
    marginTop: "3px",
    lineHeight: 1.45,
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis"
  },
  price: {
    color: "#181818",
    fontSize: "clamp(16px, 1.4vw, 18px)",
    lineHeight: 1.4,
    fontWeight: 700,
    fontVariantNumeric: "tabular-nums"
  }
};

export default releaseDatePanel;
