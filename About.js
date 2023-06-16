import React from 'react'
import about from "../Assets/about2.png"

const About = () => {
  return (
    <div>
      <div className='container-fluid mt-2 bg-light'>
        <div className='row'>
       
        <div className='col-lg-6'>
        <h1> About Us </h1>
          <p style={{textAlign:"justify"}}> The "Online E-commerce System" has been developed to override the problems prevailing in the practicing manual system. This software is supported to eliminate and in some cases reduce the hardships faced by this existing system. Moreover this system is designed for the particular
             need of the company to carry out operations in a smooth and effective manner.
             The application is reduced as much as possible to avoid errors while entering the data. It also provides error message while entering invalid data. No formal knowledge is needed for the user to use this system. Thus by this all it proves it is user-friendly. Online E-commerce System, as described above, can lead to error free, secure, reliable and fast management system. It can assist the user to concentrate on their other activities rather to concentrate on the record keeping. 
             Thus it will help organization in better utilization of resources
          </p>
        </div>

        <div className='col-lg-6 bg-light'>
          <img src={about} alt='about' width={400} height={400}></img>
        </div>
        </div>
      
      </div>
    </div>
  )
}

export default About
