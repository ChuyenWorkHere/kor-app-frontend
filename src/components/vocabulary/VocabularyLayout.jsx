import React, { useState } from 'react'
import { useBreadCrumb } from '../../hook/useBreadCrumb';
import { Outlet } from 'react-router-dom';

const VocabularyLayout = () => {

    useBreadCrumb({ tab: "Vocabulary", tabLink: "/vocabulary" });
    
    return (
        <div className="">
            <div className="py-0">
                <Outlet />
            </div>
        </div>
    )
}

export default VocabularyLayout