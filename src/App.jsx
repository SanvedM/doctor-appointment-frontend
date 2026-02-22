// import { Routes, Route, BrowserRouter } from "react-router-dom";
// import Home from "./components/Home";

// function App() {
//   return (
//       <BrowserRouter>
//         <Routes>
//           {/* PUBLIC ROUTES */}

//           {/* PROTECTED ROUTES */}
//             <Route path="/" element={<Home />} />
//         </Routes>
//       </BrowserRouter>
//   );
// }

// export default App;



import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;