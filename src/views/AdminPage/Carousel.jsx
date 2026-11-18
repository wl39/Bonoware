import React, { Component } from "react";
import "./bound.css";
export default class Responsive extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDown: false,
      startX: null,
      startY: null,
      scrollLeft: null,
      scrollTop: null,
      childComponents: []
    };
  }

  componentDidMount() {
    // this._input.focus();
    // this._input.scroll()
    let arr = [];

    if (this.props.children !== undefined) {
      this.props.children.forEach((element, index) => {
        arr.push(
          <div
            class={
              this.props.horizontal
                ? "itemHorizontal item" + index
                : this.props.detail
                ? "mobileItem item" + index
                : "item item" + index
            }
          >
            {element}
          </div>
        );
      });

      this.setState({
        childComponents: arr
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    let arr = [];

    if (nextProps.children !== undefined) {
      nextProps.children.forEach((element, index) => {
        arr.push(
          <div
            class={
              nextProps.horizontal
                ? "itemHorizontal item" + index
                : nextProps.detail
                ? "mobileItem item" + index
                : "item item" + index
            }
          >
            {element}
          </div>
        );
      });

      this.setState({
        childComponents: arr
      });
    }
  }

  mouseDown = e => {
    if (this.props.horizontal) {
      this.setState({
        startY: e.pageY - this._input.offsetTop,
        scrollTop: this._input.scrollTop,
        isDown: true,
        active: true
      });
    } else {
      this.setState({
        startX: e.pageX - this._input.offsetLeft,
        scrollLeft: this._input.scrollLeft,
        isDown: true,
        active: true
      });
    }
    e.preventDefault();
    this._input.classList.add("active");
  };

  mouseLeave = e => {
    this.setState({
      isDown: false,
      active: false
    });
    this._input.classList.remove("active");
  };

  mouseUp = e => {
    this.setState({
      isDown: false,
      active: false
    });
    this._input.classList.remove("active");
  };

  mouseMove = e => {
    if (!this.state.isDown) {
      return;
    }

    if (this.props.horizontal) {
      const y = e.pageY - this._input.offsetTop;
      const walkY = (y - this.state.startY) * 2.5;

      this._input.scrollTop = this.state.scrollTop - walkY;
    } else {
      const x = e.pageX - this._input.offsetLeft;
      const walk = (x - this.state.startX) * 2.5;

      this._input.scrollLeft = this.state.scrollLeft - walk;
    }
  };

  onClick = e => {
    if (
      this.state.clientXonMouseDown !== e.clientX ||
      this.state.clientYonMouseDown !== e.clientY
    ) {
      // prevent link click if the element was dragged
      e.preventDefault();
    }
  };
  // scroll = e => {
  //     console.log('scrolling')
  //     console.log(e)
  //     e.preventDefault();

  //     // console.log(e)
  // }

  // onTouchStart = e => {
  //     console.log(e);
  //     console.log("touched")
  //     this._input.scrollLeft += 5
  // }

  onTouchMove = e => {
    if (this.props.horizontal) {
      const y = e.pageY - this._input.offsetTop;
      const walkY = (y - this.state.startY) * 2.5;

      this._input.scrollTop = this.state.scrollTop - walkY;
    } else {
      const x = e.pageX - this._input.offsetLeft;
      const walk = x - this.state.startX;

      this._input.scrollLeft = this.state.scrollLeft - walk;
    }
  };

  render() {
    return (
      <div
        class={
          this.props.horizontal
            ? "containerHorizontal"
            : this.props.detail
            ? "mobileContainer"
            : null
        }
      >
        <div
          onClick={this.onClick}
          onMouseDown={this.mouseDown}
          onMouseLeave={this.mouseLeave}
          onMouseUp={this.mouseUp}
          onMouseMove={this.mouseMove}
          ref={c => (this._input = c)}
          onScroll={this.scroll}
          class={this.props.horizontal ? "itemsHorizontal" : "items"}
        >
          {this.state.childComponents}
        </div>
      </div>
    );
  }
}
