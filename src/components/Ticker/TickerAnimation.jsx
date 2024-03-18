import { keyframes } from "styled-components";

const ticker = keyframes`
{
    0% {
      -webkit-transform: translate3d(0, 0, 0);
      transform: translate3d(0, 0, 0);
      visibility: visible;
    }
  
    100% {
      -webkit-transform: translate3d(-100%, 0, 0);
      transform: translate3d(-100%, 0, 0);
    }
  }`;

const tickerStyles = {
  tickerWrap: {
    position: "fixed",
    bottom: "0",
    width: "100%",
    overflow: "hidden",
    height: "2.5rem",
    backgroundColor: "#222222",
    boxLizing: "content-box",
    zIndex: "4",
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
    animationName: ticker,
    animationDuration: "60s",
    "@media (min-width: 768px)": {
      height: "3rem",
      lineHeight: "3rem"
    }
  },
  upTrend: {
    display: "inline-block",
    cursor: "pointer",
    margin: "0 2rem",
    fontSize: "16px",
    fontWeight: "600",
    color: "#4caf50 !important",
    "&:hover": {
      color: "green !important"
    },
    "&:visted": {
      color: "green !important"
    }
  },
  downTrend: {
    display: "inline-block",
    cursor: "pointer",
    margin: "0 2rem",
    fontSize: "16px",
    fontWeight: "600",
    color: "#f44336 !important",
    "&:hover": {
      color: "red !important"
    },
    "&:visted": {
      color: "red !important"
    }
  }
};

export default tickerStyles;
