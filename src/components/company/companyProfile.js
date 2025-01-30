import React, { useState, useEffect } from 'react';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { notify } from '../toast';

const CompanyProfile = () => {
    const disabledDefault = {
        company: true,
        account: true
    }
    const [name, setName] = useState('');
    const [industry, setIndustry] = useState('');
    const [email, setEmail] = useState('');
    const [website, setWebsite] = useState('');
    const [address, setAddress] = useState('');
    const [mobile, setMobile] = useState('');
    const [overview, setOverview] = useState('');
    const [emailVerified, setEmailVerified] = useState('');
    const [mobileVerified, setMobileVerified] = useState('');

    const axios = useAxiosPrivate();
    const [disabled, setDisabled] = useState(disabledDefault);

    const [username, setUsername] = useState('');
    const [prevPassword, setPrevPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');

    const [emailOTPSent, setEmailOTPSent] = useState(false);
    const [mobileOTPSent, setMobileOTPSent] = useState(false);
    const [emailOTP, setEmailOTP] = useState('');
    const [mobileOTP, setMobileOTP] = useState('');
    const [disableEmailOTP, setDisableEmailOTP] = useState(false);
    const [disableMobileOTP, setDisableMobileOTP] = useState(false);

    useEffect(() => {
        const fetchCompany = async () => {
            try {
                const response = await axios.get('/company/details')

                const company = response?.data
                setUsername(company?.username);
                setName(company?.name);
                setIndustry(company?.industry);
                setEmail(company?.email);
                setWebsite(company?.website);
                setAddress(company?.address);
                setMobile(company?.mobile);
                setOverview(company?.overview);
                setEmailVerified(company?.emailVerified);
                setMobileVerified(company?.mobileVerified);

            } catch (err) {
                notify('failed', err?.response?.data?.message);
            }
        }

        fetchCompany();
    }, [axios]);

    const handleCompany = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put('/company/company', {
                name,
                industry,
                email,
                website,
                address,
                mobile: parseInt(mobile) || mobile,
                overview,
            });
            const success = response?.data?.success;
            if (success)
                notify('success', success);

        } catch (err) {
            notify('failed', err?.response?.data?.message);
        }
    }

    const handleUsername = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put('/username', { newUsername: username });
            const success = response?.data?.success;
            if (success)
                notify('success', success);

        } catch (err) {
            notify('failed', err?.response?.data?.message);
        }
    }

    const handlePassword = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put('/password', { prevPassword, newPassword });
            const success = response?.data?.success;
            if (success)
                notify('success', success);

            setPrevPassword('');
            setNewPassword('');
        } catch (err) {
            notify('failed', err?.response?.data?.message);
        }
    }

    const getEmailOTP = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/company/sendMail', { email: email });
            const success = response?.data?.success;
            if (success)
                notify('success', success);

            setEmailOTPSent(true);
        } catch (err) {
            notify('failed', err?.response?.data?.message);
        }
    }

    const getMobileOTP = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/company/sendMobile', { mobile: '+91' + mobile });
            const success = response?.data?.success;
            if (success)
                notify('success', success);

            setMobileOTPSent(true);
        } catch (err) {
            notify('failed', err?.response?.data?.message);
        }
    }

    const verifyEmailOTP = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/company/verifyMail', { otp: emailOTP });
            const success = response?.data?.success;
            if (success)
                notify('success', success);

            setEmailOTP('');
            setDisableEmailOTP(true);
        } catch (err) {
            notify('failed', err?.response?.data?.message);
        }
    }

    const verifyMobileOTP = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('/company/verifyMobile', { otp: mobileOTP });
            const success = response?.data?.success;
            if (success)
                notify('success', success);

            setMobileOTP('');
            setDisableMobileOTP(true);
        } catch (err) {
            notify('failed', err?.response?.data?.message);
        }
    }

    const resendEmailOTP = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/company/resendMail', { email: email });
            const success = response?.data?.success;
            if (success)
                notify('success', success);

            setEmailOTPSent(true);
        } catch (err) {
            notify('failed', err?.response?.data?.message);
        }
    }

    const resendMobileOTP = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/company/resendMobile', { mobile: '+91' + mobile });
            const success = response?.data?.success;
            if (success)
                notify('success', success);

            setMobileOTPSent(true);
        } catch (err) {
            notify('failed', err?.response?.data?.message);
        }
    }

    return (
        <>

            {/* Compay */}
            <div className='d-flex justify-content-center m-3'>
                <div className='d-inline-flex p-2'>
                    <div className="card" style={{ backgroundColor: '#fff' }}>
                        <form className="card-body">

                            <div className='d-flex justify-content-between'>
                                <h2>Company</h2>

                                {disabled.company && (
                                    <div >
                                        <button onClick={(e) => setDisabled(prev => ({ ...prev, company: false }))} className="btn btn-dark">Edit</button>
                                    </div>
                                )}
                            </div>

                            <fieldset disabled={disabled.company}>

                                <div className='d-flex flex-row'>

                                    <div>
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

                                    </div>
                                    <div>

                                        <div className="card-body">
                                            <div className="flex-nowrap form-floating">
                                                <input
                                                    id='conm'
                                                    className="form-control"
                                                    type="text"
                                                    placeholder='Mobile'
                                                    minLength={10}
                                                    maxLength={10}
                                                    autoComplete='off'
                                                    value={mobile || ""}
                                                    onChange={(e) => setMobile(e.target.value)}
                                                    required
                                                    disabled={mobileOTPSent}
                                                />
                                                <label htmlFor='conm'>Mobile</label>
                                            </div>
                                        </div>

                                        {mobile && !disableMobileOTP && !mobileOTPSent && !mobileVerified && (
                                            <div className="card-body">
                                                <button className="btn btn-primary" onClick={getMobileOTP}>send otp</button>
                                            </div>)}

                                        {(!disableMobileOTP && mobileOTPSent && !mobileVerified  &&
                                            <>
                                                <div className="card-body">
                                                    <div className="flex-nowrap form-floating">
                                                        <input
                                                            id='mobileOTP'
                                                            className="form-control"
                                                            type="text"
                                                            minLength={4}
                                                            maxLength={4}
                                                            placeholder='otp'
                                                            autoComplete='off'
                                                            value={mobileOTP || ""}
                                                            onChange={(e) => setMobileOTP(e.target.value)}
                                                            required
                                                        />
                                                        <label htmlFor='mobileOTP'>otp</label>
                                                    </div>
                                                </div>
                                                <div className='d-inline-flex'>
                                                    <div className="card-body">
                                                        <button className="btn btn-primary" onClick={verifyMobileOTP}>verify</button>
                                                    </div>
                                                    <div className="card-body">
                                                        <button className="btn btn-primary" onClick={resendMobileOTP}>resend</button>
                                                    </div>
                                                </div>
                                            </>
                                        )}

                                        <div className="card-body">
                                            <div className="flex-nowrap form-floating">
                                                <input
                                                    id='cone'
                                                    className="form-control"
                                                    type="email"
                                                    placeholder='Email'
                                                    autoComplete='off'
                                                    value={email || ""}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    required
                                                    disabled={emailOTPSent}
                                                />
                                                <label htmlFor='cone'>Email</label>
                                            </div>
                                        </div>

                                        {email && !emailOTPSent && !disableEmailOTP && !emailVerified  && (
                                            <div className="card-body">
                                                <button className="btn btn-primary" onClick={getEmailOTP}>send otp</button>
                                            </div>)}

                                        {emailOTPSent && !disableEmailOTP && !emailVerified  && (
                                            <>
                                                <div className="card-body">
                                                    <div className="flex-nowrap form-floating">
                                                        <input
                                                            id='emailOTP'
                                                            className="form-control"
                                                            type="text"
                                                            placeholder='otp'
                                                            minLength={4}
                                                            maxLength={4}
                                                            autoComplete='off'
                                                            value={emailOTP || ""}
                                                            onChange={(e) => setEmailOTP(e.target.value)}
                                                            required
                                                        />
                                                        <label htmlFor='emailOTP'>otp</label>
                                                    </div>
                                                </div>
                                                <div className='d-inline-flex'>
                                                    <div className="card-body">
                                                        <button className="btn btn-primary" onClick={verifyEmailOTP}>verify</button>
                                                    </div>
                                                    <div className="card-body">
                                                        <button className="btn btn-primary" onClick={resendEmailOTP}>resend</button>
                                                    </div>
                                                </div>
                                            </>
                                        )}

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
                                    <button className="btn btn-primary" onClick={handleCompany}>submit</button>
                                </div>

                            </fieldset>

                        </form>
                    </div>
                </div>
            </div>

            {/* Account */}
            <div className='d-flex justify-content-center m-3'>
                <div className='d-inline-flex p-2'>
                    <div className="card" style={{ backgroundColor: '#fff' }}>
                        <form className="card-body">

                            <div className='d-flex justify-content-between'>
                                <h2>Account</h2>

                                {disabled.account && (
                                    <div >
                                        <button onClick={(e) => setDisabled(prev => ({ ...prev, account: false }))} className="btn btn-dark">Edit</button>
                                    </div>
                                )}
                            </div>

                            <fieldset disabled={disabled.account}>

                                <div className='d-flex flex-row'>

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
                                            <button onClick={handleUsername} className="btn btn-primary">edit</button>
                                        </div>

                                    </div>

                                    <div>

                                        <div className="card-body">
                                            <div className="form-floating flex-nowrap">
                                                <input
                                                    className="form-control"
                                                    type="password"
                                                    autoComplete='off'
                                                    id='prevPassword'
                                                    placeholder='Previous password'
                                                    value={prevPassword}
                                                    min={8}
                                                    onChange={(e) => setPrevPassword(e.target.value)}
                                                    required
                                                />
                                                <label htmlFor='prevPassword'>Previous password</label>
                                            </div>
                                        </div>

                                        <div className="card-body">
                                            <div className="form-floating flex-nowrap">
                                                <input
                                                    className="form-control"
                                                    type="password"
                                                    autoComplete='off'
                                                    id='newPassword'
                                                    placeholder='New password'
                                                    value={newPassword}
                                                    min={8}
                                                    onChange={(e) => setNewPassword(e.target.value)}
                                                    required
                                                />
                                                <label htmlFor='newPassword'>New password</label>
                                            </div>
                                        </div>

                                        <div className="card-body">
                                            <button onClick={handlePassword} className="btn btn-primary">edit</button>
                                        </div>

                                    </div>

                                </div>

                            </fieldset>

                        </form>
                    </div>
                </div>
            </div>

        </>
    )

}

export default CompanyProfile