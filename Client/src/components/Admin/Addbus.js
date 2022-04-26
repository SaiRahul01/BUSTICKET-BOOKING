import Axios from 'axios'
import Cookies  from 'js-cookie'
import React, { useState } from 'react'
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

	const handleaddbus = async(e) => {



		if (busname === '' || fromstation === '' || tostation === '' || capacity === '' || driver === '' || starttime === '' || reachtime === '' || seatprice==='') {
			// alert('Please Fill all fields')
			toast('Please enter all fields')
			e.preventDefault()
			return
		}


		if (/[^a-zA-Z]/.test(busname))
		{
			toast('Enter a valid Bus name!')
			e.preventDefault()
			return
		}
		if (/[^a-zA-Z]/.test(fromstation))
		{
			toast('Enter a valid source city!')
			e.preventDefault()
			return
		}
		if (/[^a-zA-Z]/.test(tostation))
		{
			toast('Enter a valid destination city!')
			e.preventDefault()
			return
		}
		if (/[^a-zA-Z]/.test(driver))
		{
			toast('Enter a valid driver name!')
			e.preventDefault()
			return
		}







		Axios.post('http://localhost:3001/addbus', {
			busname: busname.toLowerCase(),
			driver: driver.toLowerCase(),
			fromstation: fromstation.toLowerCase(),
			tostation: tostation.toLowerCase(),
			capacity: capacity,
			starttime: starttime,
			reachtime: reachtime,
			ticketprice:seatprice
			
		}).then(
			(response) => {
				if (response.data.op === 'fail') {
					toast('There is already a bus with that name!')
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
			}
		)
		e.preventDefault()
		await delay(500)
		Axios.post('http://localhost:3001/bus_admin',{busid:bussid,adminemail:Cookies.get("admin")}).then((response)=>{
			console.log(response);

		})
	}
	return (

		<>

		
		
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







						<button className='btn btn-outline-success ' onClick={handleaddbus} type="submit">Add</button>
					</form>
				</div>
			</div>



			<div id="dropDownSelect1"></div>


		</>

	)
}
