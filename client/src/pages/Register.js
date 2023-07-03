import { Form, message } from "antd";
import Input from "antd/lib/input/Input";
import React, {useState, useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";
import "../resources/authentication.css";
import Spinner from "../components/Spinner.js";

import axios from "axios";

function Register() {

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate(true);
    const onFinish = async function(values)
    {
        try 
        {
            setLoading(true);
            await axios.post("/api/users/register", values);
            setLoading(false);
            message.success("Registration successful");    
        } 
        catch (error) 
        {
            setLoading(false);
            message.error("Something went wrong");    
        }
    }

    useEffect(function() {
        if(localStorage.getItem("spendwise-user"))
        {
            navigate("/");
        }
    }, []);

    return (
        <div className="register">
            {loading && <Spinner />}
            <div className="row justify-content-center align-items-center w-100 h-100">
                <div className="col-md-5">
                    <div className="lottie">
                        <lottie-player src="https://assets5.lottiefiles.com/packages/lf20_06a6pf9i.json" background="transparent" speed="1" loop autoplay></lottie-player>
                    </div>
                </div>
                <div className="col-md-4">
                    <Form layout="vertical" onFinish={onFinish}>
                        <h1>SPENDWISE / REGISTER</h1>
                        <Form.Item label="Name" name="name">
                            <Input />
                        </Form.Item>
                        <Form.Item label="Email" name="email">
                            <Input />
                        </Form.Item>
                        <Form.Item label="Password" name="password">
                            <Input type="password"/>
                        </Form.Item>
                        <div className="d-flex justify-content-between align-items-center">
                            <Link to="/login" style={{ textDecoration: "none", fontFamily: "Montserrat, sans-serif"}}>Already registered! Click here to Login</Link>
                            <button className="secondary" type="submit">REGISTER</button>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    );
}

export default Register;