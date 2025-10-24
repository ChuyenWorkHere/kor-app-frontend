import React, { use } from 'react'
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom'
import LayerIcon from '../icons/LayerIcon';
import HomeIcon from '../icons/HomeIcon';
import MessengerIcon from '../icons/MessengerIcon';
import BookOpenIcon from '../icons/BookOpenIcon';
import BookIcon from '../icons/BookIcon';
import QuoteRightIcon from '../icons/QuoteRightIcon';
import AwardIcon from '../icons/AwardIcon';
import HeartIcon from '../icons/HeartIcon';
import ElipsisIcon from '../icons/ElipsisIcon';

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
        <div className="sidebar">
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
                                <HomeIcon size={20}/>
                                <p className='ms-3'>Dashboard</p>
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
                                <LayerIcon size={20} />
                                <p className='ms-3'>Courses</p>
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
                            <Link data-bs-toggle="collapse" href="#sidebarLayouts">
                                <MessengerIcon size={20} />
                                <p className='ms-3'>Messenger</p>
                            </Link>
                        </li>
                        <li className={isActive("/vocabulary") ? "nav-item active" : "nav-item"}>
                            <Link to="/vocabulary">
                                <BookOpenIcon size={20} />
                                <p className='ms-3'>Vocabulary</p>
                            </Link>
                        </li>
                        <li className={isActive("/books") ? "nav-item active" : "nav-item"}>
                            <Link data-bs-toggle="collapse" href="#tables">
                                <BookIcon size={20} />
                                <p className='ms-3'>Books</p>
                            </Link>
                        </li>
                        <li className={isActive("/word-usage") ? "nav-item active" : "nav-item"}>
                            <Link data-bs-toggle="collapse" href="#maps">
                                <QuoteRightIcon size={20} />
                                <p className='ms-3'>Word Usage</p>
                            </Link>
                        </li>

                        <li className="nav-section">
                            <span className="sidebar-mini-icon">
                                <ElipsisIcon size={20} />
                            </span>
                            <h4 className="text-section">Advanced</h4>
                        </li>

                        <li className={isActive("/certificates") ? "nav-item active" : "nav-item"}>
                            <a data-bs-toggle="collapse" href="#charts">
                                <AwardIcon size={20}  />
                                <p className='ms-3'>Certificates</p>
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
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Sidebar