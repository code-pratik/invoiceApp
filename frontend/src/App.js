import { BrowserRouter, Route, Routes } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import Error404 from "./pages/error/error";
import { Layout } from "./layout/layout";
import ProductsPage from "./pages/productPage/product";
import JobsPage from "./pages/jobPage/job";
import InvoicePage from "./pages/invoicepage/invoice";
import HomePage from "./pages/home/home";
import { useEffect } from "react";
import { useSelector } from "react-redux";

function App() {
  const theme = useSelector((state) => state.darkMode.theme);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove(theme === "dark" ? "light" : "dark");
    root.classList.add(theme === "dark" ? "dark" : "light");
  }, [theme]);

  return (
    <div className="App ">
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="products" element={<ProductsPage />} />
            <Route path="jobs" element={<JobsPage />} />
            <Route path="invoice" element={<InvoicePage />} />
          </Route>
          <Route path="*" element={<Error404 />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
