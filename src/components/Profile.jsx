import { useEffect, useState } from "react";
import axiosInstance from "../api/axios";

const CustomerProfile = ({ onClose }) => {
  const [profile, setProfile] = useState({});
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    const res = await axiosInstance.get("/profile");
    setProfile(res.data);
  };

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const updateProfile = async () => {
    await axiosInstance.patch("profile", profile);
    alert("Profile Updated");
    setEdit(false);
  };

  return (
    <div className="fixed inset-0 z-50">
      {/* Click Outside Close */}
      <div className="absolute inset-0" onClick={onClose}></div>

      {/* SMALL TOP RIGHT CARD */}
      <div className="absolute right-6 top-16 w-[320px] bg-white rounded-xl shadow-2xl p-5">

        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold text-gray-700">My Profile</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-black">
            ✕
          </button>
        </div>

        {/* Avatar + Name */}
            <div className="flex flex-col items-center mb-4">
            <img
                className="w-12 h-12 rounded-full ring-2 ring-blue-300 object-cover mb-2"
                src="https://i.pravatar.cc/100"
                alt="Profile"
            />

            <p className="text-sm font-semibold">
                {profile.first_name} {profile.last_name}
            </p>
            <p className="text-xs text-gray-500">{profile.email}</p>
            </div>


        {/* Editable Field */}
        <input
          disabled={!edit}
          name="mobile_no"
          value={profile.mobile_no || ""}
          onChange={handleChange}
          className="w-full mb-3 p-2 border rounded text-sm"
          placeholder="Mobile"
        />

        {!edit ? (
          <button
            onClick={() => setEdit(true)}
            className="w-full bg-blue-600 text-white py-2 rounded text-sm"
          >
            Edit
          </button>
        ) : (
          <button
            onClick={updateProfile}
            className="w-full bg-green-600 text-white py-2 rounded text-sm"
          >
            Save
          </button>
        )}
      </div>
    </div>
  );
};

export default CustomerProfile;
