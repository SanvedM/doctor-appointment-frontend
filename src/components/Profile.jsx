import { useEffect, useState } from "react";
import { X } from "lucide-react";
import api from "../api/axios";

const CustomerProfile = ({ onClose }) => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ fetch profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get("/my-profile");
        setProfile(res.data);
      } catch (err) {
        console.log("Profile fetch error", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // ✅ initials helper
  const getInitials = () => {
    if (!profile?.first_name) return "U";
    return profile.first_name.charAt(0).toUpperCase();
  };

  return (
    <>
      {/* BACKDROP */}
      <div
        className="fixed inset-0 bg-black/20 backdrop-blur-[2px] z-40"
        onClick={onClose}
      />

      {/* PROFILE PANEL */}
      <div className="fixed top-20 right-6 z-50 w-80 animate-[fadeIn_.2s_ease-out]">
        <div className="bg-white/95 backdrop-blur-md border border-green-100 rounded-2xl shadow-xl overflow-hidden">
          
          {/* HEADER */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
            <h2 className="font-semibold text-teal-800 text-sm">
              My Profile
            </h2>

            <button
              onClick={onClose}
              className="p-1 rounded-lg hover:bg-gray-100 transition"
            >
              <X size={16} className="text-gray-500" />
            </button>
          </div>

          {/* AVATAR */}
          <div className="flex flex-col items-center py-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-400 to-teal-500 flex items-center justify-center text-white font-bold text-sm shadow-md">
              {getInitials()}
            </div>

            <p className="mt-1 font-semibold text-gray-800 text-sm">
              {loading
                ? "Loading..."
                : profile?.first_name || profile?.username || "User"}
            </p>
          </div>

          {/* BODY */}
          <div className="px-4 pb-3 space-y-2 text-sm">
            <div className="bg-green-50 rounded-lg p-2.5">
              <p className="text-[11px] text-gray-500">Email</p>
              <p className="font-medium text-gray-800 text-sm">
                {loading ? "..." : profile?.email || "-"}
              </p>
            </div>

            <div className="bg-green-50 rounded-lg p-2.5">
              <p className="text-[11px] text-gray-500">Phone</p>
              <p className="font-medium text-gray-800 text-sm">
                {loading ? "..." : profile?.mobile_no || "-"}
              </p>
            </div>
          </div>

          {/* FOOTER */}
          <div className="p-3 border-t border-gray-100">
            <button
              onClick={onClose}
              className="w-full bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white py-2 rounded-xl text-sm font-medium transition"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CustomerProfile;