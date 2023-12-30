import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Service from "./pages/Service";
import { Deatils } from "./pages/Details";
import CheckoutSuccess from "./pages/CheckoutSuccess";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/service" element={<Service />} />
      <Route path="/details/:name" element={<Deatils />} />
      <Route path="/success" element={<CheckoutSuccess />} />
    </Routes>
  );
}

export default App;
