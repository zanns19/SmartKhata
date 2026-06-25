import React from 'react'

const Navbar = ({setBgColor}) => {
  return (
    <div className='bg-cyan-200'>
      <div className="navbar flex py-3 items-center justify-between max-w-270 mx-auto text-2xl">
        <div className="logo"><span className='text-blue-500'>&lt;</span><span className='font-bold text-orange-600'>Smart</span><span className='font-bold text-blue-500'>Khata/&gt;</span></div>
        <div className="uls">
            <ul className='flex items-center gap-3'>
                <li onClick={()=>setBgColor('#F4F4F9')} className='h-9 w-9 cursor-pointer bg-[#F4F4F9] ring-white ring-1 rounded-full'></li>
                <li onClick={()=>setBgColor("#cae4ac")} className='h-9 w-9 cursor-pointer bg-[#cae4ac] ring-white ring-1 rounded-full'></li>
                <li onClick={()=>setBgColor("#d28f8f")} className='h-9 w-9 cursor-pointer bg-[#d28f8f] ring-white ring-1 rounded-full'></li>
                <li onClick={()=>setBgColor("#ff7d7d")} className='h-9 w-9 cursor-pointer bg-[#ff7d7d] ring-white ring-1 rounded-full'></li>
            </ul>
        </div>
      </div>
    </div>
  )
}

export default Navbar
