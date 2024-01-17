import React from 'react';

const DeleteConfirmationModal = ({ handleConfirmDelete, handleCancelDelete,title }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50 backdrop-blur-lg">
      <div className="bg-white p-4 rounded-md">
        <p>Are you sure you want to delete this {title}?</p>
        <div className="flex justify-between mt-4">
          <button className="bg-red-500 text-white px-4 py-2 rounded-md mr-2" onClick={handleConfirmDelete}>
            Yes
          </button>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md" onClick={handleCancelDelete}>
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
