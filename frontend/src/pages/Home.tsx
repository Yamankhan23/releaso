import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { PenSquare, FileText } from "lucide-react";

export default function Home() {
    const navigate = useNavigate();

    return (
        <div className="min-h-[calc(65vh-64px)] flex items-center px-6 sm:px-10 lg:px-20 py-12">
            <div className="flex flex-col lg:flex-row items-center gap-12 w-full">

                {/* TEXT SECTION */}
                <div className="flex-1 max-w-xl space-y-6">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-[38px] sm:text-[48px] lg:text-[56px] font-semibold text-[#1f1f1f] leading-tight"
                    >
                        A calm space <br /> for your ideas.
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-lg sm:text-xl text-[#555] leading-relaxed"
                    >
                        Write clearly, reflect deeply and grow steadily — everything in one clean place.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="flex flex-wrap gap-4 pt-4"
                    >
                        <button
                            onClick={() => navigate("/app/create")}
                            className="flex items-center gap-2 bg-[#1f1f1f] text-white px-6 py-3 rounded-lg font-medium hover:bg-black transition"
                        >
                            <PenSquare size={18} /> Start Writing
                        </button>
                        <button
                            onClick={() => navigate("/app/posts")}
                            className="flex items-center gap-2 px-6 py-3 rounded-lg font-medium border border-[#d0d0d0] text-[#1f1f1f] hover:bg-[#f7f7f7] transition"
                        >
                            <FileText size={18} /> Your Posts
                        </button>
                    </motion.div>
                </div>

                {/* IMAGE SECTION */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.7, delay: 0.1 }}
                    className="flex-1 w-full max-w-md"
                >
                    <motion.img
                        animate={{ y: [0, -6, 0] }}
                        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                        src="/src/assets/content.png"
                        className="w-full object-contain select-none"
                        alt="Illustration of workspace"
                    />
                </motion.div>

            </div>
        </div>
    );
}
