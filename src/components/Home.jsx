import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import HeroSlider from "../components/HeroSlider";
import AppointmentCard from "./AppointmentCard";
import DoctorCard from "../components/DoctorCard";
import DoctorDetails from "../components/DoctorDetails";
import BookAppointmentModal from "../components/BookAppointment";
import Navbar from "../components/Navbar";
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

  const [tab, setTab] = useState("doctors");
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [viewDoctor, setViewDoctor] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  // 🔥 SMART TAB HANDLER (IMPORTANT)
  const handleTabChange = (newTab) => {
    setTab(newTab);
    setViewDoctor(null); // always reset doctor details
  };

  // LOGOUT
  const handleLogout = async () => {
    try {
      const refresh = localStorage.getItem("refresh");
      if (refresh) await api.post("logout", { refresh });
    } catch {}
    localStorage.clear();
    navigate("/");
  };

  // FETCH DOCTORS
  const fetchDoctors = async () => {
    try {
      const res = await api.get("doctors");
      const apiDoctors = res.data.data;

      const mapped = apiDoctors.map((d, i) => ({
        id: d.doctor_id,
        name: d.full_name,
        specialty: d.department,
        fee: d.fee,
        mobile_no: d.mobile_no,
        qualification: d.qualification,
        image: doctorImages[i % doctorImages.length],
      }));

      setDoctors(mapped);
    } catch (err) {
      console.log("Doctor error", err);
    }
  };

  // FETCH APPOINTMENTS
  const fetchAppointments = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setAppointments([]);
      return;
    }

    try {
      const res = await api.get("book-appointment");

      const formatted = res.data.map((item) => ({
        id: item.id,
        doctor: item.admin_username,
        specialty: "General",
        date: item.appointment_date,
        time: item.appointment_time,
        status: item.status === "pending" ? "Upcoming" : item.status,
        customer: item.customer_username,
      }));

      setAppointments(formatted);
    } catch (err) {
      console.log("Appointment error", err);
    }
  };

  // ✅ SMART FETCH BASED ON TAB
  useEffect(() => {
    if (tab === "doctors" && doctors.length === 0) {
      fetchDoctors();
    }

    if (tab === "appointments" && appointments.length === 0) {
      fetchAppointments();
    }
  }, [tab]);

  // 🔔 FETCH ON LOAD FOR GLOBAL NOTIFICATION
  useEffect(() => {
    fetchAppointments();
  }, []);

  // ADD APPOINTMENT LOCALLY
  const handleConfirmBooking = (data) => {
    const newItem = {
      id: Date.now(),
      doctor: data.doctor.name,
      specialty: data.doctor.specialty,
      date: data.date,
      time: "10:00 AM",
      status: "Upcoming",
    };
    setAppointments((prev) => [newItem, ...prev]);
  };
  // 🔥 CHECK IF APPOINTMENT IS IN FUTURE
const isUpcomingAppointment = (appointment) => {
  try {
    const apptDateTime = new Date(
      `${appointment.date}T${appointment.time}`
    );
    return apptDateTime > new Date();
  } catch {
    return false;
  }
};
const upcomingCount = appointments.filter(isUpcomingAppointment).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-green-50">
      {/* NAVBAR */}
      <Navbar
        tab={tab}
        setTab={handleTabChange}   // ✅ IMPORTANT
        appointmentCount={upcomingCount}
        onProfile={() => setShowProfile(true)}
        onLogout={handleLogout}
      />

      {/* HERO */}
      {tab === "doctors" && !viewDoctor && (
        <div className="h-[220px] md:h-[300px] overflow-hidden">
          <HeroSlider />
        </div>
      )}

      {/* CONTENT */}
      <div className="max-w-7xl mx-auto px-6 py-4">

        {/* DOCTOR LIST */}
        {tab === "doctors" && !viewDoctor && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {doctors.map((doc) => (
              <DoctorCard
                key={doc.id}
                doctor={doc}
                onView={(doc) => setViewDoctor(doc)}
              />
            ))}
          </div>
        )}

        {/* DOCTOR DETAILS */}
        {tab === "doctors" && viewDoctor && (
          <DoctorDetails
            doctor={viewDoctor}
            onBack={() => setViewDoctor(null)}
            onBook={() => setShowModal(true)}
          />
        )}

        {/* APPOINTMENTS */}
        {tab === "appointments" && (
          <div className="space-y-6">
            {appointments.length === 0 ? (
  <AppointmentCard appointment={null} />
) : (
              appointments.map((a) => (
                <AppointmentCard key={a.id} appointment={a} />
              ))
            )}
          </div>
        )}

        {/* CONTACT */}
        {tab === "contact" && (
          <div className="">
            <div className="max-w-6xl mx-auto px-6">

              {/* HEADER */}
              <div className="text-center mb-2">
                <h2 className="text-3xl md:text-4xl font-bold text-teal-700 mb-3">
                  Contact & Support
                </h2>
                <p className="text-gray-500">
                  We're here to help you manage your appointments smoothly.
                </p>
              </div>

              {/* GRID */}
              <div className="grid lg:grid-cols-2 gap-8">

                {/* LEFT SIDE — CONTACT INFO */}
                <div className="space-y-2">

                  {/* CARD */}
                  <div className="bg-white/80 backdrop-blur-md border border-green-100 
                          rounded-3xl shadow-sm p-6">

                    <h3 className="text-xl font-semibold text-teal-700 mb-5">
                      Get in Touch
                    </h3>

                    <div className="space">

                      {/* EMAIL */}
                      <div className="flex items-center gap-4 p-4 rounded-xl bg-green-50 hover:bg-green-100 transition">
                        <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center shadow-sm">
                          📧
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Email</p>
                          <p className="font-medium text-green-700">
                            support@medicare.com
                          </p>
                        </div>
                      </div>

                      {/* PHONE */}
                      <div className="flex items-center gap-4 p-4 rounded-xl bg-green-50 hover:bg-green-100 transition">
                        <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center shadow-sm">
                          📞
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Phone</p>
                          <p className="font-medium text-green-700">
                            +91 98765 43210
                          </p>
                        </div>
                      </div>

                      {/* ADDRESS */}
                      <div className="flex items-center gap-4 p-4 rounded-xl bg-green-50 hover:bg-green-100 transition">
                        <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center shadow-sm">
                          📍
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Address</p>
                          <p className="font-medium text-green-700">
                            Mumbai, Maharashtra, India
                          </p>
                        </div>
                      </div>

                    </div>
                  </div>

                  {/* SUPPORT HOURS */}
                  <div className="bg-gradient-to-br from-green-100 to-teal-100 
                          rounded-3xl p-6">
                    <h3 className="text-lg font-semibold text-teal-800 mb-2">
                      Support Hours
                    </h3>
                    <p className="text-sm text-gray-700">
                      Monday – Saturday
                    </p>
                    <p className="text-sm font-medium text-teal-900">
                      9:00 AM – 6:00 PM
                    </p>
                  </div>

                </div>

                {/* RIGHT SIDE — CONTACT FORM */}
                <div className="bg-white/80 backdrop-blur-md border border-green-100 
                        rounded-3xl shadow-sm p-6">

                  <h3 className="text-xl font-semibold text-teal-700 mb-5">
                    Send us a Message
                  </h3>

                  <div className="space-y-4">

                    <input
                      type="text"
                      placeholder="Your Name"
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 
                         focus:outline-none focus:ring-2 focus:ring-green-400"
                    />

                    <input
                      type="email"
                      placeholder="Your Email"
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 
                         focus:outline-none focus:ring-2 focus:ring-green-400"
                    />

                    <textarea
                      rows="4"
                      placeholder="Your Message"
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 
                         focus:outline-none focus:ring-2 focus:ring-green-400"
                    />

                    <button
                      className="w-full bg-gradient-to-r from-green-600 to-teal-600 
                         hover:from-green-700 hover:to-teal-700
                         text-white font-medium py-3 rounded-xl
                         transition-all duration-200 shadow-sm hover:shadow-md"
                    >
                      Send Message
                    </button>

                  </div>
                </div>

              </div>
            </div>
          </div>
        )}
      </div>

      {/* MODALS */}
      {showModal && (
        <BookAppointmentModal
          doctor={viewDoctor}
          onClose={() => setShowModal(false)}
          onConfirm={handleConfirmBooking}
        />
      )}

      {showProfile && (
        <CustomerProfile onClose={() => setShowProfile(false)} />
      )}
    </div>

    
  );
  
};

export default Home;