import axios from 'axios'
import React, { useState } from 'react'
import login from "../Assets/login.png"

const Login = () => {
  const initialValues = {username:"",password:""}
  const [formValues,setFormvalues] = useState(initialValues)
  const[loginStatus,setLoginStatus]=useState('')

  const handleChange = (e) =>{
    const {name,value}= e.target
    setFormvalues({ ...formValues,[name]:value});
    console.log(formValues.username)
}

  const FormLogin=(e)=>{
    //console.log(formValues)
    //const logindata = JSON.stringify(formValues);
    console.log(formValues.username)
    e.preventDefault();
    axios.post("http://localhost:3001/login",{
     logindata:formValues
    
    }).then((response)=>{
      console.log(response);
      if(response.data.length>0)
      {
        let utype=response.data[0].utype
        setLoginStatus('')
        localStorage.setItem('user',formValues.username)
        localStorage.setItem('log',utype)
          if(utype==="user")
          {
            window.location = 'http://localhost:3000/userhome';
          }

          if(utype==="admin")
          {
            window.location = 'http://localhost:3000/adminhome';
          }
      }
      else
      {
        //setLoginStatus(response.data[0].username)
        setLoginStatus('Sorry..! Invalid Username or Password')
      }
    }) 
    .catch(error => {
      console.log(error)
  }) 

  }

  return (
    <div>
<div className='container mt-2' style={{width:"700px"}}>
  
            <div className='row'>
              <div className='col-lg-6 mt-3'>
                <div className='card'>
                    <div className='card-header'>
                        <h1> Login Now</h1>
                    </div>

                    <div className='card-body'>
                        <form onSubmit={FormLogin}>
                        <div className='mb-3 mt-3'>
                            <input type='email' value={formValues.username} name='username' className='form-control' placeholder='Enter your username' onChange={handleChange} required/> 
                        </div>
 
                        <div className='mb-3 mt-3'>
                            <input type='password' value={formValues.password} name='password' className='form-control' placeholder='Enter your password' onChange={handleChange} required/>
                           
                        </div>

                        <input type='submit' className='btn btn-success' value='Login'/>

                        </form>
                        <p className='text-danger'> {loginStatus}</p>
                          <p className='text-primary'><a href={`/forgotpass/`}> Forgot Password? </a> </p>

                        </div>
                </div>
            </div>

             <div className='col-lg-6'>
                <p> <img src={login} width={600} height={400} alt='login'/></p>
             </div>
            </div>
        </div>
      

       
      
    </div>
  )
}

export default Login
