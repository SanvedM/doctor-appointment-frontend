const DoctorCard = ({ doctor, onView }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition p-4 border border-gray-100">
      <img
        src={doctor.image}
        alt={doctor.name}
        className="h-44 w-full object-cover rounded-xl"
      />

      <h3 className="mt-3 font-semibold text-lg">Dr.{doctor.name}</h3>
      <p className="text-gray-500 text-sm">{doctor.specialty}</p>
      <p className="text-teal-600 font-semibold mt-1">₹{doctor.fee}</p>

      <button
        onClick={() => onView(doctor)}
        className="w-full mt-3 bg-teal-500 hover:bg-teal-600 text-white py-2 rounded-xl"
      >
        View Details
      </button>
    </div>
  );
};

export default DoctorCard;
