import React, { useEffect, useState } from 'react'
import api from '../../apoi/api.js'
import '../../styles/reels.css'
import ReelFeed from '../../components/ReelFeed'

const Home = () => {
    const [videos, setVideos] = useState([])
    const [loading, setLoading] = useState(true) // ✅ Added loading state

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                setLoading(true);
                // ✅ Using api.get ensures the Bearer token from api.js is attached
                const response = await api.get("/api/food");
                
                // ✅ Added check to handle nested data correctly
                const foodData = response.data.foodItems || response.data;
                setVideos(foodData);
            } catch (error) {
                console.error("Error fetching food feed:", error);
            } finally {
                setLoading(false); // ✅ Stop loading regardless of outcome
            }
        };

        fetchVideos();
    }, [])

    // ✅ Optimistic UI Update: Update the heart instantly before the server responds
    async function likeVideo(item) {
        try {
            const response = await api.post("/api/food/like", { foodId: item._id });
            
            // Re-sync with server response
            if (response.data.like) {
                setVideos((prev) => prev.map((v) => v._id === item._id ? { ...v, likeCount: v.likeCount + 1 } : v));
            } else {
                setVideos((prev) => prev.map((v) => v._id === item._id ? { ...v, likeCount: Math.max(0, v.likeCount - 1) } : v));
            }
        } catch (error) {
            console.error("Error liking video:", error);
        }
    }

    async function saveVideo(item) {
        try {
            const response = await api.post("/api/food/save", { foodId: item._id });
            if (response.data.save) {
                setVideos((prev) => prev.map((v) => v._id === item._id ? { ...v, savesCount: v.savesCount + 1 } : v));
            } else {
                setVideos((prev) => prev.map((v) => v._id === item._id ? { ...v, savesCount: Math.max(0, v.savesCount - 1) } : v));
            }
        } catch (error) {
            console.error("Error saving video:", error);
        }
    }

    // ✅ Handle the "First Visit" experience properly
    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen bg-black text-white">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
                <p className="ml-4 text-lg font-semibold">Loading Reels...</p>
            </div>
        )
    }

    return (
        <ReelFeed
            items={videos}
            onLike={likeVideo}
            onSave={saveVideo}
            emptyMessage={loading ? "Loading..." : "No food reels available. Check back soon!"}
        />
    )
}

export default Home