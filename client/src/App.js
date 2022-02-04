import "./fonts/Ember-medium.ttf";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Signup from "./components/screens/Signup";
import Signin from "./components/screens/Signin";
import Home from "./components/screens/Home";
import ProductDetail from "./components/screens/ProductDetail";
import Header from "./components/layouts/Header";
import CategoryNav from "./components/layouts/CategoryNav";
import Footer from "./components/layouts/Footer";
import Products from "./components/screens/Products";

function App() {
  return (
    <div className="App">
      <Header />
      <CategoryNav />
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        {/* {This route is for development purpose only, delete it later} */}
        <Route path="/search" element={<Products />} />
        <Route path="/search/:keyword" element={<Products />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
