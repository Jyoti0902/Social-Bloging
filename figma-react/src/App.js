import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./Components/Login";
import { useLocation, useNavigate } from "react-router-dom";
import Blog from "./Components/Blog";
import Signup from "./Components/Signup";
import CreateBlog from "./Components/CreateBlog";
// import HeaderLower from "./Components/HeaderLower";
import HeaderUpper from "./Components/HeaderUpper";
import Footer from "./Components/Footer";
import { useEffect } from "react";
import UpdateBlog from "./Components/UpdateBlog";
import Profile from "./Components/Profile";
import Forgot from "./Components/Forgot";
import ResetPassword from "./Components/ResetPassword";
import BlogDetails from "./Components/BlogDetails";
import ChangePassword from "./Components/ChangePassword";

function App1() {
  const location = useLocation();
  const showCreateForm =
    location.pathname === "/" ||
    location.pathname === "/signup" ||
    location.pathname === "/profile" ||
    location.pathname === "/forgotpassword" ||
    location.pathname === "/resetpassword/:email";

  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  useEffect(() => {
    if (token) {
      navigate("/blog");
    }
  }, []);
  return (
    <>
      <div className="app-container">
        {!showCreateForm && (
          <>
            <HeaderUpper />
            {/* <HeaderLower /> */}
          </>
        )}
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/create" element={<CreateBlog />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/update/:id" element={<UpdateBlog />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/forgotpassword" element={<Forgot />} />
          <Route path="/resetpassword/:email" element={<ResetPassword />} />
          <Route path="/blogdetails/:id" element={<BlogDetails />} />
          <Route path="/change-password" element={<ChangePassword />} />
        </Routes>
        {!showCreateForm && <Footer />}
      </div>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <App1></App1>
    </BrowserRouter>
  );
}

export default App;
