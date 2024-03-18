import { container, defaultFont } from "assets/jss/material-kit-react.jsx";

import customCheckboxRadioSwitch from "assets/jss/material-kit-react/customCheckboxRadioSwitch.jsx";

const basicsStyle = {
  root: {
    display: 'flex',
    margin: "100px",
  },
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
  listItem: {
    float: "center",
    color: "inherit",
    position: "relative",
    display: "block",
    width: "auto",
    margin: "0",
    padding: "0",

    width: "100%",

    width: "calc(85% + 3px)",
    content: '""',
    display: "block",
    height: "1px",
    marginLeft: "17px",
    backgroundColor: "#e5e5e5",
    paddingLeft: "0px",


  },
  sections: {
    padding: "70px 0"
  },
  title: {
    minHeight: "32px",
    textDecoration: "none",
    textAlign: "left"
  },
  space50: {
    height: "50px",
    display: "block"
  },
  space70: {
    height: "70px",
    display: "block"
  },
  icons: {
    width: "17px",
    height: "17px",
    color: "#FFFFFF"
  },
  ...customCheckboxRadioSwitch
};

export default basicsStyle;
