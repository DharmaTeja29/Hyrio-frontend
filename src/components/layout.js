import { Outlet, useNavigate, Link } from 'react-router-dom';
import axios from '../api/axios';
import { jwtDecode } from 'jwt-decode';
import { notify } from './toast';
import '../styles/nav.css'

const Layout = () => {
    const navigate = useNavigate();

    const accessToken = localStorage.getItem('accessToken');
    let decoded;
    if (accessToken)
        decoded = jwtDecode(accessToken);

    const logout = async () => {
        try {
            await axios.post('/logout')
            localStorage.removeItem('accessToken');
            notify('success', 'Successfully logged out');
        } catch (err) {
            notify('failed', err?.response?.data?.message);
        }
        navigate('/');
    }

    return (
        <>
            <nav className="navbar px-2" data-bs-theme="dark" style={{ backgroundColor: '#0f172a' }}>
                <div className="container-fluid">
                    <div className='d-flex align-items-center'>
                        {!decoded?.userInfo?.username
                            ? <Link className="navbar-brand mx-1 fs-3" to="/">Talent finder</Link>
                            : <Link className="navbar-brand mx-1 fs-3" to="/user">Talent finder</Link>
                        }
                    </div>
                    <ul className="navbar-nav d-flex flex-row align-items-center">
                        {!decoded?.userInfo?.username
                            ? <>
                                <li className="nav-item mx-1 cur"><Link className="nav-link" to="/">Login</Link></li>
                                <li className="nav-item mx-1 cur"><Link className="nav-link" to="/signup">Signup</Link></li>
                            </>
                            : <>
                                <li className='nav-item mx-1 nav-link cur' onClick={() => navigate(`/user/profile`)}>Profile</li>
                                <li className='nav-item mx-1 nav-link cur' onClick={logout}>Logout</li>
                            </>}
                    </ul>
                </div>
            </nav >

            <div className='d-flex'>

                {decoded?.userInfo?.username &&
                    (

                        <nav id="ibd6" className="sidebar">

                            <ul className="list-group list-group-flush">
                                <li className="sidebar-list">
                                    <Link className='nav-link active' to='/user'>Dashboard</Link>
                                </li>
                                <li className="sidebar-list">
                                    <Link className='nav-link active' to='/user/new'>Post new job</Link>
                                </li>
                                <li className="sidebar-list">
                                    <Link className='nav-link active' to='/user/posted'>Posted jobs</Link>
                                </li>
                                <li className="sidebar-list">
                                    <Link className='nav-link active' to='/user/profile'>Profile</Link >
                                </li>
                            </ul >

                        </nav >

                    )
                }

                <div className='outlet'>
                    <Outlet />
                </div>

            </div >
        </>
    )
}

export default Layout;