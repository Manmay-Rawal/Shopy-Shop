import { createBrowserRouter} from "react-router-dom"
import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import Navbar from "./components/navbar";


export let router = createBrowserRouter([
  {
    path: "/",
    element:(<>
      <Navbar />
      <Home />
    </>) 
  },
  {
    path: "/about",
    element:(<>
      <Navbar />
      <About />
    </>) 
  },
  {
    path: "/login",
    element:(<>
      <Navbar />
      <Login />
    </>) 
  },
  {
    path: "/signup",
    element:(<>
      <Navbar />
      <Signup />
    </>) 
  }
])
