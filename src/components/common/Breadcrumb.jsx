import React, { use } from 'react'
import { Link } from 'react-router-dom';
import { useBreadCrumb } from '../../hook/useBreadCrumb';
import { ChevronRight, HouseIcon } from 'lucide-react';

const BreadCrumb = () => {

  const breadcrumbs = useBreadCrumb();

  return (
    breadcrumbs.length > 0 && (
      <div className="background-white mb-3">
        <ul className="breadcrumbs ms-0 ps-0 border-0 text-dark d-flex align-items-start">
          <li className="nav-home">
            <Link to="/">
              <HouseIcon size={18} color='black' className='mb-1' />
            </Link>
          </li>
          {breadcrumbs.map((crumb, index) => (
            <React.Fragment key={index}>
              <li className="separator">
                <ChevronRight size={20} color='black' />
              </li>
              <li className="nav-item d-flex align-items-end">
                <Link to={crumb.link} className='text-black'
                  style={{ fontSize: "15px" }}>{crumb.name}</Link>
              </li>
            </React.Fragment>
          ))}
        </ul>
      </div>
    )
  )
}

export default BreadCrumb