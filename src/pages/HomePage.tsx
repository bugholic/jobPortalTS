import Hero from "../components/Hero";
import HomeCard from "../components/HomeCard";
import JobListings from "../components/JobListings";
import ViewAllJobs from "../components/ViewAllJobs";

const HomePage = () => {
  return (
    <>
      <Hero
        title="Arog Job Hub"
        subtitle="Find the React job that fits your skills and needs"
      />
      <HomeCard />
      <JobListings isHome />
      <ViewAllJobs />
    </>
  );
};

export default HomePage;
