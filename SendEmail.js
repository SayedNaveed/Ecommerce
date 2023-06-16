import axios from 'axios'
import React, { useState } from 'react'

const SendEmail = () => {
    const initialValues = {email:"",subject:"",message:""}
    const [formValues,setFormvalues] = useState(initialValues)
    const[msg,setMsg]=useState('');

    const handleChange = (e) =>{
        const {name,value}= e.target
        setFormvalues({ ...formValues,[name]:value});
        //console.log(formValues)
        console.log(formValues.email)
    }

    const AddEmail=(e)=>{
        e.preventDefault();
        axios.post("http://localhost:3001/sendmail",{
         emaildata:formValues
        }).then((response)=>{
            setMsg(response.data.respMesg);
          //console.log(response);
        //   alert("Email has been sent successfully")
        //   window.location="http://localhost:3000/login"
        })
        .catch(error => {
            console.log(error)
        })
    }


  return (
    <div>
      <div className='container'>
        <div className='row'>
            <form onSubmit={AddEmail}>
                <p style={{color:"red"}}> {msg}</p>
                <div className='mt-3 mb-3'>
                    <label>Email</label>
                    <input type='email' name='t1'  value={formValues.email} onChange={handleChange} className='form-control' required/>
                </div>
                <div className='mt-3 mb-3'>
                    <label>Subject</label>
                    <input type='text' name='t2' className='form-control' value={formValues.subject} onChange={handleChange}/>
                </div>

                <div className='mt-3 mb-3'>
                    <label>Message</label>
                    <input type='text' name='t3' className='form-control' value={formValues.message} onChange={handleChange}/>
                </div>

                <button className='btn btn-primary'> Send Message </button>
            </form>
        </div>
      </div>
    </div>
  )
}

export default SendEmail
