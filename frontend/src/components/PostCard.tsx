// src/components/PostCard.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function PostCard({ post, refresh }: any) {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const canEdit = user?.role === "admin" || post?.author?._id === user?.id;
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleDelete = async () => {
        if (!confirm("Delete post?")) return;
        setLoading(true);
        try { await api.delete(`/posts/${post._id}`); refresh?.(); } catch (e) { console.error(e); alert("Delete failed"); }
        setLoading(false);
    };

    return (
        <div className="bg-[#ffffffef] backdrop-blur-md border border-[#BFCFBB]/60 rounded-xl p-4 shadow-[0_6px_28px_rgba(18,46,52,0.12)]">
            <div className="flex justify-between items-start">
                <div>
                    <h3 className="text-[#122E34] font-semibold">{post.title}</h3>
                    <p className="text-sm text-[#677E8A] mt-1 line-clamp-3">{post.description}</p>
                    {post.scheduledAt && <p className="text-xs text-[#8EA58C] mt-2">Scheduled: {new Date(post.scheduledAt).toLocaleString()}</p>}
                </div>
                <div className="flex flex-col items-end gap-2">
                    <span className={`text-xs font-medium px-2 py-1 rounded ${post.status === "posted" ? "bg-[#E6F3EA] text-[#344C3D]" : post.status === "scheduled" ? "bg-[#E7F6FF] text-[#0E5FAA]" : "bg-[#FFF6EB] text-[#A66C42]"}`}>
                        {post.status}
                    </span>

                    {canEdit && (
                        <div className="flex gap-2">
                            <button onClick={() => navigate(`/app/create?edit=${post._id}`)} className="text-sm px-2 py-1 rounded bg-[#A7C7E7] text-white">Edit</button>
                            <button onClick={handleDelete} disabled={loading} className="text-sm px-2 py-1 rounded bg-[#622347] text-white">Delete</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
