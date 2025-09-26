import React from 'react'
import ActionButton from './ActionButton'
import { TiDocumentAdd } from "react-icons/ti";
import { CgTranscript } from "react-icons/cg";
import { HiOutlineDocumentSearch } from "react-icons/hi";
import { IoBarChartSharp } from "react-icons/io5";
import TermCard from './TermCard';
import FolderItemCard from './FolderItemCard';

const Vocabulary = () => {
    return (
        <div className="">
            <div className="py-0">
                <ul className="nav nav-tabs nav-line nav-color-secondary" id="line-tab" role="tablist">
                    <li className="nav-item submenu" role="presentation">
                        <a className="nav-link py-0 active" id="line-home-tab" data-bs-toggle="pill" href="#line-home" role="tab" aria-controls="pills-home" aria-selected="true" tabIndex="-1">Học phần của bạn</a>
                    </li>
                    <li className="nav-item submenu" role="presentation">
                        <a className="nav-link py-0" id="line-profile-tab" data-bs-toggle="pill" href="#line-profile" role="tab" aria-controls="pills-profile" aria-selected="false">Học phần public</a>
                    </li>
                    <li className="nav-item submenu" role="presentation">
                        <a className="nav-link  py-0" id="line-contact-tab" data-bs-toggle="pill" href="#line-contact" role="tab" aria-controls="pills-contact" aria-selected="false" tabIndex="-1">Nhóm học phần</a>
                    </li>
                </ul>


                <div className="tab-content mt-3 mb-3" id="line-tabContent">
                    <div className="tab-pane fade active show" id="line-home" role="tabpanel" aria-labelledby="line-home-tab">
                        <div className="my-4 d-flex flex-wrap align-items-center gap-2">
                            <ActionButton icon={TiDocumentAdd} label="Tạo học phần" bgColor="#7d8ca3" />
                            <ActionButton icon={CgTranscript} label="Phiên âm" bgColor="#fecaca" />
                            <ActionButton icon={HiOutlineDocumentSearch} label="Trích xuất" bgColor="#dbc7fd" />
                            <ActionButton icon={IoBarChartSharp} label="CEFR Level" bgColor="#d4ddee" />
                        </div>

                        <div className='row gy-3 ms-auto'>
                            <TermCard />
                            <TermCard />
                            <TermCard />
                            <TermCard />
                            <TermCard />
                            <TermCard />
                            <TermCard />
                        </div>

                    </div>
                    <div className="tab-pane fade" id="line-profile" role="tabpanel" aria-labelledby="line-profile-tab">
                        <div className='row gy-3 ms-auto'>
                            <TermCard />
                            <TermCard />
                            <TermCard />
                            <TermCard />
                            <TermCard />
                            <TermCard />
                            <TermCard />
                        </div>
                    </div>
                    <div className="tab-pane fade" id="line-contact" role="tabpanel" aria-labelledby="line-contact-tab">
                        <div className="my-4 d-flex flex-wrap align-items-center gap-2">
                            <ActionButton icon={TiDocumentAdd} label="Tạo thư mục" bgColor="#7d8ca3" />
                        </div>
                        <div className='row gy-3 ms-auto'>
                            <FolderItemCard />
                            <FolderItemCard />
                            <FolderItemCard />
                            <FolderItemCard />
                            <FolderItemCard />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Vocabulary