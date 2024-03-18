import withStyles from "@material-ui/core/styles/withStyles";

import ProductDetail from "components/Product/ProductDetail.jsx";
import React from "react";

import axios from "axios";

class ProductDetailPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      size: "all",
      product: <div style={{ minHeight: "500px" }} />,
      model: "",
      image: "",
      imageList: [],
      brand: "",
      lowest: 0,
      releaseDate: "",
      stockCount: 0,
      sid: "",
      related: {}
    };
  }

  sizeChanger = size => {
    this.model = this.props.match.params.model;

    let personalSize = size ? size : "all";

    axios({
      method: "get",
      url:
        "https://api.probe.gg/open/shoeChangedData?shoe=" +
        this.state.sid +
        "&size=" +
        personalSize
    }).then(value => {
      switch (value.status) {
        case 200:
          let item = value.data[0];
          this.setState({
            product: (
              <ProductDetail
                model={this.state.model}
                image={this.state.image}
                imageList={this.state.imageList}
                brand={this.state.brand}
                lowest={this.state.lowest}
                releaseDate={this.state.releaseDate}
                stockCount={this.state.stockCount}
                sid={this.state.sid}
                related={this.state.related}
                sizeChanger={this.sizeChanger}
              />
            )
          });
          break;
        default:
          break;
      }
    });
  };

  componentWillReceiveProps(nextProps) {
    if (this.props.match.params.model !== nextProps.match.params.model) {
      this.model = nextProps.match.params.model;

      axios({
        method: "get",
        url: "https://api.probe.gg/open/shoe?shoe=" + this.model
      }).then(value => {
        switch (value.status) {
          case 200:
            let item = value.data[0];
            this.setState({
              product: (
                <ProductDetail
                  model={item.data.name}
                  image={item.data.image[0]}
                  imageList={[
                    item.data.image[0],
                    item.data.image[0],
                    item.data.image[0],
                    item.data.image[0],
                    item.data.image[0]
                  ]}
                  brand={item.data.brand}
                  lowest={item.data.lowestPrice}
                  releaseDate={item.data.releaseDate}
                  stockCount={item.data.stockCount}
                  sid={item.data._id}
                  related={value.data[1]}
                  sizeChanger={this.sizeChanger}
                />
              ),
              model: item.data.name,
              image: item.data.image[0],
              imageList: [
                item.data.image[0],
                item.data.image[0],
                item.data.image[0],
                item.data.image[0],
                item.data.image[0]
              ],
              brand: item.data.brand,
              lowest: item.data.lowestPrice,
              releaseDate: item.data.releaseDate,
              stockCount: item.data.stockCount,
              sid: item.data._id,
              related: value.data[1]
            });
            break;
          default:
            break;
        }
      });
    }
  }

  componentWillMount() {
    this.model = this.props.match.params.model;
    axios({
      method: "get",
      url: "https://api.probe.gg/open/shoe?shoe=" + this.model
    }).then(value => {
      switch (value.status) {
        case 200:
          let item = value.data[0];
          this.setState({
            product: (
              <ProductDetail
                model={item.data.name}
                image={item.data.image[0]}
                imageList={[
                  item.data.image[0],
                  item.data.image[0],
                  item.data.image[0],
                  item.data.image[0],
                  item.data.image[0]
                ]}
                brand={item.data.brand}
                lowest={item.data.lowestPrice}
                releaseDate={item.data.releaseDate}
                stockCount={item.data.stockCount}
                sid={item.data._id}
                related={value.data[1]}
                sizeChanger={this.sizeChanger}
              />
            ),
            model: item.data.name,
            image: item.data.image[0],
            imageList: [
              item.data.image[0],
              item.data.image[0],
              item.data.image[0],
              item.data.image[0],
              item.data.image[0]
            ],
            brand: item.data.brand,
            lowest: item.data.lowestPrice,
            releaseDate: item.data.releaseDate,
            stockCount: item.data.stockCount,
            sid: item.data._id,
            related: value.data[1]
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

export default withStyles(null)(ProductDetailPage);
