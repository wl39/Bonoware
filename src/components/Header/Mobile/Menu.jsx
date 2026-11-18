import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import menu from "assets/jss/material-kit-react/components/menu";
import {
  AccountCircleOutlined,
  ShoppingCartOutlined,
  LocalAtmOutlined,
  Timeline,
  PersonAddOutlined,
  AccountBoxOutlined,
  SettingsOutlined
} from "@material-ui/icons";
import { Link } from "react-router-dom";

class Menu extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.container}>
        <div className={classes.drawer}>
          {/* <Link
            to={"/profile/recap"}
            className={classes.profileName}
            // onClick={() => this.showContent("recap")}
          >
            <AccountCircleOutlined className={classes.accountIcon} />
            {this.props.userName}
          </Link> */}
          <Link
            to={"/profile/buying"}
            className={
              this.content === "buying"
                ? classes.focused
                : classes.drawerContent
            }
            onClick={this.props.handleClose}
          >
            <ShoppingCartOutlined className={classes.contentIcon} />
            <div className={classes.contentText}>구매내역</div>
          </Link>
          <Link
            to={"/profile/selling"}
            className={
              this.content === "selling"
                ? classes.focused
                : classes.drawerContent
            }onClick={this.props.handleClose}
          >
            <LocalAtmOutlined className={classes.contentIcon} />
            <div className={classes.contentText}>판매내역</div>
          </Link>
          <Link
            to={"/profile/portfolio"}
            className={
              this.content === "portfolio"
                ? classes.focused
                : classes.drawerContent
            }onClick={this.props.handleClose}
          >
            {/* <AccountBoxOutlined /> */}
            <Timeline className={classes.contentIcon} />
            <div className={classes.contentText}>포트폴리오</div>
          </Link>
          <Link
            to={"/profile/recap"}
            className={
              this.content === "recap" ? classes.focused : classes.drawerContent
            }onClick={this.props.handleClose}
          >
            {/* <AccountBoxOutlined /> */}
            <AccountBoxOutlined className={classes.contentIcon} />
            <div className={classes.contentText}>프로필</div>
          </Link>
          <Link
            to={"/profile/following"}
            className={
              this.content === "following"
                ? classes.focused
                : classes.drawerContent
            }onClick={this.props.handleClose}
          >
            <PersonAddOutlined className={classes.contentIcon} />
            <div className={classes.contentText}>팔로잉</div>
          </Link>
          <Link
            to={"/profile/settings"}
            className={
              this.content === "settings"
                ? classes.focused
                : classes.drawerContent
            }onClick={this.props.handleClose}
          >
            <SettingsOutlined className={classes.contentIcon} />
            <div className={classes.contentText}>설정</div>
          </Link>
        </div>
      </div>
    );
  }
}

export default withStyles(menu)(Menu);
