import  Axios  from 'axios'
import React, { useState } from 'react'
import { toast } from 'react-toastify'

import './Addbus.css'

export default function Addbus() {
	const [busname, setbusname] = useState('')
	const [fromstation, setfromstation] = useState('')
	const [tostation, settostation] = useState('')
	const [capacity, setcapacity] = useState(0)
	const [driver, setdriver] = useState('')

	const handleaddbus=(e)=>{
		Axios.post('http://localhost:3001/addbus',{
			busname:busname,
			driver:driver,
			fromstation:fromstation,
			tostation:tostation,
			capacity:capacity
		}).then(
			(response)=>{
				if(response.data.op==='fail')
				{
					alert('Failed')
				}
				else
				{
					alert('Success')
				}

			}
	)
		e.preventDefault()
	}
  return (
	
    <>
	
   

<div class="container-contact100">
		<div class="wrap-contact100">
			<form class="contact100-form validate-form">
				<span class="contact100-form-title">
					Add a Bus
				</span>

				<div class="wrap-input100 validate-input" data-validate="Name is required">
					
					<input class="input100" type="text" onChange={e=>setbusname(e.target.value)} name="name" placeholder="Bus Name" required/>
					<span class="focus-input100"></span>
				</div>
				<div class="wrap-input100 validate-input" data-validate="Name is required">
					
					<input class="input100" type="text" onChange={e=>setdriver(e.target.value)} name="name" placeholder="Bus Driver" required/>
					<span class="focus-input100"></span>
				</div>

				<div class="wrap-input100 validate-input" data-validate = "Valid email is required: ex@abc.xyz">
					
					<input class="input100" type="text" name="email" onChange={e=>setfromstation(e.target.value)} placeholder="From Bus Stop" required/>
					<span class="focus-input100"></span>
				</div>
        <div class="wrap-input100 validate-input" data-validate = "Valid email is required: ex@abc.xyz">
					
					<input class="input100" type="text" name="email" onChange={e=>settostation(e.target.value)} placeholder="To Bus Stop" required/>
					<span class="focus-input100"></span>
				</div>

        <div class="wrap-input100 validate-input" data-validate = "Valid email is required: ex@abc.xyz">
					
					<input class="input100" type="number" name="email" onChange={e=>setcapacity(e.target.value)} placeholder="Capacity" required/>
					<span class="focus-input100"></span>
				</div>

			

				


        <button onClick={handleaddbus} type="submit">Add</button>
			</form>
		</div>
	</div>



	<div id="dropDownSelect1"></div>

  
    </>
  
  )
}
