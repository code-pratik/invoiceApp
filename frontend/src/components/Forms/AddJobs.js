import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  createJob,
  getJobs,
  updateJob,
  updateJobs,
} from "../../pages/jobPage/jobSlice";
import { ToastContainer, toast } from "react-toastify";
import Select from "react-select";
import { tags } from "../constents/formConstent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { getProducts } from "../../pages/productPage/productSlice";
const customStyles = {
  multiValue: (styles) => ({
    ...styles,
    backgroundColor: "#6467F1",
    padding: "2px 4px 2px 4px",
    borderRadius: "20px",
    color: "#FFF",
    display: "flex",
    alignItems: "center",
  }),
  multiValueLabel: (styles) => ({
    ...styles,
    color: "#FFF",
  }),
  multiValueRemove: (styles) => ({
    ...styles,
    color: "#FFF",
    ":hover": {
      backgroundColor: "#6B7280",
      color: "#FFF",
    },
  }),
};

const AddJobs = ({handleModalToggle,updateData}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const dispatch = useDispatch();
 
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const taxRate = 0.07;
  const [tax, setTax] = useState(0);
  const [total, setTotal] = useState(0);

  const productsData = useSelector((state) => state?.productsData.products);

  const handelUpdate = (data) => {
    const selectedProductsvalue = selectedProducts.map((item) => item["_id"]);
    const selectedTagsValues = selectedTags.map((tag) => tag.value);
    const jobData = {
      id:data["_id"],
      title: data.title,
      notes: data.notes,
      products: selectedProductsvalue,
      tags: selectedTagsValues,
      total: total.toFixed(2),
      subTotal: subtotal.toFixed(2),
      tax: tax.toFixed(2),
      createdBy: "testuser",
    };
    dispatch(updateJobs({ id: updateData["_id"], data: jobData })).then((res) => {
      console.log(res)
      if (res.payload?.message) {
        reset({ name: "", description: "", price: "" });
        toast.success(res.payload.message, {
          toastId: "successToast",
          autoClose: 3000,
          toastClassName: "bg-green-500 text-white font-bold",
        });
        handleModalToggle();
      } else {
        toast.error("Failed to update job");
      }
    });
  };

  useEffect(() => {
    if (updateData) {
      reset(updateData);
    }
    const selectedProductsData  = (updateData?.jobsData || []).map((item) =>{
      return {value:item?.name,label:item?.name+"-$"+item?.price,_id:item["_id"]}
    })
    const selectedJobsData=  (updateData?.tags || []).map((item) =>{
      return {value:item,label:item}
    })
    setSelectedProducts(selectedProductsData)
    setSelectedTags(selectedJobsData)
    calculateSubtotal(selectedProductsData)
  }, [updateData]);
  const calculateSubtotal = (selectedOptions) => {
    let subTotalAmount = 0;
    selectedOptions.forEach((product) => {
      const selectedProduct = productsData.find(
        (item) => item._id === product._id
      );
      if (selectedProduct) {
        subTotalAmount += selectedProduct.price;
      }
    });
    setSubtotal(subTotalAmount);
    calculateTotal(subTotalAmount);
  };

  const calculateTotal = (subTotalAmount) => {
    const calculatedTax = subTotalAmount * taxRate;
    setTax(calculatedTax);
    const calculatedTotal = subTotalAmount + calculatedTax;
    setTotal(calculatedTotal);
  };

  const onSubmit = (data) => {
    const selectedProductsvalue = selectedProducts.map((item) => item["_id"]);
    const selectedTagsValues = selectedTags.map((tag) => tag.value);
    const jobData = {
      title: data.title,
      notes: data.notes,
      products: selectedProductsvalue,
      tags: selectedTagsValues,
      total: total.toFixed(2),
      subTotal:subtotal.toFixed(2),
      tax: tax.toFixed(2),
      createdBy: "testuser",
    };
    dispatch(createJob(jobData)).then((res)=>{
      if (res.payload?.message) {
        reset({ name: "", description: "", price: "" });
        console.log(res.payload)
        toast.success(res.payload.message, {
          toastId: "successToast",
          autoClose: 3000,
          toastClassName: "bg-green-500 text-white font-bold",
        });
        handleModalToggle()
      } else {
        toast.error("Failed to create job");
      }
    })
    handleModalToggle()
  };

  useEffect(() => {
    console.log(selectedProducts,"asd")
    calculateSubtotal(selectedProducts)
  }, [selectedProducts]);

  useEffect(()=>{
    if(productsData.length === 0){
      dispatch(getProducts())
    }
  },[])

  return (
    <div className="flex justify-center  items-center w-full h-full px-4">
    <div className="bg-white p-6 pb-8 rounded-lg shadow-md w-full md:max-w-md relative">
    <ToastContainer/>
      <FontAwesomeIcon
          icon={faTimes}
          className="absolute top-4 right-4 cursor-pointer text-gray-600 hover:text-red-500"
          onClick={() => {
            handleModalToggle()
          }}
        />
        <h3 className="text-2xl mb-4 font-bold">{updateData?.title === "" ? "Create " : "Update "}Jobs</h3>
        <form
          onSubmit={handleSubmit(updateData?.title === "" ? onSubmit : handelUpdate)}
          className="text-left flex flex-col gap-2"
        >
          <ToastContainer />

          <input
            type="text"
            placeholder="Please enter Job Title"
            {...register("title", {
              required: "Title is required.",
              minLength: {
                value: 2,
                message: "Title should be at least 2 characters.",
              },
              maxLength: {
                value: 30,
                message: "This input exceeds maxLength of 30 characters.",
              },
            })}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-indigo-500"
          />
          {errors.title && (
            <p className="text-red-500">{errors?.title.message}</p>
          )}

          <input
            type="text"
            placeholder="Please enter Job Notes"
            {...register("notes", {
              required: "Description is required",
              minLength: {
                value: 2,
                message: "Description should be at least 2 characters.",
              },
              maxLength: {
                value: 100,
                message:
                  "This description exceeds maxLength of 100 characters.",
              },
            })}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-indigo-500"
          />
          {errors?.notes && (
            <p className="text-red-500">{errors?.notes.message}</p>
          )}

          <Select
            className="text-black rounded-md "
            isMulti
            options={productsData?.map((product) => ({
              value: product.name,
              label: `${product.name} - $${product.price}`,
              _id: product._id,
            }))}
            required
            value={selectedProducts}
            styles={customStyles}
            onChange={(selectedOptions) => {
              setSelectedProducts(selectedOptions);
            }}
          />

          <Select
            className="text-black rounded-md"
            isMulti
            required
            value={selectedTags}
            options={tags?.map((tag) => ({
              value: tag,
              label: tag,
            }))}
            styles={customStyles}
            onChange={(selectedOptions) => {
              setSelectedTags(selectedOptions);
            }}
          />

          <p className="text-lg font-semibold mt-4">
            Subtotal:{" "}
            <span className="text-green-500 font-bold">
              ${subtotal.toFixed(2)}
            </span>
          </p>
          <p className="text-lg font-semibold">
            Tax (7%):{" "}
            <span className="text-blue-500 font-bold">${tax.toFixed(2)}</span>
          </p>
          <p className="text-lg font-semibold">
            Total:{" "}
            <span className="text-red-500 font-bold">${total.toFixed(2)}</span>
          </p>

          <button
            type="submit"
            className="w-full bg-indigo-500 text-white py-2 rounded-md hover:bg-indigo-600 focus:outline-none"
          >
            {updateData?.title === "" ? "Submit" : "Update"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddJobs;
