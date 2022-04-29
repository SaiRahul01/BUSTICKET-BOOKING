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
  var currentTime = new Date();

var currentOffset = currentTime.getTimezoneOffset();

var ISTOffset = 330;   // IST offset UTC +5:30 

var today = new Date(currentTime.getTime() + (ISTOffset + currentOffset)*60000);

var todate=Date().toString();
const [todaytime, setTodaytime] = useState(today.toString())
useEffect(() => {
  setTimeout(() => {
    setTodaytime(todaytime)
  
   
  },1000);
},1000)

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
 
   <br />
    <div>
      <h1 className='text-center' style={{color:'white',display:isload===true?'':'none'}}>{bookings.length>0?'Your':'No'} Bookings</h1>
    <div className='flex-container' style={{display:'flex'}}  >
	
		<br />
    {/* <h1 style={{color:'white'}}>{todate}</h1> */}
    
	{ 
	
	
	bookings.map((val,id)=>{
		
		return <>
		<br />
		<div class="angry-grid shh text-center" style={{height:'400px',width:'1100px' ,border:'2px solid white',color:'white'}}>
    
   

			<div className='mini' style={{marginTop:'80px',fontSize:'20px'}}>
        <div style={{fontSize:'15px',color:'gold'}}>BusName</div>
        <div>{val.busname}</div>
        
        </div>
			
			<div className='mini' style={{marginTop:'80px',fontSize:'20px'}}>
      <div style={{fontSize:'15px',color:'gold'}}> From</div>
       <div> {val.fromcity}</div>
        
        </div>
			
			<div className='mini' style={{marginTop:'80px',fontSize:'20px'}}>
    
        <div style={{fontSize:'15px',color:'gold'}}>   To </div>
        <div> {val.tocity}</div>
      
      </div>
      <div className='mini' style={{marginTop:'80px',fontSize:'20px'}}>
        
      <div style={{fontSize:'15px',color:'gold'}}>Date of Journey </div>
        {val.dateofjrny.substring(0,10)}
        </div>
			<div className='mini' style={{marginTop:'80px',fontSize:'20px'}}>
      <div style={{fontSize:'15px',color:'gold'}}>Cost </div>

      ₹{val.price}
      </div>
			
			<div className='mini' style={{marginTop:'50px',fontSize:'20px'}}>AC</div>
			<div className='mini' style={{marginTop:'50px',fontSize:'20px'}}>
      <div style={{fontSize:'15px',color:'gold'}}>Starts </div>
        {val.starttime}</div>
			<div className='mini' style={{marginTop:'50px',fontSize:'20px'}}>
      <div style={{fontSize:'15px',color:'gold'}}>Reaches</div>
        {val.reachtime}</div>
			<div className='mini' style={{marginTop:'50px',fontSize:'20px'}}>
      <div style={{fontSize:'15px',color:'gold'}}>Bus ID</div>
      {val.busid}</div>
      <div className='mini' style={{marginTop:'50px',fontSize:'20px'}}>
        
      <div style={{fontSize:'15px',color:'gold'}}>No of Seats </div>
        {val.noofseats} </div>
      <div className='mini' style={{marginTop:'30px',fontSize:'20px'}}>
      <div style={{fontSize:'15px',color:'gold'}}>Driver Name </div>
        {val.drivername}</div>
      <div className='mini' style={{marginTop:'30px',fontSize:'20px'}}>
      <div style={{fontSize:'15px',color:'gold'}}>Driver Contact </div>
      {val.drivermobilenumber}
      {/* <img className='ticketicon' style={{width:'60px'}} src="https://cdn-icons.flaticon.com/png/512/3205/premium/3205244.png?token=exp=1651178403~hmac=4a9cf88537ef281a981ee8dcf5816967" alt="" /> */}
    </div>
    
    <div className='mini' style={{marginTop:'30px',fontSize:'20px'}}>
    <div style={{fontSize:'15px',color:'gold'}}>Passenger Name </div>
      {val.name}</div>
    <div className='mini' style={{marginTop:'30px',fontSize:'20px'}}>
    <div style={{fontSize:'15px',color:'gold'}}>Passenger Contact </div>
      {val.mobilenumber}</div>
    <div className='mini' style={{marginTop:'30px',fontSize:'20px'}}>
    <div style={{fontSize:'15px',color:'gold'}}>Passenger email </div>
      {val.email}</div>
    
      
			
    
		





		</div>
		
		 











		 </>} 
		
		
		)

	}
	</div>
    </div>
    </>
  )
}
