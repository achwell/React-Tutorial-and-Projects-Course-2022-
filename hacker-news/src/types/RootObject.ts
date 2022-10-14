import Hit from "./Hit";
import Exhaustive from "./Exhaustive";
import ProcessingTimingsMS from "./ProcessingTimingsMS";

export default interface RootObject {
  hits: Hit[];
  nbHits: number;
  page: number;
  nbPages: number;
  hitsPerPage: number;
  exhaustiveNbHits: boolean;
  exhaustiveTypo: boolean;
  exhaustive: Exhaustive;
  query: string;
  params: string;
  processingTimeMS: number;
  processingTimingsMS: ProcessingTimingsMS;
}
