import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home/Home";
import Report from "../pages/Report/Report";

function AppRoutes(){
  return(
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/report/:id" element={<Report />} />
    </Routes>
  );
}

export default AppRoutes;