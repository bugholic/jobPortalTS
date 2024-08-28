import React from "react";
import { Link } from "react-router-dom";
import { FaMapMarker } from "react-icons/fa";

interface JobListingProps {
  id: number;
  type: string;
  title: string;
  description: string;
  salary: string;
  location: string;
}

const JobListing: React.FC<JobListingProps> = ({
  id,
  type,
  title,
  description,
  salary,
  location,
}) => {
  return (
    <div className="bg-white rounded-xl shadow-md relative">
      <div className="p-4">
        <div className="mb-6">
          <div className="text-gray-600 my-2">{type}</div>
          <h3 className="text-xl font-bold">{title}</h3>
        </div>

        <div className="mb-5">{description}</div>

        <h3 className="text-indigo-500 mb-2">{salary} / Year</h3>

        <div className="border border-gray-100 mb-5"></div>

        <div className="flex flex-col lg:flex-row justify-between mb-4">
          <div className="text-orange-700 mb-3">
            <FaMapMarker className="inline" />
            {location}
          </div>
          <Link
            to={`/jobs/${id}`}
            className="h-[36px] bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg text-center text-sm"
          >
            Read More
          </Link>
        </div>
      </div>
    </div>
  );
};

export default JobListing;
