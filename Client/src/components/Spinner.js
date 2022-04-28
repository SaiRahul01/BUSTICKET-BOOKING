import React from 'react'
import loader from './Spinner-1s-200px.gif'
export default function Spinner() {
  return (
    <>
    <div className='text-center'>
    <img style={{width:'250px',marginTop:'10%'}} src={loader} alt="loading" />
    </div>
   
    </>
  )
}
