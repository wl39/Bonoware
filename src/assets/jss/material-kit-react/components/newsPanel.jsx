const newsPanel = {
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
  },
  newsContainer: {
    display: "flex",
    flexDirection: "column"
  },
  container: {
    borderBottom: "1px solid rgba(255,255,255,.32)"
  },
  mainInfo: {
    display: "flex",
    alignItems: "baseline",
    justifyContent: "space-between",
    gap: "8px"
  },
  title: {
    fontWeight: 600,
    fontSize: "15px",
    lineHeight: 1.5,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap"
  },
  details: {
    color: "#d0d0d0",
    fontSize: "13px",
    fontWeight: 400,
    lineHeight: 1.5
  },
  viewValue: {
    flexShrink: 0,
    color: "#d0d0d0",
    fontSize: "12px",
    fontVariantNumeric: "tabular-nums"
  },
  link: {
    display: "grid",
    gap: "4px",
    padding: "clamp(12px, 1.4vw, 20px) 0",
    color: "white !important",
    "&:hover $title, &:focus-visible $title": { textDecoration: "underline" }
  },
  cardHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    paddingBottom: "14px",
    borderBottom: "1px solid rgba(255,255,255,.5)"
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
  newsLink: {
    display: "flex",
    color: "#bfbfbf",
    height: "45px",
    width: "150px",
    borderRadius: "22.5px",
    border: "1px solid #bfbfbf",
    transition: "0.3s",
    "&:hover": {
      border: "1px solid white",
      fontWeight: "700",
      color: "white"
    },
    "@media (max-width: 992px)": {
      width: "135px",
      height: "45px"
    },
    "@media (max-width: 599px)": {
      width: "100px",
      height: "30px"
    },
  },
  seeAll: {
    margin: "auto",
    textAlign: "center",
    fontSize: "14px",
    "@media (max-width: 599px)": {
      fontSize: "12px"
    }
  }
};

export default newsPanel;
