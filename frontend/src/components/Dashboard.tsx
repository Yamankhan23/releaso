// src/components/DashboardLayout.tsx
import { Routes, Route } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import Home from "../pages/Home";
import Posts from "../components/Posts";
import Create from "../pages/Create";
import Calendar from "../pages/Calendar";
import Accounts from "../pages/Accounts";
import Settings from "../pages/Settings";


export default function DashboardLayout() {
    return (
        <div className="min-h-screen bg-[#F9FAFB] flex">
            <Sidebar />
            <div className="flex-1 flex flex-col">
                <Topbar />
                <main className="p-4 w-full pl-24 overflow-y-auto">
                    <Routes>
                        <Route path="home" element={<Home />} />
                        <Route path="posts" element={<Posts />} />
                        <Route path="create" element={<Create />} />
                        <Route path="accounts" element={<Accounts />} />
                        <Route path="settings" element={<Settings />} />
                        <Route path="analytics" element={<Calendar />} />
                    </Routes>
                </main>
            </div>
        </div>
    );
}



