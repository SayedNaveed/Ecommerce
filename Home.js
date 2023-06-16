import React from 'react'
import about from "../Assets/about.png"
import slider1 from "../Assets/slider1.jpg"
import slider2 from "../Assets/slider2.png"
import slider3 from "../Assets/slider3.jpg"

const Home = () => {
  return(
    <div>
      <div id="demo" className="carousel slide" data-bs-ride="carousel">

  <div className="carousel-indicators">
    <button type="button" data-bs-target="#demo" data-bs-slide-to="0" className="active"></button>
    <button type="button" data-bs-target="#demo" data-bs-slide-to="1"></button>
    <button type="button" data-bs-target="#demo" data-bs-slide-to="2"></button>
  </div>

 
  <div className="carousel-inner">
    <div className="carousel-item active">
      <img src={slider1} alt="slide1" className="d-block w-100"/>
    </div>
    <div class="carousel-item">
      <img src={slider2} alt="slide2" className="d-block w-100"/>
    </div>
    <div className="carousel-item">
      <img src={slider3} alt="slide3" className="d-block w-100"/>
    </div>
  </div>

  
  <button className="carousel-control-prev" type="button" data-bs-target="#demo" data-bs-slide="prev">
    <span className="carousel-control-prev-icon"></span>
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#demo" data-bs-slide="next">
    <span className="carousel-control-next-icon"></span>
  </button>
</div>

     <div className='container-fluid bg-light mt-3 p-3'>
        <div className='row'>
            <h3 className='text-danger'>Welcome to E-Shopping Cart</h3>
            <div className="divider py-1 bg-success"></div>
            <div className='col-lg-6 mt-3'>
              <h1>Why Ecommerce?</h1>
              <p style={{textAlign: "justify"}}> 
The value for global online home decor market is forecast to reach USD 348.3 billion 
by 2027. Furniture has been 
topping the charts of the most selling products across many eCommerce platforms

It originated in the United States and was initially selling books online. Since it entered India in 2010, the company has grown enormously. It is currently the most popular eCommerce platform in India. 
Amazon sells books, clothes, electronics, toys, personal care items, and many more items</p>

<p>Moreover, customers now have access to virtual stores 24/7. e-Commerce also leads to significant transaction cost reduction for consumers. e-commerce has emerged as one of the 
  fast-growing trade channels available for the cross-border trade of goods and services</p>
            </div>

            <div className='col-lg-6 mt-3'>
              <p> <img src={about} width={700} height={400} alt='not found'></img></p>
            </div>
          
        </div>
     </div>
    </div>
  )
}

export default Home
