import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getCovertedToInvoice } from "./invoiceSlice";
import InvoiceTable from "../../components/InvoicePageComponents/InvoiceTable";

const InvoicePage = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setLoading(true);
    dispatch(getCovertedToInvoice()).then((res) => setLoading(false));
  }, [dispatch]);

  return (
    <div className="w-full dark:bg-[#202427] items-center min-h-[84.2vh] mt-14">
      <InvoiceTable loading={loading} />
    </div>
  );
};

export default InvoicePage;
