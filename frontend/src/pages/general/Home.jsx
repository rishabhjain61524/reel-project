import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom' // ✅ Added for redirection
import api from '../../apoi/api.js'
import '../../styles/reels.css'
import ReelFeed from '../../components/ReelFeed'

const Home = () => {
    const [videos, setVideos] = useState([])
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate() // ✅ Initialize navigate

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                setLoading(true);
                // Now this works for everyone (Guests and Logged-in users)
                const response = await api.get("/api/food");
                
                const foodData = response.data.foodItems || response.data;
                setVideos(Array.isArray(foodData) ? foodData : []);
            } catch (error) {
                console.error("Error fetching food feed:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchVideos();
    }, [])

    async function likeVideo(item) {
        const token = localStorage.getItem('token');

        // ✅ RECRUITER GUARD: Redirect to login if they try to like without an account
        if (!token) {
            alert("Please login to like videos!");
            navigate('/user/login');
            return;
        }

        try {
            const response = await api.post("/api/food/like", { foodId: item._id });
            
            if (response.data.like) {
                setVideos((prev) => prev.map((v) => v._id === item._id ? { ...v, likeCount: (v.likeCount || 0) + 1 } : v));
            } else {
                setVideos((prev) => prev.map((v) => v._id === item._id ? { ...v, likeCount: Math.max(0, (v.likeCount || 0) - 1) } : v));
            }
        } catch (error) {
            console.error("Error liking video:", error);
        }
    }

    async function saveVideo(item) {
        const token = localStorage.getItem('token');

        // ✅ RECRUITER GUARD: Redirect to login if they try to save without an account
        if (!token) {
            alert("Please login to save videos!");
            navigate('/user/login');
            return;
        }

        try {
            const response = await api.post("/api/food/save", { foodId: item._id });
            if (response.data.save) {
                setVideos((prev) => prev.map((v) => v._id === item._id ? { ...v, savesCount: (v.savesCount || 0) + 1 } : v));
            } else {
                setVideos((prev) => prev.map((v) => v._id === item._id ? { ...v, savesCount: Math.max(0, (v.savesCount || 0) - 1) } : v));
            }
        } catch (error) {
            console.error("Error saving video:", error);
        }
    }

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
            emptyMessage="No food reels available. Check back soon!"
        />
    )
}

export default Home