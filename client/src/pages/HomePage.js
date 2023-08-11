import { useState } from 'react';
import JobList from '../components/JobList';
import { useAllJobs } from '../lib/graphql/hooks';
import PaginationBar from '../components/PaginationBar';

const JOBS_PER_PAGE = 15;

function HomePage() {
  const [currentPage, setCurrentPage] = useState(1);
  const { error, loading, jobs } = useAllJobs(
    JOBS_PER_PAGE,
    (currentPage - 1) * JOBS_PER_PAGE,
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="has-text-danger">Data unavailable</div>;
  }

  const totalPages = Math.ceil(jobs.totalCount / JOBS_PER_PAGE);

  return (
    <div>
      <h1 className="title">Job Board</h1>

      <PaginationBar
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      ></PaginationBar>
      <JobList jobs={jobs.items} />
    </div>
  );
}

export default HomePage;
