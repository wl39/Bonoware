import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import newReleasesPage from "assets/jss/material-kit-react/views/newReleasesPage";
import ReleasesSideBar from "components/ReleasesSideBar/ReleasesSideBar";
import ReleasesContents from "components/ReleasesContents/ReleasesContents";

class NewReleasesPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      new: true,
      prev: false,
      addias: false,
      yeezy: false,
      ultraBoost: false,
      nmd: false,
      iniki: false,
      aOther: false,
      airJordan: false,
      airForce: false,
      airMax: false,
      nOther: false,
      other: false
    };
  }

  newPrevChange = () => {
    this.setState({
      new: !this.state.new,
      prev: !this.state.prev
    });
  };

  handleChange = name => event => {
    this.setState({
      ...this.state,
      [name]: event.target.checked
    });
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.container}>
        <div className={classes.header}>
          <div className={classes.titleContainer}>
            <div className={classes.title}>출시 예정 신발</div>
            <div className={classes.subTitle}>
              곧 출시될 혹은 이미 출시된 신발을 확인하는 곳 입니다.
            </div>
          </div>
        </div>
        <div className={classes.contentsContainer}>
          <ReleasesSideBar
            newPrevChange={this.newPrevChange}
            handleChange={(name, event) => this.handleChange(name, event)}
            new={this.state.new}
            prev={this.state.prev}
            addias={this.state.addias}
            yeezy={this.state.yeezy}
            ultraBoost={this.state.ultraBoost}
            nmd={this.state.nmd}
            iniki={this.state.iniki}
            aOther={this.state.aOther}
            airJordan={this.state.airJordan}
            airForce={this.state.airForce}
            airMax={this.state.airMax}
            nOther={this.state.nOther}
            other={this.state.other}
          />
          <ReleasesContents
            new={this.state.new}
            prev={this.state.prev}
            addias={this.state.addias}
            yeezy={this.state.yeezy}
            ultraBoost={this.state.ultraBoost}
            nmd={this.state.nmd}
            iniki={this.state.iniki}
            aOther={this.state.aOther}
            airJordan={this.state.airJordan}
            airForce={this.state.airForce}
            airMax={this.state.airMax}
            nOther={this.state.nOther}
            other={this.state.other}
          />
        </div>
      </div>
    );
  }
}

export default withStyles(newReleasesPage)(NewReleasesPage);
