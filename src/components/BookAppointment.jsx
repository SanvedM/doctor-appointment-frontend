import { useState } from "react";
import api from "../api/axios";



const BookAppointmentModal = ({ doctor, onClose }) => {
  const [form, setForm] = useState({
    date: "",
    time: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);


    try {

      const payload = {
        doctor: doctor.id,                // 👈 doctor ID
        appointment_date: form.date,
        appointment_time: form.time
      };

    await api.post("appointment", payload);



      alert("Appointment booked successfully!");
      onClose();

    } catch (err) {
      alert("Appointment Not Booked");
      console.log("BACKEND DATA:", err.response?.data);


  if (err.response) {
    console.log("STATUS:", err.response.status);
    console.log("BACKEND DATA:", err.response.data); // 👈 THIS

    setError(
      err.response.data.detail ||
      JSON.stringify(err.response.data)
    );
  } else {
    setError("Server not reachable");
  }
}


  };


  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow w-full max-w-md relative">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-black"
        >
          ✕
        </button>

        <h2 className="text-xl font-bold mb-4">
          Book Appointment
        </h2>

        {/* Doctor (pre-filled & disabled) */}
        <label className="block mb-2 text-sm font-medium">
          Doctor
        </label>
        <input
          type="text"
          name="doctor"
          value={doctor?.name || doctor?.username || ""}
          disabled
          className="w-full mb-4 p-2 border rounded bg-gray-100"
        />

        {/* Date */}
        <label className="block mb-2 text-sm font-medium">
          Select Date
        </label>
        <input
          type="date"
          name="date"
          onChange={handleChange}
          required
          className="w-full mb-4 p-2 border rounded"
        />

        {/* Time */}
        <label className="block mb-2 text-sm font-medium">
          Select Time
        </label>
        <input
          type="time"
          name="time"
          onChange={handleChange}
          required
          className="w-full mb-6 p-2 border rounded"
        />

        <button
          type="submit"
          onClick={handleSubmit}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Confirm Appointment
        </button>
      </div>
    </div>
  );
};

export default BookAppointmentModal;
