import React from "react";
import { Helmet } from "react-helmet";

const HomePage = () => {
  return (
    <>
      <Helmet>
        <title>Home</title>
      </Helmet>
      <div className="container mx-auto px-4 py-16 ">
        <div className="flex flex-col items-center    justify-center">
          <h1 className="text-4xl font-boldtext-gray-800 dark:text-white mb-8">
            Welcome to Invoice Management System
          </h1>
          <p className="text-lg text-center dark:text-white text-gray-700 mb-8">
            Manage your invoices efficiently with our modern system. Keep track
            of all your transactions in one place.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white rounded-md shadow-md p-6">
              <img
                src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGpvYiUyMGNyZWF0ZXxlbnwwfHwwfHx8MA%3D%3D"
                alt="Placeholder 1"
                className="w-full h-auto rounded-md mb-4"
              />
              <h2 className="text-xl font-semibold mb-2">Job Creation</h2>
              <p className="text-gray-700">
                Create new job records with ease and manage job-related
                information.
              </p>
            </div>
            <div className="bg-white rounded-md shadow-md p-6">
              <img
                src="https://plus.unsplash.com/premium_photo-1679923814036-8febf10a04c0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW52b2ljZXxlbnwwfHwwfHx8MA%3D%3D"
                alt="Placeholder 2"
                className="w-full h-auto rounded-md mb-4"
              />
              <h2 className="text-xl font-semibold mb-2">Invoice Generation</h2>
              <p className="text-gray-700">
                Generate invoices effortlessly and maintain a record of
                financial transactions.
              </p>
            </div>
            <div className="bg-white rounded-md shadow-md p-6">
              <img
                src="https://plus.unsplash.com/premium_photo-1679784204535-e623926075cb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8aW52b2ljZXxlbnwwfHwwfHx8MA%3D%3D"
                alt="Placeholder 3"
                className="w-full h-auto rounded-md mb-4"
              />
              <h2 className="text-xl font-semibold mb-2">
                Adding Products to Invoice
              </h2>
              <p className="text-gray-700">
                Easily add products to invoices, facilitating accurate billing
                and records.
              </p>
            </div>
            <div className="bg-white rounded-md shadow-md p-6">
              <img
                src="https://images.unsplash.com/photo-1605152276897-4f618f831968?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c2VydmljZXN8ZW58MHx8MHx8fDA%3D"
                alt="Placeholder 4"
                className="w-full h-auto rounded-md mb-4"
              />
              <h2 className="text-xl font-semibold mb-2">Product Creation</h2>
              <p className="text-gray-700">
                Create new product entries and manage product information
                efficiently.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
