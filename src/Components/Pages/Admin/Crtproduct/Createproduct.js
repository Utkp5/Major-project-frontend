import React, { useEffect, useState } from 'react'
import Adminmenu from '../../../Layouts/Adminmenu/Adminmenu';
import Layout from '../../../Layouts/Layout/Layout'
import "../Admindashboard.css";
import "./Createproduct.css";
import { toast } from 'react-hot-toast';
import axios from 'axios';
import {Select} from 'antd';
import { useNavigate } from 'react-router-dom';
const {Option} =  Select;

function Createproduct() {

  const navigate = useNavigate();

  const [categories,setcategories] = useState([]);
  const [name,setname] = useState("")
  const [description,setdescription] = useState("")
  const [price,setprice] = useState("")
  const [photo,setphoto] = useState("")
  const [quantity,setquantity] = useState("")
  const [category,setcategory] = useState("")
  const [shipping,setshipping] = useState("")



  // display category
  const getcategories = async () => {
    try {
      const { data } = await axios.get("https://persian-blue-goose-gear.cyclic.app/api/category/get-category");
      if (data?.success) {
        setcategories(data?.Category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    getcategories();
  },[])


  const handleCreate = async(e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      productData.append("photo", photo);
      productData.append("category", category);
      const {data} = axios.post("https://persian-blue-goose-gear.cyclic.app/api/product/Create-product", productData);
      if (data.success) {
        toast.success('product created successfully')
        navigate('/Dashboard/admin/products')
      }
      else {
        toast.error(data?.message)
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }

  }



  return (
    <Layout title={'Hidden Brands - Create products'}>

    <h2 className='admin_d_h2'>Admin Dashboard</h2>

      <div className="admin_m_main">

        <div className="admin_m_sub"><Adminmenu /></div>

        <div className="admin_m_sub1 font_user">
          <h2 className='admin_m_h2'>Products</h2>

          <div className='admin_m_sub2'>
            <Select bordered={false} showSearch size="large" placeholder="select a category" onChange={(value) => setcategory(value)} >
            {
              categories.map(c => (
                <Option key={c._id} value={c._id}>{c.name}</Option>
              ))
            }
            </Select>
            <div className='p_div'>
            <label className='p_label'>
            {photo ? photo.name : "Upload image"}
            <input type="file" name="photo" accept='image/*' hidden onChange={(e) => setphoto(e.target.files[0])}/>
            </label>
            </div>
            <div>
            {photo && (
              <img src={URL.createObjectURL(photo)} alt="product-photo" height={'200px'} style={{height:"200px", marginLeft:"30px"}}/>
            )}
            </div>
            <div className='p_div1'>
               <input type="text"  className='p_div1_input1' value={name} placeholder="Enter the product name" onChange={(e) => setname(e.target.value)}/><br />
               <textarea name="description" className='p_div1_texta' cols="30" rows="10" value={description} placeholder='Enter the product description' onChange={(e) =>  setdescription(e.target.value)}></textarea>
               <input type="number" placeholder='Enter the product price' className='p_div1_input2 p_div1_inputp' name="price"  value={price} onChange={(e) => setprice(e.target.value)}/>
               <input type="number" placeholder='Enter the product quantity' className='p_div1_input2 ' name="quantity" value={quantity} onChange={(e) => setquantity(e.target.value)}/>
               <Select className='p_select' bordered={false} placeholder="select shipping" showSearch size='large' onChange={(value) => setshipping(value)}>
                  <Option value="0">No</Option>
                  <Option value="1">Yes</Option>
               </Select>
            </div>
            <div className='crt_btn_div'>
            <button className='crt_btn' onClick={handleCreate}>Create</button>
            </div>
          </div>
        </div>

      </div>
    </Layout>
  )
}

export default Createproduct
