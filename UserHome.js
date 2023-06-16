import React from 'react'
//import logo from "../Assets/a1.png"
import { useState,useEffect } from "react";
import axios from "axios";
const UserHome = () => {
    const uid=localStorage.getItem('user')
    const [ProductList, setProductList] = useState([])
    useEffect(() => { 
        getProducts();   
      }, []);
  
      const getProducts = async() => {
        const result = await axios.get("http://localhost:3001/productview");
        setProductList(result.data);
        console.log(result.data);
      };

      const AddCart= id =>{
        //e.preventDefault();
        //alert(id)
        axios.post(`http://localhost:3001/addcart/${id}/${uid}`,{
        }).then((response)=>{
          console.log(response);
          alert("Add to Cart Successfully")
          window.location="http://localhost:3000/userhome"
        })
        .catch(error => {
            console.log(error)
        })
      }


  return (
    <div>
      <div className='container-fluid bg-dark mt-3 p-3'>
        <div className='row'>
           
            <p><button className='btn btn-success text-white'> Welcome: {uid} </button></p>
        </div>
     </div>

     <div className='container-fluid bg-light mt-3 p-3'>
        <div className='row'>
            <h3 className='text-danger mb-3'>Hurry Up..! Buy Products..</h3>
            <div className="divider py-1 bg-success"></div>

            {
                 ProductList.map((data,index) => {
            return(<div className='col-lg-3 mt-2' key={data.id}>
                <h5> {data.product_name}</h5>
                <p> <img src={`../upload/${data.image}`} alt='not found' width={200} height={200}></img></p>
                <p> ₹ {data.price}/-</p>
                <p> <button className='btn btn-warning fw-bold text-dark' style={{width:"150px",fontSize:"18px"}} onClick={() => AddCart(data.id)}> Add Cart </button>
                <button className='btn btn-danger fw-bold text-dark' style={{width:"150px",fontSize:"18px",marginLeft:"10px"}}><a href={`/buyorder/${data.id}`} style={{textDecoration:"none",color:"white"}}>Buy </a> </button></p>
            </div>)
            }
                 )}

            
        </div>
     </div>
    </div>
  )
}

export default UserHome
