import { Form, message } from "antd";
import Input from "antd/lib/input/Input";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../resources/authentication.css";
import axios from "axios";
function Login() {

    const navigate = useNavigate();
    const onFinish = async function(values) 
    {
        try 
        {
            const response = await axios.post("/api/login", values);
            localStorage.setItem("spendwise-user", JSON.stringify(response));
            message.success("Login successful");
            navigate("/");    
        } 
        catch (error) 
        {
            message.error("Login failed");    
        }
    }

    return (
        <div className="register">
            <div className="row justify-content-center align-items-center w-100 h-100">
                <div className="col-md-4">
                    <Form layout="vertical" onFinish={onFinish}>
                        <h1>SPENDWISE / LOGIN</h1>
                        <hr></hr>
                        <Form.Item label="Email" name="email">
                            <Input />
                        </Form.Item>
                        <Form.Item label="Password" name="password">
                            <Input />
                        </Form.Item>
                        <div className="d-flex justify-content-between align-items-center">
                            <Link to="/register" style={{ textDecoration: "none", fontFamily: "Montserrat, sans-serif" }}>Not registered yet! Click here to Register</Link>
                            <button className="primary" type="submit">LOGIN</button>
                        </div>
                    </Form>
                </div>
                <div className="col-md-5">
                    <div className="lottie">
                        <lottie-player src="https://assets5.lottiefiles.com/packages/lf20_06a6pf9i.json" background="transparent" speed="1" loop autoplay></lottie-player>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;