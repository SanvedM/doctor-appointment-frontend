const DoctorCard = ({ doctor, onBook }) => {
    console.log(doctor,"this is doctor data")

  return (
    <div className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden">
      <img
        src={doctor.image}
        alt={doctor.name}
        className="h-40 w-full object-cover"
      />

      <div className="p-4">
        <h3 className="font-semibold text-lg">Dr. {doctor.name}</h3>
        <p className="text-sm text-gray-500">{doctor.specialty}</p>
        <p className="text-sm">{doctor.experience} experience</p>
        <p className="text-sm">Charges {doctor.fee} RS</p>


        <button
          onClick={onBook}
          className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
        >
          Book Appointment
        </button>
      </div>
    </div>
  );
};

export default DoctorCard;
