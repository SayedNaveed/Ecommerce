import axios from 'axios'
import React, { useState } from 'react'



const SignUp = () => {
    const initialValues = {fullname:"",city:"",address:"",pincode:"",email:"",password:"",
    contact:""}
    const [formValues,setFormvalues] = useState(initialValues)

    const handleChange = (e) =>{
        const {name,value}= e.target
        setFormvalues({ ...formValues,[name]:value});
        //console.log(formValues)
        console.log(formValues.fullname)
    }

    const FormSignUp=(e)=>{
        e.preventDefault();
        axios.post("http://localhost:3001/signup",{
         signupdata:formValues
        }).then((response)=>{
          console.log(response);
          alert("Thank you for Registration")
          window.location="http://localhost:3000/login"
        })
        .catch(error => {
            console.log(error)
        })
    }
  return (
    <div>
        <div className='container'>
            <div className='row'>
                <h1> Create An Account </h1>
            <form onSubmit={FormSignUp}>
                        <div className='mb-3 mt-3'>
                            <input type='text' value={formValues.fullname} name='fullname' className='form-control' placeholder='Enter your Full Name' onChange={handleChange} required/> 
                        </div>
 
                        <div className='mb-3 mt-3'>
                            <input type='text' value={formValues.city} name='city' className='form-control' placeholder='Enter your City' onChange={handleChange} required/>
                           
                        </div>

                        <div className='mb-3 mt-3'>
                            <input type='text' value={formValues.address} name='address' className='form-control' placeholder='Enter your Address' onChange={handleChange} required/>
                           
                        </div>

                        <div className='mb-3 mt-3'>
                            <input type='text' value={formValues.pincode} name='pincode' className='form-control' placeholder='Enter your Pincode' onChange={handleChange} required/>
                           
                        </div>

                        <div className='mb-3 mt-3'>
                            <input type='email' value={formValues.email} name='email' className='form-control' placeholder='Enter your email' onChange={handleChange} required/>
                           
                        </div>
                        <div className='mb-3 mt-3'>
                            <input type='password' value={formValues.password} name='password' className='form-control' placeholder='Enter your password' onChange={handleChange} required/>
                           
                        </div>

                        <div className='mb-3 mt-3'>
                            <input type='text' value={formValues.contact} name='contact' className='form-control' placeholder='Enter your contact' onChange={handleChange} required/>
                           
                        </div>

                        <input type='submit' className='btn btn-success'/>

                        </form>
            </div>
        </div>
      
    </div>
  )
}

export default SignUp
