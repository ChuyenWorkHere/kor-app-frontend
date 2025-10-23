import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { logout } from '../../features/authSlice'
import { fetchUserInfo } from '../../features/userSlice'
import { toggleHeader, toggleSidebar } from '../../features/uiSlice'
import SearchIcon from '../icons/SearchIcon'
import LayerIcon from '../icons/LayerIcon'
import MailIcon from '../icons/MailIcon'
import BellIcon from '../icons/BellIcon'
import AngleRightIcon from '../icons/AngleRightIcon'
import HeartIcon from '../icons/HeartIcon'
import { checkAuth } from '../../utils/authUtils'

const Header = () => {

    const userInfo = useSelector(state => state.user.info);
    const [isAuthenticated, setIsAuthenticated] = useState(checkAuth());

    useEffect(() => {
        setIsAuthenticated(checkAuth());
    }, [userInfo]);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [activeMenu, setActiveMenu] = useState(null);
    const toggleMenu = (menu) => {
        setActiveMenu(activeMenu === menu ? null : menu);
    };

    const handleLogOut = (e) => {
        e.preventDefault();
        dispatch(logout());
        navigate('/login');
    }


    return (
        <div className="main-header">
            <div className="main-header-logo">

                <div className="logo-header" data-background-color="dark">
                    <Link to="/" className="logo">
                        <img
                            src="/assets/img/logo.png"
                            alt="navbar brand"
                            className="navbar-brand"
                            height="100"
                        />
                    </Link>
                    <div className="nav-toggle"
                        onClick={() => {
                            dispatch(toggleSidebar());
                        }}>
                        <button className="btn btn-toggle toggle-sidebar">
                            <i className="gg-menu-right"></i>
                        </button>
                        <button className="btn btn-toggle sidenav-toggler">
                            <i className="gg-menu-left"></i>
                        </button>
                    </div>
                    <button className="topbar-toggler more"
                        onClick={() => {
                            dispatch(toggleHeader());
                        }}>
                        <i className="gg-more-vertical-alt"></i>
                    </button>
                </div>
                {/* End Logo Header*/}
            </div>
            {/*  Navbar Header  */}

            <nav
                className="navbar navbar-header navbar-header-transparent navbar-expand-lg border-bottom"
            >
                <div className="container-fluid">
                    <nav
                        className="navbar navbar-header-left navbar-expand-lg navbar-form nav-search p-0 d-none d-lg-flex"
                    >
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <button type="submit" className="btn btn-search pe-1">
                                    <SearchIcon size={16} />
                                </button>
                            </div>
                            <input
                                type="text"
                                placeholder="Search ..."
                                className="form-control"
                            />
                        </div>
                    </nav>

                    <ul className="navbar-nav topbar-nav ms-md-auto align-items-center">
                        <li
                            className="nav-item topbar-icon dropdown hidden-caret d-flex d-lg-none"
                        >
                            <Link
                                className="nav-link dropdown-toggle"
                                data-bs-toggle="dropdown"
                                to="/"
                                role="button"
                                aria-expanded="false"
                                aria-haspopup="true"
                            >
                                <SearchIcon size={18} />
                            </Link>
                            <ul className="dropdown-menu dropdown-search animated fadeIn">
                                <form className="navbar-left navbar-form nav-search">
                                    <div className="input-group">
                                        <input
                                            type="text"
                                            placeholder="Search ..."
                                            className="form-control"
                                        />
                                    </div>
                                </form>
                            </ul>
                        </li>
                        <li className="nav-item topbar-icon dropdown hidden-caret">
                            <button
                                className="nav-link dropdown-toggle"
                                onClick={() => {
                                    isAuthenticated ? toggleMenu('messages') : navigate('/login');
                                }}
                            >
                                <MailIcon size={18} />
                            </button>
                            {
                                activeMenu === 'messages' && (
                                    <ul
                                        className="dropdown-menu messages-notif-box animated fadeIn show"
                                        aria-labelledby="messageDropdown"
                                    >
                                        <li>
                                            <div
                                                className="dropdown-title d-flex justify-content-between align-items-center"
                                            >
                                                Messages
                                                <a href="#" className="small">Mark all as read</a>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="message-notif-scroll scrollbar-outer">
                                                <div className="notif-center">
                                                    <Link to="#">
                                                        <div className="notif-img">
                                                            <img
                                                                src="/assets/img/jm_denis.jpg"
                                                                alt="Img Profile"
                                                            />
                                                        </div>
                                                        <div className="notif-content">
                                                            <span className="subject">Jimmy Denis</span>
                                                            <span className="block"> How are you ? </span>
                                                            <span className="time">5 minutes ago</span>
                                                        </div>
                                                    </Link>
                                                    <a href="#">
                                                        <div className="notif-img">
                                                            <img
                                                                src="/assets/img/chadengle.jpg"
                                                                alt="Img Profile"
                                                            />
                                                        </div>
                                                        <div className="notif-content">
                                                            <span className="subject">Chad</span>
                                                            <span className="block"> Ok, Thanks ! </span>
                                                            <span className="time">12 minutes ago</span>
                                                        </div>
                                                    </a>
                                                    <a href="#">
                                                        <div className="notif-img">
                                                            <img
                                                                src="/assets/img/mlane.jpg"
                                                                alt="Img Profile"
                                                            />
                                                        </div>
                                                        <div className="notif-content">
                                                            <span className="subject">Jhon Doe</span>
                                                            <span className="block">
                                                                Ready for the meeting today...
                                                            </span>
                                                            <span className="time">12 minutes ago</span>
                                                        </div>
                                                    </a>
                                                </div>
                                            </div>
                                        </li>
                                        <li>
                                            <a className="see-all" href="javascript:void(0);"
                                            >See all messages<AngleRightIcon size={18} />
                                            </a>
                                        </li>
                                    </ul>
                                )
                            }

                        </li>
                        <li className="nav-item topbar-icon dropdown hidden-caret">
                            <button
                                onClick={() => {
                                    isAuthenticated ? toggleMenu('notifications') : navigate('/login');
                                }}
                                className="nav-link dropdown-toggle"
                            >
                                <BellIcon size={18} />
                                <span className="notification">4</span>
                            </button>
                            {
                                activeMenu === 'notifications' && (
                                    <ul
                                        className="dropdown-menu notif-box animated fadeIn show"
                                        aria-labelledby="notifDropdown"
                                    >
                                        <li>
                                            <div className="dropdown-title">
                                                You have 4 new notification
                                            </div>
                                        </li>
                                        <li>
                                            <div className="notif-scroll scrollbar-outer">
                                                <div className="notif-center">
                                                    <a href="#">
                                                        <div className="notif-icon notif-primary">
                                                            <i className="fa fa-user-plus"></i>
                                                        </div>
                                                        <div className="notif-content">
                                                            <span className="block"> New user registered </span>
                                                            <span className="time">5 minutes ago</span>
                                                        </div>
                                                    </a>
                                                    <a href="#">
                                                        <div className="notif-icon notif-success">
                                                            <i className="fa fa-comment"></i>
                                                        </div>
                                                        <div className="notif-content">
                                                            <span className="block">
                                                                Rahmad commented on Admin
                                                            </span>
                                                            <span className="time">12 minutes ago</span>
                                                        </div>
                                                    </a>
                                                    <a href="#">
                                                        <div className="notif-img">
                                                            <img
                                                                src="/assets/img/profile2.jpg"
                                                                alt="Img Profile"
                                                            />
                                                        </div>
                                                        <div className="notif-content">
                                                            <span className="block">
                                                                Reza send messages to you
                                                            </span>
                                                            <span className="time">12 minutes ago</span>
                                                        </div>
                                                    </a>
                                                    <a href="#">
                                                        <div className="notif-icon notif-danger">
                                                            <HeartIcon size={18} />
                                                        </div>
                                                        <div className="notif-content">
                                                            <span className="block"> Farrah liked Admin </span>
                                                            <span className="time">17 minutes ago</span>
                                                        </div>
                                                    </a>
                                                </div>
                                            </div>
                                        </li>
                                        <li>
                                            <a className="see-all" href="javascript:void(0);"
                                            >See all notifications<AngleRightIcon size={16} />
                                            </a>
                                        </li>
                                    </ul>
                                )
                            }

                        </li>
                        <li className="nav-item topbar-user dropdown hidden-caret">
                            <button
                                onClick={() => {
                                    isAuthenticated ? toggleMenu("usermenu") : navigate('/login');
                                }}
                                className="dropdown-toggle profile-pic border-0 bg-transparent"
                            >
                                <div className="avatar-sm">
                                    {
                                        isAuthenticated ? (
                                            <img
                                                src={userInfo?.userAvatar || "/assets/img/defautlAvatar.png"}
                                                alt="..."
                                                className="avatar-img rounded-circle"
                                            />) : (
                                            <img
                                                src="/assets/img/defautlAvatar.png"
                                                alt="..."
                                                className="avatar-img rounded-circle"
                                            />
                                        )
                                    }

                                </div>
                                {
                                    isAuthenticated ? (
                                        <span className="profile-username">
                                            <span className="fw-medium">{userInfo?.fullName || "User"}</span>
                                        </span>) : (
                                        <span className="profile-username">
                                            <span className="op-7">Hi</span>
                                        </span>
                                    )
                                }
                            </button>
                            {
                                activeMenu === 'usermenu' && (
                                    <ul className="dropdown-menu dropdown-user animated fadeIn show">
                                        <div className="dropdown-user-scroll scrollbar-outer">
                                            <li>
                                                <div className="user-box">
                                                    <div className="avatar-lg">
                                                        <img
                                                            src={userInfo?.userAvatar || "/assets/img/defautlAvatar.png"}
                                                            alt="image profile"
                                                            className="avatar-img rounded"
                                                        />
                                                    </div>
                                                    <div className="u-text">
                                                        <h4>{userInfo?.fullName}</h4>
                                                        <p className="text-muted">{userInfo?.email}</p>
                                                    </div>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="dropdown-divider"></div>
                                                <a className="dropdown-item" href="#">Trang cá nhân</a>
                                                <div className="dropdown-divider"></div>
                                                <a className="dropdown-item" href="#">Viết Blog</a>
                                                <div className="dropdown-divider"></div>
                                                <a className="dropdown-item" href="#">Bài viết của tôi</a>
                                                <div className="dropdown-divider"></div>
                                                <a className="dropdown-item" href="#">Settings</a>
                                                <div className="dropdown-divider"></div>
                                                <a onClick={handleLogOut} className="dropdown-item" href="#">Đăng xuất</a>
                                            </li>
                                        </div>
                                    </ul>
                                )
                            }

                        </li>
                    </ul>
                </div>
            </nav>
            {/* <!-- End Navbar --> */}
        </div>
    )
}

export default Header