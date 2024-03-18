const menu = {
  container: {
    display: "flex",
    flexDirection: "column",
    textAlign: "center"
  },
  label: {
    display: "flex",
    flexDirection: "column"
  },
  row: {
    display: "flex"
  },
  firstRowItem: {
    display: "flex",
    flexDirection: "column",
    borderTop: "1px solid #eee",
    borderRight: "1px solid #eee",
    width: "87px",
    height: "87px",
    lineHeight: "87px",
    padding: "0px"
  },
  secondRowItem: {
    display: "flex",
    flexDirection: "column",
    borderTop: "1px solid #eee",
    borderRight: "1px solid #eee",
    borderBottom: "1px solid #eee",
    width: "87px",
    height: "87px",
    lineHeight: "87px",
    padding: "0px"
  },
  icon: {
    height: "50px",
    width: "50px",
    margin: "auto",
    color: "#232020"
  },
  title: {
    height: "24px",
    lineHeight: "24px"
  },
  link: {
    "&,&:hover,&:focus": {
      backgroundColor: "transparent",
      color: "black",
      boxShadow: "none",
      height: "87px",
      width: "87px",
      display: "flex",
      flexDirection: "column"
    }
  },
  drawer: {
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    width: "100%",
    minWidth: "250px",
    background: "#121621",
    color: "white"
  },
  profileName: {
    height: "200px",
    color: "white !important",
    fontSize: "30px",
    fontWeight: "600",
    background: "#1b202d",
    display: "flex",
    flexDirection: "column",
    marginBottom: "20px"
  },
  accountIcon: {
    margin: "60px auto 10px auto",
    width: "30px",
    height: "30px"
  },
  focused: {
    color: "white !important",
    display: "flex",
    padding: "20px 50px",
    fontSize: "18px",
    fontWeight: "600",
    textAlign: "center",
    transition: "0.3s",
    "&:hover": {
      color: "white  !important"
    }
  },
  drawerContent: {
    color: "#4f5666 !important",
    cursor: "pointer",
    transition: "0.3s",
    height: "60px",
    padding: "20px 50px",
    display: "flex",
    fontSize: "18px",
    "&:hover": {
      color: "#b7b7b7 !important"
    }
    // "&:focus": {
    //   color: "black"
    // },
    // "&:active": {
    //   background: "white"
    // },
  },
  contentIcon: {
    width: "20px",
    height: "20px",
    marginRight: "20px"
  },
  contentText: {
    lineHeight: "18px",
    height: "18px",
    margin: "auto 0px"
  }
};

export default menu;
