import React from 'react'

const TableActionBtn = ({handleAction,data,icon,btnColor}) => {
 return (
      <button
    className={`${btnColor} text-white py-1 px-2 rounded-md hover:bg-indigo-600 mr-2`}
    onClick={() => handleAction(data)}
  >
    {icon}
  </button>
  ) 
}

export default TableActionBtn