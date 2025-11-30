import { useState } from "react";
import { Bell, Settings, Search } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useSearch } from "../context/SearchContext";

export default function Topbar({ title = "Dashboard" }: { title?: string }) {
    const { query, setQuery } = useSearch();
    const [localSearch, setLocalSearch] = useState(query);

    const handleSearch = (value: string) => {
        setLocalSearch(value);
        setQuery(value);
    };

    return (
        <header
            className="
                sticky top-0 z-50 w-full
                backdrop-blur-xl
                bg-white/70 dark:bg-[#0E0F0F]/70
                border-b border-black/5 dark:border-white/10
                shadow-[0_2px_14px_rgba(0,0,0,0.06)]
                dark:shadow-[0_2px_14px_rgba(255,255,255,0.05)]
            "
        >
            <div className="flex items-center justify-between px-4 sm:px-6 lg:px-10 h-16 gap-4">

                {/* Title */}
                <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-[#122E34] dark:text-white/90">
                    {title}
                </h2>

                {/* Center Search */}
                <div className="hidden md:flex items-center gap-2 flex-1 max-w-lg mx-6">
                    <div className="relative w-full">
                        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            value={localSearch}
                            onChange={(e) => handleSearch(e.target.value)}
                            placeholder="Search posts, analytics, accounts..."
                            className="
                                w-full bg-white/50 dark:bg-white/10
                                border border-gray-200 dark:border-white/10
                                rounded-lg pl-9 pr-3 py-2 text-sm
                                text-gray-800 dark:text-white/90
                                placeholder:text-gray-400
                                focus:outline-none focus:ring-2
                                focus:ring-black/10 dark:focus:ring-white/10
                                transition
                            "
                        />
                    </div>
                </div>

                {/* Right Icons */}
                <div className="flex items-center gap-4">
                    {/* Notification */}
                    <button
                        className="text-gray-500 dark:text-gray-300 hover:text-black dark:hover:text-white transition"
                        aria-label="Notifications"
                    >
                        <Bell size={20} />
                    </button>

                    {/* Settings */}
                    <NavLink
                        to="/app/settings"
                        className="text-gray-500 dark:text-gray-300 hover:text-black dark:hover:text-white transition"
                    >
                        <Settings size={20} />
                    </NavLink>

                    {/* Avatar */}
                    <button
                        className="
                            w-9 h-9 rounded-full bg-gradient-to-br from-[#2F5E42] to-[#4D7254]
                            dark:from-[#2F2F2F] dark:to-[#1A1A1A]
                            flex items-center justify-center 
                            border border-black/10 dark:border-white/10
                            shadow-sm cursor-pointer
                            active:scale-95 transition
                        "
                        aria-label="User menu"
                    >
                        <span className="text-white font-medium text-sm">Y</span>
                    </button>
                </div>
            </div>
        </header>
    );
}
