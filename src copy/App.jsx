import { Routes, Route, Link ,BrowserRouter} from "react-router-dom";
import Home from "./components/Home";
import AuthGuard from "./components/AuthRouter";
import Contact from "./components/Contact";
import Login from "./components/Login";
import BookAppointment from "./components/BookAppointment";
import AppointmentCard from "./components/AppointmentCard";
import { AuthProvider } from "./components/AuthContext";
import Register from "./components/Register";

function App() {
  return (
    <>
    <div>
      {/* <nav>
      <Link to="/home">Home</Link>
      <Link to="/about">About</Link>
      <Link to="/contact">Contact</Link>
      </nav> */}

        <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />


        <Route element={<AuthGuard/>}>

          <Route path="/home" element={<Home/>}></Route>
          <Route path="/contact" element={<Contact/>}></Route>
          <Route path="/view-appointment" element={<AppointmentCard/>}></Route>
          <Route path="/book-appointment/:doctorId" element={<BookAppointment/>}></Route>
          {/* <Route path="/profile" element={<CustomerProfile/>}></Route> */}


        </Route>
      </Routes>
      </BrowserRouter>
    </div>
    </>
  );
}

export default App;
