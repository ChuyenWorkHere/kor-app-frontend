import React, { use } from 'react'
import { FaAngleRight, FaHome } from 'react-icons/fa';
import { Link, useLocation, useParams, useSearchParams } from 'react-router-dom';
import { LiaAngleRightSolid } from "react-icons/lia";
import { IoHomeOutline } from "react-icons/io5";
import { useBreadCrumb } from '../../hook/useBreadCrumb';

const BreadCrumb = () => {
  
  const breadcrumbs = useBreadCrumb();
  
  return (
    <div className="background-white mb-3">
      <ul className="breadcrumbs ms-0 ps-0 ">
        <li className="nav-home">
          <Link to="/">
            <IoHomeOutline size={18} className='mb-1' />
          </Link>
        </li>
        {breadcrumbs.map((crumb, index) => (
          <React.Fragment key={index}>
            <li className="separator">
                <LiaAngleRightSolid size={16} />
            </li>
            <li className="nav-item">
              <Link to={crumb.link}>{crumb.name}</Link>
            </li>
          </React.Fragment>
        ))}
      </ul>
      </div>
  )
}

export default BreadCrumb