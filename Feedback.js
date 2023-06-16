import axios from 'axios'
import React, { useState } from 'react'

const uid=localStorage.getItem('user')

const Feedback = () => {
    const initialValues = {about_product:"",about_service:"",comments:""}
    const [formValues,setFormvalues] = useState(initialValues)

    const handleChange = (e) =>{
        const {name,value}= e.target
        setFormvalues({ ...formValues,[name]:value});
        console.log(formValues.fullname)
    }

    const FormFeedback=(e)=>{
        e.preventDefault();
        axios.post("http://localhost:3001/feedback",{
         feeddata:formValues,
         uid:uid
        }).then((response)=>{
          console.log(response);
          alert("Thank you for your feedback")
          //window.location="http://localhost:3000/userhome"
        })
        .catch(error => {
            console.log(error)
        })
    }

  return (
    <div>

        <div className='container mt-3'>
            <div className='row'>
                <h1> Send Your Valid Feedack</h1>
                <form onSubmit={FormFeedback}>
                <div className='mb-3 mt-3'>
                <input type='text' value={formValues.about_product} name='about_product' className='form-control' placeholder='about product' onChange={handleChange} required/> 
                </div>

                <div className='mb-3 mt-3'>
                <input type='text' value={formValues.about_service} name='about_service' className='form-control' placeholder='about service' onChange={handleChange} required/> 
                </div>

                <div className='mb-3 mt-3'>
                <input type='text' value={formValues.comments} name='comments' className='form-control' placeholder='comments' onChange={handleChange} required/> 
                </div>

                <p> <button className='btn btn-success'> Feedback </button></p>
                </form>
            </div>
        </div>
        
      
    </div>
  )
}

export default Feedback
