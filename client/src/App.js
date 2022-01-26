import "./fonts/Ember-medium.ttf";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Signup from "./components/layouts/Signup";
import Signin from "./components/layouts/Signin";
import Home from "./components/layouts/Home";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
      </Routes>
    </div>
  );
}

export default App;
