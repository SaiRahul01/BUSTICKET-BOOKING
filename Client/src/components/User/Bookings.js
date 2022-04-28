import React from 'react'
import { useState ,useEffect} from 'react'
import Axios from 'axios'
import Cookies from 'js-cookie'
import './Bookings.css'
import Spinner from '../Spinner'


export default function Bookings() {
  const delay = ms => new Promise(res => setTimeout(res, ms));
  const [bookings, setbookings] = useState([])
  const [isload, setisload] = useState(false)
  // const delay = ms => new Promise(res => setTimeout(res, ms));
  // useEffect(() => {
  //   Axios.post('http://localhost:3001/getuserdetails',{useremail:Cookies.get("user")}).then((reponse)=>{
  //       setuserd(reponse.data[0])
  //   })
  
   
  // }, [])
  useEffect(() => {
    setTimeout(async() => {
      await delay(2000);
      Axios.post('http://localhost:3001/getbookings',{useremail:Cookies.get("user")}).then((response)=>{
      setbookings(response.data)
      setisload(true)
      console.log(response.data);
    })
      
    }, 1000);
 
    
   
  }, [])
  // const ded=(datt)=>{
  //   return moment.utc('2019-11-03T05:00:00.000Z').format('MM/DD/YYYY')
  // }
  
  

  return (
    <>
    {isload===false && <Spinner/>}
    <h1 style={{color:'white'}}></h1>
   <br />
    <div>
      <h1 className='text-center' style={{color:'white',display:isload===true?'':'none'}}>{bookings.length>0?'Your':'No'} Bookings</h1>
    <div className='flex-container' style={{display:'flex'}}  >
	
		<br />
    
	{ 
	
	
	bookings.map((val,id)=>{
		
		return <>
		<br />
		<div class="angry-grid shh text-center" style={{height:'300px',width:'1100px' ,border:'2px solid white',color:'white'}}>
			
			<div style={{marginTop:'100px',fontSize:'20px'}}>{val.busname}</div>
			
			<div style={{marginTop:'100px',fontSize:'20px'}}>From {val.fromcity}</div>
			
			<div style={{marginTop:'100px',fontSize:'20px'}}>To {val.tocity}</div>
			<div style={{marginTop:'100px',fontSize:'20px'}}>Cost ₹{val.price}</div>
			<div style={{marginTop:'100px',fontSize:'20px'}}>{val.noofseats} Seats</div>
			<div style={{marginTop:'50px',fontSize:'20px'}}>AC</div>
			<div style={{marginTop:'50px',fontSize:'20px'}}>{val.starttime}</div>
			<div style={{marginTop:'50px',fontSize:'20px'}}>{val.reachtime}</div>
			<div style={{marginTop:'50px',fontSize:'20px'}}>ID: {val.busid}</div>
      <div style={{marginTop:'50px',fontSize:'20px'}}>Date {val.dateofjrny.substring(0,10)}</div>
      
			
    
		





		</div>
		
		 











		 </>} 
		
		
		)

	}
	</div>
    </div>
    </>
  )
}
