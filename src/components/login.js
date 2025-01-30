import React, { useState } from 'react'
import axios from '../api/axios';
import '../styles/form.css';
import { notify } from './toast';
import { useNavigate, useLocation } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname;

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/login', { username, password });
            const accessToken = response?.data?.accessToken;
            const success = response?.data?.success;
            localStorage.setItem('accessToken', accessToken);
            if (success)
                notify('success', success);

            navigate(from || '/user', { replace: true });
            setUsername('');
            setPassword('');
        } catch (err) {
            notify('failed', err?.response?.data?.message);
        }
    };

    return (
        <>
            <div className='form'>
                <div className='d-inline-flex'>
                    <div className="card" style={{ backgroundColor: '#fff', width: '400px' }}>
                        <form className="card-body" onSubmit={handleSubmit}>

                            <h2>Login</h2>

                            <div className="card-body">
                                <div className="form-floating flex-nowrap">
                                    <input
                                        className="form-control"
                                        type="text"
                                        id='username'
                                        placeholder='Username'
                                        autoComplete='off'
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        required
                                    />
                                    <label htmlFor='username'>Username</label>
                                </div>
                            </div>

                            <div className="card-body">
                                <div className="form-floating flex-nowrap">
                                    <input
                                        className="form-control"
                                        autoComplete='off'
                                        type="password"
                                        id='password'
                                        placeholder='Password'
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                    <label htmlFor='password'>Password</label>
                                </div>
                            </div>

                            <div className="card-body">
                                <button type="submit" className="btn btn-primary" >Login</button>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;