import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import BookAppointmentModal from "../components/BookAppointment";

const DoctorDetails = ({ doctor, onBack }) => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const isLoggedIn = !!localStorage.getItem("token");

  // ✅ called after modal confirm
  const handleConfirmBooking = async ({ date, time }) => {
    try {
      const payload = {
        doctor: doctor.id, // backend expects doctor
        appointment_date: date,
        appointment_time: time,
      };

      console.log("BOOK PAYLOAD:", payload);

      const response = await api.post("book-appointment", payload);

      alert("Appointment booked successfully ✅");
      console.log(response.data);
    } catch (error) {
      console.error("BOOK ERROR:", error.response?.data || error);
      alert(
        error.response?.data
          ? JSON.stringify(error.response.data)
          : "Failed to book appointment ❌"
      );
    }
  };

  const handleBookClick = () => {
    if (!isLoggedIn) {
      alert("Please login first to book appointment");
      navigate("/login");
      return;
    }

    setShowModal(true);
  };

  return (
    <>
      <div className="max-w-6xl mx-auto p-6 grid md:grid-cols-2 gap-8">
        <img
          src={doctor.image}
          alt={doctor.name}
          className="w-full h-[420px] object-cover rounded-3xl"
        />

        <div>
          <button
            onClick={onBack}
            className="mb-4 border px-4 py-2 rounded-xl"
          >
            ← Back
          </button>

          <h1 className="text-3xl font-bold text-teal-700">
            Dr. {doctor.name}
          </h1>

          <p className="text-gray-500 mt-2">{doctor.specialty}</p>
          <p className="text-gray-500 mt-2">
            Education : {doctor.qualification}
          </p>
          <p className="text-gray-500 mt-2">
            Mobile No : {doctor.mobile_no}
          </p>

          <p className="mt-2">Consultation Fee: ₹{doctor.fee}</p>

          {/* BOOK BUTTON */}
          <button
            onClick={handleBookClick}
            className={`mt-6 px-6 py-2 rounded-xl text-white transition ${
              isLoggedIn
                ? "bg-teal-500 hover:bg-teal-600"
                : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            Add Appointment
          </button>
        </div>
      </div>

      {/* ✅ MODAL */}
      {showModal && (
        <BookAppointmentModal
          doctor={doctor}
          onClose={() => setShowModal(false)}
          onConfirm={handleConfirmBooking}
        />
      )}
    </>
  );
};

export default DoctorDetails;