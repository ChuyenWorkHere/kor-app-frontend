import { Inbox } from 'lucide-react'
import React from 'react'

const Empty = () => {
    return (
        <div
            className='d-flex flex-column justify-content-center align-items-center gap-2'
            style={{ minHeight: "350px" }}
        >
            <Inbox size={50} color='blue' />
            <h5 className='ms-2'> Bạn hiện tại chưa có bộ từ vựng nào</h5>
        </div>
    )
}

export default Empty