import React from 'react'
import './Bookticket.css'
import { useState,useEffect } from 'react';
import {Link} from "react-router-dom"
import Axios from 'axios';


export default function Bookticket() {
  const [fromcity, setfromcity] = useState('')
   const [tocity, settocity] = useState('')
   const [tdate, settdate] = useState('')
   const [f, setf] = useState(true)
   const [availablebuses, setavailablebuses] = useState([])
   const [busids, setbusids] = useState([])
//    useEffect(() => {
// 	   setTimeout(() => {
// 		Axios.get('http://localhost:3001/user/getbusids').then((response)=>{
// 			setbusids(response.data)
 
// 		})
		   
// 	   }, 500);
	 
//    })
   

   const handlecheckbuses=()=>{
	if(fromcity==='' || tocity==='' || tdate==='')
	{
		alert('Please enter all fields !');
		return;
	}

	   console.log(fromcity+"\t\t"+tocity);

	   
		// Axios.post('http://localhost:3001/user/addifnot',{arr:busids,tdate:tdate}).then((response)=>{
		// 	console.log(response);
		// })


	   Axios.post('http://localhost:3001/user/checkbuses',{
		   fromcity:fromcity,
		   tocity:tocity,
		   tdate:tdate
	   }).then((response)=>{
		//    if(response.body.f===false)
		//    {
		// 		alert('Error')
		//    }
		//    else
		   
		setavailablebuses(response.data);
		
		  setf(false) 
		console.log(response.data);

	   })
   }

  return (
    <>
	
		
		<div id="booking" class="section" style={{display:f?'flex':'none'}} >
		<div class="section-center">
			<div class="container">
				<div class="row">
					<div class="booking-form">
						<div class="booking-bg" style={{width:'450px'}}></div>
						<form>
							<div class="form-header">
								<h2 className='text-center'>Book a Ticket</h2>
							</div>
							<div className='text-center' class="row" style={{marginLeft:'0px'}}>
								<div class="col-md-6" >
									<div class="form-group" >
										<span class="form-label" style={{color:'black'}} >Date of Journey</span>
										<input class="form-control" onChange={e=>settdate(e.target.value) } min={new Date().toISOString().split('T')[0]} max={(new Date(Date.now()+3*24*60*60*1000)).toISOString().split('T')[0]} type="date" required/>
									</div>
								</div>
								{/* <div class="col-md-6">
									<div class="form-group">
										<span class="form-label" style={{color:'black'}}>Check Out</span>
										<input class="form-control" type="date" required/>
									</div>
								</div> */}
							</div>
							
							<div class="form-group">
								<span class="form-label" style={{color:'black',marginLeft:'0px'}}>From</span>
								<input class="form-control" type="text" onChange={e=>setfromcity(e.target.value)}  placeholder="From City" required/>
							</div>
							<div class="form-group">
								<span class="form-label" style={{color:'black'}}>To</span>
								<input class="form-control" type="text" onChange={e=>settocity(e.target.value)}  placeholder="To City" required/>
							</div>
							<div class="form-btn text-center" style={{textDecoration:'none'}}>
								<button type='button' onClick={handlecheckbuses} style={{textDecoration:'none',fontSize:'20px'}}  class="submit-btn">Check Buses</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	</div>
	<br />
	<h2 className='text-center' style={{color:'white',display:f?'none':''}}>{availablebuses.length>0?'Available Buses':'No Buses available'}</h2>
	<div className='flex-container' style={{display:f?'none':'flex'}}  >
		<br style={{display:f?'none':''}}/>
		<br />
	{ f===false &&
		// <h1 style={{color:'white'}}>Ded</h1>
	
	availablebuses.map((val,id)=>{
		
		return <>
		<br />
		<div class="angry-grid shh text-center" style={{height:'300px',width:'1100px' ,border:'2px solid white',color:'white'}}>
			
			<div style={{marginTop:'100px',fontSize:'20px'}}>{val.busname}</div>
			
			<div style={{marginTop:'100px',fontSize:'20px'}}>{val.fromcity}</div>
			
			<div style={{marginTop:'100px',fontSize:'20px'}}>{val.tocity}</div>
			<div style={{marginTop:'100px',fontSize:'20px'}}>₹{val.ticketprice}</div>
			<div style={{marginTop:'100px',fontSize:'20px'}}>{val.seatsleft} seats left</div>
			<div style={{marginTop:'50px',fontSize:'20px'}}>AC</div>
			<div style={{marginTop:'50px',fontSize:'20px'}}>{val.starttime}</div>
			<div style={{marginTop:'50px',fontSize:'20px'}}>{val.reachtime}</div>
			<div style={{marginTop:'50px',fontSize:'20px'}}>ID: {val.busid}</div>
			<div style={{marginTop:'30px',fontSize:'20px',marginRight:'30px'}}>
				<Link to={`/user/bookticket/${val.busid}/${val.busname}/${val.fromcity}/${val.tocity}/${val.ticketprice}/${val.seatsleft}/${val.starttime}/${val.reachtime}/${tdate}`}>
				<button className="btn btn-success" style={{boxShadow:'none'}}>Book Seats</button>
				</Link>
			</div>
		





		</div>
		
		 











		 </>} 
		
		
		)

	}
	</div>
		
		
	
   
    
    </>
  )
}
