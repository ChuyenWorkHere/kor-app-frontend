import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import api from '../../config/axiosConfig';
import toast from 'react-hot-toast';
import CircularProgress from '@mui/material/CircularProgress';

const TopUser = () => {

    const [topUsersData, setTopUsersData] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(true);
        api.get("/users/session/ranking")
            .then((response) => {
                setTopUsersData(response.data.data);
            })
            .catch((error) => {
                toast.error("Lỗi khi lấy dữ liệu người dùng");
            })
            .finally(() => {
                setLoading(false);
            })
    }, [])

    return (
        < >
            <div className="mb-2 d-flex align-items-center justify-content-between">
                <h1 className="fw-bold fs-4 mt-sm-0 ms-sm-0">
                    Top Users
                </h1>
                <a href="/top-users" className="text-decoration-none text-muted d-flex align-items-center gap-1">
                    <span className="fw-medium small">See All</span>
                    <i className='fas fa-arrow-right fs-6'></i>
                </a>
            </div>

            <div className='overflow-auto rounded border shadow' style={{ height: '400px' }}>
                {loading ? (
                    <div className='h-100 w-100 d-flex justify-content-center align-items-center'>
                        <CircularProgress size={30} />
                    </div>
                ) : (
                    <ul className="list-group no-bg" style={{ background: "transparent !important" }}>
                        {topUsersData.map(data => (
                            <Link
                                key={data.user.userId}
                                href={`/profile/${data.user.userId}`}
                                className="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
                                style={{ textDecoration: 'none' }}
                            >
                                <div className="d-flex align-items-center gap-3">
                                    <img
                                        src={data.user.userAvatar || "assets/img/defautlAvatar.png"}
                                        alt={`${data.user.username} avatar`}
                                        className="rounded-circle object-fit-cover"
                                        style={{ width: '2.7rem', height: '2.7rem' }}
                                        loading="lazy"
                                    />
                                    <div className="text-truncate" style={{ maxWidth: '10rem' }}>
                                        <div className="fw-semibold text-truncate" title={data.user.username}>{data.user.username}</div>
                                        <small className="text-muted">
                                            Got <span className="fw-semibold">{ data.minutes % 60} hours</span> on this month
                                        </small>
                                    </div>
                                </div>
                                <span className="badge bg-primary rounded-pill align-self-start" style={{ fontSize: '0.75rem' }}>
                                    Beginner
                                </span>
                            </Link>
                        ))}
                    </ul>
                )}
            </div>
        </>
    )
}

export default TopUser