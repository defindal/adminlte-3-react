import { useState, useEffect } from "react";
// reactstrap components
import {
    Card,
    CardHeader,
    CardBody,
    Container,
    Row,
    Table,
    Button,
    Modal,
} from "reactstrap";
// core components
import Header from "components/Headers/Header.js";

import API from 'api/api.js';

const User = (props) => {
    const [state, setState] = useState([]);
    const [modal, setModal] = useState(false);
    const [getID, setID] = useState(null);
    const [getName, setName] = useState("");


    //token
    const token = localStorage.getItem("_token");
    const conf = {
        headers: {
            Authorization: 'Bearer ' + token
        }
    }
    const fetchData = async () => {

        const result = await API.get("users", conf);
        setState(result.data.results);
    };
    // fetch
    useEffect(() => {
        fetchData();
    }, []);

    // delete
    const toggleModal = (state, id = null, name = "") => {
       
        setID(id);
        setName(name);
        setModal(state);
    };

    const deleteUser = (e) => {
        e.preventDefault();

        API.delete(`users/` + getID, conf)
            .then(res => {
                toggleModal(false);
                fetchData();
            })
    };



    const adduser = () => {
        props.history.push("/admin/add/users")
    };

    const updateuser = (id = null) => {
        props.history.push("/admin/update/users/" + id)
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
                                <p className="card-text">Users
                                    <a href="#" className="btn btn-outline-primary float-right" onClick={adduser}>Tambah User</a>
                                </p>
                            </CardHeader>
                            <CardBody>

                                <Modal
                                    className="modal-dialog-centered"
                                    isOpen={modal}
                                    toggle={() => toggleModal(false)}
                                >
                                    <div className="modal-header">
                                        <h5 className="modal-title" id="exampleModalLabel">
                                            Hapus
                                        </h5>
                                        <button
                                            aria-label="Close"
                                            className="close"
                                            data-dismiss="modal"
                                            type="button"
                                            onClick={() => toggleModal(false)}
                                        >
                                            <span aria-hidden={true}>×</span>
                                        </button>
                                    </div>
                                    <div className="modal-body">apakah anda yakin ingin menghapus data dengan nama <strong>{getName}</strong></div>
                                    <div className="modal-footer">
                                        <Button
                                            color="secondary"
                                            data-dismiss="modal"
                                            type="button"
                                            onClick={() => toggleModal(false)}
                                        >
                                            Batal
                                        </Button>
                                        <Button onClick={(e) => deleteUser(e)} color="danger" type="button">
                                            Hapus
                                        </Button>
                                    </div>
                                </Modal>

                                <Row>
                                    <Table bordered>
                                        <thead>
                                            <tr>
                                                <th>
                                                    No
                                                </th>
                                                <th>
                                                    Name
                                                </th>
                                                <th>
                                                    Email
                                                </th>
                                                <th>
                                                    Role
                                                </th>
                                                <th>
                                                    Aksi
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {state.map((user, idx) => (
                                                <tr key={user.id}>
                                                    <td > {idx+1} </td>
                                                    <td > {user.name} </td>
                                                    <td > {user.email} </td>
                                                    <td > {user.role} </td>
                                                    <td style={{ textAlign: 'center' }}>
                                                    <i class="fas fa-trash" onClick={() => toggleModal(true, user.id, user.name)}></i>&nbsp;&nbsp;&nbsp;
                                                    <i class="fas fa-edit" onClick={() => updateuser(user.id)}></i>
                                                       </td>
                                                </tr>
                                            )
                                            )}

                                        </tbody>
                                    </Table>
                                </Row>
                            </CardBody>
                        </Card>
                    </div>
                </Row>
            </Container>
        </>
    );
};

export default User;
