import React from 'react'
import { useState,useEffect } from "react";
import axios from "axios";

const FeedbackView = () => {
    const [FeedbackData, setFeedbackData] = useState([])
    useEffect(() => { 
        getFeedback();  
    });
      
    const getFeedback = async() => {
        const result = await axios.get(`http://localhost:3001/viewfeedback`);
        setFeedbackData(result.data);
        console.log(result.data);
          };
    
  return (
    <div>
      <div className='container-fluid mt-2'>

         <div className='row'>
            <h1> Feedack Details </h1>
            <table className='table table-bordered table-hover mt-2'>
               <thead className='table-primary'>
                 <tr>
                    <th>About Product</th>
                    <th> About Service </th>
                    <th> Comments </th>
                 </tr>
               </thead>

               <tbody>
               {
                 FeedbackData.map((data,index) => {
                return(<tr key={data.id}>
                    <td>{data.about_product} </td>
                    <td>{data.about_service}</td>
                    <td>{data.comments} </td>
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

export default FeedbackView
