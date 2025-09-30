import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Sidebar from '../components/common/Sidebar';
import Header from '../components/common/Header';
import AnimatedBackground from '../components/common/AnimatedBackground';
import BreadCrumb from '../components/common/BreadCrumb';
import Footer from '../components/common/Footer';
import { Toaster } from 'react-hot-toast';


const Layout = () => {

    const location = useLocation();
    const pathname = location.pathname;

    return (
        <>
            <Sidebar />
            <div className="main-panel">
                <Header />
                <div className='container'>
                    <div className='page-inner'>
                        {(pathname !== '/') && <BreadCrumb />}
                        <Outlet />
                    </div>
                </div>
                <Footer />
            </div>
            <Toaster />
        </>
    )
}

export default Layout