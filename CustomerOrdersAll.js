import React from 'react'
//import logo from "../Assets/b3.png"
import { useState,useEffect } from "react";
import axios from "axios";

const CustomerOrdersAll = () => {
    const [OrderList, setOrderList] = useState([])
    //const utype=localStorage.getItem('log')

    useEffect(() => { 
        getOrders();   
      }, []);
  
      const getOrders = async() => {
        const result = await axios.get("http://localhost:3001/customerordersall");
        setOrderList(result.data);
        console.log(result.data);
      };

     

  return (
    <div>
      <div className='container-fluid bg-warning mt-3 p-3'>
        <div className='row'>
            <h1 className='text-white'>Customer Orders</h1>
        </div>
     </div>

     <div className='container-fluid bg-light mt-3 p-3'>
        <div className='row'>
            <table className='table table-bordered'>
            <thead className='table-dark'>
                        <tr>
                            <th>#</th>
                            <th> Order Id</th>
                            <th> Product Name</th>
                            <th> Qty</th>
                            <th> Price </th>
                            <th> Total </th>
                            <th> Order Date</th>
                            <th> Order Time </th>
                            <th> Payment Status </th>
                        
                        </tr>
                    </thead>
                    <tbody> 
                    {
                      OrderList.map((mo,index) => {
            return(<tr key={mo.id}>
              <td>{index+1}</td>
              <td><a href={`/viewcustomer/${mo.user_id}`}> {mo.id} </a> </td>
              <td>{mo.product_name}</td>
              <td>{mo.qty}</td>
              <td>{mo.price}</td>
              <td>{mo.total}</td>
              <td>{mo.order_date}</td>
              <td>{mo.order_time}</td>
              <td className='text-danger fw-bold'>{mo.payment_status}</td>
              
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
export default CustomerOrdersAll
