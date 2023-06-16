import React from 'react'

const Contact = () => {
  return (
    <div>
      <div className='container-fluid mt-2 bg-warning fw-bold'>
        <div className='row'>
       
        <div className='col-lg-6'>
        <h1> Send Message Us </h1>
          <p> Food is any substance consumed by an organism for nutritional support.
             Food is usually of plant, animal, or fungal origin, and contains essential nutrients,
             such as carbohydrates, fats, proteins, vitamins, or minerals
          </p>
        </div>

        <div className='col-lg-6'>
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3857.1330095342887!2d74.12750307458757!3d14.817791285694685!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bbe60b5ef0863ed%3A0xfc6b798db9f77130!2sKarwar%20Institute%20of%20Medical%20Sciences!5e0!3m2!1sen!2sin!4v1683383025421!5m2!1sen!2sin" width={600} height={450} style={{border:"0px"}} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade" title='map'></iframe>
        </div>
        </div>
      
      </div>
    </div>
  )
}

export default Contact
