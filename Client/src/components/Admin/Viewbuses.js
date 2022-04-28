import Axios  from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import './Viewbuses.css'
export default function Viewbuses() {

  const [buses, setbuses] = useState([])

  

  const getbuses=()=>{
    Axios.get('http://localhost:3001/admin/showbuses').then((response)=>{
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
    getbuses()
  
    
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
            <th className='text-center' style={{color:'gold',fontSize:'18px',height:'2px'}}>Bus Id</th>
            <th className='text-center' style={{color:'gold',fontSize:'18px'}}>Bus Name</th>
            <th className='text-center' style={{color:'gold',fontSize:'18px'}}>Type</th>
            <th className='text-center' style={{color:'gold',fontSize:'18px'}}>Bus Driver</th>
            <th className='text-center' style={{color:'gold',fontSize:'18px'}}>From City</th>
            <th className='text-center' style={{color:'gold',fontSize:'18px'}}>Start Time</th>
            <th className='text-center' style={{color:'gold',fontSize:'18px'}}>To City</th>
            <th className='text-center' style={{color:'gold',fontSize:'18px'}}>Reach Time</th>
            <th className='text-center' style={{color:'gold',fontSize:'18px'}}>Capacity</th>
            <th className='text-center' style={{color:'gold',fontSize:'18px'}}>Price</th>
            
        
            <th className='text-center' style={{color:'gold',fontSize:'20px',width:'50px'}}>Action</th>
          </tr>
          
          {
            buses.map((val,id)=>{
              return <tr >
              <td className='text-center' style={{color:'white',marginRight:'20px',fontSize:'20px',width:'100px'}}>{val.busid}</td>
              <td className='text-center' style={{color:'white',marginRight:'20px',fontSize:'20px',width:'200px'}}>{val.busname}</td>
              <td className='text-center' style={{color:'white',marginRight:'20px',fontSize:'20px',width:'200px'}}>{val.type}</td>
              <td className='text-center' style={{color:'white',marginRight:'20px',fontSize:'20px',width:'200px'}}>{val.busdriver}</td>
              <td className='text-center' style={{color:'white',marginRight:'20px',fontSize:'20px',width:'200px'}}>{val.fromcity}</td>
              <td className='text-center' style={{color:'white',marginRight:'20px',fontSize:'20px',width:'200px'}}>{val.starttime}</td>
            
              <td className='text-center' style={{color:'white',marginRight:'20px',fontSize:'20px',width:'200px'}}>{val.tocity}</td>
              <td className='text-center' style={{color:'white',marginRight:'20px',fontSize:'20px',width:'200px'}}>{val.reachtime}</td>
              <td className='text-center' style={{color:'white',marginRight:'20px',fontSize:'20px',width:'200px'}}>{val.capacity}</td>
              <td className='text-center' style={{color:'white',marginRight:'20px',fontSize:'20px',width:'200px'}}>₹{val.ticketprice}</td>
              <td className='text-center' style={{color:'white',marginRight:'20px',fontSize:'20px',width:'200px'}}>
                <div className='parent' style={{}}>
                <div style={{marginTop:'10px',width:'30px',marginLeft:'0px'}}>
                <Link id={val.busid} to={`/admin/editbus/${val.busid}`} style={{marginLeft:'35px',width:'15px',backgroundColor:''}} className='  btn btn-small  me-5'>
                <img src="https://img.icons8.com/offices/30/000000/edit.png" style={{width:'23px',height:'23px',backgroundColor:'',marginTop:'25px',marginLeft:'-30px'}} alt=''/> </Link>
                </div>
                <div>
                  <button className='btn btn-small' style={{width:'60px',boxShadow:'none' }}    >
                  <Link id={val.busid} to={`/admin/deletebus/${val.busid}`}>
                  <img style={{width:'35px',height:'40px',marginTop:'-1px'}} src="https://img.icons8.com/plasticine/100/000000/filled-trash.png" alt='/'/></Link>

                  </button>
            
                </div>
                </div>
              </td>

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
