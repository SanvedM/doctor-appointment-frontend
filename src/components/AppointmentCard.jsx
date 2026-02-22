import { CalendarDays, Clock, User, CalendarX } from "lucide-react";

const AppointmentCard = ({ appointment }) => {
  // 🔥 EMPTY STATE HANDLER
  if (!appointment) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">

        {/* Icon */}
        <div className="w-24 h-24 rounded-full 
                        bg-gradient-to-br from-green-100 to-teal-100
                        flex items-center justify-center mb-6 shadow-sm">
          <CalendarX className="text-teal-600" size={40} />
        </div>

        {/* Title */}
        <h3 className="text-xl font-semibold text-teal-800 mb-2">
          No Upcoming Appointments
        </h3>

        {/* Subtitle */}
        <p className="text-gray-500 max-w-sm">
          You haven't booked any appointments yet.
        </p>
      </div>
    );
  }

  // ✅ combine date + time
  const appointmentDateTime = new Date(
    `${appointment.date}T${appointment.time}`
  );

  const now = new Date();
  const isExpired = appointmentDateTime < now;
  const displayStatus = isExpired ? "Expired" : "Upcoming";

  return (
    <div className="group bg-white/80 backdrop-blur-md border border-green-100 
                    rounded-2xl shadow-sm hover:shadow-xl 
                    transition-all duration-300 hover:-translate-y-1 
                    p-5">

      {/* TOP ROW */}
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-semibold text-teal-700 group-hover:text-teal-800 transition">
            Dr. {appointment.doctor}
          </h3>

          <p className="text-sm text-gray-500 mt-1">
            {appointment.specialty}
          </p>
        </div>

        {/* STATUS BADGE */}
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold
            ${
              isExpired
                ? "bg-red-100 text-red-700"
                : "bg-green-100 text-green-700"
            }`}
        >
          {displayStatus}
        </span>
      </div>

      {/* DIVIDER */}
      <div className="my-4 h-px bg-gradient-to-r from-transparent via-green-200 to-transparent" />

      {/* DETAILS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
        
        <div className="flex items-center gap-2 text-gray-600">
          <CalendarDays size={16} className="text-green-600" />
          <span>{appointment.date}</span>
        </div>

        <div className="flex items-center gap-2 text-gray-600">
          <Clock size={16} className="text-green-600" />
          <span>{appointment.time}</span>
        </div>

        {appointment.customer && (
          <div className="flex items-center gap-2 text-gray-600 sm:col-span-2">
            <User size={16} className="text-green-600" />
            <span>{appointment.customer}</span>
          </div>
        )}
      </div>

      {/* ACTION */}
      <div className="mt-4 flex justify-end">
        <button
          className="text-xs font-medium text-green-700 
                     hover:text-white hover:bg-green-600
                     border border-green-200 hover:border-green-600
                     px-3 py-1.5 rounded-lg
                     transition-all duration-200"
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default AppointmentCard;