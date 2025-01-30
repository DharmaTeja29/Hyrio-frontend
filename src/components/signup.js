import React, { useState } from 'react';
import '../styles/form.css';
import axios from '../api/axios';
import { notify } from './toast';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [matchPassword, setMatchPassword] = useState('');
    const [name, setName] = useState('');
    const [industry, setIndustry] = useState('');
    const [email, setEmail] = useState('');
    const [website, setWebsite] = useState('');
    const [address, setAddress] = useState('');
    const [mobile, setMobile] = useState('');
    const [overview, setOverview] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        if (password !== matchPassword) {
            notify('failed', 'passwords dont match');
            return;
        }
        e.preventDefault();
        try {
            const response = await axios.post('/signup',
                {
                    username,
                    password,
                    name,
                    industry,
                    email,
                    website,
                    address,
                    overview,
                    mobile: parseInt(mobile) || mobile
                });
            const success = response?.data?.success;
            if (success)
                notify('success', success);

            const response1 = await axios.post('/login', { username, password });
            const accessToken = response1?.data?.accessToken;
            localStorage.setItem('accessToken', accessToken);

            navigate('/user');
            setUsername('');
            setPassword('');
            setMatchPassword('');
            setName('');
            setIndustry('');
            setEmail('');
            setWebsite('');
            setAddress('');
            setMobile('');
            setOverview('');
        } catch (err) {
            notify('failed', err?.response?.data?.message);
        }
    };

    return (
        <>
            <div className='form'>
                <div className='d-inline-flex p-2 card'>
                    <form className="card-body flex-signup-form" onSubmit={handleSubmit}>

                        <h2>Signup</h2>

                        <div className='flex-signup'>
                            <div>

                                <div className="card-body">
                                    <div className="form-floating flex-nowrap">
                                        <input
                                            className="form-control"
                                            type="text"
                                            placeholder='Username'
                                            id='username'
                                            minLength={8}
                                            maxLength={30}
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
                                            type="password"
                                            id='password'
                                            autoComplete='off'
                                            placeholder='Password'
                                            value={password}
                                            min={8}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                        />
                                        <label htmlFor='password'>Password</label>
                                    </div>
                                </div>

                                <div className="card-body">
                                    <div className="form-floating flex-nowrap">
                                        <input
                                            className="form-control"
                                            type="password"
                                            id='confirmPassword'
                                            autoComplete='off'
                                            placeholder='Confirm password'
                                            value={matchPassword}
                                            min={8}
                                            onChange={(e) => setMatchPassword(e.target.value)}
                                            required
                                        />
                                        <label htmlFor='confirmPassword'>Confirm password</label>
                                    </div>
                                </div>

                                <div className="card-body">
                                    <div className="form-floating flex-nowrap">
                                        <input
                                            className="form-control"
                                            type="text"
                                            id='name'
                                            placeholder='Company name'
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            required
                                        />
                                        <label htmlFor='name'>Company name</label>
                                    </div>
                                </div>

                                <div className="card-body">
                                    <div className="form-floating flex-nowrap">
                                        <input
                                            className="form-control"
                                            type="text"
                                            id='industry'
                                            placeholder='Industry'
                                            value={industry}
                                            onChange={(e) => setIndustry(e.target.value)}
                                            required
                                        />
                                        <label htmlFor='industry'>Industry</label>
                                    </div>
                                </div>

                            </div>
                            <div>

                                <div className="card-body">
                                    <div className="form-floating flex-nowrap">
                                        <input
                                            className="form-control"
                                            type="text"
                                            id='website'
                                            placeholder='Website'
                                            value={website}
                                            onChange={(e) => setWebsite(e.target.value)}
                                            required
                                        />
                                        <label htmlFor='website'>Website</label>
                                    </div>
                                </div>

                                <div className="card-body">
                                    <div className="form-floating flex-nowrap">
                                        <input
                                            className="form-control"
                                            type="text"
                                            id='address'
                                            placeholder='Address'
                                            value={address}
                                            onChange={(e) => setAddress(e.target.value)}
                                            required
                                        />
                                        <label htmlFor='address'>Address</label>
                                    </div>
                                </div>

                                <div className="card-body">
                                    <div className="flex-nowrap form-floating">
                                        <input
                                            id='cm'
                                            className="form-control"
                                            type="text"
                                            placeholder='Mobile'
                                            minLength={10}
                                            maxLength={10}
                                            autoComplete='off'
                                            value={mobile}
                                            onChange={(e) => setMobile(e.target.value)}
                                            required
                                        />
                                        <label htmlFor='cm'>Mobile</label>
                                    </div>
                                </div>

                                <div className="card-body">
                                    <div className="flex-nowrap form-floating">
                                        <input
                                            id='re'
                                            className="form-control"
                                            type="email"
                                            placeholder='Email'
                                            autoComplete='off'
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                        />
                                        <label htmlFor='re'>Email</label>
                                    </div>
                                </div>

                                <div className="card-body">
                                    <div className="form-floating flex-nowrap">
                                        <input
                                            className="form-control"
                                            type="text"
                                            id='overview'
                                            placeholder='Overview'
                                            value={overview}
                                            onChange={(e) => setOverview(e.target.value)}
                                            required
                                        />
                                        <label htmlFor='overview'>Overview</label>
                                    </div>
                                </div>

                            </div>
                        </div>

                        <div className="card-body">
                            <button type="submit" className="btn btn-primary">Sign up</button>
                        </div>

                    </form>
                </div>
            </div>
        </>
    );
}

export default Signup;
