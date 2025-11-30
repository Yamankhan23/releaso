/* import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import api from "../api/axios";

interface PostFormProps { close?: () => void; refresh?: () => void; initial?: any; }

export default function PostForm({ close, refresh, initial }: PostFormProps) {
    const [title, setTitle] = useState(initial?.title || "");
    const [content, setContent] = useState(initial?.description || "");
    const [scheduledAt, setScheduledAt] = useState(initial?.scheduledAt ? new Date(initial.scheduledAt).toISOString().slice(0, 16) : "");
    const navigate = useNavigate();

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        try {
            await api.post("/posts", { title, content, status: initial?.status || "draft", scheduledAt: scheduledAt || null });
            refresh?.();
            if (close) close(); else navigate("/app/posts");
        } catch {
            alert("Could not save post");
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black/25 flex items-center justify-center z-50 px-4"
        >
            <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.28, ease: "easeOut" }}
                className="bg-white w-full max-w-sm rounded-xl p-6 shadow-[0_4px_22px_rgba(0,0,0,0.08)]"
            >
                <h2 className="text-xl font-semibold text-gray-800 mb-4 tracking-tight">
                    {initial ? "Edit Post" : "Create Post"}
                </h2>

                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label className="text-xs text-gray-500 font-medium">Title</label>
                        <input
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                            required
                            className="mt-1 w-full px-3 py-2 rounded-md border border-gray-300 text-gray-800 bg-white focus:outline-none focus:ring-1 focus:ring-gray-700 focus:border-gray-700 transition"
                        />
                    </div>

                    <div>
                        <label className="text-xs text-gray-500 font-medium">Description</label>
                        <textarea
                            value={content}
                            onChange={e => setContent(e.target.value)}
                            required
                            rows={3}
                            className="mt-1 w-full px-3 py-2 rounded-md border border-gray-300 text-gray-800 bg-white focus:outline-none focus:ring-1 focus:ring-gray-700 focus:border-gray-700 transition"
                        />
                    </div>

                    <div>
                        <label className="text-xs text-gray-500 font-medium">Schedule (optional)</label>
                        <input
                            type="datetime-local"
                            value={scheduledAt}
                            onChange={e => setScheduledAt(e.target.value)}
                            className="mt-1 w-full px-3 py-2 rounded-md border border-gray-300 text-gray-800 bg-white focus:outline-none focus:ring-1 focus:ring-gray-700 focus:border-gray-700 transition"
                        />
                    </div>

                    <div className="flex justify-end gap-3 pt-2">
                        <button
                            type="button"
                            onClick={() => close ? close() : navigate("/app/posts")}
                            className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition active:scale-95"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="px-5 py-2 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition active:scale-95"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </motion.div>
        </motion.div>
    );
}
 */


import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import api from "../api/axios";

interface PostFormProps {
    close?: () => void;
    refresh?: () => void;
    initial?: any;
}

export default function PostForm({ close, refresh, initial }: PostFormProps) {
    const [title, setTitle] = useState(initial?.title || "");
    const [content, setContent] = useState(initial?.description || "");
    const [scheduledAt, setScheduledAt] = useState(
        initial?.scheduledAt
            ? new Date(initial.scheduledAt).toISOString().slice(0, 16)
            : ""
    );
    const navigate = useNavigate();
    const isEdit = Boolean(initial?._id);

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const payload = {
            title,
            description: content, // <-- correct key for backend
            status: initial?.status || "draft",
            scheduledAt: scheduledAt || null
        };

        try {
            if (isEdit) {
                // 🔥 EDIT MODE → PUT
                await api.put(`/posts/${initial._id}`, payload);
            } else {
                // 🔥 CREATE MODE → POST
                await api.post("/posts", payload);
            }

            refresh?.();
            close ? close() : navigate("/app/posts");
        } catch {
            alert("Could not save post");
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black/25 flex items-center justify-center z-50 px-4"
        >
            <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.28, ease: "easeOut" }}
                className="bg-white w-full max-w-sm rounded-xl p-6 shadow-[0_4px_22px_rgba(0,0,0,0.08)]"
            >
                <h2 className="text-xl font-semibold text-gray-800 mb-4 tracking-tight">
                    {isEdit ? "Edit Post" : "Create Post"}
                </h2>

                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label className="text-xs text-gray-500 font-medium">Title</label>
                        <input
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                            required
                            className="mt-1 w-full px-3 py-2 rounded-md border border-gray-300 text-gray-800 bg-white focus:outline-none focus:ring-1 focus:ring-gray-700 focus:border-gray-700 transition"
                        />
                    </div>

                    <div>
                        <label className="text-xs text-gray-500 font-medium">Description</label>
                        <textarea
                            value={content}
                            onChange={e => setContent(e.target.value)}
                            required
                            rows={3}
                            className="mt-1 w-full px-3 py-2 rounded-md border border-gray-300 text-gray-800 bg-white focus:outline-none focus:ring-1 focus:ring-gray-700 focus:border-gray-700 transition"
                        />
                    </div>

                    <div>
                        <label className="text-xs text-gray-500 font-medium">Schedule (optional)</label>
                        <input
                            type="datetime-local"
                            value={scheduledAt}
                            onChange={e => setScheduledAt(e.target.value)}
                            className="mt-1 w-full px-3 py-2 rounded-md border border-gray-300 text-gray-800 bg-white focus:outline-none focus:ring-1 focus:ring-gray-700 focus:border-gray-700 transition"
                        />
                    </div>

                    <div className="flex justify-end gap-3 pt-2">
                        <button
                            type="button"
                            onClick={() => close ? close() : navigate("/app/posts")}
                            className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition active:scale-95"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="px-5 py-2 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition active:scale-95"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </motion.div>
        </motion.div>
    );
}
