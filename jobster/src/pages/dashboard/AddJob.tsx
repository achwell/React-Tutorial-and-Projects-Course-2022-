import React, { useEffect } from "react";
import Wrapper from "../../assets/wrappers/DashboardFormPage";
import { toast } from "react-toastify";
import { clearValues, createJob, editJob } from "../../features/job/jobSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useForm } from "react-hook-form";
import IJob, { JobStatus, JobType } from "../../types/IJob";

const AddJob = () => {
  const {
    isLoading,
    position,
    company,
    jobLocation,
    jobType,
    jobTypeOptions,
    status,
    statusOptions,
    isEditing,
    editJobId,
  } = useAppSelector((store) => store.job);

  const { user } = useAppSelector((store) => store.user);
  const dispatch = useAppDispatch();

  const {
    formState: { errors },
    handleSubmit,
    register,
    setValue,
  } = useForm<IJob>({
    defaultValues: {
      _id: editJobId,
      company: company,
      position: position,
      status: status ? (status as JobStatus) : undefined,
      jobType: jobType ? (jobType as JobType) : undefined,
      jobLocation: jobLocation,
    },
  });

  useEffect(() => {
    if (errors.position?.message) {
      toast.error(errors.position.message);
    }
  }, [errors.position]);
  useEffect(() => {
    if (errors.company?.message) {
      toast.error(errors.company.message);
    }
  }, [errors.company]);
  useEffect(() => {
    if (errors.jobLocation?.message) {
      toast.error(errors.jobLocation.message);
    }
  }, [errors.jobLocation]);

  const onSubmit = (data: IJob) => {
    if (isEditing) {
      dispatch(
        editJob({
          jobId: editJobId,
          job: data,
        })
      );
    } else {
      dispatch(createJob(data));
    }
  };

  useEffect(() => {
    if (!isEditing) {
      setValue("jobLocation", user!.location);
    }
  }, []);

  return (
    <Wrapper>
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <h3>{isEditing ? "edit job" : "add job"}</h3>
        <div className="form-center">
          <div className="form-row">
            <label htmlFor="position" className="form-label">
              Position
            </label>
            <input
              className="form-input"
              {...register("position", { required: "Position is required" })}
            />
          </div>
          <div className="form-row">
            <label htmlFor="company" className="form-label">
              Company
            </label>
            <input
              className="form-input"
              {...register("company", { required: "Company is required" })}
            />
          </div>
          <div className="form-row">
            <label htmlFor="jobLocation" className="form-label">
              Job location
            </label>
            <input
              className="form-input"
              {...register("jobLocation", {
                required: "Job location is required",
              })}
            />
          </div>
          <div className="form-row">
            <label htmlFor="status" className="form-label">
              Statue
            </label>
            <select className="form-select" {...register("status")}>
              {statusOptions.map((itemValue, index) => {
                return (
                  <option key={index} value={itemValue}>
                    {itemValue}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="form-row">
            <label htmlFor="jobType" className="form-label">
              Type
            </label>
            <select className="form-select" {...register("jobType")}>
              {jobTypeOptions.map((itemValue, index) => {
                return (
                  <option key={index} value={itemValue}>
                    {itemValue}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="btn-container">
            <button
              type="button"
              className="btn btn-block clear-btn"
              onClick={() => dispatch(clearValues())}
            >
              clear
            </button>
            <button
              type="submit"
              className="btn btn-block submit-btn"
              disabled={isLoading}
            >
              submit
            </button>
          </div>
        </div>
      </form>
    </Wrapper>
  );
};
export default AddJob;
