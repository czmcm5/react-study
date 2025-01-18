import { Route, Routes } from "react-router-dom";
import Custom_ref from "./page/custom-ref";
import Home from "./page/Home";
import Infinite_scroll from "./page/infinite-scroll";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/infinite-scroll" element={<Infinite_scroll />} />
      <Route path="/custom-ref" element={<Custom_ref />} />
    </Routes>
  );
}

export default App;
