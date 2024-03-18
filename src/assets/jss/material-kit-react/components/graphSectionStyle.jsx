
const graphSectionStyle = theme => ({
  root: {
    flexGrow: 1,

  },
  // imageButton: {
  //   height: "50%",
  //   width: "auto",
  //   "&:hover, &$focusVisible": {
  //     zIndex: 1,
  //     "& $imageBackdrop": {
  //       opacity: 0.15
  //     },
  //     "& $imageMarked": {
  //       opacity: 0
  //     }
  //   }
  // },
  image: {
    height: "250px",
    [theme.breakpoints.down("sm")]: {
      height: "200px",
    }
  },
  paper: {
    textAlign: "center",
    // minHeight: "70px !important",
    height: "120px !important",
    flex: 1,
    boxShadow: "none"

  },
  flex: {
    flex: 1
  },
  imageButton: {
    height: "100%",
    width: "100%",
    paddingBottom: "0px important",
    "&:hover": {
      zIndex: 20,
      // "& $imageBackdrop": {
      //   opacity: 0.15
      // },
      // "& $imageMarked": {
      //   opacity: 0
      // }
    }
  },
  container2: {
    minHeight: "50px",
    alignItems: "center",
    justifyContent: "space-between",
    display: "flex",
    flexWrap: "nowrap",
    paddingBottom: "0px !important",
    paddingTop: "0px !important"
  },
  cardCategory: {
    color: "#999999",
    fontSize: "12px",
    marginBottom: "7px",
    marginTop: "7px",
    margin: "0"
  },
  cardHeader: {
    marginTop: "0px !important"
  },
  h4Font: {
    textAlign: "left",
    color: "#ffffff",
  },
  underChartIcons: {
    width: "12px",
    height: "12px"
  },
  refreshButton: {
    padding: "0px 0px",
    height: "24px"
  },
  refreshIcon: {
    width: "auto",
    height: "12px",
    paddingLeft: "5px"
  }
});

export default graphSectionStyle;