/*!

=========================================================
* Argon Dashboard React - v1.2.1
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

// reactstrap components
import {
  Button,
  Card,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,
} from "reactstrap";

import { useState } from "react";

import API from 'api/api.js';

const Login = (props) => {
  const [state, setState] = useState({ email: "", password: "" });
  const handleChange = e => {
    const { name, value } = e.target;
    setState(prevState => ({
      ...prevState,
      [name]: value
    }));
  };
  const handleSubmit = e => {
    e.preventDefault();

    const user = {
      email : state.email,
      password : state.password
    }

    API.post(`auth/login/`, user)
      .then(res => {
        if (res.data.tokens.access.token) {
          localStorage.setItem('_token', res.data.tokens.access.token);
          props.history.push("/admin/index")
        }
        
      })
  };
  return (
    <>
      <Col lg="5" md="7">
        <Card className="bg-secondary shadow border-0">

          <CardBody className="px-lg-5 py-lg-5">
            <div className="text-center text-muted mb-4">
              <small>sign in with credentials</small>
            </div>
            <Form role="form" onSubmit={handleSubmit}>

              <FormGroup className="mb-3">
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-email-83" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    value={state.email}
                    onChange={handleChange}
                    placeholder="Email"
                    type="email"
                    name="email"
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    value={state.password}
                    onChange={handleChange}
                    placeholder="Password"
                    type="password"
                    name="password"
                  />
                </InputGroup>
              </FormGroup>

              <div className="text-center">
                <Button className="my-4" color="primary" type="submit">
                  Sign in
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>

      </Col>
    </>
  );
};

export default Login;
