import React, { useState } from "react";
import AddJobs from "../../components/Forms/AddJobs";
import JobTable from "../../components/JobPageComponents/JobTable";
import { deleteJob, getJobs } from "./jobSlice";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import DeleteConfirmationModal from "../../components/JobPageComponents/DeleteModel";
import BlueCommenBtn from "../../components/commen/BlueCommenBtn";


const JobsPage = () => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAddJobsModal, setShowAddJobsModal] = useState(false);
  const [deleteJobId, setDeleteJobId] = useState(null);
  const [updateData, setUpdateData] = useState({});

  const dispatch = useDispatch();

  const handleDelete = (id) => {
    setDeleteJobId(id);
    setShowDeleteModal(true);
  };

  const handleUpdate = ({ _id, title, notes, subTotal, tax, total, tags, jobsData }) => {
    setUpdateData({  _id, title, notes, subTotal, tax, total, tags, jobsData});
    setShowAddJobsModal(true);
  };

  const handleConfirmDelete = () => {
    dispatch(deleteJob(deleteJobId)).then((res) => {
      if (res && res.payload && res.payload.message) {
        toast.success(res.payload.message);
        dispatch(getJobs());
      } else {
        toast.error("Failed to delete job");
      }
    });

    setShowDeleteModal(false);
    setDeleteJobId(null);
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
    setDeleteJobId(null);
  };

  const handleAddJobsModalToggle = () => {
    setShowAddJobsModal(!showAddJobsModal);
    if (!showAddJobsModal) {
      setUpdateData({ _id:"", title:"", notes:"", subTotal:"", tax:"", total:"", tags:[], jobsData:[] });
    }
  };

  return (
    <div className="w-full items-center min-h-[84.2vh] mt-14">
 
      <BlueCommenBtn title="Add Jobs" onClick={handleAddJobsModalToggle} />
      <ToastContainer />
      {showDeleteModal && (
        <DeleteConfirmationModal
          handleConfirmDelete={handleConfirmDelete}
          handleCancelDelete={handleCancelDelete}
          title="job"
        />
      )}
      <JobTable handleDelete={handleDelete} handleUpdate={handleUpdate} />
      {showAddJobsModal && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50 backdrop-blur-lg">
          <AddJobs  updateData={updateData} handleModalToggle={handleAddJobsModalToggle} />
        </div>
      )}
    </div>
  );
};

export default JobsPage;
