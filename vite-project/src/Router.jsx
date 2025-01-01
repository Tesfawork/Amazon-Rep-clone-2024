/** @format */

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing/Landing";
import Auth from "./pages/Auth/Auth";
import Payment from "./pages/Payment/Payment";
import Order from "./pages/Orders/Orders";
import Cart from "./pages/Cart/Cart";
import Results from "./pages/Results/Results";
import ProductDetail from "./pages/ProductDetail/ProductDetail";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import ProtectedRoute from "./pages/Payment/ProtectedRoute/ProtectedRoute";

const stripePromise = loadStripe(
  "pk_test_51QTJeqHI3c1M4fqbx6v11XBuYJWzgk2Vbr5yssloadX6DSbIJSTuKaVEa5IqXfwXy8yLSf8KK1yCKOOVrBaqW99M00cZoXa8IN"
);

function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/auth" element={<Auth />} />
        <Route
          path="/payments"
          element={
            <ProtectedRoute
              msg={"you must login to pay"}
              redirect={"/payments"}
            >
              <Elements stripe={stripePromise}>
                <Payment />
              </Elements>
            </ProtectedRoute>
          }
        />

        <Route
          path="/orders"
          element={
            <ProtectedRoute
              msg={"you must login to access your orders"}
              redirect={"/orders"}
            >
              <Order />
            </ProtectedRoute>
          }
        />

        <Route path="/category/:categoryName" element={<Results />} />
        <Route path="/products/:productId" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="*" element={<p>Page not found</p>} />
      </Routes>
    </Router>
  );
}

export default AppRouter;
