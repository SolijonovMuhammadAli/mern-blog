import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import AuthProvider from "./context/AuthProvider";
import PrivateRoute from "./router/route";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import Blogs from "./pages/Blogs";
import AddContainer from "./pages/Add";
import Blog from "./pages/Blog";
import "./assets/App.css";

function App() {
  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <Routes>
            <Route path="/login" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route element={<PrivateRoute />}>
              <Route path="/home" element={<Home />} />
              <Route path="/blogs" element={<Blogs />} />
              <Route path="/blog/:id" element={<Blog />} />
              <Route path="/add" element={<AddContainer />} />
              <Route path="/edit/:id" element={<AddContainer />} />
              <Route path="/*" element={<Navigate to="/home" />} />
            </Route>
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
