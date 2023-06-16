import axios from 'axios'
import React, { useState } from 'react'
//const uid=localStorage.getItem('user')
const AddCat = () => {
    const [cat,setCat] = useState()
    const handleChange = (e) =>{
        setCat(e.target.value);
    }
    const SubmitCat=(e)=>{
        e.preventDefault();
        axios.post("http://localhost:3001/addcat",{
         cat:cat
        }).then((response)=>{
          console.log(response);
          alert("Added Successfully")
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
                <h1> Add Category</h1>
                <form onSubmit={SubmitCat}>
                <div className='mb-3 mt-3'>
                <input type='text' value={cat} name='cat' className='form-control' placeholder='Enter Category Name' onChange={handleChange} required/> 
                </div>

                <p> <button className='btn btn-success'> Submit </button></p>
                </form>
            </div>
        </div>
        
      
    </div>
  )
}
export default AddCat
