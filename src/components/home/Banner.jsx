import React from 'react'

const Banner = () => {
    return (
        <div className="h-100 w-100 position-relative">
            <video src="assets/video/christmas_home.mp4" className="w-100 h-100 object-fit-cover position-absolute rounded-3" loop autoPlay muted playsInline></video>
            <div className="position-absolute top-50 start-50 w-100 translate-middle px-2 text-center text-white">
                <h1 className="mb-2 fw-bold text-white text-nowrap fs-2 
             fs-md-5 fs-lg-2 fs-xl-1">
                    Explore many exciting courses
                </h1>
                <p className="mb-5 text-white text-wrap text-md-break text-lg fs-5 text-sm-center">
                    Free English skills development platform. You can access necessary features in the sidebar
                </p>
            </div>
        </div>
    )
}

export default Banner