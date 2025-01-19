import { Route, Routes } from "react-router-dom";
import Custom_ref from "./page/custom-ref";
import Home from "./page/Home";
import Infinite_scroll from "./page/infinite-scroll";
import Custom_useMemo from "./page/custom-useMemo";
import Custom_useCallback from "./page/custom-useCallback";
import Custom_memo from "./page/custom-memo";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/infinite-scroll" element={<Infinite_scroll />} />
      <Route path="/custom-ref" element={<Custom_ref />} />
      <Route path="/custom-useMemo" element={<Custom_useMemo />} />
      <Route path="/custom-useCallback" element={<Custom_useCallback />} />
      <Route path="/custom-memo" element={<Custom_memo />} />
    </Routes>
  );
}

export default App;
