import React, { useState, useEffect } from "react";
import { Form, Input, message } from 'antd'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'
import Spinner from '../components/Spinner';
import "../styles/Loginpage.css";

const Login = () => {
    const [loading, setLoading] = useState(false);
    const img =
        "https://richardahallpc.us/wp-content/uploads/2019/08/necessary-biz-expenses-2019-08-05_16-53-29.png";
    const navigate = useNavigate();

    const submitHandler = async (values) => {
        try {
            setLoading(true);
            const { data } = await axios.post('/api/v1/users/login', values)
            message.success('Login Successful');
            setLoading(false);
            localStorage.setItem('user', JSON.stringify({ ...data.user, password: '' }))
            navigate('/')
        } catch (error) {
            setLoading(false);
            message.error('something went wrong');
        }
    };

    useEffect(() => {
        if (localStorage.getItem('user')) {
            navigate('/')
        }
    }, [navigate]);

    return (
        <>
            <div className='login-page'>
                {loading && <Spinner />}
                <div className="row container">
                    <h1>TrackExp</h1>
                    <div className="col-md-6">
                        <img src={img} alt="login-img" width={"100%"} height="100%" />
                    </div>
                    <div className="col-md-4 login-form">
                        <Form layout='vertical' onFinish={submitHandler} >
                            <h1>Login Form</h1>
                            <Form.Item label="Email" name="email" >
                                <Input type='email' required />
                            </Form.Item>
                            <Form.Item label="Password" name="password" >
                                <Input type='password' required />
                            </Form.Item>
                            <div className='d-flex justify-content-between'>
                                <Link to='/register'>Not a user? Click Here to Register </Link>
                                <button className='btn btn-primary'>Login</button>
                            </div>
                        </Form>
                    </div>
                </div>
            </div>
        </>
    )

}

export default Login;