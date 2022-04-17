import  Axios  from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function Viewusers() {
    const [users, setusers] = useState([])

    const getusers=()=>{
        Axios.get('http://localhost:3001/admin/showusers').then((response)=>{
        // console.log(response);
        setusers(response.data)
    })
    }

    useEffect(() => {
        getusers()
      
        
      },)
  return (
    <>
    <br />
    <h1 className='text-center' style={{color:'white'}}>Users List</h1>
    <br /><br /><br /><br />
    
      <table style={{border:'1px solid white',marginLeft:'15%',marginRight:'50%',width:'1000px'}}>
        <tbody>
          <tr>
            <th className='text-center' style={{color:'gold',fontSize:'20px'}}>User Id</th>
            <th className='text-center' style={{color:'gold',fontSize:'20px'}}>User Name</th>
            <th className='text-center' style={{color:'gold',fontSize:'20px'}}>Email</th>
            <th className='text-center' style={{color:'gold',fontSize:'20px'}}>Phone no</th>
            <th className='text-center' style={{color:'gold',fontSize:'20px'}}>Age</th>
            <th className='text-center' style={{color:'gold',fontSize:'20px',width:'100px'}}>City</th>
          </tr>
          
          {
            users.map((val,id)=>{
              return <tr >
              <td className='text-center' style={{color:'white',marginRight:'20px',fontSize:'25px',width:'100px'}}>{val.id}</td>
              <td className='text-center' style={{color:'white',marginRight:'20px',fontSize:'25px',width:'200px'}}>{val.name}</td>
              <td className='text-center' style={{color:'white',marginRight:'20px',fontSize:'25px',width:'200px'}}>{val.email}</td>
              <td className='text-center' style={{color:'white',marginRight:'20px',fontSize:'25px',width:'200px'}}>{val.mobilenumber}</td>
              <td className='text-center' style={{color:'white',marginRight:'20px',fontSize:'25px',width:'200px'}}>{val.age}</td>
              <td className='text-center' style={{color:'white',marginRight:'20px',fontSize:'25px',width:'200px'}}>
                {val.city}
              </td>

              </tr>
       
            })
          }

        </tbody>
      </table>






    </>
  )
}
