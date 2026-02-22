import { Search, User, DoorOpen } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Navbar = ({
  tab,
  setTab,
  appointmentCount,
  onProfile,
  onLogout,
}) => {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const isLoggedIn = !!token;

  return (
    <nav className="bg-white/90 backdrop-blur border-b sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">

        {/* LOGO */}
        <div className="flex flex-col items-start">
          <h1 className="text-2xl font-bold text-teal-600 tracking-tight">
            MediCare
          </h1>

          {/* ✅ NEW: logo below text */}

        </div>

        {/* SEARCH */}
        <div className="hidden md:flex items-center gap-2 w-1/3">
          <input
            placeholder="Search doctors..."
            className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400"
          />
          <Search size={18} className="text-gray-500" />
        </div>

        {/* NAV TABS */}
        <div className="flex items-center gap-7 text-base font-medium">
          {["doctors", "appointments", "contact"].map((item) => (
            <button
              key={item}
              onClick={() => setTab(item)}
              className={`capitalize relative transition-all duration-200 ${
                tab === item
                  ? "text-teal-600 font-semibold"
                  : "text-gray-500 hover:text-teal-600"
              }`}
            >
              {item === "appointments" ? "My Appointments" : item}

              {item === "appointments" && appointmentCount > 0 && (
                <span className="absolute -top-2 -right-4 bg-teal-500 text-white text-xs px-2 rounded-full">
                  {appointmentCount}
                </span>
              )}
            </button>
          ))}

          {/* LOGIN / PROFILE SWITCH */}
          {isLoggedIn ? (
            <div className="flex items-center gap-3">
              <button
                onClick={onProfile}
                className="p-2 rounded-xl hover:bg-teal-50 transition"
                title="Profile"
              >
                {/* ✅ slightly bigger icon */}
                <User className="text-teal-600" size={26} />
              </button>

              <button
                onClick={onLogout}
                className="bg-red-500 hover:bg-red-600 text-white 
                           px-5 py-2 rounded-xl text-base 
                           transition font-medium"
              >
                Logout
              </button>
            </div>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="bg-teal-600 hover:bg-teal-700 text-white 
                         px-5 py-2 rounded-xl text-base 
                         transition font-medium"
            >
              Login
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;