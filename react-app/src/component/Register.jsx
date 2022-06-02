import React, { Component } from "react";
import FormValidator from "../FormValidator";
import { NavLink } from "react-router-dom";
import styled from "styled-components";


const Container = styled.div`
  width: 100vw;
  height: 90vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.pexels.com/photos/1117452/pexels-photo-1117452.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 25%;
  padding: 30px;
  background-color: white;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0;
  padding: 10px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
`;

const Link = styled.a`
  margin: 5px 0px;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
`;
//import "./App.css";
class Register extends Component {
  constructor() {
    super();
    this.validator = new FormValidator([
      {
        field: "full_name",
        method: "isEmpty",
        validWhen: false,
        message: "Enter full name.",
      },
      {
        field: "email",
        method: "isEmpty",
        validWhen: false,
        message: "Enter your email address.",
      },
      {
        field: "email",
        method: "isEmail",
        validWhen: true,
        message: "Enter valid email address.",
      },
      {
        field: "phone",
        method: "isEmpty",
        validWhen: false,
        message: "Enter a phone number.",
      },
      {
        field: "phone",
        method: "matches",
        args: [/^\(?\d\d\d\)? ?\d\d\d-?\d\d\d\d$/],
        validWhen: true,
        message: "Enter valid phone number.",
      },
      {
        field: "password",
        method: "isEmpty",
        validWhen: false,
        message: "Enter password.",
      },
      {
        field: "password_confirmation",
        method: "isEmpty",
        validWhen: false,
        message: "Enter Password confirmation.",
      },
      {
        field: "password_confirmation",
        method: this.passwordMatch, // notice that we are passing a custom function here
        validWhen: true,
        message: "Password and password confirmation do not match.",
      },
    ]);
    this.state = {
      full_name: "",
      email: "",
      phone: "",
      password: "",
      password_confirmation: "",
      validation: this.validator.valid(),
    };
    this.submitted = false;
  }
  passwordMatch = (confirmation, state) => state.password === confirmation;
  handleInputChange = (event) => {
    event.preventDefault();
    this.setState({
      [event.target.name]: event.target.value,
    });
  };
  handleFormSubmit = (event) => {
    event.preventDefault();
    const validation = this.validator.validate(this.state);
    this.setState({
      validation,
    });
    this.submitted = true;
    if (validation.isValid) {
      //reaches here if form validates successfully...
    }
  };
  render() {
    let validation = this.submitted
      ? this.validator.validate(this.state)
      : this.state.validation;
    return (
      <Container>
        <Wrapper>
          
            <Form>
              <Title>Registration for User</Title>
              <div className={validation.email.isInvalid && "has-error"}>
                <label htmlFor="full_name">Full Name</label>
                <Input
                  type="string"
                  className="form-control"
                  name="full_name"
                  placeholder="Full Name"
                  onChange={this.handleInputChange}
                />{" "}
                <span className="help-block">
                  {validation.full_name.message}
                </span>{" "}
              </div>
              <div className={validation.email.isInvalid && "has-error"}>
                <label htmlFor="email">Email address</label>
                <Input
                  type="email"
                  className="form-control"
                  name="email"
                  placeholder="Email address"
                  onChange={this.handleInputChange}
                />{" "}
                <span className="help-block">{validation.email.message}</span>{" "}
              </div>
              <div className={validation.phone.isInvalid && "has-error"}>
                <label htmlFor="phone">Phone(enter only 10 digit number)</label>
                <Input
                  type="phone"
                  className="form-control"
                  name="phone"
                  placeholder="Phone Number"
                  onChange={this.handleInputChange}
                />{" "}
                <span className="help-block">{validation.phone.message}</span>{" "}
              </div>
              <div className={validation.password.isInvalid && "has-error"}>
                <label htmlFor="password">Password</label>
                <Input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  name="password"
                  onChange={this.handleInputChange}
                />{" "}
                <span className="help-block">
                  {validation.password.message}
                </span>{" "}
              </div>
              <div
                className={
                  validation.password_confirmation.isInvalid && "has-error"
                }
              >
                <label htmlFor="password_confirmation">Confirm Password</label>
                <Input
                  type="password"
                  className="form-control"
                  placeholder="Confirm Password"
                  name="password_confirmation"
                  onChange={this.handleInputChange}
                />{" "}
                <span className="help-block">
                  {validation.password_confirmation.message}
                </span>{" "}
              </div>
              <Button
                onClick={this.handleFormSubmit}
                className="btn btn-primary"
              >
                {" "}
                Register{" "}
              </Button>
              </Form>
        </Wrapper>
        </Container>
    );
  }
}
export default Register;
