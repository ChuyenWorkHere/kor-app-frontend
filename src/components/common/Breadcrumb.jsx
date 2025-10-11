import React, { use } from 'react'
import { Link} from 'react-router-dom';
import { useBreadCrumb } from '../../hook/useBreadCrumb';
import { ChevronRight, HouseIcon } from 'lucide-react';

const BreadCrumb = () => {
  
  const breadcrumbs = useBreadCrumb();
  
  return (
    <div className="background-white mb-3">
      <ul className="breadcrumbs ms-0 ps-0 border-0 text-white d-flex">
        <li className="nav-home">
          <Link to="/">
            <HouseIcon size={18} color='white' />
          </Link>
        </li>
        {breadcrumbs.map((crumb, index) => (
          <React.Fragment key={index}>
            <li className="separator">
                <ChevronRight size={20} color='white'/>
            </li>
            <li className="nav-item d-flex align-items-end">
              <Link to={crumb.link} className='text-white' 
              style={{ fontSize: "15px"}}>{crumb.name}</Link>
            </li>
          </React.Fragment>
        ))}
      </ul>
      </div>
  )
}

export default BreadCrumb