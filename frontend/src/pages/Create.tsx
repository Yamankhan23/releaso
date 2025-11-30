// src/pages/Create.tsx
import { useEffect, useState } from "react";
import PostForm from "../components/PostForm";
import { useSearchParams } from "react-router-dom";
import api from "../api/axios";

export default function Create() {
    const [params] = useSearchParams();
    const editId = params.get("edit");
    const [initial, setInitial] = useState<any>(null);

    useEffect(() => {
        if (editId) {
            api.get(`/posts/${editId}`).then(r => setInitial(r.data)).catch(() => { });
        }
    }, [editId]);

    // When used as page we pass no close prop
    return (
        <div className="px-4 sm:px-6 lg:px-10 w-full">
            <div className="max-w-3xl mx-auto">
                <PostForm initial={initial} refresh={() => window.location.reload()} />
            </div>
        </div>
    );
}
