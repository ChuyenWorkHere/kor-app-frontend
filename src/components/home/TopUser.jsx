import React from 'react'

const topUsersData = [
    {
        id: 'kieuthanh34671',
        name: 'Kieu Thanh',
        avatar: 'https://lh3.googleusercontent.com/a/ACg8ocIj9L3WKREAIfBYSSV2ofoELahdr_pIy7K90u6IKBAM6BkYaDc=s96-c',
        hours: 156,
        level: 6,
        levelBg: '6.DAldF7SY.gif',
    },
    {
        id: 'uyentran4440',
        name: 'uyen tran',
        avatar: 'https://lh3.googleusercontent.com/a/ACg8ocLgsF1jzRj1Rd3IIv8MhdAAgif9srxCGAlsVAvIxOeynWaEwg=s96-c',
        hours: 128,
        level: 7,
        levelBg: '7.BVH_sgiP.gif',
    },
    {
        id: 'uyentran4441',
        name: 'uyen tran',
        avatar: 'https://lh3.googleusercontent.com/a/ACg8ocLgsF1jzRj1Rd3IIv8MhdAAgif9srxCGAlsVAvIxOeynWaEwg=s96-c',
        hours: 128,
        level: 7,
        levelBg: '7.BVH_sgiP.gif',
    },
    {
        id: 'uyentran4442',
        name: 'uyen tran',
        avatar: 'https://lh3.googleusercontent.com/a/ACg8ocLgsF1jzRj1Rd3IIv8MhdAAgif9srxCGAlsVAvIxOeynWaEwg=s96-c',
        hours: 128,
        level: 7,
        levelBg: '7.BVH_sgiP.gif',
    },
    {
        id: 'uyentran4443',
        name: 'uyen tran',
        avatar: 'https://lh3.googleusercontent.com/a/ACg8ocLgsF1jzRj1Rd3IIv8MhdAAgif9srxCGAlsVAvIxOeynWaEwg=s96-c',
        hours: 128,
        level: 7,
        levelBg: '7.BVH_sgiP.gif',
    },
    {
        id: 'uyentran4444',
        name: 'uyen tran',
        avatar: 'https://lh3.googleusercontent.com/a/ACg8ocLgsF1jzRj1Rd3IIv8MhdAAgif9srxCGAlsVAvIxOeynWaEwg=s96-c',
        hours: 128,
        level: 7,
        levelBg: '7.BVH_sgiP.gif',
    },
    {
        id: 'uyentran4445',
        name: 'uyen tran',
        avatar: 'https://lh3.googleusercontent.com/a/ACg8ocLgsF1jzRj1Rd3IIv8MhdAAgif9srxCGAlsVAvIxOeynWaEwg=s96-c',
        hours: 128,
        level: 7,
        levelBg: '7.BVH_sgiP.gif',
    },
    {
        id: 'uyentran4446',
        name: 'uyen tran',
        avatar: 'https://lh3.googleusercontent.com/a/ACg8ocLgsF1jzRj1Rd3IIv8MhdAAgif9srxCGAlsVAvIxOeynWaEwg=s96-c',
        hours: 128,
        level: 7,
        levelBg: '7.BVH_sgiP.gif',
    },
    {
        id: 'uyentran4447',
        name: 'uyen tran',
        avatar: 'https://lh3.googleusercontent.com/a/ACg8ocLgsF1jzRj1Rd3IIv8MhdAAgif9srxCGAlsVAvIxOeynWaEwg=s96-c',
        hours: 128,
        level: 7,
        levelBg: '7.BVH_sgiP.gif',
    },
    {
        id: 'uyentran4448',
        name: 'uyen tran',
        avatar: 'https://lh3.googleusercontent.com/a/ACg8ocLgsF1jzRj1Rd3IIv8MhdAAgif9srxCGAlsVAvIxOeynWaEwg=s96-c',
        hours: 128,
        level: 7,
        levelBg: '7.BVH_sgiP.gif',
    },

];

const TopUser = () => {
    return (
        < >
            <div className="mb-2 d-flex align-items-center justify-content-between">
                <h1 className="fw-bold fs-4 ms-4 mt-5 mt-sm-0 ms-sm-0">
                    Top Users
                </h1>
                <a href="/top-users" className="text-decoration-none text-muted d-flex align-items-center gap-1">
                    <span className="fw-medium small">See All</span>
                    <i className='fas fa-arrow-right fs-6'></i>
                </a>
            </div>

            <div style={{ maxHeight: '400px', overflowX: 'hidden', scrollbarWidth: 'none' }}>
                <ul className="list-group">
                    {topUsersData.map(user => (
                        <a
                            key={user.id}
                            href={`/profile/${user.id}`}
                            className="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
                            style={{ textDecoration: 'none' }}
                        >
                            <div className="d-flex align-items-center gap-3">
                                <img
                                    src={user.avatar}
                                    alt={`${user.name} avatar`}
                                    className="rounded-circle"
                                    style={{ width: '2.7rem', height: '2.7rem', objectFit: 'cover' }}
                                    loading="lazy"
                                    referrerPolicy="no-referrer"
                                />
                                <div className="text-truncate" style={{ maxWidth: '10rem' }}>
                                    <div className="fw-semibold text-truncate" title={user.name}>{user.name}</div>
                                    <small className="text-muted">
                                        Got <span className="fw-semibold">{user.hours} hours</span> on this month
                                    </small>
                                </div>
                            </div>
                            <span className="badge bg-primary rounded-pill align-self-start" style={{ fontSize: '0.75rem' }}>
                                level {user.level}
                            </span>
                        </a>
                    ))}
                </ul>
            </div>
        </>
    )
}

export default TopUser