"use client"
import Header from '@/components/Header'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';


export default function Home() {

  const [productForm, setProductForm] = useState({})
  const [products, setProducts] = useState([])
  const [alert, setalert] = useState('')
  const [query, setquery] = useState("")
  const [loading, setloading] = useState(false)
  const [dropdown, setdropdown] = useState([
    {
      
    }
  ])

  useEffect(() => {
    const fetchedProducts = async () => {
      const response = await fetch('/api/product')
      let rjson = await response.json()
      setProducts(rjson.products)
    }
    fetchedProducts();
   
  }, [])
  

 const addProduct = async (e) => {
    e.preventDefault();

    try {
    const response = await fetch('/api/product', {
    method: 'POST',
    headers: {
    'Content-Type': 'application/json'
    },
    body: JSON.stringify(productForm)
    });
  if (response.ok) {
  // Product added
   console.log('Product added successfully');
   setalert("Your Product has been added!");
   setProductForm({});
  }
  else {
  // Handle error case
  console.error('Error adding product');
  } } 
  catch (error) {
  console.error('Error:', error);
  }
 };

 const handleChange = (e) => {
  setProductForm({...productForm, [e.target.name]: e.target.value})
 }

 const onDropdownEdit = async (e) => {

    setquery(e.target.value)
    if(!loading){
      setloading(true);
      
      const response = await fetch('/api/search?query='+ query)
      let rjson = await response.json()
      setdropdown(rjson.products)
      setloading(false)
    }
 }

  return (
    <>
      <Header />

      <div className='container mx-auto my-8 p-4 rounded-md'>
        <div className='text-green-500 text-center'>{alert}</div>
      <h1 className="text-3xl font-bold mb-6">Search a Product</h1>
        <div className="flex mb-2">
        <input onBlur={()=> {setdropdown([])}} onChange={onDropdownEdit} type="text" placeholder="Enter a product name" className="flex-1 border border-gray-300 px-4"></input>
       
        <select className="border border-gray-300 px-4 py-2 rounded-r-md">
        <option value="">All</option>
        <option value="category1">Category 1</option> 
        <option value="category2">Category 2</option>

        </select>
        </div> 
        
        {loading &&  <div className=' flex pg-red-700'> <svg fill="#000000" height="80px" width="80px" version="1.1" id="Layer_1" viewBox="0 0 330 330" >
          <circle class="spinner-path" cx="25" cy="25" r="20" fill="none" stroke-width="4" stroke="#000" stroke-dasharray="31.415, 31.415" stroke-dashoffset="0">
          <animate attributeName="stroke-dashoffset" repeatCount="indefinite" dur="1.5s" from="0" to="62.83" />
          <animate attributeName="stroke-dasharray" repeatCount="indefinite" dur="1.5s" values="31.415, 31.415; 0, 62.83; 31.415, 31.415" /> 
          </circle>
           </svg> </div>
        }

          <div className='dropcontainer absolute w-[72vw] border-1  bg-purple-100 rounded-md'>
        {dropdown.map(item =>{
        return <div key={item.name} className='container flex justify-between p-2 my-1 border-b-2 '>

          <span className='name'>{item.name}</span>
          <div className='mx-5'>
          <button className="subtract inline-block px-3 py-1 bg-purple-500 text-white font-semibold rounded-lg shadow-md cursor-pointer"> - </button>
          <span className="quantity mx-3">{item.quantity}</span>
          <button className="add inline-block px-3 py-1 bg-purple-500 text-white font-semibold rounded-lg shadow-md cursor-pointer"> + </button>
          </div>

          
        </div>
       })}
       </div>
        </div>

      <div className='container mx-auto my-8 p-4 rounded-md'>

        <h1 className='text-3xl font-bold mb-4'>Add a Product</h1>
        <div className='form-container'>
          <form className='flex flex-col space-y-4'>
            <label htmlFor="productName" className='text-lg'>Product Name:</label>
            <input value={productForm.name || ""}  name='name' onChange={handleChange} type="text" id="productName" className='input-field p-2 border border-gray-300 rounded-md' required />

            <label htmlFor="quantity" className='text-lg'>Quantity:</label>
            <input value={productForm.quantity || ""} name='quantity' onChange={handleChange} type="number" id="quantity"  className='input-field p-2 border border-gray-300 rounded-md' required />

            <button onClick={addProduct} type="submit" className='submit-button bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition duration-300'>Add Product</button>
          </form>
        </div>
            </div>


            <div className='container my-8  mx-auto my-8 p-4 rounded-md'>
        <h1 className='text-3xl font-bold mt-8 mb-4'>Display Current Stock</h1>
        <div className='table-container'>
          <table className='stock-table w-full border border-collapse border-gray-300'>
            <thead className='bg-gray-200'>
              <tr>
                <th className='p-2'>Product</th>
                <th className='p-2'>Quantity</th>
              </tr>
            </thead>
            <tbody>

              {
              products.map(products=>{
                return <tr key={products.name}> 
                <td className='p-2 border my-6 px-4 py-2 my-3'>{products.name}</td>
                <td className='p-2 border my-6 px-4 py-2 my-3'>{products.quantity}</td>
              </tr>
              })
              
              }


              <tr>
                <td className='p-2'>Product 1</td>
                <td className='p-2'>10</td>
              </tr>
              <tr>
                <td className='p-2'>Product 2</td>
                <td className='p-2'>20</td>
              </tr>
              {/* Add more rows for additional products */}
            </tbody>
          </table>
        </div>

        


        </div>
     

    </>
  );
}
