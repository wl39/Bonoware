import Button from "@material-ui/core/Button";
import Input from "@material-ui/core/Input";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import React, { Component } from "react";
import ShortUniqueId from "short-unique-id";
import AdminPageNewsUpload from "./AdminPageNewsUpload";
import SetShoePrice from "./SetShoePrice";
import ImageUploader from "react-images-upload";
import axios from "axios";
import UnfollowShoe from "./UnfollowShoe";
import ChangePassword from "./ChangePassword";
import BuyShoe from "./BuyShoe";
import Carousel from "./Carousel";
const styles = theme => ({
  container: {
    paddingTop: "80px",
    "@media (max-width: 600px)": {
      paddingTop: "50px"
    }
  }
});
class AdminPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pictures: [],
      englishModelName: "",
      koreanModelName: "",
      releaseDate: "",
      releasePrice: "",
      brand: "",
      subBrand: "",
      newShoeModel: "",
      newShoeEmail: "",
      newShoeSize: ""
    };
    this.onDrop = this.onDrop.bind(this);
  }

  componentDidMount() {
    // axios.get('https://api.probe.gg/open', {
    //     withCredentials: true,
    //     headers: {
    //         'Access-Control-Allow-Origin': 'https://probe.gg',
    //     },
    // },
    // ).then(data => {
    //     console.log(data)
    //     console.log('hi')
    // })

    axios
      .get("https://api.probe.gg/protected/following", {
        withCredentials: true,
        headers: {
          "Access-Control-Allow-Origin": "https://probe.gg"
        }
      })
      .then(data => {
        console.log(data);
      });
  }

  onDrop(picture) {
    this.setState({
      pictures: picture
    });
  }

  modelNameHandler = event => {
    this.setState({
      englishModelName: event.target.value
    });
  };
  modelNameKoreanHandler = event => {
    this.setState({
      koreanModelName: event.target.value
    });
  };

  releaseDateHandler = event => {
    this.setState({
      releaseDate: event.target.value
    });
  };

  brandNameHandler = event => {
    this.setState({
      brand: event.target.value
    });
  };

  subBrandNameHandler = event => {
    this.setState({
      subBrand: event.target.value
    });
  };

  modelReleasePriceHandler = event => {
    this.setState({
      releasePrice: event.target.value
    });
  };

  createReleaseShoeHandler = event => {
    let fullModelName =
      this.state.englishModelName + " | " + this.state.koreanModelName;
    this.state.releaseDate;
    this.state.releasePrice;
    this.state.brand;
    console.log(this.state);
    const formData = new FormData();
    this.state.pictures.forEach((file, i) => {
      console.log(file);
      console.log(i);
      formData.append(i, file);
    });
    formData.append("name", fullModelName);
    formData.append("brand", this.state.brand);
    formData.append("releasePrice", this.state.releasePrice);
    formData.append("releaseDate", this.state.releaseDate);
    formData.append("subBrand", this.state.subBrand);

    fetch("https://api.probe.gg/admin/createNewStock", {
      method: "POST",
      body: formData
    }).then(
      function(res) {
        if (res.ok) {
          alert("Perfect! ");
        } else {
          alert("Oops! ");
        }
      },
      function(e) {
        alert("Error submitting form!");
      }
    );
  };

  addingShoeModelNameHandler = event => {
    this.setState({
      newShoeModel: event.target.value
    });
  };

  addingShoeUserEmailHandler = event => {
    this.setState({
      newShoeEmail: event.target.value
    });
  };

  addingShoeSizeHandler = event => {
    this.setState({
      newShoeSize: event.target.value
    });
  };

  addNewShoeHandler = event => {
    console.log(this.state);

    axios
      .post("https://api.probe.gg/admin/addShoe", {
        model: this.state.newShoeModel,
        email: this.state.newShoeEmail,
        size: this.state.newShoeSize
      })
      .then(response => {
        console.log(response);
        alert("Perfect");
      })
      .catch(err => {
        alert(err);
      });
  };

  sms = () => {
    axios
      .post(
        "https://api.probe.gg/protected/likeComment",
        {
          comment: "5d539ee42a5e2e2db10f3ec4"
        },
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json"
          },
          withCredentials: true
        }
      )
      .then(response => {
        console.log(response);
        alert("Perfect");
      })
      .catch(err => {
        alert(err);
      });
  };

  sms2 = () => {
    axios
      .post(
        "https://api.probe.gg/protected/dislikeComment",
        {
          comment: "5d539ee42a5e2e2db10f3ec4"
        },
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json"
          },
          withCredentials: true
        }
      )
      .then(response => {
        console.log(response);
        alert("Perfect");
      })
      .catch(err => {
        alert(err);
      });
  };

  sms3 = () => {
    axios
      .post(
        "https://api.probe.gg/protected/likeStock",
        {
          stock: "5d084ce51b10a365d5665329"
        },
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json"
          },
          withCredentials: true
        }
      )
      .then(response => {
        console.log(response);
        alert("Perfect");
      })
      .catch(err => {
        alert(err);
      });
  };

  sms4 = () => {
    axios
      .post(
        "https://api.probe.gg/protected/dislikeStock",
        {
          stock: "5d084ce51b10a365d5665329"
        },
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json"
          },
          withCredentials: true
        }
      )
      .then(response => {
        console.log(response);
        alert("Perfect");
      })
      .catch(err => {
        alert(err);
      });
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.container}>
        <ImageUploader
          withIcon={true}
          withPreview
          buttonText="Choose images"
          onChange={this.onDrop}
          imgExtension={[".jpg", ".gif", ".png", ".gif", ".jpeg"]}
          maxFileSize={5242880}
        />
        <TextField
          label="English Model 명"
          type="text"
          onChange={this.modelNameHandler}
          InputLabelProps={{
            shrink: true
          }}
        />
        <TextField
          label="한글 모델명"
          type="text"
          onChange={this.modelNameKoreanHandler}
          InputLabelProps={{
            shrink: true
          }}
        />

        <TextField
          label="Release Date (YYYY-MM-DD Format)"
          type="text"
          onChange={this.releaseDateHandler}
          InputLabelProps={{
            shrink: true
          }}
        />
        <br />
        <TextField
          label="브랜드(nike/adidas/other"
          type="text"
          onChange={this.brandNameHandler}
          InputLabelProps={{
            shrink: true
          }}
        />

        <TextField
          label="서브브랜드(yeezy/air force 1/other"
          type="text"
          onChange={this.subBrandNameHandler}
          InputLabelProps={{
            shrink: true
          }}
        />
        <TextField
          label="출고가"
          type="text"
          onChange={this.modelReleasePriceHandler}
          InputLabelProps={{
            shrink: true
          }}
        />
        <br />
        <Button onClick={this.createReleaseShoeHandler}>신상신발추가</Button>

        <br />
        <br />
        <br />

        <TextField
          label="Model명"
          type="text"
          onChange={this.addingShoeModelNameHandler}
          InputLabelProps={{
            shrink: true
          }}
        />
        <br />
        <TextField
          id="datetime-local"
          label="판매자이메일"
          type="text"
          onChange={this.addingShoeUserEmailHandler}
          InputLabelProps={{
            shrink: true
          }}
        />
        <br />
        <TextField
          id="datetime-local"
          label="사이즈"
          type="text"
          onChange={this.addingShoeSizeHandler}
          InputLabelProps={{
            shrink: true
          }}
        />
        <br />
        <Button onClick={this.addNewShoeHandler}>유저신발추가</Button>
        <br />

        <AdminPageNewsUpload />

        <SetShoePrice />

        <UnfollowShoe />

        <ChangePassword />

        <BuyShoe />

        <br />
        <Button onClick={this.sms}>like</Button>
        <Button onClick={this.sms2}>dis</Button>

        <Button onClick={this.sms3}>likePost</Button>
        <Button onClick={this.sms4}>disPost</Button>
      </div>
    );
  }
}

export default withStyles(styles)(AdminPage);
