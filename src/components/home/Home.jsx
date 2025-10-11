import React from 'react'
import TopUser from './TopUser'
import ProcessCard from './ProcessCard'
import Banner from './Banner'
import ChatCard from './ChatCard'
import Features from './Features'
import Certificates from './Certificates'
import Deal from './Deal'
import Book from './Book'

const Home = () => {
  return (
    <>
      <div className="row gap-sm-0 gap-2 mb-4">
        <div className="col-sm-12 col-lg-6 mb-sm-3 mb-lg-0" style={{ "height": "208px" }}>
          <Banner />
        </div>
        <div className="col-sm-6 col-lg-3" style={{ "height": "208px" }}>
          <ProcessCard />
        </div>
        <div className="col-sm-6 col-lg-3" style={{ "height": "208px" }}>
          <ChatCard />
        </div>
      </div>

      <div className="row">
        <div className="col-sm-12 col-md-9">
          <div className='row'>
            <div className='col-12'>
              <div className='row'>
                <div className="col-sm-8 col-12">
                  <Features />
                </div>
                <div className='col-sm-4 col-12'>
                  <Deal />
                </div>
                
              </div>
            </div>
            <div className='col-12'>
              <div className='row'>
                <div className='col-sm-8 col-12'>
                  <Certificates />
                </div>
                <div className='col-sm-4 col-12'>
                  <Book />
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