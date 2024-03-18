import AppBar from "@material-ui/core/AppBar";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Toolbar from "@material-ui/core/Toolbar";
import { Search } from "@material-ui/icons";
import CancelIcon from "@material-ui/icons/Cancel";
// @material-ui/icons
import MenuIcon from "@material-ui/icons/Menu";
import blackLogo from "assets/img/probelogo5.png";
import whiteLogo from "assets/img/probelogo6.png";
// core components
import headerStyle from "assets/jss/material-kit-react/components/headerStyle.jsx";
// nodejs library that concatenates classes
import classNames from "classnames";
import CustomButton from "components/CustomButtons/Button.jsx";
import HeaderLinks from "components/Header/HeaderLinks.jsx";
import MobileHeaderLink from "components/Header/MobileHeaderLink.jsx";
import CustomSearchHeader from "components/CustomSearch/CustomSearchHeader.jsx";

import AccountModal from "components/Modal/Modal.jsx";
import SearchBar from "components/SearchBar/SearchBar";
import Aux from "hoc/Aux_/Aux_";
// nodejs library to set properties for components
import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";

let lim, josh, headerScroll;

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mobileOpen: false,
      logo: whiteLogo,
      logoWhite: whiteLogo,
      logoblack: blackLogo,
      open: false
    };
    this.handleDrawerToggle = this.handleDrawerToggle.bind(this);
    this.headerColorChange = this.headerColorChange.bind(this);
  }
  handleDrawerToggle() {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  }

  componentDidMount() {
    if (this.props.changeColorOnScroll) {
      window.addEventListener("scroll", this.headerColorChange);
    }
  }

  openSearchBox = () => {
    this.setState(prevState => ({
      open: !prevState.open
    }));
    window.pageYOffset > 100 ? this.searchDown() : this.searchTop();
  };

  closeSearchBox = () => {
    this.setState({
      open: false
    });
  };

  searchDown = () => {
    const { classes } = this.props;
    lim = classes.scrollDown;
    josh = classes.testDown;
    headerScroll = classes.headerSearchDown;
  };

  searchTop = () => {
    const { classes } = this.props;
    lim = classes.scrollTop;
    josh = classes.testTop;
    headerScroll = classes.headerSearchTop;
  };

  changeLogo = () => {
    this.setState({
      logo: this.state.logoblack
    });
  };

  changeLogo2 = () => {
    this.setState({
      logo: this.state.logoWhite
    });
  };

  headerColorChange() {
    const { classes, color, changeColorOnScroll } = this.props;
    const windowsScrollTop = window.pageYOffset;
    if (windowsScrollTop > changeColorOnScroll.height) {
      document.body
        .getElementsByTagName("header")[0]
        .classList.remove(classes[color]);
      document.body
        .getElementsByTagName("header")[0]
        .classList.add(classes[changeColorOnScroll.color]);
      this.changeLogo();
      this.searchDown();
      if (document.getElementById("closeButton")) {
        document
          .getElementById("closeButton")
          .classList.add(classes.buttonDown);
        document
          .getElementById("closeButton")
          .classList.remove(classes.buttonTop);
      }
      if (document.getElementById("searchBar")) {
        document
          .getElementById("searchBar")
          .classList.add(classes.searchBarDown);
        document
          .getElementById("searchBar")
          .classList.remove(classes.searchBarUp);
      }
    } else {
      document.body
        .getElementsByTagName("header")[0]
        .classList.add(classes[color]);
      document.body
        .getElementsByTagName("header")[0]
        .classList.remove(classes[changeColorOnScroll.color]);
      this.searchTop();
      if (document.getElementById("closeButton")) {
        document
          .getElementById("closeButton")
          .classList.remove(classes.buttonDown);
        document.getElementById("closeButton").classList.add(classes.buttonTop);
      }
      if (document.getElementById("searchBar")) {
        document
          .getElementById("searchBar")
          .classList.remove(classes.searchBarDown);
        document.getElementById("searchBar").classList.add(classes.searchBarUp);
      }
      this.changeLogo2();
    }
  }
  componentWillUnmount() {
    if (this.props.changeColorOnScroll) {
      window.removeEventListener("scroll", this.headerColorChange);
    }
  }
  render() {
    const { classes, color, leftLinks, fixed, absolute } = this.props;
    const appBarClasses = classNames({
      [classes.appBar]: true,
      [classes[color]]: color,
      [classes.absolute]: absolute,
      [classes.fixed]: fixed
    });

    const customLogo = (
      <CustomButton className={classes.list2} color="transparent">
        <img src={this.state.logo} className={classes.list1} alt="logo" />
      </CustomButton>
    );

    return (
      <Aux>
        <AppBar
          className={
            this.props.searchBar
              ? classNames(appBarClasses, classes.otherPage)
              : appBarClasses
          }
        >
          <Toolbar
            className={
              this.props.searchBar
                ? classes.otherPageContainer
                : classes.container
            }
          >
            <div className={classes.mobileDrawer}>
              <Hidden smUp>
                <IconButton
                  className={classes.buttonOpen}
                  color="inherit"
                  aria-label="open drawer"
                  onClick={this.handleDrawerToggle}
                >
                  <MenuIcon />
                </IconButton>
              </Hidden>

              <Hidden smUp>
                <div
                  className={classes.searchLogo}
                  onClick={this.openSearchBox}
                >
                  {this.state.open ? (
                    <IconButton
                      className={classes.buttonClose}
                      color="inherit"
                      aria-label="Delete"
                    >
                      <CancelIcon />
                    </IconButton>
                  ) : (
                    <IconButton
                      className={classes.buttonOpen}
                      color="inherit"
                      aria-label="Delete"
                    >
                      <Search />
                    </IconButton>
                  )}
                </div>
              </Hidden>
            </div>

            <Link to="/" className={classes.logo}>
              {customLogo}
            </Link>
            {this.props.searchBar ? (
              <div className={classes.notMainContainer}>
                <CustomSearchHeader
                  srcoll={headerScroll}
                  formControlProps={{
                    fullWidth: true
                  }}
                  main={false}
                />
                <Hidden xsDown>
                  <div className={classes.navBarOtherContainer}>
                    <div className={classes.navBarOther}>
                      <Link
                        to={{
                          pathname: "/products",
                          state: {
                            filter: "",
                            brand: ""
                          }
                        }}
                        className={classes.link}
                      >
                        Browse
                      </Link>
                      <Link to="/news" className={classes.link}>
                        News
                      </Link>
                      <Link to="/" className={classes.link}>
                        App
                      </Link>
                      <Link to="/profile/portfolio" className={classes.link}>
                        Portfolio
                      </Link>
                      <Link to="/about" className={classes.link}>
                        About
                      </Link>
                    </div>
                  </div>
                </Hidden>
              </div>
            ) : (
              <div>
                <CustomSearchHeader
                  srcoll={headerScroll}
                  formControlProps={{
                    fullWidth: true
                  }}
                  main={true}
                />
                <Hidden xsDown>
                  <div style={{ margin: "auto 0px" }}>
                    <div className={classes.navBar}>
                      <Link
                        to={{
                          pathname: "/products",
                          state: {
                            filter: ""
                          }
                        }}
                        className={classes.link}
                      >
                        Browse
                      </Link>
                      <Link to="/news" className={classes.link}>
                        News
                      </Link>
                      <Link to="/" className={classes.link}>
                        App
                      </Link>
                      <Link to="/profile/portfolio" className={classes.link}>
                        Portfolio
                      </Link>
                      <Link to="/about" className={classes.link}>
                        About
                      </Link>
                    </div>
                  </div>
                </Hidden>
              </div>
            )}
            <Hidden xsDown>{leftLinks}</Hidden>
            <div
              className={
                this.props.searchBar
                  ? classes.mobileDrawerRightOther
                  : classes.mobileDrawerRight
              }
            >
              <Hidden xsDown>
                <AccountModal
                  orginprops1={""}
                  mobile={false}
                  iconSize={"16px"}
                  otherPage={this.props.searchBar}
                  orginprops2={""}
                  orginprops3={-50}
                  orginprops4={15}
                />
              </Hidden>

              <Hidden smUp implementation="css">
                <AccountModal
                  mobile={true}
                  iconSize={"28px"}
                  fakeModal={true}
                  orginprops2={"left"}
                  orginprops3={-50}
                  orginprops4={15}
                />
                <Divider />
              </Hidden>

              <Hidden xsDown implementation="css">
                <HeaderLinks
                  orginprops1={""}
                  orginprops2={""}
                  orginprops3={-50}
                  orginprops4={0}
                  otherPage={this.props.searchBar}
                />
              </Hidden>
            </div>
          </Toolbar>

          <Hidden smUp implementation="css">
            <Drawer
              variant="temporary"
              anchor={"left"}
              open={this.state.mobileOpen}
              classes={{
                paper: classes.drawerPaper // change this to show from the left
              }}
              onClose={this.handleDrawerToggle}
            >
              {/* 밑에 div 필요한거지 확인해보기 */}
              <div className={classes.appResponsive}>
                {/* 일단 여기 있는 거는 확실히 바뀌어야 함 */}
                <MobileHeaderLink onClose={this.handleDrawerToggle} />
              </div>
            </Drawer>
          </Hidden>
        </AppBar>
        <Hidden smUp>
          {this.state.open ? (
            <SearchBar
              test2={this.closeSearchBox}
              lim={lim}
              josh={josh}
              visible={this.state.open}
            />
          ) : null}
        </Hidden>
      </Aux>
    );
  }
}

Header.defaultProp = {
  color: "white"
};

Header.propTypes = {
  classes: PropTypes.object.isRequired,
  color: PropTypes.oneOf([
    "primary",
    "info",
    "success",
    "warning",
    "danger",
    "transparent",
    "white",
    "rose",
    "dark"
  ]),
  rightLinks: PropTypes.node,
  leftLinks: PropTypes.node,
  brand: PropTypes.string,
  fixed: PropTypes.bool,
  absolute: PropTypes.bool,
  // this will cause the sidebar to change the color from
  // this.props.color (see above) to changeColorOnScroll.color
  // when the window.pageYOffset is heigher or equal to
  // changeColorOnScroll.height and then when it is smaller than
  // changeColorOnScroll.height change it back to
  // this.props.color (see above)
  changeColorOnScroll: PropTypes.shape({
    height: PropTypes.number.isRequired,
    color: PropTypes.oneOf([
      "primary",
      "info",
      "success",
      "warning",
      "danger",
      "transparent",
      "white",
      "rose",
      "dark"
    ]).isRequired
  })
};

export default withStyles(headerStyle)(Header);
