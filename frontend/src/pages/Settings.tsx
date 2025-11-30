
import { useState } from "react";
import { Moon, Sun, User, Lock } from "lucide-react";
import api from "../api/axios";


export default function Settings() {
    const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
    const [darkMode, setDarkMode] = useState(false);
    const [editProfile, setEditProfile] = useState(false);
    const [editPassword, setEditPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    // Profile fields
    const [name, setName] = useState(storedUser.name || "");
    const [email, setEmail] = useState(storedUser.email || "");

    // Password fields
    const [currentPassword, setcurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const token = localStorage.getItem("token");

    const updateProfile = async () => {
        try {
            setLoading(true);
            const res = await api.patch(
                "/auth/profile",
                { name, email },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            // Update local storage immediately
            localStorage.setItem("user", JSON.stringify(res.data.user));
            setEditProfile(false);
            alert("Profile updated successfully ✔");
        } catch (err: any) {
            alert(err.response?.data?.message || "Update failed");
        } finally {
            setLoading(false);
        }
    };

    const changePassword = async () => {
        if (newPassword !== confirmPassword) {
            alert("Password mismatch");
            return;
        }

        try {
            setLoading(true);
            await api.patch(
                "/auth/password",
                { currentPassword, newPassword },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setEditPassword(false);
            alert("Password updated successfully ✔");
        } catch (err: any) {
            alert(err.response?.data?.message || "Password update failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="px-4 sm:px-6 lg:px-10 w-full pb-10 space-y-6">
            <h1 className="text-3xl font-semibold text-[#344C3D] mb-4">
                Settings
            </h1>

            <div className="bg-white rounded-2xl shadow p-4 space-y-2 divide-y">
                {/* Profile Row */}
                <div
                    className="flex items-center justify-between py-4 cursor-pointer hover:bg-gray-50 rounded-xl px-2 transition"
                    onClick={() => setEditProfile(true)}
                >
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-[#344C3D]/10 rounded-xl flex items-center justify-center">
                            <User className="text-[#344C3D]" />
                        </div>
                        <div>
                            <h2 className="font-medium text-[#344C3D]">Profile</h2>
                            <p className="text-gray-500 text-sm">{storedUser.email}</p>
                        </div>
                    </div>
                    <span className="text-gray-400 text-xl">{">"}</span>
                </div>

                {/* Change Password Row */}
                <div
                    className="flex items-center justify-between py-4 cursor-pointer hover:bg-gray-50 rounded-xl px-2 transition"
                    onClick={() => setEditPassword(true)}
                >
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-[#344C3D]/10 rounded-xl flex items-center justify-center">
                            <Lock className="text-[#344C3D]" />
                        </div>
                        <div>
                            <h2 className="font-medium text-[#344C3D]">Change Password</h2>
                            <p className="text-gray-500 text-sm">Update your password securely</p>
                        </div>
                    </div>
                    <span className="text-gray-400 text-xl">{">"}</span>
                </div>

                {/* Dark Mode */}
                <div className="flex items-center justify-between py-4 px-2">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-[#344C3D]/10 rounded-xl flex items-center justify-center">
                            {darkMode ? <Moon className="text-[#344C3D]" /> : <Sun className="text-[#344C3D]" />}
                        </div>
                        <div>
                            <h2 className="font-medium text-[#344C3D]">Dark Mode</h2>
                            <p className="text-gray-500 text-sm">Switch theme appearance</p>
                        </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input
                            type="checkbox"
                            checked={darkMode}
                            onChange={() => setDarkMode(!darkMode)}
                            className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-[#344C3D] transition"></div>
                        <div className="absolute left-1 top-0.5 bg-white w-5 h-5 rounded-full peer-checked:translate-x-5 transition" />
                    </label>
                </div>
            </div>

            {/* Profile Popup */}
            {editProfile && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center px-4 z-50">
                    <div className="bg-white rounded-xl shadow p-6 w-full max-w-md space-y-4">
                        <h2 className="text-xl font-semibold text-[#344C3D]">Edit Profile</h2>
                        <input value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="Name" className="w-full border p-2 rounded" />
                        <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email" className="w-full border p-2 rounded" />

                        <div className="flex justify-end gap-3">
                            <button onClick={() => setEditProfile(false)} className="px-4 py-2 bg-gray-200 rounded">Cancel</button>
                            <button onClick={updateProfile} className="px-4 py-2 bg-[#344C3D] text-white rounded">
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Password Popup */}
            {editPassword && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center px-4 z-50">
                    <div className="bg-white rounded-xl shadow p-6 w-full max-w-md space-y-4">
                        <h2 className="text-xl font-semibold text-[#344C3D]">Change Password</h2>
                        <input value={currentPassword} onChange={(e) => setcurrentPassword(e.target.value)} type="password" placeholder="Current Password" className="w-full border p-2 rounded" />
                        <input value={newPassword} onChange={(e) => setNewPassword(e.target.value)} type="password" placeholder="New Password" className="w-full border p-2 rounded" />
                        <input value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} type="password" placeholder="Confirm Password" className="w-full border p-2 rounded" />

                        <div className="flex justify-end gap-3">
                            <button onClick={() => setEditPassword(false)} className="px-4 py-2 bg-gray-200 rounded">Cancel</button>
                            <button onClick={changePassword} className="px-4 py-2 bg-[#344C3D] text-white rounded">
                                Update
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Blur loading overlay */}
            {loading && (
                <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
                    <div className="text-white text-lg font-semibold animate-pulse">
                        Updating...
                    </div>
                </div>
            )}
        </div>
    );
}
