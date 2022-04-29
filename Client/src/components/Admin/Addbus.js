import Axios from 'axios'
import Cookies  from 'js-cookie'
import React, { useState,useEffect } from 'react'
import { ToastContainer,toast } from 'react-toastify'



import 'react-toastify/dist/ReactToastify.css'


import './Addbus.css'
toast.configure()
const delay = ms => new Promise(res => setTimeout(res, ms));
export default function Addbus() {
	const [busname, setbusname] = useState('')
	const [fromstation, setfromstation] = useState('')
	const [tostation, settostation] = useState('')
	const [capacity, setcapacity] = useState(0)
	const [driver, setdriver] = useState('')
	const [starttime, setstarttime] = useState('')
	const [reachtime, setreachtime] = useState('')
	const [seatprice, setseatprice] = useState('')
	const [bussid, setbussid] = useState(0)
	const [type, settype] = useState("AC")
	const [maxi, setmaxi] = useState(0)

	useEffect(() => {
	  setTimeout(() => {
		  Axios.get('http://localhost:3001/getmaxi').then((response)=>{
			//   setmaxi(response.data[0])
			  setmaxi(response.data[0].f);

		  })
	  }, 500);
	}, )
	

	const handleaddbus = async(e) => {



		if (busname === '' || fromstation === '' || tostation === '' || capacity === '' || driver === '' || starttime === '' || reachtime === '' || seatprice==='') {
			// alert('Please Fill all fields')
			toast('Please enter all fields')
			e.preventDefault()
			return
		}


		if (!/^[a-zA-Z\s]*$/.test(busname))
		{
			toast('Enter a valid Bus name!')
			e.preventDefault()
			return
		}
		if (!/^[a-zA-Z\s]*$/.test(fromstation))
		{
			toast('Enter a valid source city!')
			e.preventDefault()
			return
		}
		if (!/^[a-zA-Z\s]*$/.test(tostation))
		{
			toast('Enter a valid destination city!')
			e.preventDefault()
			return
		}
		if (!/^[a-zA-Z\s]*$/.test(driver))
		{
			toast('Enter a valid driver name!')
			e.preventDefault()
			return
		}
		if(!(seatprice>=25 && seatprice<=300))
		{
			toast('Ticket price must be between 25 and 300')
			e.preventDefault()
			return
		}
		if(!(capacity>=10 && capacity<=50))
		{
			toast('Capacity must be between 10 and 50')
			e.preventDefault()
			return
		}
		if(starttime===reachtime)
		{
			toast('Start Time and Reach time cannot be the Same')
			e.preventDefault()
			return
		}

		if(fromstation===tostation)
		{
			toast("Source and Destination cannot be the Same!");
			e.preventDefault()
			return;
		}
		







		Axios.post('http://localhost:3001/addbus', {
			busid:maxi+1,
			busname: busname.toLowerCase(),
			driver: driver.toLowerCase(),
			fromstation: fromstation.toLowerCase(),
			tostation: tostation.toLowerCase(),
			capacity: capacity,
			starttime: starttime,
			reachtime: reachtime,
			ticketprice:seatprice,
			type:type
			
		}).then(
			(response) => {
				if (response.data.op === 'fail') {
					toast('Something went wrong!')
				}
				else {
					toast('Added Bus Successfuly!')
				}

			}
		)
		e.preventDefault()
		await delay(1000)
		Axios.post('http://localhost:3001/getbusid',{busname:busname.toLowerCase()}).then(
			(response)=>{
				console.log(response.data[0].busid);
				setbussid(response.data[0].busid)
				// toast("Here->"+bussid)
				window.location.href="/admin/viewbuses"
			}
		)
		
	   await delay(1000)
		Axios.post('http://localhost:3001/bus_admin',{busid:bussid,adminemail:Cookies.get("admin")}).then((response)=>{
			console.log(response);

		})
	
		// var now = new Date();
		// var daysOfYear = [];
		// for (var x=1;x<=14;x++) {
		// 	var ded=new Date(Date.now()+x*24*60*60*1000)
		// 	var tt=ded.toString()
		// 	var a=tt.substring(4,7)
		// 	var b=tt.substring(8,10)
		// 	var c=tt.substring(11,15)
		// 	var temp1=b.concat("-",a);
		// 	var temp2=temp1.concat("-",c)
		// 	var abc;
		// 	if(a==="Apr")
		// 	{
		// 		abc=c+"-"+"04"+"-"+b
		// 	}
		// 	if(a==="May")
		// 	{
		// 		abc=c+"-"+"05"+"-"+b
		// 	}
		// 	if(a==="Jun")
		// 	{
		// 		abc=c+"-"+"06"+"-"+b
		// 	}
			
		// 	console.log(abc);
		// 	Axios.post('http://localhost:3001/addbusstatus',{
		// 	busid:bussid,
		// 	capacity:capacity,
		// 	datt:Date.parse(abc)

		// 		}).then((response)=>{
		// 			console.log(response);
					
		// 		})

		// }

		


	}
	return (

		<>

		
		{/* <h1 style={{color:'white'}}>{maxi}</h1> */}
			<div class="container-contact100">
				<div class="wrap-contact100">
					<form class="contact100-form validate-form">
						<span class="contact100-form-title">
							Add a Bus
						</span>
						<div className="fc">
							<div class="wrap-input100 validate-input" data-validate="Name is required">

								<input class="input100" type="text" onChange={e => setbusname(e.target.value)} name="name" placeholder="Bus Name" required />
								<span class="focus-input100"></span>
							</div>
							<div class="wrap-input100 validate-input" data-validate="Name is required">

								<input class="input100" type="text" onChange={e => setdriver(e.target.value)} name="name" placeholder="Bus Driver" required />
								<span class="focus-input100"></span>
							</div>
						</div>
						<div className="fc">
							<div class="wrap-input100 validate-input" data-validate="Valid email is required: ex@abc.xyz">

								<input class="input100" type="text" name="email" onChange={e => setfromstation(e.target.value)} placeholder="From Bus Stop" required />
								<span class="focus-input100"></span>
							</div>
							<div class="wrap-input100 validate-input" data-validate="Valid email is required: ex@abc.xyz">

								<input class="input100" type="time" name="email" onChange={e => setstarttime(e.target.value)} placeholder="Start Time" required />
								<span class="focus-input100"></span>
							</div>
						</div>
						<div className="fc">
							<div class="wrap-input100 validate-input" data-validate="Valid email is required: ex@abc.xyz">

								<input class="input100" type="text" name="email" onChange={e => settostation(e.target.value)} placeholder="To Bus Stop" required />
								<span class="focus-input100"></span>
							</div>
							<div class="wrap-input100 validate-input" data-validate="Valid email is required: ex@abc.xyz">

								<input class="input100" type="time" name="email" onChange={e => setreachtime(e.target.value)} placeholder="Reach Time" required />
								<span class="focus-input100"></span>
							</div>
						</div>
						<div className="fc">
							<div class="wrap-input100 validate-input" data-validate="Valid email is required: ex@abc.xyz">

								<input class="input100" type="number" name="email" onChange={e => setcapacity(e.target.value)} placeholder="Capacity" required />
								<span class="focus-input100"></span>
							</div>
							<div class="wrap-input100 validate-input" data-validate="Valid email is required: ex@abc.xyz">

								<input class="input100" type="number" name="email" onChange={e => setseatprice(e.target.value)} placeholder="Seat Price" required />
								<span class="focus-input100"></span>
							</div>
						</div>
						<div className="fcc">
							<div class="wrap-input100 validate-input" style={{width:'250px'}} data-validate="Valid email is required: ex@abc.xyz">
							{/* <label for="cars">Type </label> */}
								<select onChange={e=>settype(e.target.value)} style={{width:'250px',height:'40px'}}>
									<option value="AC">AC</option>
									<option value="NON-AC">NON AC</option>
								</select>
							</div>
							
						</div>

						<button className='btn btn-outline-success ' onClick={handleaddbus} type="submit">Add</button>





					
					</form>
				</div>
			</div>



			<div id="dropDownSelect1"></div>


		</>

	)
}
