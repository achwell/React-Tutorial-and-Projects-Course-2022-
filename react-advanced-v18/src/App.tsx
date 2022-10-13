import { FC } from "react";
import Setup from "./components/State";
import Effect from "./components/Effect";
import ConditionalRendering from "./components/ConditionalRendering";
import ControlledInputs from "./components/ControlledInputs";
import RefBasics from "./components/RefBasics";
import UseRefBasics from "./components/RefBasics";
import Reducer from "./components/reducer";
import PropDrilling from "./components/PropDrilling";
import ContextAPI from "./components/ContextApi";
import FetchExample from "./components/hooks/FetchExample";
import Optimization from "./components/Optimization";

const App: FC<{ tab: string }> = ({ tab }) => {
  return (
    <div className="container">
      <Optimization />
      <FetchExample />
      <ContextAPI />
      <PropDrilling />
      <Reducer />
      <UseRefBasics />
      <RefBasics />
      <ControlledInputs />
      <ConditionalRendering />
      <Effect />
      <Setup />
    </div>
  );
};

export default App;
