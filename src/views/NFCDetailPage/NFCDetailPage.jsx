import withStyles from "@material-ui/core/styles/withStyles";

import NFCDetail from "components/Product/NFCDetail.jsx";
import React from "react";

import axios from "axios";

class NFCDetailPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: <div style={{ minHeight: "500px" }} />
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.match.params.model !== nextProps.match.params.model) {
      this.model = nextProps.match.params.model;

      axios({
        method: "get",
        url: "https://api.probe.gg/open/shoe?shoe=" + this.model
      }).then(value => {
        switch (value.status) {
          case 200:
            let item = value.data.correspondingShoe;
            this.setState({
              product: (
                <NFCDetail
                  model={item.name}
                  image={item.image[0]}
                  brand={item.brand}
                  lowest={item.lowestPrice}
                  releaseDate={item.releaseDate}
                  stockCount={item.stockCount}
                  sid={item._id}
                // related={value.data[1]}
                />
              )
            });
            break;
          default:
            break;
        }
      });
    }
  }

  componentWillMount() {

    this.model = this.props.match.params.id;
    console.log(this.model)
    axios({
      method: "get",
      url: "https://api.probe.gg/nfc?id=" + this.model
    }).then(value => {
      console.log(value)
      switch (value.status) {
        case 200:
          let item = value.data.correspondingShoe;
          this.setState({
            product: (
              <NFCDetail
                model={item.name}
                image={item.image[0]}
                brand={item.brand}
                price={value.data.price}
                releaseDate={item.releaseDate}
                stockCount={item.stockCount}
                sid={item._id}
              // related={value.data[1]}
              />
            )
          });
          break;
        default:
          break;
      }
    });
  }

  render() {
    return <div>{this.state.product}</div>;
  }
}

export default withStyles(null)(NFCDetailPage);
