import { useEffect } from "react";
import { StatsContainer, ChartsContainer } from "../../components";
import { showStats } from "../../features/allJobs/allJobsSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";

const Stats = () => {
  const { monthlyApplications } = useAppSelector((store) => store.allJobs);

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(showStats({}));
  }, []);
  return (
    <>
      <StatsContainer />
      {monthlyApplications.length > 0 && <ChartsContainer />}
    </>
  );
};
export default Stats;
