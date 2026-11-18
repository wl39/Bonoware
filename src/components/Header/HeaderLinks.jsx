/*eslint-disable*/
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import headerLinksStyle from "assets/jss/material-kit-react/components/headerLinksStyle.jsx";
// core components
// import CustomDropdown from "components/CustomDropdown/CustomDropdown.jsx";
import React from "react";
// react components for routing our app without refresh
import { Link } from "react-router-dom";

class HeaderLinks extends React.Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   anchorEl: null
    // };
  }

  // handleClick = event => {
  //   this.setState({ anchorEl: event.currentTarget });
  // };

  // handleClose = () => {
  //   this.setState({ anchorEl: null });
  // };

  // function HeaderLinks({ ...props }) {
  //   const { classes } = props;
  render() {
    // const { anchorEl } = this.state;
    const { classes } = this.props;

    return (
      // <List >
      //   <ListItem className={classes.listItem}>
      //     <Button
      //       style={{ marginTop: "7px", paddingTop: "7px", paddingBottom: "7px", paddingLeft: "0px", paddingRight: "0px" }}
      //       className={classes.buttonTitle}
      //       onClick={this.handleClick}
      //       aria-owns={anchorEl ? 'simple-menu' : null}
      //     >
      //       판매/구매
      //       </Button>
      //     <Menu
      //       anchorEl={anchorEl}
      //       open={Boolean(anchorEl)}
      //       onClose={this.handleClose}
      //       transformOrigin={{
      //         vertical: this.props.orginprops3,
      //         horizontal: this.props.orginprops4,
      //       }}
      //       placement={"bottom-end"}
      //     >
      <div style={{ height: "50px", display: "flex" }}>
        <Link to="/sell" style={{ display: "flex" }}>
          <div
            className={
              this.props.otherPage ? classes.sellLinkOther : classes.sellLink
            }
          >
            Sell
          </div>
        </Link>
      </div>
      //       <Link to="/products"><MenuItem onClick={this.handleClose}>구매</MenuItem></Link>          </Menu>

      //   </ListItem>
      // </List>
    );
  }
}

export default withStyles(headerLinksStyle)(HeaderLinks);
