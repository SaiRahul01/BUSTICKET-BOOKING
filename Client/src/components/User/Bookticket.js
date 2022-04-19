import React from 'react'
import './Bookticket.css'
import { useState } from 'react';

export default function Bookticket() {
  const [fromdate, setfromdate] = useState('')
   const [todate, settodate] = useState('')
   const [tdate, settdate] = useState('')

  return (
    <>
   
    <div id="booking" class="section" >
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
										<span class="form-label" style={{color:'black'}}>Date of Journey</span>
										<input class="form-control" type="date" required/>
									</div>
								</div>
								{/* <div class="col-md-6">
									<div class="form-group">
										<span class="form-label" style={{color:'black'}}>Check Out</span>
										<input class="form-control" type="date" required/>
									</div>
								</div> */}
							</div>
							{/* <div class="row">
								<div class="col-md-6">
									<div class="form-group">
										<span class="form-label" style={{color:'black'}}>Adults</span>
										<select class="form-control">
											<option>1</option>
											<option>2</option>
											<option>3</option>
										</select>
										<span class="select-arrow"></span>
									</div>
								</div>
								<div class="col-md-6">
									<div class="form-group">
										<span class="form-label" style={{color:'black'}}>Children</span>
										<select class="form-control">
											<option>0</option>
											<option>1</option>
											<option>2</option>
										</select>
										<span class="select-arrow"></span>
									</div>
								</div>
							</div> */}
							<div class="form-group">
								<span class="form-label" style={{color:'black',marginLeft:'0px'}}>From</span>
								<input class="form-control" type="email" placeholder="From City" required/>
							</div>
							<div class="form-group">
								<span class="form-label" style={{color:'black'}}>To</span>
								<input class="form-control" type="tel" placeholder="To City" required/>
							</div>
							<div class="form-btn">
								<button class="submit-btn">Check Buses</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	</div>
    </>
  )
}
