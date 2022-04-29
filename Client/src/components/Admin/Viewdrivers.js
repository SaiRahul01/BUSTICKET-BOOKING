import Axios  from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import './Viewbuses.css'
export default function Viewdrivers() {

  const [buses, setbuses] = useState([])

  

  const getdrivers=()=>{
    Axios.get('http://localhost:3001/admin/showdrivers').then((response)=>{
        // console.log(response);
        setbuses(response.data)
    })
    
  }

  // const deletebus=(id)=>{
  //   Axios.delete(`http://localhost:3001/admin/deletebus/${id}`).then((response)=>{
  //     if(response.data.ff==='s')
  //     {
  //       alert('Success')
  //     }
  //     else
  //     {
  //         // alert('Failed')
  //     }

  //   })
  // }
  useEffect(() => {
    getdrivers()
  
    
  },)
  
  return (
    <>
    <br /><br />
    <h1 className='text-center' style={{color:'white'}}>Buses List</h1>


    {/* { getbuses()} */}
    <br /><br />
    
      <table style={{border:'1px solid white',marginLeft:'4%',marginRight:'50%',width:'1400px'}}>
        <tbody style={{}}>
          <tr style={{height:'4px'}}>
            <th className='text-center' style={{color:'gold',fontSize:'18px',height:'2px'}}>Driver Name</th>
            <th className='text-center' style={{color:'gold',fontSize:'18px'}}>Mobile Number</th>
            <th className='text-center' style={{color:'gold',fontSize:'18px'}}>Address</th>
           
            
        
  
          </tr>
          
          {
            buses.map((val,id)=>{
              return <tr >
              <td className='text-center' style={{color:'white',marginRight:'20px',fontSize:'20px',width:'100px'}}>{val.name}</td>
              <td className='text-center' style={{color:'white',marginRight:'20px',fontSize:'20px',width:'200px'}}>{val.mobilenumber}</td>
              <td className='text-center' style={{color:'white',marginRight:'20px',fontSize:'20px',width:'200px'}}>{val.address}</td>
             
            
             
                
            

              </tr>
              
       
            })
            //onclick={deletebus(val.busid)}
          }
          

        </tbody>
      </table>
      <br /><br /><br /><br /><br />
     
      
    


    </>
  )
}
