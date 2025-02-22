"use client";
import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

const updateprofile = () => {
    const [profilePic, setProfilePic] = useState(null);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [mobile, setMobile] = useState("");
    const [email, setEmail] = useState("");

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProfilePic(URL.createObjectURL(file));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Profile Updated Successfully!");
    };

    return (
        <div className=" mx-auto bg-white rounded-lg p-6">
            <h2 className="text-lg font-bold mb-4 flex justify-start items-center gap-5">
                <Link href="/settings">
                    <ArrowLeft size={24} className="cursor-pointer mr-2" />
                </Link>Update Profile Details</h2>

            {/* Profile Picture Upload */}
            <div className="flex flex-col items-center">
                <label className="relative cursor-pointer">
                    <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                    {profilePic ? (
                        <img src={profilePic} alt="Profile" className="w-24 h-24 rounded-full object-cover border" />
                    ) : (
                        <div className="w-24 h-24 bg-gray-300 rounded-full flex items-center justify-center">
                            📷
                        </div>
                    )}
                </label>
                <p className="text-sm text-gray-500 mt-2">Tap to change</p>
            </div>

            {/* Profile Form */}
            <form onSubmit={handleSubmit} className="mt-4">
                <div >
                    {/* First Name */}
                    <div>
                        <label className="block text-gray-600 text-sm mb-1">First Name</label>
                        <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)}
                            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" required />
                    </div>
                    {/* Last Name */}
                    <div>
                        <label className="block text-gray-600 text-sm mb-1">Last Name</label>
                        <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)}
                            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" required />
                    </div>
                </div>

                {/* Mobile Number */}
                <div className="mt-3">
                    <label className="block text-gray-600 text-sm mb-1">Mobile Number</label>
                    <input type="tel" value={mobile} onChange={(e) => setMobile(e.target.value)}
                        className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" required />
                </div>

                {/* Email Address */}
                <div className="mt-3">
                    <label className="block text-gray-600 text-sm mb-1">Email Address</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" required />
                </div>

                {/* Save Button */}
                <button type="submit" className="w-full mt-5  bg-green-600 text-white py-2 rounded-lg hover:bg-green-700">
                    Save Changes
                </button>
            </form>
        </div>
    );
};

export default updateprofile;
