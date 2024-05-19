import React from 'react'
import ScaleLoader from "react-spinners/ScaleLoader";

const Loader = () => {
  return (
    <div className='flex w-full justify-center h-full items-center'>
        <ScaleLoader height={55} width={7} radius={10} margin={3} color='#1e3363' speedMultiplier={1}/>
    </div>
  )
}

export default Loader