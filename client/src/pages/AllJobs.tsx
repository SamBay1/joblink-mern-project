import {toast} from 'react-toastify';
import {JobsContainer, SearchContainer} from '../components';
import customFetch from '../utils/customFetch';
import {useLoaderData} from 'react-router-dom';
import {useContext, createContext} from 'react';

export type SingleJobData = {
  company: string;
  position: string;
  jobStatus: string;
  jobType: string;
  _id: string;
};
export type JobsData = {
  jobs: SingleJobData[];
};

export const loader = async () => {
  try {
    const {data} = await customFetch.get<JobsData>('/jobs');
    return {data};
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const AllJobsContext = createContext<JobsData | undefined>(undefined);

const AllJobs = () => {
  const {data} = useLoaderData() as {data: JobsData};
  console.log(data);

  return (
    <AllJobsContext.Provider value={data}>
      <SearchContainer />
      <JobsContainer />
    </AllJobsContext.Provider>
  );
};
export const useAllJobsContext = () => useContext(AllJobsContext);
export default AllJobs;
