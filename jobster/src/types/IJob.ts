export type JobType =
  | "all"
  | "full-time"
  | "part-time"
  | "remote"
  | "internship";
export type JobStatus = "all" | "interview" | "declined" | "pending";
export default interface IJob {
  _id: string;
  company: string;
  position: string;
  status: JobStatus;
  jobType: JobType;
  jobLocation: string;
  createdAt: Date;
}
