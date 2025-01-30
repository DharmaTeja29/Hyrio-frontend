import React, { useEffect, useState } from 'react';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { notify } from '../toast';
import '../../styles/dash.css'

const CompanyDashboard = () => {
    const [name, setName] = useState();

    const axios = useAxiosPrivate();

    useEffect(() => {
        const fetchCompany = async () => {
            try {
                const response = await axios.get('/company')

                const company = response?.data
                setName(company?.name || '');

            } catch (err) {
                notify('failed', err?.response?.data?.message);
            }
        }
        fetchCompany();
    }, [axios]);

    return (
        <>
            <div className='d-flex flex-column ml-3'>

                <div id="idnel" className="container my-5 px-0 mx-0 ">
                    <div id="imcik" className="d-flex flex-row justify-content-center p-3 welcome">
                        <div id="iors5" className="col-12 col-sm-12 col-lg-6 col-xl-6 col-md-8">
                            <h2 id="i7b8a">Welcome back, </h2>
                            <h2 id="ix853" style={{ display: "block" }}>{name}</h2>
                            <br />
                            <p><i>Navigate through sidebar to create and send new job profiles and update your info.</i></p>
                        </div>
                    </div>
                </div>

            </div>

        </>
    )
}

export default CompanyDashboard;