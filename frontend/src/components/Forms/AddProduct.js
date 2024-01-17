import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import {
  createProduct,
  getProducts,
  updateProduct,
} from "../../pages/productPage/productSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const forminitialValue = {
  name: "",
  description: "",
  price: "",
};

const AddProductForm = ({ handleModalToggle, updateData }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const dispatch = useDispatch();

  const handleFormSubmit = (data) => {
    dispatch(createProduct({ ...data, createdBy: "textid12345" })).then(
      (res) => {
        if (res.payload?.message) {
          dispatch(getProducts());
          reset(forminitialValue);
          toast.success(res.payload.message, {
            toastId: "successToast",
            autoClose: 3000,
            toastClassName: "bg-green-500 text-white font-bold",
          });
          handleModalToggle();
        } else {
          toast.error("Failed to create product");
        }
      }
    );
  };

  const handelUpdate = (data) => {
    dispatch(updateProduct({ id: updateData["_id"], data })).then((res) => {
      if (res.payload?.message) {
        dispatch(getProducts());
        reset(forminitialValue);
        toast.success(res.payload.message, {
          toastId: "successToast",
          autoClose: 3000,
          toastClassName: "bg-green-500 text-white font-bold",
        });
        handleModalToggle();
      } else {
        toast.error("Failed to update product");
      }
    });
  };

  useEffect(() => {
    reset(updateData);
  }, [reset, updateData]);

  return (
    <div className="flex justify-center  items-center w-full h-full px-4">
      <div className="bg-white p-6 pb-8 rounded-lg shadow-md w-full md:max-w-md relative">
        <FontAwesomeIcon
          icon={faTimes}
          className="absolute top-4 right-4 cursor-pointer text-gray-600 hover:text-red-500"
          onClick={() => {
            handleModalToggle();
          }}
        />
        <h3 className="text-2xl mb-4 font-bold">
          {updateData?.name === "" ? "Create " : "Update "}Product
        </h3>
        <form
          onSubmit={handleSubmit(
            updateData?.name === "" ? handleFormSubmit : handelUpdate
          )}
          className="text-left flex flex-col gap-2"
        >
          <ToastContainer />
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              placeholder="Enter name"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-indigo-500"
              {...register("name", {
                required: "Name is required.",
                minLength: {
                  value: 2,
                  message: "Name should be at least 2 characters.",
                },
                maxLength: {
                  value: 30,
                  message: "Name should not exceed 30 characters.",
                },
              })}
            />
            {errors.name && (
              <p className="text-red-500">{errors.name.message}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Description
            </label>
            <input
              type="text"
              placeholder="Enter description"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-indigo-500"
              {...register("description", {
                required: "Description is required",
                minLength: {
                  value: 2,
                  message: "Description should be at least 2 characters.",
                },
                maxLength: {
                  value: 100,
                  message: "Description should not exceed 100 characters.",
                },
              })}
            />
            {errors.description && (
              <p className="text-red-500">{errors.description.message}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Price</label>
            <input
              type="number"
              placeholder="Enter product Price"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-indigo-500"
              {...register("price", {
                required: "Price is required",
                valueAsNumber: true,
                minLength: {
                  value: 2,
                  message: "Price should be at least 2 characters.",
                },
              })}
            />
            {errors.price && (
              <p className="text-red-500">{errors.price.message}</p>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-500 text-white py-2 rounded-md hover:bg-indigo-600 focus:outline-none"
          >
            {updateData?.name === "" ? "Submit" : "Update"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProductForm;
