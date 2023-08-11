import { useMutation, useQuery } from '@apollo/client';
import {
  allJobsQuery,
  companyByIdQuery,
  createJobMutation,
  jobByIdQuery,
} from './queries';

export function useCompany(id) {
  const { error, loading, data } = useQuery(companyByIdQuery, {
    variables: { id },
  });
  return { company: data?.company, loading, error: Boolean(error) };
}

export function useJob(id) {
  const { error, loading, data } = useQuery(jobByIdQuery, {
    variables: { id },
  });

  return { job: data?.job, loading, error: Boolean(error) };
}

export function useAllJobs(limit, offset) {
  const { error, loading, data } = useQuery(allJobsQuery, {
    variables: { limit, offset },
    fetchPolicy: 'network-only',
  });

  return { jobs: data?.jobs, loading, error: Boolean(error) };
}

export function useCreateJob() {
  const [mutate, { loading }] = useMutation(createJobMutation);

  const createJob = async (title, description) => {
    const {
      data: { job },
    } = await mutate({
      variables: { input: { title, description } },
      update: (cache, { data }) => {
        cache.writeQuery({
          query: jobByIdQuery,
          variables: { id: data.job.id },
          data,
        });
      },
    });
    return job;
  };

  return {
    createJob,
    loading,
  };
}
