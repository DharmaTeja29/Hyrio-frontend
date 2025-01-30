import React, { useState, useEffect } from 'react';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { notify } from '../toast';
import { useNavigate, useParams } from 'react-router-dom';

const CompanyJobProfile = () => {
    const jobDefault = {
        jobTitle: '',
        jobDescription: '',
        experience: '',
        addCandidate: [],
        endDate: '',
    };

    const { id } = useParams();
    const [job, setJob] = useState(jobDefault);
    const navigate = useNavigate();

    const axios = useAxiosPrivate();

    useEffect(() => {
        const fetchJobProfile = async () => {
            try {
                const response = await axios.get('/company/jobProfile/' + id);

                const profile = response?.data;
                setJob(profile?.job);

            } catch (err) {
                notify('failed', err?.response?.data?.message);
            }
        }
        fetchJobProfile();
    }, [axios, id]);

    const handleDeleteJob = async (e) => {
        try {
            const response = await axios.delete('/company/job/' + id);
            const success = response?.data?.success;
            if (success)
                notify('success', success);

            navigate(-1)
        } catch (err) {
            notify('failed', err?.response?.data?.message);
        }
    }

    return (
        <>

            <div className='d-flex justify-content-center align-items-center my-5'>

                <section className="card mx-5 p-3" style={{ width: '38rem' }}>

                    <section className="mb-3">
                        <div className="container">
                            <div className="row">
                                <div>
                                    <h1>Job profile</h1>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="my-2">
                        <div className="container">
                            <div className="row">
                                <div style={{ width: '15rem' }}>
                                    <h5>Job title</h5>
                                </div>
                                <div style={{ width: '20rem' }}>
                                    <div className="card-title">{job.jobTitle}</div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="my-2">
                        <div className="container">
                            <div className="row">
                                <div style={{ width: '15rem' }}>
                                    <h5>Job description</h5>
                                </div>
                                <div style={{ width: '20rem' }}>
                                    <div className="card-title">{job.jobDescription}</div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="my-2">
                        <div className="container">
                            <div className="row">
                                <div style={{ width: '15rem' }}>
                                    <h5>Experience</h5>
                                </div>
                                <div style={{ width: '20rem' }}>
                                    <div className="card-title">{job.experience}</div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="my-2">
                        <div className="container">
                            <div className="row">
                                <div style={{ width: '15rem' }}>
                                    <h5>Added candidates</h5>
                                </div>
                                <div style={{ width: '20rem' }}>
                                    <div className="card-title">{job.addCandidate.map((candidate, i) => (<p key={i}>{candidate}</p>))}</div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="my-2">
                        <div className="container">
                            <div className="row">
                                <div style={{ width: '15rem' }}>
                                    <h5>End date</h5>
                                </div>
                                <div style={{ width: '20rem' }}>
                                    <div className="card-title">{new Date(job.endDate).toDateString()}</div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="my-2">
                        <div className="container">
                            <div className="row">
                                <div style={{ width: '15rem' }}>
                                    <button onClick={handleDeleteJob} className='btn btn-dark'>Delete</button>
                                </div>
                            </div>
                        </div>
                    </section>

                </section >

            </div>

        </>
    )

}

export default CompanyJobProfile;