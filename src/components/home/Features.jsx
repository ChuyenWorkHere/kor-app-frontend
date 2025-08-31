import React from 'react'

const Features = () => {

    const features = [
        { title: "Grammar", img: "https://media.fluentez.com/uploads/uploads/3bH3aLx2ML5ID_Pt7wNz3.webp" },
        { title: "Listening", img: "https://media.fluentez.com/uploads/uploads/eY5kAHCvvrWSWQVvIKXYO.webp" },
        { title: "Reading", img: "https://media.fluentez.com/uploads/uploads/VVghU8GJNfhOe5Qx9pHLE.webp" },
        { title: "Writing", img: "https://media.fluentez.com/uploads/uploads/F-efvIUpgAmxKIYgjdtZ1.webp" }
    ]

    return (
        <>
            <div className="mb-2 d-flex align-items-center justify-content-between">
                <h1 className="fw-bold fs-4 ms-5 ms-sm-0">Top Features</h1>
            </div>

            <ul className="d-flex align-items-center gap-3 pb-1 ps-0 flex-wrap flex-lg-nowrap overflow-lg-auto justify-content-center overflow-auto">
                {features.map((item, index) => (
                    <li
                        key={index}
                        className="d-flex flex-column align-items-center justify-content-center rounded p-2"
                        style={{
                            backgroundColor: "#9aabab47",
                            minHeight: "158px",
                            minWidth: "135px",
                            maxWidth: "135px",
                            cursor: "pointer"
                        }}
                    >
                        <img src={item.img} alt={item.title} className="img-fluid mx-auto" loading="lazy" />
                        <h2 className="text-center fw-semibold fs-6 mt-2">{item.title}</h2>
                    </li>
                ))}
            </ul>
        </>
    )
}

export default Features