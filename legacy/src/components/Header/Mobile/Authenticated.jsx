import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import authenticated from "assets/jss/material-kit-react/components/authenticated.jsx";
import Notifications from "@material-ui/icons/Notifications";
import NotificationsNone from "@material-ui/icons/NotificationsNone";
import IconButton from "@material-ui/core/IconButton";
import { AccountCircleOutlined } from "@material-ui/icons";

class Authenticated extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notification: false
    };
  }

  notify = () => {
    this.setState({
      notification: !this.state.notification
    });
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.transition}>
        {this.props.userName ? (
          <div className={classes.authenticated}>
            <AccountCircleOutlined className={classes.accountIcon} />
            <div>{this.props.userName}</div>
            <IconButton onClick={this.notify} className={classes.iconButton}>
              {this.state.notification ? (
                <Notifications />
              ) : (
                <NotificationsNone />
              )}
            </IconButton>
          </div>
        ) : (
          <div className={classes.authenticated}>
            <Button
              classes={{ label: classes.label }}
              className={classes.button}
              onClick={this.props.handleOpen}
            >
              <AccountCircleOutlined className={classes.accountIcon} />
              <div>로그인/회원가입</div>
            </Button>
          </div>
        )}
      </div>
    );
  }
}

export default withStyles(authenticated)(Authenticated);
