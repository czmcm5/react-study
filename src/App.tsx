import { Route, Routes } from "react-router-dom";
import Home from "./page/Home";
import Infinite_scroll from "./page/infinite-scroll";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/infinite-scroll" element={<Infinite_scroll />} />
    </Routes>
  );
}

export default App;
