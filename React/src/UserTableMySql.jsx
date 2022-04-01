import { useState, useEffect } from 'react';
import axios from 'axios';
import useLocalStorage from 'use-local-storage';

const UserTableMySql = () => {
    const [user, setUser] = useState([]);
    const [login, setLogin] = useState(false);
    const [token, setToken] = useLocalStorage('token', '');
    const getUsers = () => {
        axios
            .get('/usertablemysql')
            .then((res) => {
                setUser(res.data.results);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    useEffect(() => {
        getUsers();
    });
    const createUser = (event) => {
        event.preventDefault();
        const userObject = {
            id: event.target.id.value,
            username: event.target.username.value,
            password: event.target.password.value,
        };
        axios
            .post('/usertablemysql', userObject)
            .then((res) => {
                console.log(res.data);
                getUsers();
            })
            .catch((err) => {
                console.log(err);
            });
    };
    const loginForm = () => {
        setLogin(true);
    };
    const loginUser = (event) => {
        event.preventDefault();
        axios
            .get(
                `/usertablemysql/checklogin/${event.target.username.value}/${event.target.password.value}`
            )
            .then((res) => {
                setLogin(false);
                setToken(res.data.token);
                console.log(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    return (
        <div className="container-fluid text-center">
            {login ? (
                <div>
                    <h1 className="mt-3">Log In</h1>
                    <form className="form-group" onSubmit={loginUser}>
                        <b className="subHeading">User Name : </b>
                        <input
                            className="form-control d-inline-flex w-50"
                            type="text"
                            name="username"
                            placeholder="Enter User Name"
                        />
                        <br />
                        <b className="subHeading">Password : </b>
                        <input
                            className="form-control d-inline-flex w-50"
                            type="password"
                            name="password"
                            placeholder="Enter Password"
                        />
                        <br />
                        <button className="btn btn-outline-primary">
                            <b>Log In</b>
                        </button>
                    </form>
                </div>
            ) : (
                <div>
                    <h1 className="mt-3">Registration</h1>
                    <form className="form-group" onSubmit={createUser}>
                        <b className="subHeading">ID : </b>
                        <input
                            className="form-control d-inline-flex w-50"
                            type="number"
                            name="id"
                            placeholder="Enter ID"
                        />
                        <br />
                        <b className="subHeading">User Name : </b>
                        <input
                            className="form-control d-inline-flex w-50"
                            type="text"
                            name="username"
                            placeholder="Enter User Name"
                        />
                        <br />
                        <b className="subHeading">Password : </b>
                        <input
                            className="form-control d-inline-flex w-50"
                            type="password"
                            name="password"
                            placeholder="Enter Password"
                        />
                        <br />
                        <button className="btn btn-outline-primary">
                            <b>Register</b>
                        </button>
                    </form>
                    <button
                        className="btn btn-outline-primary"
                        onClick={loginForm}
                    >
                        <b>Sign Up</b>
                    </button>
                </div>
            )}
        </div>
    );
};
export default UserTableMySql;
