import { container } from "assets/jss/material-kit-react.jsx";
import {
  tooltip,
  cardTitle
} from "assets/jss/material-dashboard-pro-react.jsx";

import hoverCardStyle from "assets/jss/material-dashboard-pro-react/hoverCardStyle.jsx";

const carouselStyle = {
  ...hoverCardStyle,
  tooltip,
  cardTitle: {
    ...cardTitle,
    marginTop: "0px",
    marginBottom: "3px"
  },
  cardIconTitle: {
    ...cardTitle,
    marginTop: "15px",
    marginBottom: "0px"
  },
  cardProductTitle: {
    ...cardTitle,
    color: "#ffffff !important",
    marginTop: "0px",
    marginBottom: "3px",
    textAlign: "center"
  },
  cardCategory: {
    color: "#999999",
    fontSize: "12px",
    marginBottom: "7px",
    marginTop: "7px",
    margin: "0"
  },
  cardProductDesciprion: {
    textAlign: "center",
    color: "#999999"
  },
  container,
  marginAuto: {
    marginLeft: "auto !important",
    marginRight: "auto !important",
    paddingBottom: "20px !important"
  },
  paper: {
    textAlign: "center",
    width: "100%",
    minWidth: 0
  },
  flex: {
    flex: 1
  },
  imageButton: {
    height: "100%",
    width: "100%",
    color: "black",
    paddingBottom: "0px important",
    "&:hover": {
      zIndex: 20
      // "& $imageBackdrop": {
      //   opacity: 0.15
      // },
      // "& $imageMarked": {
      //   opacity: 0
      // }
    }
  },
  container2_0: {
    alignItems: "center",
    justifyContent: "space-between",
    display: "flex",
    flexWrap: "nowrap",
    padding: "0px 10px"
  },

  image: {
    display: "block",
    width: "100%",
    aspectRatio: "1.25",
    objectFit: "contain",
    padding: "clamp(8px, 1.5vw, 20px) 8px",
    border: "1px solid #e2e2e2",
    background: "#fff"
  },
  zDexButton: {
    zIndex: 4,
    fontSize: "flex"
  },
  tooltipButton: {
    overflow: "visible",
    marginRight: "-12px",
    width: "auto",
    height: "auto"
  },
  tooltipAlert: {
    color: "black",
    fontSize: "30px",
    "@media (max-width: 599px)": {
      fontSize: "20px"
    }
  },
  popper: {
    // transform: "translate3d(148px, -20px, 0px)"
  },
  tooltipText: {
    color: "black",
    backgroundColor: "white",
    fontSize: "14px",
    maxWidth: "410px",
    boxShadow: "0 0 9px 1px rgba(4, 0, 0, 0.1)"
  },
  text: {
    "@media (max-width: 600px)": {
      fontSize: "1.2em",
      fontWeight: "400",
      lineHeight: "17px"
    }
  },
  button: {
    display: "block",
    width: "clamp(126px, 22vw, 225px)",
    minWidth: 0,
    padding: 0
  },
  link: {
    color: "black !important",
    display: "flex",
    width: "100%"
  },
  seeAll: {
    marginRight: "-16px",
    marginTop: "0px",
    boxShadow: "none",
    display: "flex",
    height: "45px",
    width: "150px",
    padding: "0px",
    borderRadius: "22.5px",
    background: "white",
    color: "black !important",
    border: "1px solid #ebebeb",
    transition: "0.3s",
    zIndex: "5",
    "&:hover": {
      border: "1px solid black",
      color: "black !important",
      fontWeight: "600"
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
  buttonBase: {
    position: "absolute",
    width: "fit-content",
    height: "30px",
    right: "0px",
    top: "-18px",
    zIndex: "5",
    "@media (max-width: 599px)": {
      top: "-10px",
      height: "20px"
    }
  },

  // buttonBase: {
  //   position: "absolute",
  //   width: "fit-content",
  //   height: "30px",
  //   right: "0px",
  //   top: "-5px",
  //   zIndex: "5",
  //   "@media (max-width: 599px)": {
  //     top: "-10px",
  //     height: "20px"
  //   }
  // },

  seeAllText: {
    textAlign: "center",
    margin: "auto",
    fontSize: "14px",
    "@media (max-width: 599px)": {
      fontSize: "12px"
    }
  },
  cardHeader: {
    "@media (max-width: 599px)": {
      height: "0px !important"
    }
  },
  card: {
    paddingBottom: "6px",
    minHeight: "212px",
    border: "0",
    boxShadow: "none",
    "@media (max-width: 959px)": {
      height: "100%",
      padding: "0px 10px"
    }
  },
  sectionHeading: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "12px",
    marginBottom: "12px"
  },
  headingLabel: { display: "flex", alignItems: "center" },
  sectionLink: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    border: "1px solid #d9d9d9",
    borderRadius: "24px",
    color: "#232020 !important",
    fontWeight: 500,
    height: "36px",
    padding: "0 22px",
    fontSize: "14px",
    "&:hover, &:focus-visible": { borderColor: "#232020" },
    "@media (max-width: 599px)": {
      fontSize: "12px",
      height: "30px",
      padding: "0 18px"
    }
  },
  headerName: {
    fontSize: "22px",
    fontWeight: 700,
    letterSpacing: "-.6px",
    lineHeight: 1.3,
    color: "#171717",
    margin: 0,
    marginRight: "15px",
    "@media (max-width: 599px)": {
      fontSize: "20px",
      marginRight: "5px"
    }
  },
  tooltipIcon: {
    padding: 0,
    height: "30px",
    width: "30px",
    "@media (max-width: 599px)": {
      height: "20px",
      width: "20px"
    }
  },
  slider: {
    margin: "auto 0px"
  },
  priceContainer: {
    margin: "12px 0 9px",
    textAlign: "left",
    color: "#171717",
    lineHeight: 1.4
  },
  priceHeader: {
    color: "#626262",
    fontSize: "12px",
    fontWeight: 400
  },
  price: {
    fontFamily: "'Roboto', sans-serif",
    fontVariantNumeric: "tabular-nums",
    fontWeight: 700,
    fontSize: "clamp(16px, 1.4vw, 18px)"
  },
  shoeDetail: {
    display: "flex",
    flexDirection: "column",
    gap: "3px",
    textAlign: "left",
    paddingBottom: "12px",
    borderBottom: "1px solid #d8d8d8"
  },
  brand: {
    fontSize: "16px",
    height: "16px",
    letterSpacing: "-0.8px",
    fontWeight: "bold",
    color: "#2a2a2a"
  },
  shoeName: {
    color: "#595959",
    fontSize: "clamp(12px, 1vw, 14px)",
    lineHeight: 1.5,
    fontWeight: 400,
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis"
  },
  shoeNameEnglish: {
    color: "#202020",
    fontSize: "clamp(13px, 1.1vw, 15px)",
    lineHeight: 1.5,
    fontWeight: 500,
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis"
  }
};

export default carouselStyle;
