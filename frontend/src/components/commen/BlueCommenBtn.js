import React from 'react'

const BlueCommenBtn = ({title,onClick,data,disabled=false}) => {
  return (
    <button className={`${disabled?"bg-gray-500" : "bg-blue-500" } text-white text-sm px-4 py-2 rounded-md  capitalize`} onClick={() => onClick(data)} disabled={disabled}>
    {console.log(disabled,"adhahi ")}
        {title}
      </button>
  )
}

export default BlueCommenBtn