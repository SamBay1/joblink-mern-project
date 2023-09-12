import React from 'react';
import Job from './Job';
import Wrapper from '../assets/wrappers/JobsContainer';
import {useAllJobsContext} from '../pages/AllJobs';
import {IconBaseProps} from 'react-icons/lib';

const JobsContainer: React.FC = () => {
  const data = useAllJobsContext();
  const jobs = data?.jobs || [];
  console.log(data);
  if (jobs.length === 0) {
    return (
      <Wrapper>
        <h2>No jobs to display...</h2>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <div className='jobs'>
        {jobs.map((job) => {
          return (
            <Job
              jobLocation={''}
              createdAt={''}
              icon={function (): JSX.Element {
                throw new Error('Function not implemented.');
              }}
              key={job._id}
              {...job}
            />
          );
        })}
      </div>
    </Wrapper>
  );
};

export default JobsContainer;
