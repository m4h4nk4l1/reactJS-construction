import { useState, useEffect } from "react";
import styled from "styled-components";


const Container = styled.div`
  width: 100vw;
  height: 90vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGaoely1aFtFSdvX_jZqa4AwPUicZDITGIoQ&usqp=CAU")
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

function Login() {
  const initialValues = { username: "", email: "", password: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  };

  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(formValues);
    }
  }, [formErrors]);
  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.username) {
      errors.username = "Username is required!";
    }
    if (!values.email) {
      errors.email = "Email is required!";
    } else if (!regex.test(values.email)) {
      errors.email = "This is not a valid email format!";
    }
    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 4) {
      errors.password = "Password must be more than 4 characters";
    } else if (values.password.length > 10) {
      errors.password = "Password cannot exceed more than 10 characters";
    }
    return errors;
  };

  return (
    <Container>
      {Object.keys(formErrors).length === 0 && isSubmit ? (
        <div className="ui message success">Signed in successfully</div>
      ) : (
        <pre>{JSON.stringify(formValues, undefined, 2)}</pre>
      )}

      <Wrapper onSubmit={handleSubmit}>
        <Title>Login Form</Title>
        <div className="ui divider"></div>
        <Form>
          <div className="field">
            <label>Username</label>
            <Input
              type="string"
              className="form-control"
              name="username"
              placeholder="Username"
              value={formValues.username}
              onChange={handleChange}
            />{" "}
          </div>
          <p>{formErrors.username}</p>
          <div className="field">
            <label>Email</label>
            <Input
              type="email"
              className="form-control"
              name="email"
              placeholder="Email"
              value={formValues.email}
              onChange={handleChange}
            />{" "}
          </div>
          <p>{formErrors.email}</p>
          <div className="field">
            <label>Password</label>
            <Input
              type="password"
              className="form-control"
              name="password"
              placeholder="Password"
              value={formValues.password}
              onChange={handleChange}
            />{" "}
          </div>
          <p>{formErrors.password}</p>
          <Button className="fluid ui button blue">Submit</Button>
          </Form>
      </Wrapper>
      </Container>
  );
}

export default Login;