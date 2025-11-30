/* // src/components/Sidebar.tsx
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Home, FileText, PlusCircle, BarChart3, Settings, LogOut, Shield } from "lucide-react";

export default function Sidebar({ isAdmin = false }: { isAdmin?: boolean }) {
    const [active, setActive] = useState("");
    const menu = [
        { icon: <Home size={20} />, path: "/app/home" },
        { icon: <FileText size={20} />, path: "/app/posts" },
        { icon: <PlusCircle size={20} />, path: "/app/create" },
        // analytics & settings shown only to admin (you can adjust)
        { icon: <BarChart3 size={20} />, path: "/app/analytics" },
        { icon: <Settings size={20} />, path: "/app/settings" },
    ];

    return (
        <aside className="fixed top-1/2 -translate-y-1/2 left-6 w-16 py-6 flex flex-col justify-between rounded-2xl bg-[#ffffffef] backdrop-blur-md border border-[#BFCFBB]/60 shadow-[0_6px_28px_rgba(18,46,52,0.18)]">
            <div className="flex flex-col items-center space-y-5">
                {menu.map((item, i) => (
                    <NavLink key={i} to={item.path} className={({ isActive }) =>
                        `p-2 rounded-xl transition hover:scale-110 hover:bg-[#F9FAF9] ${isActive ? "bg-[#F9FAF9] border border-[#BFCFBB]" : ""}`
                    }>
                        <button onClick={() => setActive(item.path)}>{item.icon}</button>
                    </NavLink>
                ))}
            </div>

            <button onClick={() => { localStorage.removeItem("authToken"); localStorage.removeItem("user"); window.location.href = "/"; }}
                className="mx-auto p-2 rounded-xl transition hover:scale-110 hover:bg-[#F9FAF9]">
                <LogOut size={20} />
            </button>
        </aside>
    );
}
 */



// src/components/Sidebar.tsx
import { NavLink } from "react-router-dom";
import { Home, FileText, PlusCircle, BarChart3, Settings, LogOut } from "lucide-react";

export default function Sidebar() {
    const menu = [
        { icon: <Home size={20} />, path: "/app/home", label: "Home" },
        { icon: <FileText size={20} />, path: "/app/posts", label: "Posts" },
        { icon: <PlusCircle size={20} />, path: "/app/create", label: "Create" },
        { icon: <BarChart3 size={20} />, path: "/app/analytics", label: "Analytics" },
        { icon: <Settings size={20} />, path: "/app/settings", label: "Settings" },
    ];

    const logout = () => {
        localStorage.removeItem("authToken");
        localStorage.removeItem("user");
        window.location.href = "/";
    };

    return (
        <aside
            className="
                fixed top-1/2 -translate-y-1/2 left-6
                w-16 py-6 flex flex-col justify-between
                rounded-2xl bg-[#ffffffef] backdrop-blur-md
                border border-[#BFCFBB]/60
                shadow-[0_6px_28px_rgba(18,46,52,0.18)]
            "
        >
            {/* MENU */}
            <div className="flex flex-col items-center space-y-6">
                {menu.map((item, index) => (
                    <NavLink
                        key={index}
                        to={item.path}
                        title={item.label}
                        className={({ isActive }) =>
                            `
                                p-3 rounded-2xl transition-all
                                hover:scale-110 hover:bg-[#F9FAF9]
                                ${isActive ? "bg-[#F9FAF9] border border-[#BFCFBB]" : ""}
                            `
                        }
                    >
                        {item.icon}
                    </NavLink>
                ))}
            </div>

            {/* LOGOUT */}
            <button
                title="Logout"
                onClick={logout}
                className="p-3 rounded-2xl transition-all hover:scale-110 hover:bg-[#F9FAF9] mx-auto"
            >
                <LogOut size={20} />
            </button>
        </aside>
    );
}
