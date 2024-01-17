import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons"; // Import the necessary icons
import TableActionBtn from "../btns/TableActionBtn";

const ProductTable = ({ productsData, handleDelete, handleUpdate }) => {
  return (
    <div className="overflow-x-auto w-full bg-white mt-4 rounded-lg shadow">

      <table className="min-w-full border-collapse">
        <thead className="text-[#F9FAFB] dark:bg-gray-300 dark:text-black bg-black rounded-lg">
          <tr>
            <th className="px-4 py-3 text-left text-sm font-semibold rounded-tl-lg ">Index</th>
            <th className="px-4 py-3 text-left text-sm font-semibold">Product Name</th>
            <th className="px-4 py-3 text-left text-sm font-semibold">Description</th>
            <th className="px-4 py-3 text-left text-sm font-semibold">Price</th>
            <th className="px-4 py-3 text-sm font-semibold rounded-tr-lg">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {productsData?.products?.length ? (
            productsData.products.map(({ _id, name, description, price }, index) => (
              <tr key={_id} className="hover:bg-[#F9FAFB]">
                <td className="px-4 py-3 whitespace-nowrap text-black text-left">
                  {index + 1}
                </td>
                <td className="px-4 py-3 whitespace-nowrap hover:text-[#009879] text-black text-left">
                  {name}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-black text-left">
                  {description}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-black text-left">
                  {price}
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <button
                    className="bg-indigo-500 text-white py-1 px-2 rounded-md hover:bg-indigo-600 mr-2"
                    onClick={() => handleUpdate(_id,name,price,description)}
                  >
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                  <TableActionBtn handleAction={handleDelete} data={_id} btnColor="bg-red-500" icon={    <FontAwesomeIcon icon={faTrash} />}/>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="px-4 py-3 text-center text-gray-500">
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;
