import React from 'react'
import { useState,useEffect } from "react";
import axios from "axios";
import { useParams} from 'react-router-dom';
const uid=localStorage.getItem('user')

const CatWise = () => {
    const { cat } = useParams();
   
    const [ProductList, setProductList] = useState([])

    useEffect(() => { 
        getCatWiseProducts();   
      });
  
      const getCatWiseProducts = async() => {
        const result = await axios.get(`http://localhost:3001/cat_wise/${cat}`);
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

<div className='container-fluid bg-light mt-3 p-3'>
        <div className='row'>
            <h3 className='text-danger'>List of {cat} Items</h3>
            <div className="divider py-1 bg-success"></div>
            {
              ProductList.map((food,index) => {
            
            return(
              <>
              
            <div className='col-lg-3 mt-3' >
                <input type='hidden' value={index+1}></input>
                <h2 key={food.id}> {food.product_name}</h2>
                <p> <img src={`../upload/${food.image}`} alt='not found' width={200} height={200}></img></p>
                <p> ₹ {food.price}/-</p>
                <p> <button className='btn btn-warning fw-bold text-dark' style={{width:"150px",fontSize:"18px"}} onClick={() => AddCart(food.id)}> Add Cart </button>
                <button className='btn btn-danger fw-bold text-dark' style={{width:"100px",fontSize:"18px",marginLeft:"10px"}}><a href={`/buyorder/${food.id}`} style={{textDecoration:"none",color:"white"}}>Buy </a> </button></p>

            </div>
            </>
            )
            }
              )};
           
        </div>
     </div>
      
    </div>
  )
}

export default CatWise
