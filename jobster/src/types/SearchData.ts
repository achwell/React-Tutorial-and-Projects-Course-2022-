import { JobStatus, JobType } from "./IJob";
import { SortOptions } from "../features/allJobs/allJobsSlice";

export default interface SearchData {
  page: number;
  search?: string;
  status?: JobStatus;
  type?: JobType;
  sort?: SortOptions;
}
