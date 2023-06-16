import axios from 'axios'
import React, { useState } from 'react'
import { useParams} from 'react-router-dom';

let uid=localStorage.getItem('user');

const SendOrder = () => {
    const { id } = useParams();
    console.log("Item Id: "+id)
    const [qty,setQty] = useState(1)

    const handleChange = (e) =>{
        setQty(e.target.value);
        console.log(e.target.value);
    }

    const SendQty=(e)=>{
        e.preventDefault();
        axios.post(`http://localhost:3001/sendorder/${id}`,{
         qty:qty,
         id:id,
         uid:uid
        }).then((response)=>{
          console.log(response);
          alert("Order has been placed successfully")
          window.location="http://localhost:3000/userhome"
        })
        .catch(error => {
            console.log(error)
        })
    }


  return (
    <div>
        <div className='container mt-3'>
            <div className='row'>
                <div className='col-lg-6'>
                <h1 className='text-primary'> Buy Product</h1>
                <form onSubmit={SendQty}>
                    <div className='mt-3 mb-3'>
                        <input type='number' min={1} value={qty} onChange={handleChange} required name='qty' className='form-control'/>
                    </div>
                    <p> <button className='btn btn-outline-success' style={{width:"200px"}}> Send </button></p>
                </form>
                </div>

                
            </div>
        </div>
      
    </div>
  )
}

export default SendOrder
