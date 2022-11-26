import Home from "@/components/pages/Home";
import "../assets/css/admin.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PublicRoute, PrivateRoute } from "@/utils/RouteHandler";
import Login from "@/components/pages/Login";
import Header from "./Header";
import CartPage from "@/components/pages/CartPage";

function Body() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<PublicRoute />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          {/* <Route path="*" element={<NoPage />} /> */}
        </Route>
        <Route path="/" element={<PrivateRoute />}>
          <Route path="cart-summary" element={<CartPage />} />
          {/* <Route path="*" element={<NoPage />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Body;
