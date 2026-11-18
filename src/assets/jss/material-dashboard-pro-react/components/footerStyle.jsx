const link = {
  color: "#c9c9c9 !important",
  textDecoration: "none",
  "&:hover, &:focus-visible": { color: "#fff !important", textDecoration: "underline" }
};

const footerStyle = {
  footer: {
    position: "relative",
    background: "#070707",
    color: "#bdbdbd",
    padding: "clamp(30px, 4vw, 56px) 0 calc(3rem + env(safe-area-inset-bottom))",
    fontSize: "13px",
    lineHeight: 1.6
  },
  footerWhiteFont: { color: "#fff" },
  footerContainer: {
    width: "83.333%",
    margin: "auto",
    "@media (max-width: 1199px)": { width: "90%" }
  },
  firstRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: "16px 24px",
    "@media (max-width: 992px)": {
      flexDirection: "column",
      textAlign: "center"
    }
  },
  call: {
    fontSize: "clamp(24px, 2.4vw, 32px)",
    fontWeight: 700,
    lineHeight: 1.2,
    color: "#e7e7e7"
  },
  listInfo: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "wrap",
    "@media (max-width: 992px)": { order: -1 }
  },
  block: { ...link, display: "block", padding: "2px 10px" },
  infoBorder: { borderRight: "1px solid #535353" },
  list: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "4px 14px"
  },
  listInfoContainer: { display: "flex", gap: "14px" },
  block2: {
    ...link,
    fontSize: "13px",
    fontWeight: 600,
    textTransform: "uppercase",
    whiteSpace: "nowrap"
  },
  secondRow: {
    display: "flex",
    flexWrap: "wrap",
    gap: "8px 32px",
    padding: "20px 0",
    borderBottom: "1px solid #404040",
    "@media (max-width: 992px)": {
      flexDirection: "column",
      textAlign: "center"
    }
  },
  lastRow: {
    display: "flex",
    flexWrap: "wrap",
    gap: "3px 14px",
    paddingTop: "18px",
    fontSize: "12px",
    "@media (max-width: 992px)": {
      justifyContent: "center",
      textAlign: "center"
    }
  },
  company: { ...link, textDecoration: "underline" }
};

export default footerStyle;
