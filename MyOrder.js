import React from 'react'
import { useState,useEffect } from "react";
import axios from "axios";
const uid=localStorage.getItem('user')
const MyOrder = () => {
    //const status="pending";
    
    const [MyOrderList, setMyOrderList] = useState([])

    useEffect(() => { 
        getMyOrders();   
      }, []);
  
      const getMyOrders = async() => {
        const result = await axios.get(`http://localhost:3001/myorder/${uid}`);
        setMyOrderList(result.data);
        console.log(result.data);
      };

      

    
  return (
    <div>

        <div className='container mt-2 '>
            <div className='row'>
                <h1 className='mt-3'> My Order Details</h1>
                <table className='table table-bordered table-striped table-hover mt-3'>
                    <thead className='table-success'>
                        <tr>
                            <th>#</th>
                            <th> Product Name</th>
                            <th> Qty</th>
                            <th> Price </th>
                            <th> Total </th>
                            <th> Order Date</th>
                            <th> Order Time </th>
                            <th> Order Status </th>
                            <th> payment Status </th>
                            <th colSpan={2} align='center' className='text-white bg-danger'> Action </th>
                        </tr>
                    </thead>

                    <tbody> 
                    {
                      MyOrderList.map((mo,index) => {
                        let message
                       

                          if(mo.payment_status==='Paid')
                          {
                            message = <div className='text-primary fs-4 fw-bold'> Paid  </div>
 
                          }
                          else
                          {

                            message = <div className='text-primary fs-4 fw-bold'> <a href={`/paybill/${mo.id}/${mo.total}`} 
                            style={{textDecoration:"none"}}> Pay Now </a> </div>
                          }
                       
                      
            return(    
           <tr key={index}>
              <td>{index+1}</td>
              <td>{mo.product_name}</td>
              <td>{mo.qty}</td>
              <td>{mo.price}</td>
              <td>{mo.total}</td>
              <td>{mo.order_date}</td>
              <td>{mo.order_time}</td>
              <td className='text-success fs-4 fw-bold'>{mo.order_status}</td>
              <td className='text-danger fs-4 fw-bold'>{mo.payment_status}</td>
             
              <td> {message}  </td>
            </tr>
        
            )
            }
              )};
                         
                    </tbody>

                </table>
            </div>
        </div>
      
    </div>
  )
}

export default MyOrder
