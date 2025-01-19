import { Route, Routes } from "react-router-dom";
import Custom_ref from "./page/custom-ref";
import Home from "./page/Home";
import Infinite_scroll from "./page/infinite-scroll";
import Custom_useMemo from "./page/custom-useMemo";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/infinite-scroll" element={<Infinite_scroll />} />
      <Route path="/custom-ref" element={<Custom_ref />} />
      <Route path="/custom-useMemo" element={<Custom_useMemo />} />
    </Routes>
  );
}

export default App;
