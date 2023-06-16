import axios from 'axios'
import React, { useState } from 'react'

const Forgotpass = () => {
    const[email,setEmail]=useState('')
    const[status,setStatus]=useState('')

    const handleChange = (e) =>{
        //const {name,value}= e.target
        setEmail(e.target.value);
        console.log(e.target.value)
    }

    const SubmitForgotPassword=(e)=>{
       
        //console.log(formValues.username)
        e.preventDefault();
        axios.post("http://localhost:3001/forgotpass",{
         email:email
        
        }).then((response)=>{
          console.log(response);
          if(response.data.length>0)
          {
            localStorage.setItem('user',email)
            window.location="http://localhost:3000/otp/"
          }
          else
          {
            setStatus('Sorry..! Invalid Email')
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
                <div className='card'>
                    <div className='card-header'>
                        <h1> ForgotPassword</h1>
                    </div>

                    <div className='card-body'>
                        <form onSubmit={SubmitForgotPassword}>
                        <div className='mb-3 mt-3'>
                            <input type='email' value={email} name='email' className='form-control' 
                            placeholder='Enter your email'  required onChange={handleChange}/> 
                        </div>
 
                        <input type='submit' className='btn btn-success' value='Forgotpassword'/>

                        </form>
                       
                         <p className='text-danger'> {status}</p>
                        </div>
                        <p className='text-primary'><a href={`/login/`} style={{textDecoration:"none"}}> Go Back </a> </p>
                </div>
            </div>
        </div>
      


      
    </div>
  )
}

export default Forgotpass
