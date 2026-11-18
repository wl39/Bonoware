import { defaultFont } from "assets/jss/material-kit-react.jsx";

import tooltip from "assets/jss/material-kit-react/tooltipsStyle.jsx";

const headerLinksStyle = theme => ({
  list: {
    ...defaultFont,
    fontSize: "14px",
    margin: 0,
    paddingLeft: "0px",
    listStyle: "none",
    paddingTop: "0",
    paddingBottom: "0",
    color: "inherit"
  },
  leftSearchBox: {
    ...defaultFont,
    fontSize: "50px",
    margin: 0,
    // paddingLeft: "90px",
    // paddingRight: "90px",
    // flex: 1,
    listStyle: "none",
    paddingTop: "0",
    paddingBottom: "0",
    color: "inherit",
    [theme.breakpoints.down("sm")]: {
      // width: "130%",
      // paddingLeft: "15px",
      // paddirngRight: "0px",
      // flex: 1,
    }
  },
  navigation: {
    backgroundPosition: 0,
    backgroundSize: "cover",
    marginTop: "0",
    minHeight: "740px"
  },
  searchIcon: {
    ...defaultFont,
    // marginTop: "8px",
    marginBottom: "-8px !important",
    marginLeft: "0px",
    fontSize: "24px",
    color: "inherit !important",
    marginRight: "-2px !important"
  },

  listItem: {
    float: "center",
    color: "inherit",
    position: "relative",
    display: "block",
    width: "auto",
    margin: "0",
    padding: "0"
    // [theme.breakpoints.down("sm")]: {
    //   width: "100%",
    //   "&:after": {
    //     width: "calc(85% + 3px)",
    //     content: '""',
    //     display: "block",
    //     height: "1px",
    //     marginLeft: "17px",
    //     backgroundColor: "#e5e5e5",
    //     paddingLeft: "0px",
    //   }
    // }
  },
  listItemText: {
    padding: "0 !important"
  },
  navLink: {
    color: "inherit",
    position: "relative",
    padding: "0.9375rem",
    fontWeight: "400",
    fontSize: "15px",
    textTransform: "uppercase",
    borderRadius: "3px",
    lineHeight: "20px",
    textDecoration: "none",
    margin: "0px",
    display: "inline-flex",
    "&:hover,&:focus": {
      color: "inherit",
      background: "rgba(200, 200, 200, 0.2)"
    },
    [theme.breakpoints.down("sm")]: {
      width: "calc(100% - 30px)",
      marginLeft: "15px",
      marginBottom: "8px",
      marginTop: "8px",
      textAlign: "left",
      "& > span:first-child": {
        justifyContent: "flex-start"
      }
    }
  },
  sellLink: {
    height: "18px",
    fontSize: "18px",
    lineHeight: "1",
    fontWeight: "500",
    color: "#fe0229",
    margin: "auto",
    "@media (max-width: 992px)": {
      fontSize: "14px",
      height: "14px"
    }
  },
  sellLinkOther: {
    height: "16px",
    fontSize: "16px",
    lineHeight: "1",
    fontWeight: "500",
    color: "#fe0229",
    margin: "auto",
    "@media (max-width: 992px)": {
      fontSize: "14px",
      height: "14px"
    }
  },
  notificationNavLink: {
    color: "inherit",
    padding: "0.9375rem",
    fontWeight: "400",
    fontSize: "12px",
    textTransform: "uppercase",
    lineHeight: "20px",
    textDecoration: "none",
    margin: "0px",
    display: "inline-flex",
    top: "4px"
  },
  registerNavLink: {
    top: "3px",
    position: "relative",
    fontWeight: "400",
    fontSize: "12px",
    textTransform: "uppercase",
    lineHeight: "20px",
    textDecoration: "none",
    margin: "0px",
    display: "inline-flex"
  },
  navLinkActive: {
    color: "inherit",
    backgroundColor: "rgba(255, 255, 255, 0.1)"
  },
  icons: {
    width: "20px",
    height: "20px",
    marginRight: "3px"
  },
  socialIcons: {
    position: "relative",
    fontSize: "20px !important",
    marginRight: "4px"
  },
  dropdownLink: {
    "&,&:hover,&:focus": {
      color: "inherit",
      textDecoration: "none",
      display: "block",
      padding: "10px 20px"
    }
  },
  ...tooltip,
  marginRight5: {
    marginRight: "5px"
  },
  paper: {
    position: "absolute",
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    square: false
  },

  buttonTitle: {
    lineHeight: "34px",
    minWidth: "80px",
    paddingLeft: "0px",
    paddingRight: "0px",
    borderRadius: "3px",
    textTransform: "none",
    textAlign: "center",
    color: "inherit",
    fontSize: "14px",
    fontWeight: "5",
    backgroundColor: "inherit",
    boxShadow: "none",
    "&:hover,&:focus": {
      color: "inherit",
      background: "rgba(200, 200, 200, 0.2)"
    },
    [theme.breakpoints.down("xs")]: {
      width: "calc(100% - 30px)",
      marginLeft: "15px",
      marginBottom: "8px",
      marginTop: "8px",
      textAlign: "left",
      boxShadow:
        "0 2px 2px 0 rgba(153, 153, 153, 0.14), 0 3px 1px -2px rgba(153, 153, 153, 0.2), 0 1px 5px 0 rgba(153, 153, 153, 0.12)"
      // "& > span:first-child": {
      //   justifyContent: "flex-start"
      // }
    }
  }
});

export default headerLinksStyle;
