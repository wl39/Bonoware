import {
  warningCardHeader,
  successCardHeader,
  dangerCardHeader,
  infoCardHeader,
  primaryCardHeader,
  roseCardHeader,
  grayCardHeader
} from "assets/jss/material-dashboard-pro-react.jsx";
const cardIconStyle = {
  cardIcon: {
    "&$warningCardHeader,&$successCardHeader,&$dangerCardHeader,&$infoCardHeader,&$primaryCardHeader,&$roseCardHeader,&$grayCardHeader": {
      borderRadius: "3px",
      backgroundColor: "#999",
      padding: "5px",
      marginTop: "-23px",
      marginRight: "10px",
      float: "left"
    }
  },
  warningCardHeader,
  successCardHeader,
  dangerCardHeader,
  infoCardHeader,
  primaryCardHeader,
  roseCardHeader,
  grayCardHeader
};

export default cardIconStyle;
