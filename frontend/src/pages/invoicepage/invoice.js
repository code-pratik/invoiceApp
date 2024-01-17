import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCovertedToInvoice } from './invoiceSlice'
import InvoiceTable from '../../components/InvoicePageComponents/InvoiceTable'

const InvoicePage = () => {

  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(getCovertedToInvoice())
  },[])

  return (
    <div className="w-full dark:bg-black  items-center min-h-[84.2vh] mt-14">
        <InvoiceTable/>
    </div>
  )
}

export default InvoicePage