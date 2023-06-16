import logo from "../../Assets/ecommerce_logo.webp"
import { useState,useEffect } from "react";
import axios from "axios";
const utype=localStorage.getItem('log')
const uid=localStorage.getItem('user')
console.log(uid)

const Navbar = () => {
  const [CategoryList, setCategoryList] = useState([])
  //const [CartCount, setCartCount] = useState(0)

  useEffect(() => { 
    getCategory();   
  },[]);

  const getCategory = async() => {
    const result = await axios.get(`http://localhost:3001/catview`);
    setCategoryList(result.data);
    //console.log(result.data);
  };


  // useEffect(() => { 
  //   getCartCount();   
  // });

  // const getCartCount = async() => {
  // const count = await axios.get(`http://localhost:3001/cartcount/${uid}`);
  // setCartCount(count);
  // console.log(count);
  // };

  const logout= ()=>{
    localStorage.clear()
    window.location = 'http://localhost:3000/login';
  }

  if(utype==="user")
  {
  return (
    <div>
      <nav className='navbar navbar-expand-sm bg-primary navbar-dark fw-bold text-white'>
            <div className='container-fluid'>
                <span className='text-brand text-white fs-2'><img src={logo} width={100} height={100} alt='Not Found' className='rounded-circle'/>E-Cart</span>
                <ul className='navbar-nav'>
                    <li className='nav-item'><a href='/userhome'  className='nav-link'> Home </a></li>
                    <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="/userhome" role="button" data-bs-toggle="dropdown">Category</a>
                    <ul class="dropdown-menu">
                    {
                      CategoryList.map((cat,index) => {
                        let loc = "http://localhost:3000/cat_wise/"+cat.category;
                        return(<li key={cat.id}><a className="dropdown-item" href={loc}>{cat.category}</a></li>
                      )
                    }
                    )}
                  </ul>
                  </li>
                    <li className='nav-item'><a href='/myorder'  className='nav-link'> My Orders </a></li>
                    <li className='nav-item'><a href='/mycart'  className='nav-link'> <i className='fa fa-shopping-cart text-dark fs-2'> </i> <span className="badge bg-primary">{2}</span> </a></li>
                    <li className='nav-item'><a href='/feedback'  className='nav-link'>Feedback </a></li>
                    <li className='nav-item'><button className='btn btn-danger' onClick={logout}> Logout </button> </li>
                    
                </ul>
            </div>
        </nav>
    </div>
  )
}


else if(utype==="admin")
{
return (
  <div>
    <nav className='navbar navbar-expand-sm bg-primary navbar-dark fw-bold text-white'>
          <div className='container-fluid'>
              <span className='text-brand text-white fs-2'>DashBoard|Admin</span>
              <ul className='navbar-nav'>
                  <li className='nav-item'><a href='/adminhome'  className='nav-link'> Home </a></li>
                  
                  <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" href="/adminhome" role="button" data-bs-toggle="dropdown">Category</a>
                    <ul className="dropdown-menu">
                     <li><a className="dropdown-item" href="/addcat"> Add </a></li>
                     <li><a className="dropdown-item" href="/catview"> View </a></li>  
                   </ul>
                </li>

                 
                <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" href="/adminhome" role="button" data-bs-toggle="dropdown">Product</a>
                    <ul className="dropdown-menu">
                     <li><a className="dropdown-item" href="/addproduct"> Add </a></li>
                     <li><a className="dropdown-item" href="/productview"> View </a></li>  
                   </ul>
                </li>
                  <li className='nav-item'><a href='/vieworders'  className='nav-link'> View Orders </a></li>
                  <li className='nav-item'><a href='/viewfeedback'  className='nav-link'> Feedback </a></li>
                  <li className='nav-item'><button className='btn btn-danger' onClick={logout}> Logout </button> </li>
              </ul>
          </div>
      </nav>
  </div>
)
}

else 
{

  return (
    <div>
      <nav className='navbar navbar-expand-sm bg-primary navbar-dark fw-bold text-white'>
            <div className='container-fluid'>
                <span className='text-brand text-white fs-2'><img src={logo} width={100} height={100} alt='Not Found' className='rounded-circle'/>E-CART</span>
                <ul className='navbar-nav'>
                    <li className='nav-item'><a href='/'  className='nav-link'> Home </a></li>
                    <li className='nav-item'><a href='/about'  className='nav-link'> About </a></li>
                    <li className='nav-item'><a href='/signup'  className='nav-link'> SignUp </a></li>
                    <li className='nav-item'><a href='/login'  className='nav-link'> Login </a></li>
                    
                </ul>
            </div>
        </nav>
      
    </div>
  )

}
}

export default Navbar
