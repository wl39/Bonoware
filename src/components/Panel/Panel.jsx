import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import PopularSearch from "./PanelChildern/PopularSearch";
import DailySearch from "./PanelChildern/DailySearch";
import WeeklySearch from "./PanelChildern/WeeklySearch";
import EditorRecommendation from "./PanelChildern/EditorRecommendation";
import panel from "assets/jss/material-kit-react/components/panel.jsx";
import Button from "@material-ui/core/Button";
import CardIcon from "components/Card/CardIcon.jsx";
import ListItem from "@material-ui/core/ListItem";
import Icon from "@material-ui/core/Icon";
import Tooltip from "@material-ui/core/Tooltip";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import IconButton from "@material-ui/core/IconButton";

import { Link } from "react-router-dom";

import { connect } from "react-redux";

class Panel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      daily: [],
      weekly: [],
      monthly: [],
      recommend: [],
      day: true,
      month: true,
      open: false
    };
  }

  handleTooltipClose = () => {
    this.setState({ open: false });
  };

  handleTooltipOpen = () => {
    this.setState({ open: true });
  };

  renderHelper = props => {
    const { classes } = props;

    if (props.daily.length) {
      let daily = [];
      let weekly = [];
      let monthly = [];
      let recommend = [];

      for (let i = 0; i < 5; i++) {
        daily = [
          ...daily,
          <Button key={props.daily[i].name} className={classes.shoeContainer}>
            <Link
              to={"/products/" + props.daily[i].name}
              className={classes.link}
            >
              <img
                src={props.daily[i].image}
                alt={props.daily[i].name}
                className={classes.img}
              />
              <div className={classes.text}>{props.daily[i].name}</div>
            </Link>
          </Button>
        ];
        weekly = [
          ...weekly,
          <Button key={props.weekly[i].name} className={classes.shoeContainer}>
            <Link
              to={"/products/" + props.weekly[i].name}
              className={classes.link}
            >
              <img
                src={props.weekly[i].image}
                alt={props.weekly[i].name}
                className={classes.img}
              />
              <div className={classes.text}>{props.weekly[i].name}</div>
            </Link>
          </Button>
        ];
        monthly = [
          ...monthly,
          <Button key={props.monthly[i].name} className={classes.shoeContainer}>
            <Link
              to={"/products/" + props.monthly[i].name}
              className={classes.link}
            >
              <img
                src={props.monthly[i].image}
                alt={props.monthly[i].name}
                className={classes.img}
              />
              <div className={classes.text}>{props.monthly[i].name}</div>
            </Link>
          </Button>
        ];
        recommend = [
          ...recommend,
          <Button
            key={props.recommend[i].name}
            className={classes.shoeContainer}
          >
            <Link
              to={"/products/" + props.recommend[i].name}
              className={classes.link}
            >
              <img
                src={props.recommend[i].image}
                alt={props.recommend[i].name}
                className={classes.img}
              />
              <div className={classes.text}>{props.recommend[i].name}</div>
            </Link>
          </Button>
        ];
      } //

      this.setState({
        daily: daily,
        weekly: weekly,
        monthly: monthly,
        recommend: recommend
      });
    }
  };

  componentWillMount() {
    this.renderHelper(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.renderHelper(nextProps);
  }

  showDay = () => {
    this.setState({
      day: true
    });
  };

  hideDay = () => {
    this.setState({
      day: false
    });
  };

  showMonth = () => {
    this.setState({
      month: true
    });
  };

  hideMonth = () => {
    this.setState({
      month: false
    });
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.container}>
        <div>
          <CardIcon
            style={{
              paddingRight: "0px",
              background: "transparent",
              color: "#232020",
              boxShadow: "none",
              fontWeight: "bold"
            }}
            className={classes.header}
          >
            <ListItem style={{ padding: "0px" }}>
              <Icon
                style={{ color: "#232020", margin: "0px", fontWeight: "bold" }}
              >
                search
              </Icon>

              <div>검색 순위</div>
              <ClickAwayListener onClickAway={this.handleTooltipClose}>
                <Tooltip
                  style={{ padding: "0px" }}
                  PopperProps={{
                    disablePortal: true
                  }}
                  onClose={this.handleTooltipClose}
                  open={this.state.open}
                  id="tooltip-top"
                  title={"기간 별로 유저들이 검색한 물품들"}
                  placement="right"
                  disableFocusListener
                  disableTouchListener
                >
                  <IconButton
                    onClick={this.handleTooltipOpen}
                    className={classes.tooltipButton}
                  >
                    <Icon className={classes.tooltipAlert}>live_help</Icon>
                  </IconButton>
                </Tooltip>
              </ClickAwayListener>
            </ListItem>
          </CardIcon>
        </div>
        <DailySearch
          data={this.state.daily}
          showDay={this.showDay}
          hidden={!this.state.day}
        />
        <WeeklySearch
          data={this.state.weekly}
          hideDay={this.hideDay}
          hidden={this.state.day}
        />
        <PopularSearch
          data={this.state.monthly}
          showMonth={this.showMonth}
          hidden={!this.state.month}
        />
        <EditorRecommendation
          data={this.state.recommend}
          hideMonth={this.hideMonth}
          hidden={this.state.month}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    daily: state.daily,
    weekly: state.weekly,
    monthly: state.monthly,
    recommend: state.recommend
  };
};

export default connect(
  mapStateToProps,
  null
)(withStyles(panel)(Panel));
