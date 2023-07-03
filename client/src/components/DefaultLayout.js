import React from "react";
import "../resources/default-layout.css";
import { Button, Dropdown, Space } from 'antd';
import { useNavigate } from "react-router-dom";

function DefaultLayout(props) {
    const user = JSON.parse(localStorage.getItem("spendwise-user"));
    const navigate = useNavigate();
    const items = [
        {
            key: '1',
            label: (
                <li onClick={function() {
                    localStorage.removeItem("spendwise-user");
                    navigate("/login");
                }}>Logout</li>
            ),
        },
    ];
    return (
        <div className="layout">
            <div className="header d-flex justify-content-between allign-items-center">
                <div>
                    <h1 className="logo">SPENDWISE</h1>
                </div>
                <div>
                    <Dropdown menu={{items}} placement="bottomLeft">
                        <button className="primary">{user.name}</button>
                    </Dropdown>
                </div>
            </div>

            <div className="content">
                {props.children}
            </div>

        </div>
    ); 
}

export default DefaultLayout;