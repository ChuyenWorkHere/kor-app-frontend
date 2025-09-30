import React, { use } from 'react'
import { FaBars, FaBook, FaBookOpen, FaCertificate, FaDesktop, FaEllipsisH, FaFacebookMessenger, FaFile, FaHome, FaLayerGroup, FaQuoteRight } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom'

const Sidebar = () => {

    const location = useLocation();

    const isActive = (path) => {
        if(location.pathname === path) {
            return true;
        }
        return location.pathname.includes(path) && path != "/";
    };

    const courses = useSelector((state) => state.courses.courses);

    return (
        <div className="sidebar" data-background-color="dark">
            <div className="sidebar-logo">
                {/* <!-- Logo Header --> */}
                <div className="logo-header" data-background-color="light">
                    <Link to={"/"} className="logo">
                        <img
                            src="/assets/img/logo.png"
                            alt="navbar brand"
                            className="navbar-brand"
                            height="50"
                        />
                    </Link>
                    <div className="nav-toggle">
                        <button className="btn btn-toggle toggle-sidebar">
                            <i className="gg-menu-right"></i>
                        </button>
                        <button className="btn btn-toggle sidenav-toggler">
                            <i className="gg-menu-left"></i>
                        </button>
                    </div>
                    <button className="topbar-toggler more">
                        <i className="gg-more-vertical-alt"></i>
                    </button>
                </div>
                {/* <!-- End Logo Header --> */}
            </div>
            <div className="sidebar-wrapper scrollbar scrollbar-inner">
                <div className="sidebar-content">
                    <ul className="nav nav-secondary">
                        <li className={isActive("/") ? "nav-item active" : "nav-item"}>
                            <Link
                                to={"/"}                            >
                                <FaHome size={20} className='me-3' />
                                <p>Dashboard</p>
                            </Link>
                        </li>
                        <li className="nav-section">
                            <span className="sidebar-mini-icon">
                                <i className="fa fa-ellipsis-h"></i>
                            </span>
                            <h4 className="text-section">Basic</h4>
                        </li>
                        <li className="nav-item">
                            <a data-bs-toggle="collapse" href="#base">
                                <FaLayerGroup size={20} className='me-3' />
                                <p>Courses</p>
                                <span className="caret"></span>
                            </a>
                            <div className="collapse" id="base">
                                <ul className="nav nav-collapse" >
                                    {
                                        courses.map(course => (
                                            <li key={course.courseId} className={isActive(`/${course.courseSlug}`) ? "active" : ""}>
                                                <Link to={`/${course.courseSlug}`}>
                                                    <span className="sub-item">{course.courseName}</span>
                                                </Link>
                                            </li>
                                        ))
                                    }
                                </ul>
                            </div>
                        </li>
                        <li className={isActive("/messenger") ? "nav-item active" : "nav-item"}>
                            <a data-bs-toggle="collapse" href="#sidebarLayouts">
                                <FaFacebookMessenger size={20} className='me-3' />
                                <p>Messenger</p>
                            </a>
                        </li>
                        <li className={isActive("/vocabulary") ? "nav-item active" : "nav-item"}>
                            <Link to="/vocabulary">
                                <FaBookOpen size={20} className='me-3' />
                                <p>Vocabulary</p>
                            </Link>
                        </li>
                        <li className={isActive("/books") ? "nav-item active" : "nav-item"}>
                            <a data-bs-toggle="collapse" href="#tables">
                                <FaBook size={20} className='me-3' />
                                <p>Books</p>
                            </a>
                        </li>
                        <li className={isActive("/word-usage") ? "nav-item active" : "nav-item"}>
                            <a data-bs-toggle="collapse" href="#maps">
                                <FaQuoteRight size={20} className='me-3' />
                                <p>Word Usage</p>
                            </a>
                        </li>

                        <li className="nav-section">
                            <span className="sidebar-mini-icon">
                                <FaEllipsisH size={20} className='me-3' />
                            </span>
                            <h4 className="text-section">Advanced</h4>
                        </li>

                        <li className={isActive("/certificates") ? "nav-item active" : "nav-item"}>
                            <a data-bs-toggle="collapse" href="#charts">
                                <FaCertificate size={20} className='me-3' />
                                <p>Certificates</p>
                                <span className="caret"></span>
                            </a>
                            <div className="collapse" id="charts">
                                <ul className="nav nav-collapse">
                                    <li>
                                        <a href="charts/charts.html">
                                            <span className="sub-item">Ielts</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="charts/sparkline.html">
                                            <span className="sub-item">Toiec</span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </li>
                        <li className="nav-item">
                            <a href="widgets.html">
                                <FaDesktop size={20} className='me-3' />
                                <p>Widgets</p>
                                <span className="badge badge-success">4</span>
                            </a>
                        </li>
                        <li className="nav-item">
                            <a href="../../documentation/index.html">
                                <FaFile size={20} className='me-3' />
                                <p>Documentation</p>
                                <span className="badge badge-secondary">1</span>
                            </a>
                        </li>
                        <li className="nav-item">
                            <a data-bs-toggle="collapse" href="#submenu">
                                <FaBars size={20} className='me-3' />
                                <p>Menu Levels</p>
                                <span className="caret"></span>
                            </a>
                            <div className="collapse" id="submenu">
                                <ul className="nav nav-collapse">
                                    <li>
                                        <a data-bs-toggle="collapse" href="#subnav1">
                                            <span className="sub-item">Level 1</span>
                                            <span className="caret"></span>
                                        </a>
                                        <div className="collapse" id="subnav1">
                                            <ul className="nav nav-collapse subnav">
                                                <li>
                                                    <a href="#">
                                                        <span className="sub-item">Level 2</span>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#">
                                                        <span className="sub-item">Level 2</span>
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </li>
                                    <li>
                                        <a data-bs-toggle="collapse" href="#subnav2">
                                            <span className="sub-item">Level 1</span>
                                            <span className="caret"></span>
                                        </a>
                                        <div className="collapse" id="subnav2">
                                            <ul className="nav nav-collapse subnav">
                                                <li>
                                                    <a href="#">
                                                        <span className="sub-item">Level 2</span>
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </li>
                                    <li>
                                        <a href="#">
                                            <span className="sub-item">Level 1</span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Sidebar