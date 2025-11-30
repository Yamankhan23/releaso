import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import API from "../api/axios";

export default function Register() {
    const navigate = useNavigate();
    const [form, setForm] = useState({ name: "", email: "", password: "" });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await API.post("/auth/register", form);
            localStorage.setItem("token", res.data.token);
            navigate("/app");
        } catch (err: any) {
            alert(err.response?.data?.message || "Registration failed");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-white">
            {/* PREMIUM AUTH CARD */}
            <div
                className="
                    w-full max-w-sm p-6 rounded-lg
                    bg-[#ffffffef] backdrop-blur-md
                    border border-[#BFCFBB]/60
                    shadow-[0_6px_26px_rgba(18,46,52,0.16)]
                "
            >
                <h1 className="text-lg font-semibold text-[#122E34] text-center mb-1">
                    Create Account
                </h1>
                <p className="text-center text-[11px] text-[#677E8A] mb-4">
                    Start your new workspace journey
                </p>

                <form className="space-y-3" onSubmit={handleSubmit}>
                    <div>
                        <label className="text-[11px] font-medium text-[#677E8A]">Full Name</label>
                        <input
                            type="text"
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                            className="
                                mt-1 w-full px-3 py-2 rounded-md bg-[#F9FAF9]
                                border border-[#BFCFBB]
                                focus:outline-none focus:ring-2 focus:ring-[#344C3D]
                                text-sm transition
                            "
                            placeholder="John Doe"
                        />
                    </div>

                    <div>
                        <label className="text-[11px] font-medium text-[#677E8A]">Email</label>
                        <input
                            type="email"
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                            className="
                                mt-1 w-full px-3 py-2 rounded-md bg-[#F9FAF9]
                                border border-[#BFCFBB]
                                focus:outline-none focus:ring-2 focus:ring-[#344C3D]
                                text-sm transition
                            "
                            placeholder="example@email.com"
                        />
                    </div>

                    <div>
                        <label className="text-[11px] font-medium text-[#677E8A]">Password</label>
                        <input
                            type="password"
                            onChange={(e) => setForm({ ...form, password: e.target.value })}
                            className="
                                mt-1 w-full px-3 py-2 rounded-md bg-[#F9FAF9]
                                border border-[#BFCFBB]
                                focus:outline-none focus:ring-2 focus:ring-[#344C3D]
                                text-sm transition
                            "
                            placeholder="••••••••"
                        />
                    </div>

                    <button
                        type="submit"
                        className="
                            w-full py-2 rounded-md text-white text-sm font-medium
                            bg-gradient-to-r from-[#344C3D] to-[#738A6E]
                            hover:opacity-90 transition
                        "
                    >
                        Register
                    </button>
                </form>

                <p className="text-center text-[11px] text-[#677E8A] mt-4">
                    Already have an account?{" "}
                    <Link to="/" className="font-semibold text-[#344C3D] hover:underline transition">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
}
