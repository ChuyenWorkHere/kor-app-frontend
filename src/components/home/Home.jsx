import React from 'react'
import Sidebar from '../common/Sidebar'
import TopUser from './TopUser'
import ProcessCard from './ProcessCard'
import Banner from './Banner'
import ChatCard from './ChatCard'
import Features from './Features'
import Certificates from './Certificates'
import Deal from './Deal'

const Home = () => {
  return (
    <>
      <div className="row gap-sm-0 gap-2 mb-4">
        <div className="col-sm-12 col-md-6 p-1" style={{ "height": "208px" }}>
          <Banner />
        </div>
        <div className="col-sm-6 col-md-3 p-1" style={{ "height": "208px" }}>
          <ProcessCard />
        </div>
        <div className="col-sm-6 col-md-3 p-1" style={{ "height": "208px" }}>
          <ChatCard />
        </div>
      </div>

      <div className="row">
        <div className="col-sm-12 col-md-9">
          <div className='row'>
            <div className='col-md-8'>
              <div className='row'>
                <div className="col-12 container">
                  <Features />
                </div>
                <div className='col-12 container'>
                  <Certificates />
                </div>


              </div>
            </div>
            <div className='col-md-4'>
              <div className='row'>
                <div className='col-12 container'>
                  <Deal />
                </div>
                <div className='col-12'>
                  {/* Book */}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-sm-12 col-md-3">
          <TopUser />
        </div>
      </div>
    </>
  )
}

export default Home