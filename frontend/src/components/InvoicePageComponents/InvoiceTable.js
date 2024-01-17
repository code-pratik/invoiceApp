import React, { useRef } from "react";
import { useSelector } from "react-redux";
import moment from "moment";
import { useReactToPrint } from "react-to-print";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingCom from "../commen/LoadingAnimation";

const InvoiceTable = ({ loading }) => {
  const invoicesData = useSelector((state) => state.invoicesData);

  const componentPDF = useRef();

  const generatePdf = useReactToPrint({
    content: () => componentPDF.current,
    documentTitle: "Job-invoice",
    onPrintCancel: () => toast.warn("Printing was canceled"),
    onPrintError: () => toast.error("Error occurred while printing"),
  });

  return (
    <div className={`container  mx-auto px-4 sm:px-8 flex justify-center  `}>
      <ToastContainer />
      {loading ? (
        <LoadingCom />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4  w-[100%] place-items-center">
          {invoicesData?.invoices.length ? (
            invoicesData?.invoices?.map((item, index) => (
              <div
                key={index}
                className="w-full md:max-w-lg dark:bg-gray-100  bg-white shadow-md rounded-lg p-6 mb-6"
              >
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold">Invoice</h2>
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={generatePdf}
                  >
                    Download Bill
                  </button>
                </div>
                <div ref={componentPDF} className="p-4">
                  <div className="border-t border-gray-200 pt-4">
                    <p className="text-gray-600">
                      {console.log(item, "asd")}
                      Order ID:{" "}
                      <span className="text-black">{item["_id"]}</span>
                    </p>
                    <p className="text-gray-600">
                      Date:{" "}
                      <span className="text-black">
                        {moment(item?.createdAt).format(
                          "MMMM DD, YYYY HH:mm:ss"
                        )}
                      </span>
                    </p>

                    <p className="text-gray-600">
                      Title: <span className="text-black">{item?.title}</span>
                    </p>
                    <p className="text-gray-600">
                      Notes: <span className="text-black">{item?.notes}</span>
                    </p>
                    <hr className="my-3 border-gray-200" />
                    <div>
                      <div className="flex justify-between mb-2">
                        <p className="text-gray-600 font-semibold">
                          Product Name
                        </p>
                        <p className="text-gray-600 font-semibold">Price</p>
                      </div>
                      <div className="space-y-2">
                        {item?.jobsData?.map((product, idx) => (
                          <div key={idx} className="flex justify-between">
                            <div className="flex flex-col">
                              <p className="text-gray-600">{product?.name}</p>
                            </div>
                            <p className="text-gray-600">
                              ${product?.price.toFixed(2)}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                    <hr className="my-3 border-gray-200" />
                    <div className="flex justify-between">
                      <p className="text-gray-600 font-semibold">Subtotal</p>
                      <p className="text-gray-600">
                        ${item?.subTotal.toFixed(2)}
                      </p>
                    </div>
                    <div className="flex justify-between">
                      <p className="text-gray-600 font-semibold">Tax (7%)</p>
                      <p className="text-gray-600">${item?.tax.toFixed(2)}</p>
                    </div>
                    <div className="flex justify-between mt-2">
                      <p className="text-xl font-semibold">Total</p>
                      <p className="text-xl font-semibold">
                        ${item?.total.toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="px-4 py-3 absolute top-[50%] dark:text-white text-center">
              No data available
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default InvoiceTable;
