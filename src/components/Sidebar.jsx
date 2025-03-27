import React, { useState } from 'react'
import { Menu, X } from "lucide-react";

const Sidebar = ({selectedPage, setSelectedPage, pages}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className='flex px-2 md:px-4'>
      
      <button
        className="absolute top-4 left-4  md:hidden z-50 bg-gray-800 text-white p-2 rounded-md"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <div className={`flex fixed inset-y-0 left-0  bg-white transform transition-transform duration-300 z-40
        ${isOpen ? "translate-x-0" : "-translate-x-full"} md:relative md:translate-x-0  `}>

      <ul className='my-5 md:px-0 px-3 py-12 md:py-0'>

          {pages.map((page, i) => (
            <li
            key={i}
            className={`pr-10 px-3 my-2 py-3 text-sm cursor-pointer font-semibold rounded-md  ${
            selectedPage === i ? "bg-blue-400 text-white" : ""
            }`}
            onClick={() => {
              setSelectedPage(i);
              setIsOpen(false);
            }}
            >
              <div className='flex gap-2'>{page.icon}{page.name}</div>
              
            </li>
          ))}

      </ul>

      <div className='ml-5 w-[1px] h-screen bg-gray-300'></div>
        
      </div>

      
    

      
    </div>
  )
}

export default Sidebar
