import { Button, message } from "antd";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserOutlined } from "@ant-design/icons";
import "../../styles/HeaderStyles.css";

const Header = () => {
    const [loginUser, setLoginUser] = useState('')
    const navigate = useNavigate();
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'))
        if (user) {
            setLoginUser(user)
        }
    }, [])

    const logoutHandler = () => {
        localStorage.removeItem("user")
        message.success("Logout Successfully")
        navigate('/login')
    };

    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-light">
                <div className="container-fluid">
                    <button className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <Link className="navbar-brand" to="/">
                            Expense Tracker
                        </Link>
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                {" "}
                                <h6 className="nav-link ">
                                    <UserOutlined /> {loginUser && loginUser.name}
                                </h6>{" "}
                            </li>
                            <li className="nav-item">
                                <button className="btn btn-danger" onClick={logoutHandler}>
                                    Logout
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

        </>


    )


}

export default Header;