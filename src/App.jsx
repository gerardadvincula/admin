import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/dashboard/Dashboard";
import Orders from "./pages/orders/Orders";
import Products from "./pages/manage/products/Products";
import Category from "./pages/manage/category/Category";
import Users from "./pages/users/Users";
import AddCategory from "./pages/manage/category/addCategory/AddCategory";
import UpdateCategory from "./pages/manage/category/updateCategory/UpdateCategory";
import AddProducts from "./pages/manage/products/addProducts/AddProducts";
import UpdateProduct from "./pages/manage/products/updateProducts/UpdateProduct";
import { useContext } from "react";
import { AuthContext } from "./contextApi/AuthContext";
import Login from "./pages/login/Login";
import ErrorPage from "./pages/errorPage/ErrorPage";
import ProductsJson from "./pages/orders/productJson/ProductsJson";
import useFetch from "./contextApi/useFetch";
import Settings from "./pages/settingsPage/Settings";
import { ToastContainer } from "react-toastify";

function App() {
  const { user } = useContext(AuthContext);

  const { data } = useFetch(
    `${import.meta.env.VITE_APP_API_URL}/api/user/${user?.email}`
  );

  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={user ? <ErrorPage /> : <Login />} />
        {data?.userRole === "ROLE_ADMIN" ? (
          <Route path="/" element={user ? <Dashboard /> : <Login />} />
        ) : (
          ""
        )}
        <Route path="/orders" element={user ? <Orders /> : <Login />} />

        <Route path="/category" element={user ? <Category /> : <Login />} />
        <Route
          path="category/addCategory"
          element={user ? <AddCategory /> : <Login />}
        />
        <Route
          path="category/:id"
          element={user ? <UpdateCategory /> : <Login />}
        />

        <Route path="/products" element={user ? <Products /> : <Login />} />
        <Route
          path="products/addProduct"
          element={user ? <AddProducts /> : <Login />}
        />
        <Route
          path="products/:id"
          element={user ? <UpdateProduct /> : <Login />}
        />

        <Route path="/users" element={user ? <Users /> : <Login />} />
        <Route
          path="/productJson/:id"
          element={user ? <ProductsJson /> : <Login />}
        />
        <Route path="/settings" element={user ? <Settings /> : <Login />} />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
