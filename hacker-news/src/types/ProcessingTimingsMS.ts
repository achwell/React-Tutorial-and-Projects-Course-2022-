import Fetch from "./Fetch";
import AfterFetch from "./AfterFetch";

export default interface ProcessingTimingsMS {
  afterFetch: AfterFetch;
  fetch: Fetch;
  total: number;
}
