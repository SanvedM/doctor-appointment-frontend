import { useState } from "react";

const BookAppointmentModal = ({ doctor, onClose, onConfirm }) => {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  // ✅ today min date
  const today = new Date().toISOString().split("T")[0];

  const submit = () => {
    if (!date || !time) {
      alert("Please select date and time");
      return;
    }

    onConfirm({ doctor, date, time });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 w-96">
        <h2 className="text-xl font-semibold mb-4">
          Book Appointment
        </h2>

        {/* DATE */}
        <label className="text-sm text-gray-600">Select Date</label>
        <input
          type="date"
          min={today}
          className="w-full border rounded-xl px-3 py-2 mb-4"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        {/* TIME */}
        <label className="text-sm text-gray-600">Select Time</label>
        <input
          type="time"
          className="w-full border rounded-xl px-3 py-2 mb-4"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />

        <div className="flex gap-2">
          <button
            onClick={submit}
            className="flex-1 bg-teal-500 text-white py-2 rounded-xl"
          >
            Confirm
          </button>

          <button
            onClick={onClose}
            className="flex-1 border py-2 rounded-xl"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookAppointmentModal;