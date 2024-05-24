import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./Components/Login";
import { useLocation, useNavigate } from "react-router-dom";
import Blog from "./Components/Blog";
import Signup from "./Components/Signup";
import CreateBlog from "./Components/CreateBlog";
import HeaderUpper from "./Components/HeaderUpper";
import Footer from "./Components/Footer";
import { useEffect, useState } from "react";
import UpdateBlog from "./Components/UpdateBlog";
import Profile from "./Components/Profile";
import Forgot from "./Components/Forgot";
import ResetPassword from "./Components/ResetPassword";
import BlogDetails from "./Components/BlogDetails";
import ChangePassword from "./Components/ChangePassword";
import { Provider } from "react-redux";
import { store } from "./Redux/store";
import { counterContext } from "./context/counterContext";
import Demo from "./Components/Demo";
import DemoCounter from "./Components/DemoCounter";
import AllPosts from "./Components/AllPosts";
import About from "./Components/About";

function App1() {
  const location = useLocation();
  const showCreateForm =
    location.pathname === "/" ||
    location.pathname === "/signup" ||
    location.pathname === "/profile" ||
    location.pathname === "/forgotpassword" ||
    location.pathname.startsWith("/resetpassword" )||
    location.pathname.startsWith("/blogdetails");
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
          <Route path="/demo" element={<Demo />} />
          <Route path="/democounter" element={<DemoCounter />} />
          <Route path="/allposts" element={<AllPosts />} />
          <Route path="/about" element={<About />} />
        </Routes>
        {!showCreateForm && <Footer />}
      </div>
    </>
  );
}

function App() {
  const [demoText, setDemoText] = useState("demoText");
  return (
    <Provider store={store}>
      <counterContext.Provider value={{ demoText, setDemoText }}>
        <BrowserRouter>
          <App1></App1>
        </BrowserRouter>
      </counterContext.Provider>
    </Provider>
  );
}

export default App;
