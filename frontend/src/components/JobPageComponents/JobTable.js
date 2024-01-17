import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getJobs } from "../../pages/jobPage/jobSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import SelectInput from "./SelectInput";
import TableActionBtn from "../btns/TableActionBtn";
import BlueCommenBtn from "../commen/BlueCommenBtn";
import { covertToInvoice } from "../../pages/invoicepage/invoiceSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { jobTableHeaders } from "../constents/tableConstent";


const JobTable = ({handleDelete,handleUpdate}) => {
  const jobsData = useSelector((state) => state?.jobsData);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getJobs());
  }, []);

  const HandlConvertToInvoice = (id) =>{
    dispatch(covertToInvoice(id)).then((res)=>{
      if (res && res.payload && res.payload.message) {
        toast.success(res.payload.message,{
          autoClose:2000
        });
        setTimeout(() => {
          navigate("/invoice")
        }, 2000);
      } else {
        toast.error("Failed to convert invoice");
      }
    })
  }

  return (
    <div className="container mx-auto px-4 sm:px-8">
    {console.log(jobsData,"x")}
      <div className="py-8">
        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
          <div className="inline-block min-w-full shadow-md rounded-lg overflow-hidden">
            <table className="min-w-full leading-normal">
              <thead>
                <tr>
                  {jobTableHeaders.map((header) => (
                    <th
                      className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider"
                      key={header}
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {jobsData?.jobs.length ? jobsData?.jobs?.map(
                  (
                    {_id, title, notes, subTotal, tax, total, tags, jobsData,isCovertedToInvoice },
                    index
                  ) => (
                    <tr className="border-b border-gray-200  bg-white">
                    <td className="px-5 py-5 text-sm">
                        <p className="text-gray-600 whitespace-no-wrap">
                          {index+1}
                        </p>
                      </td>
                      <td className="px-5 py-5 text-sm">
                        <p className="text-gray-600 whitespace-no-wrap">
                          {title}
                        </p>
                      </td>
                      <td className="px-5 py-5 text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {notes}
                        </p>
                      </td>
                      <td className="px-5 py-5 text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {subTotal}
                        </p>
                      </td>
                      <td className="px-5 py-5 text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {tax}
                        </p>
                      </td>
                      <td className="px-5 py-5 text-sm flex justify-center items-center">{total}</td>
                      <td className="px-5 py-5 text-sm text">
                        <SelectInput data={tags}/>
                      </td>

                      <td className="px-5 py-5 text-sm">
                        <SelectInput data={jobsData}/>
                      </td>

                      <td className="px-5 py-5 text-sm text-right ">
                      <TableActionBtn data={{ _id, title, notes, subTotal, tax, total, tags, jobsData }} handleAction={handleUpdate} icon={<FontAwesomeIcon icon={faEdit}/>}
                      btnColor="bg-indigo-500" />
                      <TableActionBtn data={_id} handleAction={handleDelete} icon={<FontAwesomeIcon icon={faTrash} />}
                      btnColor="bg-red-500" />
                      </td>

                      <td className="px-5 py-5 text-sm text-right flex justify-center">
                        <BlueCommenBtn title="convertToInvoice" disabled={isCovertedToInvoice} onClick={HandlConvertToInvoice} data={_id} />
                      </td>

                    </tr>
                  )
                ) : (
            <tr className=" border-[1px] rounded-b-md ">
              <td colSpan="10" className="px-4 py-3 text-center text-gray-500 rounded-b-md">
                No data available
              </td>
            </tr>
           )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobTable;
