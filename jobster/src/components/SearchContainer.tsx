import { useEffect } from "react";
import { useForm } from "react-hook-form";
import Wrapper from "../assets/wrappers/SearchContainer";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import SearchData from "../types/SearchData";
import { handleSearch } from "../features/allJobs/allJobsSlice";

const SearchContainer = () => {
  const { isLoading, sortOptions, page, lastSearchData } = useAppSelector(
    (store) => store.allJobs
  );
  const defaultValues: SearchData = {
    page: page,
    search: undefined,
    status: undefined,
    type: undefined,
    sort: undefined,
  };
  const { handleSubmit, register, reset, watch } = useForm<SearchData>({
    defaultValues,
  });

  const searchData = watch();

  const { jobTypeOptions, statusOptions } = useAppSelector(
    (store) => store.job
  );

  const dispatch = useAppDispatch();

  function searchChanged() {
    return (
      !lastSearchData ||
      lastSearchData.search !== searchData.search ||
      lastSearchData.page !== searchData.page ||
      lastSearchData.sort !== searchData.sort ||
      lastSearchData.type !== searchData.type ||
      lastSearchData.status !== searchData.status
    );
  }

  useEffect(() => {
    if (searchChanged()) {
      dispatch(handleSearch(searchData));
    }
  }, [searchData]);

  const onSubmit = (data: SearchData) => {
    reset();
  };

  return (
    <Wrapper>
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <h4>search form</h4>
        <div className="form-center">
          <div className="form-row">
            <label htmlFor="search" className="form-label">
              Search
            </label>
            <input className="form-input" {...register("search")} />
          </div>
          <div className="form-row">
            <label htmlFor="status" className="form-label">
              Statue
            </label>
            <select className="form-select" {...register("status")}>
              <option value="">all</option>
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
            <label htmlFor="type" className="form-label">
              Type
            </label>
            <select className="form-select" {...register("type")}>
              <option value="">all</option>
              {jobTypeOptions.map((itemValue, index) => {
                return (
                  <option key={index} value={itemValue}>
                    {itemValue}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="form-row">
            <label htmlFor="sort" className="form-label">
              Sort
            </label>
            <select className="form-select" {...register("sort")}>
              {sortOptions.map((itemValue, index) => {
                return (
                  <option key={index} value={itemValue}>
                    {itemValue}
                  </option>
                );
              })}
            </select>
          </div>
          <button
            type="submit"
            className="btn btn-block btn-danger"
            disabled={isLoading}
          >
            clear filters
          </button>
        </div>
      </form>
    </Wrapper>
  );
};
export default SearchContainer;
