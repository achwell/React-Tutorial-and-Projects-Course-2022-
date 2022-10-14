import Result from "./Result";

export default interface RootObject {
  response_code: number;
  results: Result[];
}
