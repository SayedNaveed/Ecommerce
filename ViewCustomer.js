import React from 'react'
import { useState,useEffect } from "react";
import axios from "axios";
import { useParams} from 'react-router-dom';

const ViewCustomer = () => {
    const [CustomerData, setCustomerData] = useState([])
    const { user_id } = useParams();

    useEffect(() => { 
        getSingleCustomer();   
      });
  
      const getSingleCustomer = async() => {
        const result = await axios.get(`http://localhost:3001/viewcustomers/${user_id}`);
        setCustomerData(result.data);
        console.log(result.data);
      };
  return (
    <div className='container mt-3 p-3'>
        <div className='row'>
        <div className='card'>
            <div className='card-header'>
               <h1> Customer Details </h1>
            </div>
      
        {
    CustomerData.map((cdata,index) => {
      return(<div className='card-body'>
        <table className='table table-bordered table-striped'>
        <tr key={cdata.id}>
        <td> Customer Name</td>
        <td> {cdata.fullname}</td>
        </tr>

        <tr>
            <td> City </td>
            <td>{cdata.city} </td>
        </tr>

        <tr>
            <td>Delivered Address </td>
            <td>{cdata.address}</td>
        </tr>

        <tr>
            <td> Pincode </td>
            <td>{cdata.pincode} </td>
        </tr>

        <tr>
            <td> Email </td>
            <td> {cdata.email}</td>
        </tr>

        <tr>
            <td> Mobile No </td>
            <td>{cdata.contact} </td>
        </tr>

      </table>
      </div>)}
         )};
    </div>
    </div>
    </div>
  )
}

export default ViewCustomer
