import { useState, useEffect } from "react";
// reactstrap components
import {
    Card,
    CardHeader,
    CardBody,
    Container,
    Row,
    Form,
    Button,
    Col,
    FormGroup,
    Label,
    Input,
} from "reactstrap";
// core components
import Header from "components/Headers/Header.js";

import API from 'api/api.js';

const User = (props) => {
    const [updateID, setUpdateID] = useState("");
    const [state, setState] = useState({ name: "", role: "admin", email: "", password: "" });
    const [textUpdate, setTextUpdate] = useState("Perbarui");
    const token = localStorage.getItem("_token");
    const conf = {
        headers: {
            Authorization: 'Bearer ' + token
        }
    }

    const getUpdateData = async (id) => {
        const result = await API.get("users/" + id, conf);
        setUpdateID(result.data.id);
        setState(prevState => ({
            ...prevState,
            name: result.data.name,
            role: result.data.role,
            email: result.data.email
        }));
    };
    //load first
    useEffect(() => {
        if (!props.location.pathname.includes("update")) {
            setTextUpdate("Tambah")
        }
        else {
            getUpdateData(props.match.params.id)
        }
        
    }, [])

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
            name: state.name,
            role: state.role,
            email: state.email,
            password: !props.location.pathname.includes("update") ? state.password : ""
        }
        if (!props.location.pathname.includes("update")) {
            API.post(`users`, user, conf)
                .then(res => {
                    
                    props.history.push("/admin/users")
                })
        }
        else {
            delete user['password'];
            delete user['role'];
            API.patch(`users/` + updateID, user, conf)
                .then(res => {
                    
                    props.history.push("/admin/users")
                })
        }



    };
    return (
        <>
            <Header />
            {/* Page content */}
            <Container className="mt--7" fluid>
                {/* Table */}
                <Row>
                    <div className="col">
                        <Card className="shadow">
                            <CardHeader className="bg-transparent">
                                <p className="card-text">Form {textUpdate} User

                                </p>
                            </CardHeader>
                            <CardBody>
                                <Form onSubmit={handleSubmit}>
                                    <Row>
                                        <Input
                                            value={updateID}

                                            id="id"
                                            name="id"
                                            type="hidden"
                                        />
                                        <Col md={updateID == "" ? 3 : 6}>

                                            <FormGroup>
                                                <Label for="exampleName">
                                                    Nama
                                                </Label>
                                                <Input
                                                    value={state.name}
                                                    onChange={handleChange}
                                                    id="exampleName"
                                                    name="name"
                                                    placeholder="ketik nama"
                                                    type="text"
                                                />
                                            </FormGroup>
                                        </Col>
                                        {updateID == "" &&
                                            <Col md={3}>
                                                <FormGroup>
                                                    <Label for="exampleSelect">
                                                        Akses
                                                    </Label>
                                                    <Input
                                                        value={state.role}
                                                        onChange={handleChange}
                                                        id="exampleSelect"
                                                        name="select"
                                                        type="select"
                                                    >
                                                        <option value={"admin"}>
                                                            Admin
                                                        </option>
                                                        <option value={"user"}>
                                                            User
                                                        </option>

                                                    </Input>
                                                </FormGroup>
                                            </Col>
                                        }
                                        <Col md={updateID == "" ? 3 : 6}>
                                            <FormGroup>
                                                <Label for="exampleEmail">
                                                    Email
                                                </Label>
                                                <Input
                                                    value={state.email}
                                                    onChange={handleChange}
                                                    id="exampleEmail"
                                                    name="email"
                                                    placeholder="ketik email"
                                                    type="email"
                                                />
                                            </FormGroup>
                                        </Col>
                                        {updateID == "" &&
                                            <Col md={3}>

                                                <FormGroup>
                                                    <Label for="examplePassword">
                                                        Password
                                                    </Label>
                                                    <Input
                                                        value={state.password}
                                                        onChange={handleChange}
                                                        id="examplePassword"
                                                        name="password"
                                                        placeholder="ketik password"
                                                        type="password"
                                                    />
                                                </FormGroup>



                                            </Col>
                                        }
                                    </Row>


                                    <Button type="submit">
                                        {textUpdate}
                                    </Button>
                                </Form>
                            </CardBody>
                        </Card>
                    </div>
                </Row>
            </Container>
        </>
    );
};

export default User;
