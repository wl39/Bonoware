import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";

import ShoeNewsDetail from "views/ShoeNews/ShoeNewsDetail";
import ProductCommentsPanel from "components/Product/ProductCommentsPanel";

import axios from "axios";

import shoeNews from "assets/jss/material-kit-react/views/shoeNews";

class ShoeNews extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      shoeNews: null
    };
  }

  componentWillMount() {
    const { classes } = this.props;

    this.model = this.props.match.params.model;

    axios({
      method: "get",
      url:
        "https://api.probe.gg/open/news?news=" + this.props.match.params.model
    }).then(value => {
      let data = value.data.data;

      let date = new Date(data.postDate);
      let mm = date.getMonth() + 1;
      let dd = date.getDate();
      date =
        date.getFullYear() +
        "." +
        (mm > 9 ? "" : "0") +
        mm +
        "." +
        (dd > 9 ? "" : "0") +
        dd;

      this.setState({
        shoeNews: (
          <div className={classes.container}>
            <ShoeNewsDetail
              title={data.title}
              view={data.viewCount}
              date={date}
              contents={data.body}
              images={data.image}
              writer={data.writer}
            />
            <ProductCommentsPanel id={data._id} shoe={false} />
          </div>
        )
      });
    });
  }

  render() {
    return this.state.shoeNews;
  }
}

export default withStyles(shoeNews)(ShoeNews);
