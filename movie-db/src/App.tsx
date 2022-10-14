import { Routes, Route, BrowserRouter } from "react-router-dom";

import Home from "./Home";
import Movie from "./SingleMovie";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="movies/:id" element={<Movie />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
