"use client";
import { useState, useEffect, useContext } from "react";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { ThemeContext } from "@/context/ThemeContext"; // Import Theme Context
import { LanguageContext } from "@/context/LanguageContext"; // Import Language Context
import { translations } from "@/context/translations"; // Import Translations


const UpdateProfile = () => {
    const [profilePic, setProfilePic] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [originalData, setOriginalData] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [fileToUpload, setFileToUpload] = useState(null);
    const [passwordError, setPasswordError] = useState("");
    const { theme, toggleTheme } = useContext(ThemeContext); // Use Global Theme
    const { language, changeLanguage } = useContext(LanguageContext); // Use Global Language

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) throw new Error("No authentication token found");

                const response = await fetch("/api/auth/me", {
                    headers: { Authorization: `Bearer ${token}` },
                });

                if (!response.ok) throw new Error("Failed to fetch user data");

                const userData = await response.json();
                console.log("Fetched user data:", userData.data.user);

                setOriginalData(userData.data.user);
                setProfilePic(userData.data.user.profilePic || "");
                setName(userData.data.user.name || "");
                setEmail(userData.data.user.email || "");
            } catch (error) {
                console.error("Error fetching user data:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchUserData();
    }, []);

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (file) {
            setFileToUpload(file);
            setProfilePic(URL.createObjectURL(file));
        }
    };

    const uploadToCloudinary = async (file) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "user_profiles"); // Create this preset in your Cloudinary dashboard

        try {
            const response = await fetch(
                `https://api.cloudinary.com/v1_1/drbxfvemo/image/upload`,
                {
                    method: "POST",
                    body: formData,
                }
            );
            
            if (!response.ok) {
                throw new Error("Cloudinary upload failed");
            }
            
            const data = await response.json();
            console.log("Cloudinary upload response:", data);
            return data.secure_url;
        } catch (error) {
            console.error("Error uploading to Cloudinary:", error);
            throw new Error("Failed to upload image");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Validate password fields if attempting to change password
        if (newPassword || currentPassword) {
            if (!currentPassword) {
                setPasswordError("Current password is required");
                return;
            }
            if (!newPassword) {
                setPasswordError("New password is required");
                return;
            }
            if (newPassword !== confirmPassword) {
                setPasswordError("New passwords don't match");
                return;
            }
            if (newPassword.length < 6) {
                setPasswordError("Password must be at least 6 characters");
                return;
            }
        }
        
        setPasswordError("");
        
        try {
            // First, handle image upload if there's a file
            let cloudinaryUrl = null;
            if (fileToUpload) {
                try {
                    cloudinaryUrl = await uploadToCloudinary(fileToUpload);
                    console.log("Uploaded to Cloudinary, got URL:", cloudinaryUrl);
                } catch (error) {
                    alert("Failed to upload image: " + error.message);
                    return;
                }
            }
            
            // Prepare data for API
            const token = localStorage.getItem("token");
            if (!token) throw new Error("No authentication token found");
            
            // Create FormData object for submission
            const updatedFields = new FormData();
            
            if (name !== originalData.name) updatedFields.append("name", name);
            if (email !== originalData.email) updatedFields.append("email", email);
            
            // Add the Cloudinary URL if we have one
            if (cloudinaryUrl) {
                updatedFields.append("profilePic", cloudinaryUrl);
                console.log("Adding profilePic to form data:", cloudinaryUrl);
            }
            
            // Add password fields if present
            if (currentPassword && newPassword) {
                updatedFields.append("currentPassword", currentPassword);
                updatedFields.append("newPassword", newPassword);
            }

            if (updatedFields.entries().next().done && !cloudinaryUrl) {
                alert("No changes detected!");
                return;
            }

            // Make the API request
            const response = await fetch("/api/auth/me", {
                method: "PUT",
                headers: { Authorization: `Bearer ${token}` },
                body: updatedFields,
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Failed to update profile");
            }

            const result = await response.json();
            
            // Update local state with new data
            if (result.data && result.data.user) {
                setOriginalData(result.data.user);
                // Make sure to use the returned profilePic URL
                setProfilePic(result.data.user.profilePic || "");
            } else {
                // If the updated user data isn't in the expected format, 
                // at least update with what we know
                if (cloudinaryUrl) {
                    setProfilePic(cloudinaryUrl);
                }
            }
            
            setFileToUpload(null);
            setCurrentPassword("");
            setNewPassword("");
            setConfirmPassword("");
                        
            // Force refresh the page to ensure all changes are reflected
            window.location.reload();
        } catch (error) {
            console.error("Error updating profile:", error);
            alert("Failed to update profile: " + error.message);
        }
    };

    return (
        <div className={`mx-auto ${theme === "dark" ? "bg-gray-800 text-white" : "bg-gray-100 text-black"} rounded-lg p-6`}>
            <h2 className="text-lg font-bold mb-4 flex justify-start items-center gap-5">
                <Link href="/settings">
                    <ArrowLeft size={24} className="cursor-pointer mr-2" />
                </Link>Update Profile Details
            </h2>

            {isLoading ? (
                <div className="text-center py-10">Loading your profile data...</div>
            ) : (
                <>
                    <div className="flex flex-col items-center">
                        <label className="relative cursor-pointer">
                            <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                            {profilePic ? (
                                <div className='w-36 h-36 relative rounded-full overflow-hidden'>
                                <Image
                                    src={profilePic}
                                    alt="Profile"
                                    fill
                                    sizes='150px'
                                    className='rounded-full border-2 object-cover'
                                    priority
                                />
                            </div>
                            ) : (
                                <div className="w-24 h-24 bg-gray-300 rounded-full flex items-center justify-center">
                                    📷
                                </div>
                            )}
                            <div className="absolute inset-0 bg-black bg-opacity-20 rounded-full flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                                <span className="text-white text-sm">Change</span>
                            </div>
                        </label>
                        <p className="text-sm text-gray-500 mt-2">Tap to change</p>
                    </div>

                    <form onSubmit={handleSubmit} className="mt-4">
                        <div>
                            <label className="block text-gray-600 text-sm mb-1">Name</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className={`w-full p-2 border ${theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-black"} rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500`}
                            />
                        </div>

                        <div className="mt-3">
                            <label className="block text-gray-600 text-sm mb-1">Email Address</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className={`w-full p-2 border ${theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-black"} rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500`}
                            />
                        </div>
                        
                        {/* Password Update Section */}
                        <div className="mt-3">
                            
                            {passwordError && (
                                <div className="mb-3 p-2 bg-red-100 text-red-700 rounded-lg text-sm">
                                    {passwordError}
                                </div>
                            )}
                            
                            <div className="mb-3">
                                <label className="block text-gray-600 text-sm mb-1">Current Password</label>
                                <input
                                    type="password"
                                    value={currentPassword}
                                    onChange={(e) => setCurrentPassword(e.target.value)}
                                    className={`w-full p-2 border ${theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-black"} rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500`}
                                />
                            </div>
                            
                            <div className="mb-3">
                                <label className="block text-gray-600 text-sm mb-1">New Password</label>
                                <input
                                    type="password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    className={`w-full p-2 border ${theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-black"} rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500`}
                                />
                            </div>
                            
                            <div className="mb-3">
                                <label className="block text-gray-600 text-sm mb-1">Confirm New Password</label>
                                <input
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className={`w-full p-2 border ${theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-black"} rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500`}
                                />
                            </div>
                        </div>

                        <button type="submit" className="w-full mt-5 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700">
                            Save Changes
                        </button>
                    </form>
                </>
            )}
        </div>
    );
};

export default UpdateProfile;