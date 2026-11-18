const tickerStyles = {
  "@keyframes ticker": {"0%": {transform: "translate3d(0, 0, 0)", visibility: "visible"}, "100%": {transform: "translate3d(-100%, 0, 0)"}},
  tickerWrap: {
    position: "fixed",
    bottom: "0",
    width: "100%",
    overflow: "hidden",
    height: "2.5rem",
    backgroundColor: "#222222",
    left: 0,
    boxSizing: "border-box",
    zIndex: "4",
    "@media (max-width: 599px)": {
      position: "relative",
      height: "32px"
    },
    "&:hover $ticker": {
      animationPlayState: "paused"
    }
  },
  ticker: {
    display: "inline-block",
    height: "2.5rem",
    lineHeight: "2.5rem",
    whiteSpace: "nowrap",
    boxSizing: "content-box",
    animationPlayState: "running",
    animationIterationCount: "infinite",
    animationTimingFunction: "linear",
    animationName: "$ticker",
    animationDuration: "60s",
    "@media (max-width: 599px)": { height: "32px", lineHeight: "32px" },
    "@media (prefers-reduced-motion: reduce)": { animation: "none" }
  },
  upTrend: {
    display: "inline-block",
    cursor: "pointer",
    margin: "0 2rem",
    fontSize: "16px",
    fontWeight: "600",
    color: "#7dcf81 !important",
    "&:hover": {
      textDecoration: "underline"
    }
  },
  downTrend: {
    display: "inline-block",
    cursor: "pointer",
    margin: "0 2rem",
    fontSize: "16px",
    fontWeight: "600",
    color: "#ff8278 !important",
    "&:hover": {
      textDecoration: "underline"
    }
  }
};

export default tickerStyles;
