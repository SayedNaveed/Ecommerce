import React from 'react'
import { useState,useEffect } from "react";
import axios from "axios";

const ProductView = () => {
    const [ProductData, setProductData] = useState([])
    useEffect(() => { 
        getProducts();  
    });
      
    const getProducts = async() => {
        const result = await axios.get(`http://localhost:3001/productview`);
        setProductData(result.data);
        console.log(result.data);
          };

          const DeleteProduct = id => {
            //alert(id)
            axios.delete(`http://localhost:3001/deleteproduct/${id}`)
            .then(response => {
                getProducts();
            
            });
          }
    
  return (
    <div>
      <div className='container-fluid mt-2'>
         <div className='row'>
            <h1>Product Details </h1>
            <table className='table table-bordered table-striped table-hover mt-2'>
               <thead className='table-primary'>
                 <tr>
                    <th> # </th>
                    <th>Category</th>
                    <th> Product Name </th>
                    <th> UoM </th>
                    <th> Qty </th>
                    <th> Price</th>
                    <th> Image </th>
                    <th> Description </th>
                    <th> Stock </th>
                    <th> Action </th>
                 </tr>
               </thead>

               <tbody>
               {
                 ProductData.map((data,index) => {
                return(<tr key={data.id}>
                    <td>{index+1}</td>
                    <td>{data.category} </td>
                    <td>{data.product_name}</td>
                    <td>{data.uom}</td>
                    <td>{data.qty} </td>
                    <td>{data.price} </td>
                    <td style={{width:"200px",textAlign:"justify"}}>{data.description} </td>
                    <td>{data.stock} </td>
                    <td><img src={`../upload/${data.image}`} alt='not found' width={100} height={100}></img> </td>
                    <td> <button className='btn btn-danger' onClick={() => DeleteProduct(data.id)}>Delete </button> </td>
                </tr>)
             })
              }
                </tbody> 
            </table>

         </div>


      </div>
    </div>
  )
}

export default ProductView
