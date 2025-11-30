import { useState, useEffect } from "react";
import api from "../api/axios";
import PostForm from "../components/PostForm";
import { useSearch } from "../context/SearchContext";

export default function Posts() {
    const [posts, setPosts] = useState<any[]>([]);
    const [openForm, setOpenForm] = useState(false);
    const [editing, setEditing] = useState<string | null>(null);
    const [updatingId, setUpdatingId] = useState<string | null>(null);
    const [deletingId, setDeletingId] = useState<string | null>(null);
    const { query } = useSearch();

    const filteredPosts = posts.filter((p) =>
        p.title.toLowerCase().includes(query.toLowerCase()) ||
        p.description.toLowerCase().includes(query.toLowerCase())
    );

    const fetchPosts = async () => {
        try {
            const res = await api.get("/posts");
            const data = Array.isArray(res.data) ? res.data : res.data.posts ?? [];
            setPosts(data);
        } catch {
            setPosts([]);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    const openCreate = () => {
        setEditing(null);
        setOpenForm(true);
    };

    const openEdit = (id: string) => {
        setEditing(id);
        setOpenForm(true);
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Delete permanently?")) return;
        try {
            setDeletingId(id);
            await api.delete(`/posts/${id}`);
            setPosts((p) => p.filter((x) => x._id !== id));
        } finally {
            setDeletingId(null);
        }
    };

    const handleStatusChange = async (id: string, newStatus: string) => {
        try {
            setUpdatingId(id);
            const res = await api.put(`/posts/${id}`, { status: newStatus });
            const updated = res.data ?? {};

            setPosts((prev) =>
                prev.map((p) =>
                    p._id === id ? (updated._id ? updated : { ...p, status: newStatus }) : p
                )
            );
        } finally {
            setUpdatingId(null);
        }
    };

    const getInitial = () => editing ? posts.find((p) => p._id === editing) : undefined;

    return (
        <div className="px-4 sm:px-6 lg:px-10 w-full pb-12">

            {/* HEADER */}
            <div className="flex justify-between items-center mb-6 flex-wrap gap-3">
                <div>
                    <h1 className="text-3xl font-semibold text-[#122E34] dark:text-white">
                        Your Posts
                    </h1>
                    <p className="text-[#677E8A] dark:text-white/70 text-sm">
                        {posts.length === 0 ? "No posts created yet." : `${posts.length} Posts`}
                    </p>
                </div>

                <button
                    onClick={openCreate}
                    className="flex items-center gap-2 bg-[#1f1f1f] dark:bg-white
                    text-white dark:text-black px-4 py-2 rounded-lg font-medium hover:opacity-90 transition"
                >
                    + Create Post
                </button>
            </div>

            {/* GRID */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">

                {filteredPosts.length === 0 ? (
                    <div className="col-span-full text-center text-gray-500 dark:text-gray-400 py-12">
                        No posts found — create your first post.
                    </div>
                ) : (
                    filteredPosts.map((post: any) => (
                        <div
                            key={post._id}
                            className="bg-white dark:bg-[#111111] border border-[#BFCFBB]/60 
                            dark:border-white/10 rounded-xl p-4 shadow-sm flex flex-col gap-3"
                        >
                            {post.thumbnail && (
                                <img
                                    src={post.thumbnail}
                                    className="w-full h-40 object-cover rounded-md"
                                    alt=""
                                />
                            )}

                            <h3 className="text-lg font-semibold text-[#122E34] dark:text-white break-words">
                                {post.title}
                            </h3>

                            <p className="text-sm text-[#677E8A] dark:text-white/70 line-clamp-3 break-words">
                                {post.description}
                            </p>

                            {/* STATUS SECTION */}
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                                <div className="flex items-center gap-2 text-sm">
                                    <span
                                        className={`px-2 py-1 rounded text-xs ${post.status === "posted"
                                            ? "bg-[#E6F3EA] text-[#344C3D]"
                                            : post.status === "scheduled"
                                                ? "bg-[#E7F6FF] text-[#0E5FAA]"
                                                : "bg-[#FFF6EB] text-[#A66C42]"
                                            }`}
                                    >
                                        {post.status}
                                    </span>
                                    {post.scheduledAt && (
                                        <span className="text-[11px] text-[#677E8A] dark:text-white/70">
                                            {new Date(post.scheduledAt).toLocaleString()}
                                        </span>
                                    )}
                                </div>

                                <select
                                    value={post.status}
                                    onChange={(e) =>
                                        handleStatusChange(post._id, e.target.value)
                                    }
                                    className="text-sm rounded-md border border-gray-300
                                        dark:border-white/10 bg-white dark:bg-[#1A1A1A] px-2 py-1"
                                    disabled={updatingId === post._id}
                                >
                                    <option value="draft">Draft</option>
                                    <option value="scheduled">Scheduled</option>
                                    <option value="posted">Posted</option>
                                </select>
                            </div>

                            {/* ACTIONS */}
                            <div className="flex justify-end gap-4 pt-1 text-sm">
                                <button
                                    onClick={() => openEdit(post._id)}
                                    className="text-[#344C3D] dark:text-white hover:underline"
                                    disabled={deletingId === post._id}
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(post._id)}
                                    className="text-[#622347] dark:text-[#ff6b8a] hover:underline disabled:opacity-50"
                                    disabled={deletingId === post._id || updatingId === post._id}
                                >
                                    {deletingId === post._id ? "Deleting..." : "Delete"}
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {openForm && (
                <PostForm
                    close={() => {
                        setOpenForm(false);
                        setEditing(null);
                    }}
                    refresh={fetchPosts}
                    initial={getInitial()}
                />
            )}
        </div>
    );
}
