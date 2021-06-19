import React, { Component } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import { Redirect } from "react-router-dom";
import axios from 'axios';
//import  { Link } from 'react-router-dom';

export default class Home extends Component {
    userData;
    constructor(props) {
      super(props);
      this.state = {
        navigate: false,
        signupData: {
          id:"",
          name: "",
          email:"",
          mobile: "",
          gender:"",
          address:"",
          city:"",
          state:"",
          country:"",
          isLoading: "",
        },
        msg: "",
        errMsgname:"",
        errMsgmobile:"",
      };
    }

    onChangehandler = (e, key) => {
        const { signupData } = this.state;
        signupData[e.target.name] = e.target.value;
        this.setState({ signupData });
      };

    componentDidMount() {
        const udata = JSON.parse(localStorage.getItem("userData"));
        const login = localStorage.getItem("isLoggedIn");
        if(login){
        axios
          .get(`http://localhost/login-api/public/api/user/${udata.email}`)
          .then((response) => {
               this.setState({ 
                navigate: false,
                msg: response.data.message,
                signupData: {
                  id: response.data.id,
                  name: response.data.name,
                  email: response.data.email,
                  mobile: response.data.mobile,
                  gender: response.data.gender,
                  address: response.data.address,
                  city: response.data.city,
                  state: response.data.state,
                  country: response.data.country,
                },
               });
          })
          .catch((err) => console.log(err));
        } else {
          this.setState({ navigate: true });
        }
      }
    
  onSubmitHandler = (e) => {
    e.preventDefault();
    this.setState({ isLoading: true });
    axios
      .post(
        "http://localhost/login-api/public/api/user-update",
        this.state.signupData
      )
      .then((response) => {
        this.setState({ isLoading: false });
        if (response.data.status === 200) {
          this.setState({
            navigate: false,
            msg: response.data.message,
            signupData: {
              id: response.data.id,
              name: response.data.name,
              email: response.data.email,
              mobile: response.data.mobile,
              gender: response.data.gender,
              address: response.data.address,
              city:response.data.city,
              state:response.data.state,
              country:response.data.country,
            },
          });
          setTimeout(() => {
            this.setState({ 
              msg: ""
             });
          }, 2000);
        }

        if (response.data.status === "failed") {
          this.setState({ 
            msg: response.data.message,    
            errMsgname: response.data.errors.name, 
            errMsgmobile: response.data.errors.mobile 
          });
          setTimeout(() => {
            this.setState({ msg: "" });
          }, 2000);
        }
      });
  };  

  onLogoutHandler = () => {
    localStorage.clear();
    this.setState({
      navigate: true,
    });
  };

  render() {
    const isLoading = this.state.isLoading; 
    const users = JSON.parse(localStorage.getItem("userData"));
    var uname = (users) ? users.name : "";
    const { navigate } = this.state;
    if (navigate) {
      return <Redirect to="/" push={true} />;
    }
    return (
      <div className="container  border">
        <h3> HomePage </h3>{" "}
        <div className="row">
          <div className="col-xl-9 col-sm-12 col-md-9 text-dark">
            <h5> Welcome, {uname} </h5> You have Logged in
            successfully.{" "}
          </div>{" "}
          <div className="col-xl-3 col-sm-12 col-md-3">
            <Button
              className="btn btn-primary text-right"
              onClick={this.onLogoutHandler}
            >
              Logout{" "}
            </Button>{" "}
          </div>{" "}
          <div>
        <Form className="containers shadow">
          <FormGroup>
            <Label for="name"> Name </Label>{" "}
            <Input
              type="name"
              name="name"
              placeholder="Enter name"
              value={this.state.signupData.name}
              onChange={this.onChangehandler}
            />{" "}
            <span className="text-danger"> {this.state.errMsgname} </span>
          </FormGroup>{" "}
          <FormGroup>
            <Input 
            type="hidden"
            name="id"
            value={this.state.signupData.id}
            />
            <Input 
            type="hidden"
            name="email"
            value={this.state.signupData.email}
            />
          </FormGroup>{" "}
          <FormGroup>
            <Label for="phone"> Mobile Number </Label>{" "}
            <Input
              type="text"
              name="mobile"
              placeholder="Enter mobile number"
              value={this.state.signupData.mobile}
              onChange={this.onChangehandler}
            />{" "}
            <span className="text-danger"> {this.state.errMsgmobile} </span>
          </FormGroup>{" "}
          <FormGroup>
            <Label for="gender"> Gender </Label>{" "}
          </FormGroup>
          <FormGroup>
            <Input
              type="radio"
              name="gender"
              value="male"
              checked={this.state.signupData.gender === "male"}
              onChange={this.onChangehandler}
            />{" Male "}
          </FormGroup>
          <FormGroup>
            <Input
              type="radio"
              name="gender"
              value="female"
              checked={this.state.signupData.gender === "female"}
              onChange={this.onChangehandler}
            />{" Female "}
          </FormGroup>
          <FormGroup>
            <Label for="address"> Address </Label>{" "}
            <Input
              type="text"
              name="address"
              value={this.state.signupData.address}
              placeholder="Enter address"
              onChange={this.onChangehandler}
            />
          </FormGroup>{" "}
          <FormGroup>
              <Label for="city"> City </Label>{" "}
              <Input 
               type="text"
               name="city"
               value={this.state.signupData.city}
               placeholder="Enter city"
               onChange={this.onChangehandler}
              />
          </FormGroup>{" "}
          <FormGroup>
              <Label for="state"> State </Label>{" "}
              <Input 
               type="text"
               name="state"
               value={this.state.signupData.state}
               placeholder="Enter state"
               onChange={this.onChangehandler}
              />
          </FormGroup>{" "}
          <FormGroup>
              <Label for="country"> Country </Label>{" "}
              <Input 
               type="text"
               name="country"
               value={this.state.signupData.country}
               placeholder="Enter country"
               onChange={this.onChangehandler}
              />
          </FormGroup>{" "}
          <p className="text-white"> {this.state.msg} </p>{" "}
          <Button
            className="text-center mb-4"
            color="success"
            onClick={this.onSubmitHandler}
          >
            Update{" "}
            {isLoading ? (
              <span
                className="spinner-border spinner-border-sm ml-5"
                role="status"
              ></span>
            ) : (
              <span> </span>
            )}{" "}
          </Button>{" "}
        </Form>{" "}
      </div>
        </div>{" "}
      </div>
    );
  }
}
