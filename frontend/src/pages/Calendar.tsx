import { useEffect, useState } from "react";
import api from "../api/axios";
import { Bar, Pie } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    Tooltip,
    Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);

export default function Calendar() {
    const [stats, setStats] = useState<any>({ totals: {}, byDay: [], status: {} });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get("/posts/stats")
            .then((r) => setStats(r.data))
            .catch(console.error)
            .finally(() => setLoading(false));
    }, []);

    const barData = {
        labels: stats.byDay.map((d: any) => d.day),
        datasets: [{
            label: "Posts Created",
            data: stats.byDay.map((d: any) => d.count),
            backgroundColor: "rgba(52, 76, 61, 0.8)",
            borderRadius: 6,
        }],
    };

    const pieData = {
        labels: Object.keys(stats.status || {}),
        datasets: [{
            data: Object.values(stats.status || {}),
            backgroundColor: [
                "#4CD964", // green
                "#007AFF", // blue
                "#FF9500", // amber
            ],
        }],
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-full text-2xl font-medium text-gray-600">
                Loading Analytics…
            </div>
        );
    }

    return (
        <div className="px-4 sm:px-8 lg:px-16 py-6 w-full space-y-10">
            {/* Page Title */}
            <h1 className="text-4xl font-semibold text-[#1C1C1E] tracking-tight">
                Analytics
            </h1>

            {/* ---- Compact Stats Row ---- */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 lg:gap-4 mb-3">
                {[
                    { label: "Total Posts", value: stats.totals.total || 0 },
                    { label: "Scheduled", value: stats.totals.scheduled || 0 },
                    { label: "Published", value: stats.totals.posted || 0 },
                ].map((item, idx) => (
                    <div
                        key={idx}
                        className="bg-white px-4 py-3 rounded-xl shadow-sm border border-[#E5E7EB]
                 flex items-center justify-between hover:shadow transition-all duration-200"
                    >
                        <p className="text-[#6A7380] text-sm">{item.label}</p>
                        <p className="text-xl font-semibold tracking-tight">{item.value}</p>
                    </div>
                ))}
            </div>

            {/* ---- Analytics Charts ---- */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Bar Chart */}
                <div className="bg-white p-4 rounded-xl shadow-sm border border-[#E5E7EB] h-[330px] flex flex-col">
                    <h2 className="text-[15px] font-medium text-[#1C1C1E] mb-2">Posts per Day</h2>
                    <div className="flex-1 overflow-hidden flex items-center justify-center">
                        <Bar data={barData} />
                    </div>
                </div>

                {/* Pie Chart — FIXED CENTER */}
                <div className="bg-white p-4 rounded-xl shadow-sm border border-[#E5E7EB] h-[330px] flex flex-col">
                    <h2 className="text-[15px] font-medium text-[#1C1C1E] mb-2">Post Status Distribution</h2>
                    <div className="flex-1 overflow-hidden flex items-center justify-center">
                        <Pie
                            data={pieData}
                            options={{
                                maintainAspectRatio: false,
                                plugins: { legend: { position: "right" } }
                            }}
                        />
                    </div>
                </div>
            </div>


        </div>
    );
}