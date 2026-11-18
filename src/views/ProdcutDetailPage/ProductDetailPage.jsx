import withStyles from "@material-ui/core/styles/withStyles";
import ProductDetail from "components/Product/ProductDetail.jsx";
import React from "react";
import axios from "axios";
import Button from "@material-ui/core/Button";
class ProductDetailPage extends React.Component {
  state = { data: null, error: "" };
  componentDidMount() {
    this.load();
  }
  componentDidUpdate(previous) {
    if (previous.match.params.model !== this.props.match.params.model)
      this.load();
  }
  componentWillUnmount() {
    this.controller?.abort();
  }
  load = async () => {
    this.controller?.abort();
    this.controller = new AbortController();
    const signal = this.controller.signal;
    this.setState({ error: "", data: null });
    try {
      const response = await axios.get("https://api.probe.gg/open/shoe", {
        params: { shoe: this.props.match.params.model },
        signal,
      });
      if (!response.data?.[0]?.data)
        throw new Error("상품을 찾을 수 없습니다.");
      if (!signal.aborted) this.setState({ data: response.data });
    } catch (error) {
      if (!signal.aborted)
        this.setState({
          error: error.response?.data?.message || error.message,
        });
    }
  };
  sizeChanger = () => {};
  render() {
    if (this.state.error)
      return (
        <div
          role="alert"
          style={{ margin: "140px auto 80px", maxWidth: 960, padding: 24 }}
        >
          <p>{this.state.error}</p>
          <Button onClick={this.load}>다시 불러오기</Button>
        </div>
      );
    if (!this.state.data)
      return (
        <div
          style={{ minHeight: 500 }}
          role="status"
          aria-label="상품을 불러오는 중"
        />
      );
    const item = this.state.data[0].data;
    return (
      <ProductDetail
        model={item.name}
        image={item.image[0]}
        imageList={[...new Set(item.image)].slice(1)}
        brand={item.brand}
        sku={item.model}
        sourceUrl={item.sourceUrl}
        colorway={item.color}
        retailUsd={item.retailUsd}
        lowest={item.lowestPrice}
        releaseDate={item.releaseDate}
        stockCount={item.stockCount}
        sid={item._id}
        related={this.state.data[1]}
        sizeChanger={this.sizeChanger}
      />
    );
  }
}
export default withStyles(null)(ProductDetailPage);
