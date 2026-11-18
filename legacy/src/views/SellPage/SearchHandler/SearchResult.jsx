import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";

import searchResult from "assets/jss/material-kit-react/views/landingPageSections/searchResult";
import axios from "axios";
class SearchResult extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [],
      model: null,
      imgPreview: null,
      db: null,
      display: false,
      skip: 0
    };
    this.timer = null;
  }

  componentWillReceiveProps(nextProps) {
    const { classes } = this.props;

    if (nextProps.search) {
      if (this.props.model !== nextProps.model) {
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
          if (nextProps.model) {
            let results = [
              <div
                className={classes.itemContainer}
                key={nextProps.model}
                onClick={() => this.select(nextProps.model, null)}
              >
                "{nextProps.model}" 추가하기
              </div>
            ];

            axios({
              method: "get",
              url:
                "https://api.probe.gg/open/search?shoe=" +
                nextProps.model +
                "&skip=0"
            }).then(value => {
              if (value.data.length !== 0) {
                value.data.forEach(value => {
                  let modelName = value.name.split("|");

                  results = [
                    ...results,
                    <div
                      className={classes.itemContainer}
                      key={value.name}
                      onClick={() =>
                        this.select(
                          value.name,
                          value.image[0],
                          value.lowestPrice,
                          value.highestPrice
                        )
                      }
                    >
                      <div className={classes.itemEnglish} key={modelName[0]}>
                        {modelName[0]}
                      </div>
                      <div className={classes.itemKorean} key={modelName[1]}>
                        {modelName[1]}
                      </div>
                    </div>
                  ];
                });
                this.setState({
                  results: results,
                  display: true
                });
              } else {
                results = [
                  ...results,
                  <div className={classes.itemContainer}>
                    검색 결과가 없습니다.
                  </div>
                ];

                this.setState({
                  results: results
                });
              }
            });
          }
        }, 500);
      }
    }
    // return this.state.results;
  }

  select = (model, imgPreview, lowest, highest) => {
    this.setState({
      results: [],
      display: false
    });

    this.props.select(model, imgPreview, lowest, highest);
  };

  close = () => {
    this.setState({
      display: false
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.container}>
        {this.props.search || this.state.display ? (
          <ClickAwayListener onClickAway={this.close}>
            <div className={classes.results}>{this.state.results}</div>
          </ClickAwayListener>
        ) : null}
      </div>
    );
  }
}

export default withStyles(searchResult)(SearchResult);
