export default {
  container: {
    maxWidth: 1040,
    margin: "120px auto 48px",
    padding: "24px 32px",
    border: "1px solid #dce0e1",
    lineHeight: 1.65,
    "@media (max-width: 1090px)": { marginLeft: 24, marginRight: 24 },
    "@media (max-width: 599px)": {
      margin: "84px 16px 32px",
      padding: "18px 16px",
    },
  },
  title: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    margin: "0 0 18px",
    color: "#202020",
    fontSize: "clamp(22px, 2.5vw, 30px)",
    fontWeight: 650,
    lineHeight: 1.35,
  },
  br: { fontWeight: 700 },
  li: { fontWeight: 300 },
};
