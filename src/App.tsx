import MainLayout from "./layouts/MainLayout";
import AddJobPage from "./pages/AddJobPage";
import HomePage from "./pages/HomePage";
import JobPage from "./pages/JobPage";
import JobsPage from "./pages/JobsPage";
import EditJobPage from "./pages/EditJobPage";
import NotFoundPage from "./pages/NotFoundPage";

import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  useParams,
} from "react-router-dom";

interface Job {
  title: string;
  type: string;
  location: string;
  description: string;
  salary: string;
  company: {
    name: string;
    description: string;
    contactEmail: string;
    contactPhone: string;
  };
}

function App() {
  type addJobProps = {
    newJob: Job;
    updatedJob: Job;
  };

  const addJob = async (newJob: addJobProps["newJob"]): Promise<Job> => {
    const res = await fetch(`api/jobs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newJob),
    });
    !res ? "error" : "no error";
    return newJob;
  };

  const deleteJob = async (id: number) => {
    await fetch(`/api/jobs/${id}`, {
      method: "DELETE",
    });
    return;
  };

  const { id } = useParams();
  const editJob = async (
    updatedJob: addJobProps["updatedJob"]
  ): Promise<Job> => {
    const res = await fetch(`api/jobs/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedJob),
    });
    !res ? "error" : "no error";
    return updatedJob;
  };
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="jobs" element={<JobPage />} />
        <Route path="jobs/:id" element={<JobsPage deleteJob={deleteJob} />} />
        <Route
          path="/edit-job/:id"
          element={<EditJobPage editJobSubmit={editJob} />}
        />
        <Route path="add-job" element={<AddJobPage addJobSubmit={addJob} />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;
