import React from 'react';

const SelectInput = ({ data }) => {
  return (
    <select className="block appearance-none w-full md:w-auto bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 rounded shadow leading-tight focus:outline-none focus:border-indigo-500 m-auto">
      {data?.map((item, index) => (
        <option key={index} value={item.name || item}>
          {item?.name ? `${item?.name}- $${item?.price}` :  item}
        </option>
      ))}
    </select>
  );
};

export default SelectInput;
