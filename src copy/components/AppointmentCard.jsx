const AppointmentCard = ({ appointment }) => {
  console.log(appointment,"this is appointmentttttttttttttttttttt")
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden border">

      {/* HEADER */}
      <div className="flex justify-between items-center bg-blue-50 px-5 py-3">
        <h3 className="text-lg font-semibold text-blue-700">
          Appointment
        </h3>

        <span
          className={`px-3 py-1 text-xs rounded-full font-medium ${
            appointment.status === "Upcoming"
              ? "bg-green-100 text-green-700"
              : "bg-gray-200 text-gray-600"
          }`}
        >
          {appointment.status}
        </span>
      </div>

      {/* BODY */}
      <div className="p-5">

        {/* Doctor Info */}
        <h2 className="text-xl font-semibold text-gray-800">
          Dr. {appointment.doctor}
        </h2>
        <p className="text-sm text-gray-500 mb-4">
          {appointment.specialty}
        </p>

        {/* Date Time */}
        <div className="flex gap-10 text-sm text-gray-600 mb-5">
          <div className="flex items-center gap-2">
            📅 <span>{appointment.date}</span>
          </div>

          <div className="flex items-center gap-2">
            ⏰ <span>{appointment.time}</span>
          </div>
          <div className="flex items-center gap-2">
            👤  <span>{appointment.customer}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-4">
          <button className="px-4 py-2 text-sm rounded-lg bg-blue-600 text-white hover:bg-blue-700">
            Reschedule
          </button>

          <button className="px-4 py-2 text-sm rounded-lg bg-red-50 text-red-600 hover:bg-red-100">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AppointmentCard;
