import React, { Component } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import axios from "axios";
import "./signup.css";
import { Link, Redirect } from "react-router-dom";

export default class Signup extends Component {
  userData;
  constructor(props) {
    super(props);
    this.state = {
      signupData: {
        name: "",
        email: "",
        mobile: "",
        password: "",
        gender:"",
        address:"",
        city:"",
        state:"",
        country:"",
        isLoading: "",
      },
      msg: "",
      errMsgname:"",
      errMsgemail:"",
      errMsgpassword:"",
      errMsgmobile:"",
    };
  }

  onChangehandler = (e, key) => {
    const { signupData } = this.state;
    signupData[e.target.name] = e.target.value;
    this.setState({ signupData });
  };
  onSubmitHandler = (e) => {
    e.preventDefault();
    this.setState({ isLoading: true });
    axios
      .post(
        "http://localhost/login-api/public/api/user-signup",
        this.state.signupData
      )
      .then((response) => {
        this.setState({ isLoading: false });
        if (response.data.status === 200) {
          this.setState({
            msg: response.data.message,
            signupData: {
              name: "",
              email: "",
              mobile: "",
              password: "",
              gender:"",
              address:"",
              city:"",
              state:"",
              country:"",
            },
          });
          setTimeout(() => {
            this.setState({ msg: "" });
          }, 2000);
        }

        if (response.data.status === "failed") {
          this.setState({ 
            msg: response.data.message,
            errMsgname: response.data.errors.name,
            errMsgemail: response.data.errors.email,
            errMsgpassword: response.data.errors.password,
            errMsgmobile: response.data.errors.mobile, 
          });
          setTimeout(() => {
            this.setState({ msg: "" });
          }, 2000);
        }
      });
  };
  render() {
    const isLoading = this.state.isLoading;
    const login = localStorage.getItem("isLoggedIn");
    if (login) {
      return <Redirect to="/home" />;
    } 
    return (
      <div>
        <Form className="containers shadow">
          <FormGroup>
            <Label for="name"> Name </Label>{" "}
            <Input
              type="text"
              name="name"
              placeholder="Enter name"
              value={this.state.signupData.name}
              onChange={this.onChangehandler}
            />{" "}
            <span className="text-danger"> {this.state.errMsgname} </span>
          </FormGroup>{" "}
          <FormGroup>
            <Label for="email"> Email id </Label>{" "}
            <Input
              type="email"
              name="email"
              placeholder="Enter email"
              value={this.state.signupData.email}
              onChange={this.onChangehandler}
            />{" "}
            <span className="text-danger"> {this.state.errMsgemail} </span>
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
            <Label for="password"> Password </Label>{" "}
            <Input
              type="password"
              name="password"
              placeholder="Enter password"
              value={this.state.signupData.password}
              onChange={this.onChangehandler}
            />{" "}
            <span className="text-danger"> {this.state.errMsgpassword} </span>
          </FormGroup>{" "}
          <FormGroup>
            <Label for="gender"> Gender </Label>{" "}
          </FormGroup>
          <FormGroup>
            <Input
              type="radio"
              name="gender"
              value="male"
              onChange={this.onChangehandler}
            />{" Male "}
          </FormGroup>
          <FormGroup>
            <Input
              type="radio"
              name="gender"
              value="female"
              onChange={this.onChangehandler}
            />{" Female "}
          </FormGroup>{" "}
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
            Sign Up{" "}
            {isLoading ? (
              <span
                className="spinner-border spinner-border-sm ml-5"
                role="status"
              ></span>
            ) : (
              <span> </span>
            )}{" "}
          </Button>
          <Link to="/sign-in" className="text-white ml-5">
            {" "}
            I 'm already member
          </Link>{" "}
        </Form>{" "}
      </div>
    );
  }
}
