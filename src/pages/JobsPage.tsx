import { Link, useParams, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaMapMarker } from "react-icons/fa";
import React, { useEffect, useState } from "react";

interface Job {
  id: number;
  type: string;
  title: string;
  description: string;
  salary: string;
  location: string;
  company: {
    name: string;
    description: string;
    contactEmail: string;
    contactPhone: number;
  };
}

type jobPagesProps = {
  deleteJob: (jobId: number) => {}; 
};

const JobPages: React.FC<jobPagesProps> = ({ deleteJob }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const onDeleteClick = (jobId: number) => {
    window.confirm(`Do you want to delete ${jobId}`);
    if (!confirm) return;
    else {
      deleteJob(jobId);
      navigate("/jobs");
    }
  };

  const [fetchJob, setFetchJob] = useState<Job | null>(null);
  useEffect(() => {
    const fetchJobs = async () => {
      const apiUrl = `/api/jobs/${id}`;
      try {
        const res = await fetch(apiUrl);
        const data = await res.json();
        setFetchJob(data);
      } catch (e) {
        console.log("Error encountered in fetching data");
      } finally {
      }
    };
    fetchJobs();
  }, [id]);

  if (!fetchJob) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <section>
        <div className="container m-auto py-6 px-6">
          <Link
            to="/jobs"
            className="text-indigo-500 hover:text-indigo-600 flex items-center"
          >
            <FaArrowLeft /> Back to Job Listings
          </Link>

          <section className="bg-indigo-50">
            <div className="container m-auto py-10 px-6">
              <div className="grid grid-cols-1 md:grid-cols-70/30 w-full gap-6">
                <main>
                  <div className="bg-white p-6 rounded-lg shadow-md text-center md:text-left">
                    <div className="text-gray-500 mb-4">{fetchJob.type}</div>
                    <h1 className="text-3xl font-bold mb-4">
                      {fetchJob.title}
                    </h1>
                    <div className="text-gray-500 mb-4 flex align-middle justify-center md:justify-start">
                      <FaMapMarker className="text-lg text-orange-700 mr-2" />
                      <p className="text-orange-700">{fetchJob.location}</p>
                    </div>
                  </div>

                  <div className="bg-white p-6 rounded-lg shadow-md mt-6">
                    <h3 className="text-indigo-800 text-lg font-bold mb-6">
                      Job Description
                    </h3>

                    <p className="mb-4">{fetchJob.description}</p>

                    <h3 className="text-indigo-800 text-lg font-bold mb-2">
                      Salary
                    </h3>

                    <p className="mb-4">{fetchJob.salary} / Year</p>
                  </div>
                </main>

                <aside>
                  <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-bold mb-6">Company Info</h3>

                    <h2 className="text-2xl">{fetchJob.company.name}</h2>

                    <p className="my-2">{fetchJob.company.description}</p>

                    <hr className="my-4" />

                    <h3 className="text-xl">Contact Email:</h3>

                    <p className="my-2 bg-indigo-100 p-2 font-bold">
                      {fetchJob.company.contactEmail}
                    </p>

                    <h3 className="text-xl">Contact Phone:</h3>

                    <p className="my-2 bg-indigo-100 p-2 font-bold">
                      {fetchJob.company.contactPhone}
                    </p>
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow-md mt-6">
                    <h3 className="text-xl font-bold mb-6">Manage Job</h3>
                    <Link
                       to={`/edit-job/${id}`}
                      className="bg-indigo-500 hover:bg-indigo-600 text-white text-center font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block"
                    >
                      Edit Job
                    </Link>
                    <button
                      onClick={() => {
                        onDeleteClick(fetchJob.id);
                      }}
                      className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block"
                    >
                      Delete Job
                    </button>
                  </div>
                </aside>
              </div>
            </div>
          </section>
        </div>
      </section>
    </>
  );
};

export { JobPages as default };
