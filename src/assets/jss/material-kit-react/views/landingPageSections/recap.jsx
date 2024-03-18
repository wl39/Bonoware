const recap = {
    container: {
      margin: "30px auto",
      width: "100%",
      position: "relative",
      paddingLeft: "20px",
      "@media (max-width: 576px)": {
        width: "100%",
        paddingLeft: "0px",
      }
    },
    greeting: {
      textAlign: "center",
      borderBottom: "1px solid #eee",
      paddingBottom: "4px"
    },
    infoContainer: {
      margin: "30px 15px",
      border: "1px solid #eee",
      padding: "10px 15px",
    },
    chip: {
      width: "fit-content",
      padding: "2px 5px",
      position: "absolute",
      marginTop: "-30px",
      float: "left",
      display: "flex",
      background: "linear-gradient(60deg, #f50057, #f50057)",
      boxShadow: "0 4px 20px 0px rgba(0, 0, 0, 0.14), 0 7px 10px -5px rgba(233, 30, 99, 0.4)",
      color: "white",
      borderRadius: "8px",
    },
    details: {
      padding: "5px 0px",
    },
    flexContainer: {
        display: "flex",
        justifyContent: "space-between"
    },
    verified: {
      color: "green",
      width: "24px",
      height: "24px",
      paddingTop: "1px"
    },
    notVerified: {
      color: "red",
      width: "24px",
      height: "24px",
      paddingTop: "1px"
    },
    emailVerified: {
      display: "flex"
    },
    phoneVerified: {
      display: "flex"
    },
    emailHover: {
      color: "white",
      position: "relative",
      background: "rgba(0, 0, 0, 0.4)",
      borderRadius: "7px",
      padding: "2px 5px",
      fontSize: "12px",
      lineHeight: "16px",
      width: "160px",
      right: "135px",
      top: "18px"
    },
    phoneHover: {
      color: "white",
      position: "relative",
      background: "rgba(0, 0, 0, 0.4)",
      borderRadius: "7px",
      padding: "2px 5px",
      fontSize: "12px",
      lineHeight: "16px",
      width: "160px",
      right: "135px",
      top: "-6px",
    }
  };
  
  export default recap;
  