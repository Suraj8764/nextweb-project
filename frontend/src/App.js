import "./App.css";

import Header from "./component/Header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./component/Home";
import Login from "./component/Login";
import AddResources from "./component/AddResources";
import Signup from "./component/Signup";
import ForgotPassword from "./component/ForgotePassword";
import Logout from "./component/Logout";

function App() {
  return (
    <div className="App">
      
      <Router>
      <Header />
        <Routes>
          <Route path="/home" Component={Home} exact />
          <Route path="/" Component={Login} exact />
          <Route path="/add" Component={AddResources} exact />
          <Route path="/register" Component={Signup} exact />
          <Route path="/forgot-password" Component={ForgotPassword} exact />
          <Route path="/logout" Component={Logout} exact />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
