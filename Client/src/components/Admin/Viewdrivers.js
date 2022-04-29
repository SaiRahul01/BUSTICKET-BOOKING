import Axios  from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Spinner from '../Spinner';
import './Viewbuses.css'
export default function Viewdrivers() {

  const [buses, setbuses] = useState([])
  const [isload, setisload] = useState(false)
  const delay = ms => new Promise(res => setTimeout(res, ms));

  

  const getdrivers= ()=>{
    setTimeout(async() => {
      await delay(500)
    Axios.get('http://localhost:3001/admin/showdrivers').then((response)=>{
        // console.log(response);
        setbuses(response.data)
        setisload(true)
    })
   
      
    }, 1000);
    
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
    setTimeout(() => {
      getdrivers()
    }, 1000);
   
  
    
  },)
  
  return (
    <>
    { isload===false && <Spinner/>}
    <br /><br />
    
    
    <h1 className='text-center' style={{display:isload===true?'':'none',color:'white'}}>Drivers List</h1>
    


    {/* { getbuses()} */}
    <br /><br />
    
      <table style={{ display:isload===true?'':'none' , border:'1px solid white',marginLeft:'4%',marginRight:'50%',width:'1400px'}}>
        <tbody style={{}}>
          <tr style={{height:'4px'}}>
            <th className='text-center' style={{color:'gold',fontSize:'18px',height:'2px'}}>Driver Name</th>
            <th className='text-center' style={{color:'gold',fontSize:'18px'}}>Mobile Number</th>
            <th className='text-center' style={{color:'gold',fontSize:'18px'}}>Address</th>
           
            
        
  
          </tr>
          
          {
            buses.map((val,id)=>{
              return <tr >
              <td className='text-center' style={{color:'white',marginRight:'20px',fontSize:'20px',width:'100px'}}>{val.drivername}</td>
              <td className='text-center' style={{color:'white',marginRight:'20px',fontSize:'20px',width:'200px'}}>{val.drivermobilenumber}</td>
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
