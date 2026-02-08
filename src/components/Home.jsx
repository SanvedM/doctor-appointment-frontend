import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import HeroSlider from "../components/HeroSlider";
import AppointmentCard from "./AppointmentCard";
import DoctorCard from "../components/DoctorCard";
import BookAppointmentModal from "../components/BookAppointment";
import CustomerProfile from "../components/Profile";
import api from "../api/axios";

const doctorImages = [
  "https://images.unsplash.com/photo-1550831107-1553da8c8464",
  "https://images.unsplash.com/photo-1537368910025-700350fe46c7",
  "https://images.unsplash.com/photo-1582750433449-648ed127bb54",
  "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d",
];

const Home = () => {
  const navigate = useNavigate();
  const didFetch = useRef(false); // IMPORTANT

  const [tab, setTab] = useState("doctors");
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [showProfile, setShowProfile] = useState(false);

  // LOGOUT
  const handleLogout = async () => {
    try {
      const refresh = localStorage.getItem("refresh");
      if (refresh) await api.post("logout", { refresh });
      localStorage.clear();
      navigate("/");
    } catch {
      localStorage.clear();
      navigate("/");
    }
  };

  // FETCH DOCTORS
  const fetchDoctors = async () => {
    const res = await api.get("profiles");
    const apiDoctors = res.data.data;

    const mapped = apiDoctors.map((d, i) => ({
      id: d.doctor_id,
      name: d.full_name,
      specialty: d.department,
      fee: d.fee,
      image: doctorImages[i % doctorImages.length],
    }));

    setDoctors(mapped);
  };

  // FETCH APPOINTMENTS
  const fetchAppointments = async () => {
    try {
      const res = await api.get("myappointment");

      const formatted = res.data.data.map((item) => ({
        id: item.id,
        doctor: item.admin_username,
        specialty: "General",
        date: item.appointment_date,
        time: item.appointment_time,
        status: item.status === "pending" ? "Upcoming" : item.status,
        customer:item.customer_username
      }));

      setAppointments(formatted);
    } catch (err) {
      console.log("Appointment error", err);
    }
  };

  // RUN ONLY ONCE (even in StrictMode)
  useEffect(() => {
    if (!didFetch.current) {
      fetchDoctors();
      fetchAppointments();
      didFetch.current = true;
    }
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* NAVBAR */}
      <nav className="bg-white border-b sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="flex gap-10 text-sm font-semibold">
            {["doctors", "appointments"].map((item) => (
              <button
                key={item}
                onClick={() => setTab(item)}
                className={`py-4 capitalize ${
                  tab === item
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-500"
                }`}
              >
                {item}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowProfile(true)}
              className="text-sm bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200"
            >
              Profile
            </button>

            <button
              onClick={handleLogout}
              className="text-sm bg-red-50 text-red-600 px-4 py-2 rounded-lg hover:bg-red-100"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* HERO */}
      {tab === "doctors" && (
        <div className="h-[220px] md:h-[300px] overflow-hidden">
          <HeroSlider />
        </div>
      )}

      {/* CONTENT */}
      <div className={`max-w-7xl mx-auto px-6 py-4 ${tab === "doctors" ? "-mt-6" : ""}`}>
        
        {tab === "doctors" && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {doctors.map((doc) => (
              <DoctorCard
                key={doc.id}
                doctor={doc}
                onBook={() => setSelectedDoctor(doc)}
              />
            ))}
          </div>
        )}

{tab === "appointments" && (
  <div className="w-full">
    {appointments.length === 0 ? (
      <p>No Appointments Found</p>
    ) : (
      <div className="space-y-6">
        {appointments.map((a) => (
          <AppointmentCard key={a.id} appointment={a} />
        ))}
      </div>
    )}
  </div>
)}

      </div>

      {selectedDoctor && (
        <BookAppointmentModal
          doctor={selectedDoctor}
          onClose={() => setSelectedDoctor(null)}
        />
      )}

      {showProfile && (
        <CustomerProfile onClose={() => setShowProfile(false)} />
      )}
    </div>
  );
};

export default Home;
