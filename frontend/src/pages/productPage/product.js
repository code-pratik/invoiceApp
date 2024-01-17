import React, { useState, useEffect } from "react";
import AddProductForm from "../../components/Forms/AddProduct";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, getProducts } from "./productSlice";
import { toast, ToastContainer } from "react-toastify";
import ProductTable from "../../components/ProductPageComponents/ProductTabel";
import DeleteConfirmationModal from "../../components/JobPageComponents/DeleteModel";
import BlueCommenBtn from "../../components/commen/BlueCommenBtn";
import LoadingCom from "../../components/commen/LoadingAnimation";
import { Helmet } from "react-helmet";

const ProductsPage = () => {
  const dispatch = useDispatch();
  const productsData = useSelector((state) => state?.productsData);
  const [updateData, setUpdateData] = useState({});
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showFormModal, setShowFormModal] = useState(false);
  const [deleteProductId, setDeleteProductId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(getProducts()).then((res) => setLoading(false));
  }, [dispatch]);

  const handleDelete = (id) => {
    setDeleteProductId(id);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    dispatch(deleteProduct(deleteProductId)).then((res) => {
      if (res && res.payload && res.payload.message) {
        toast.success(res.payload.message);
        dispatch(getProducts());
      } else {
        toast.error("Failed to delete product");
      }
    });
    setShowDeleteModal(false);
    setDeleteProductId(null);
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
    setDeleteProductId(null);
  };

  const handleUpdate = (_id, name, price, description) => {
    setUpdateData({ _id, name, price, description });
    setShowFormModal(true);
  };

  const handleModalToggle = () => {
    setShowFormModal(!showFormModal);
    if (!showFormModal) {
      setUpdateData({ _id: "", name: "", price: "", description: "" });
    }
  };

  return (
    <div className="w-full flex flex-col min-h-[84.2vh]  items-center mt-14">
      <Helmet>
        <title>ProductData</title>
      </Helmet>
      <ToastContainer />
      <BlueCommenBtn title="Add Product" onClick={handleModalToggle} />
      {showDeleteModal && (
        <DeleteConfirmationModal
          handleConfirmDelete={handleConfirmDelete}
          handleCancelDelete={handleCancelDelete}
          title="product"
        />
      )}
      {loading ? (
        <LoadingCom />
      ) : (
        <ProductTable
          productsData={productsData}
          handleDelete={handleDelete}
          handleUpdate={handleUpdate}
        />
      )}
      {showFormModal && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50 backdrop-blur-lg">
          <AddProductForm
            updateData={updateData}
            handleModalToggle={handleModalToggle}
          />
        </div>
      )}
    </div>
  );
};

export default ProductsPage;
