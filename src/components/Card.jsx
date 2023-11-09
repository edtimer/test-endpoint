import React from 'react'

const Card = (porps) => {
  return (
    <div className="card lg:card-side bg-base-100 shadow-xl">
  {/* <figure><img className='pl-2 w-20 h-20 rounded overflow-hidden' src="https://images.pexels.com/photos/6827398/pexels-photo-6827398.jpeg?auto=compress&cs=tinysrgb&w=1600" alt="Album"/></figure> */}
  <div className="card-body">
    <h2 className="card-title">First name: {porps.fname||""}</h2>
    <p>Last Name: {porps.lname||""}.</p>
    <div className="card-actions justify-end">
      {/* <button className="btn btn-primary">Lets go</button> */}
    </div>
  </div>
</div>
  )
}

export default Card