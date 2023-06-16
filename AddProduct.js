import axios from 'axios'
import { useState,useEffect } from "react";

const AddProduct = () => {

    const [CatList, setCatList] = useState([])
    //const utype=localStorage.getItem('log')
    useEffect(() => { 
        getCategory();   
      }, []);
  
      const getCategory = async() => {
        const result = await axios.get("http://localhost:3001/catview");
        setCatList(result.data);
        console.log(result.data);
      };



    const initialValues = {category:"",product_name:"",uom:"",qty:"",price:"",description:"",stock:""}
    const [formValues,setFormvalues] = useState(initialValues)
    const [file,setFile] = useState("")

    const handleChange = (e) =>{
        const {name,value}= e.target
        setFormvalues({ ...formValues,[name]:value});
    }

    const setImgFile = (e) =>
    {
       // console.log(e.target.files[0])
        setFile(e.target.files[0])
    }

    const submitProduct=(e)=>{
        e.preventDefault();
        var formData = new FormData();
        formData.append("file",file)
        formData.append("category",formValues.category)
        formData.append("product_name",formValues.product_name)
        formData.append("uom",formValues.uom)
        formData.append("qty",formValues.qty)
        formData.append("price",formValues.price)
        formData.append("description",formValues.description)
        formData.append("stock",formValues.stock)
        console.log(...formData)
        const config = {
            headers:
            {
                "Content-Type":"multipart/form-data"
            }    
         }
        axios.post("http://localhost:3001/addproduct",
        formData,config
        ).then((response)=>{
          console.log(response);
          alert("Added Successfully");
          window.location='http://localhost:3000/addproduct/'
        })
        .catch(error => {
            console.log(error)
        })
    } 
    

  return (
    <div>
        <div className='container mt-3 p-3'>
            <div className='row'>
                <h1> Add Product </h1>
        <form onSubmit={submitProduct}>

         <div className='mb-3'>
            <select name='category' className='form-control' defaultValue={formValues.category} onChange={handleChange}>
                <option>--select category--</option>
                {
                CatList.map((cat,index) => {
                return(
                     
                <option key={cat.id} value={cat.category}>{cat.category}</option>
                )
                })
                }

            </select>
                    
        </div>

        <div className='mb-3'>
                    <input type='text' value={formValues.product_name} name='product_name' className='form-control' 
                    placeholder='Enter Product Name'  required onChange={handleChange}/>
        </div>
        <div className='mb-3'>
                    <input type='text' value={formValues.uom} name='uom' className='form-control' 
                    placeholder='Enter UoM'  required onChange={handleChange}/>
        </div>
        <div className='mb-3'>
                    <input type='number' min={1} value={formValues.qty} name='qty' className='form-control' 
                    placeholder='Enter Qty' required onChange={handleChange}/>
        </div>

        <div className='mb-3'>
                    <input type='number' min={1} value={formValues.price} name='price' className='form-control' 
                    placeholder='Enter Price' required onChange={handleChange}/>
        </div>

        <div className='mb-3'>
                    <input type='file'  name='file' className='form-control' 
                    required onChange={setImgFile}/>
        </div>

        <div className='mb-3'>
                   <textarea name='description' className='form-control' onChange={handleChange} defaultValue={formValues.description} placeholder='Product Description'></textarea>
        </div>

        <div className='mb-3'>
                    <input type='number' min={1} value={formValues.stock} name='stock' className='form-control' 
                    placeholder='Enter no of Stock' required onChange={handleChange}/>
        </div>

        <div className='mb-3'>
            <button className='btn btn-success'>Submit </button>
        </div>


        </form>
        </div>
        </div>
      
    </div>
  )

}

export default AddProduct
