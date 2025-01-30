import React, { useState } from 'react';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { notify } from '../toast';

const CompanyOpening = () => {
    const jobDefault = {
        jobTitle: '',
        jobDescription: '',
        experience: '',
        addCandidate: [],
        endDate: '',
    }

    const axios = useAxiosPrivate();
    const [job, setJob] = useState(jobDefault);

    const handleJob = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/company/job', {
                ...job,
                endDate: new Date(job.endDate) || job.endDate
            });
            const success = response?.data?.success;
            if (success)
                notify('success', success);

            setJob(jobDefault);
        } catch (err) {
            notify('failed', err?.response?.data?.message);
        }
    }

    return (
        <>

            {/* Job Detail */}
            <div className='d-flex justify-content-center m-3'>
                <div className='d-inline-flex p-2'>
                    <div className="card" style={{ backgroundColor: '#fff' }}>
                        <form className="card-body">

                            <h2>Job</h2>

                            <div className='d-flex flex-row'>

                                <div>
                                    <div className="card-body">
                                        <div className="flex-nowrap form-floating">
                                            <input
                                                id='jj'
                                                className="form-control"
                                                type="text"
                                                placeholder='Job title'
                                                autoComplete='off'
                                                value={job.jobTitle}
                                                onChange={(e) => setJob(prev => ({ ...prev, jobTitle: e.target.value }))}
                                                required
                                            />
                                            <label htmlFor='jj'>Job title</label>
                                        </div>
                                    </div>

                                    <div className="card-body">
                                        <div className="flex-nowrap form-floating">
                                            <input
                                                id='jg'
                                                className="form-control"
                                                type="text"
                                                placeholder='Description'
                                                autoComplete='off'
                                                value={job.jobDescription}
                                                onChange={(e) => setJob(prev => ({ ...prev, jobDescription: e.target.value }))}
                                                required
                                            />
                                            <label htmlFor='jg'>Description</label>
                                        </div>
                                    </div>

                                    <div className="card-body">
                                        <div className="form-floating flex-nowrap">
                                            <select id='experience' required className="form-select" value={job.experience} onChange={(e) => setJob(prev => ({ ...prev, experience: e.target.value }))}>
                                                <option defaultValue=''></option>
                                                <option value='BEGINNER'>Beginner</option>
                                                <option value='INTERMEDIATE'>Intermediate</option>
                                                <option value='EXPERT'>Expert</option>
                                            </select>
                                            <label htmlFor='experience'>Experience</label>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <div className="card-body">
                                        <div className="flex-nowrap form-floating">
                                            <input
                                                id='je'
                                                className="form-control"
                                                type="text"
                                                placeholder='Add candidates'
                                                autoComplete='off'
                                                value={job.addCandidate}
                                                onChange={(e) => setJob(prev => ({ ...prev, addCandidate: e.target.value.split(',') }))}
                                                required
                                            />
                                            <label htmlFor='je'>Add candidates</label>
                                            <p style={{ fontSize: '0.8em', margin: 0 }}><i>*Provide comma seperated values<br /> to give multiple emails</i></p>
                                        </div>
                                    </div>

                                    <div className="card-body">
                                        <div className="flex-nowrap form-floating">
                                            <textarea
                                                id='jd'
                                                className="form-control"
                                                type="text"
                                                placeholder='YYYY-MM-DD'
                                                autoComplete='off'
                                                value={job.endDate}
                                                onChange={(e) => setJob(prev => ({ ...prev, endDate: e.target.value }))}
                                                required
                                            />
                                            <label htmlFor='jd'>End date</label>
                                            <p style={{ fontSize: '0.8em', margin: 0 }}><i>*YYYY-MM-DD</i></p>
                                        </div>
                                    </div>
                                </div>

                            </div>

                            <div className="card-body">
                                <button className="btn btn-primary" onClick={handleJob}>submit</button>
                            </div>

                        </form>
                    </div>
                </div>
            </div>

        </>
    )
}

export default CompanyOpening