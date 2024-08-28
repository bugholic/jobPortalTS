import React, { useEffect, useState } from "react";
import JobListing from "./JobListing";

interface Job {
  id: number;
  type: string;
  title: string;
  description: string;
  salary: string;
  location: string;
}

type JobListingsProps = {
  isHome: boolean;
};


const JobListings: React.FC<JobListingsProps> = ({isHome}) => {
  const [fetchJob, setFetchJob] = useState<Job[]>([]);
  useEffect(() => {
    const fetchJobs = async () => {
      const apiUrl = isHome ?  `/api/jobs?_limit=3` : `/api/jobs`;
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
  }, []);

  return (
    <section className="bg-blue-50 px-4 py-10">
      <div className="container-xl lg:container m-auto">
        <h2 className="text-3xl font-bold text-indigo-500 mb-6 text-center">
          Browse Jobs
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {fetchJob.map((job: Job) => (
            <JobListing
              key={job.id}
              id={job.id}
              type={job.type}
              title={job.title}
              description={job.description}
              location={job.location}
              salary={job.salary}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default JobListings;
