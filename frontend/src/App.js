import "./App.css";

import Header from "./component/Header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./component/Home";
import Login from "./component/Login";
import AddResources from "./component/AddResources";

function App() {
  return (
    <div className="App">
      
      <Router>
      <Header />
        <Routes>
          <Route path="/" Component={Home} exact />
          <Route path="/login" Component={Login} exact />
          <Route path="/add" Component={AddResources} exact />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
