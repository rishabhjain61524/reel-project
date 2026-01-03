import React, { useEffect, useState } from 'react'
 import api from '../../api/api';// Using your central hub for Vercel support
import '../../styles/reels.css'
import ReelFeed from '../../components/ReelFeed'

const Home = () => {
    const [videos, setVideos] = useState([])

    useEffect(() => {
        // Standardized to async function inside useEffect
        const fetchVideos = async () => {
            try {
                // Changed 'axios.get' to 'api.get'
                const response = await api.get("/api/food");
                console.log("Fetched Videos:", response.data);
                setVideos(response.data.foodItems);
            } catch (error) {
                console.error("Error fetching food feed:", error);
            }
        };

        fetchVideos();
    }, [])

    async function likeVideo(item) {
        try {
            // Changed 'axios.post' to 'api.post'
            const response = await api.post("/api/food/like", { foodId: item._id });

            if (response.data.like) {
                console.log("Video liked");
                setVideos((prev) => prev.map((v) => v._id === item._id ? { ...v, likeCount: v.likeCount + 1 } : v));
            } else {
                console.log("Video unliked");
                setVideos((prev) => prev.map((v) => v._id === item._id ? { ...v, likeCount: v.likeCount - 1 } : v));
            }
        } catch (error) {
            console.error("Error liking video:", error);
        }
    }

    async function saveVideo(item) {
        try {
            // Changed 'axios.post' to 'api.post'
            const response = await api.post("/api/food/save", { foodId: item._id });

            if (response.data.save) {
                setVideos((prev) => prev.map((v) => v._id === item._id ? { ...v, savesCount: v.savesCount + 1 } : v));
            } else {
                setVideos((prev) => prev.map((v) => v._id === item._id ? { ...v, savesCount: v.savesCount - 1 } : v));
            }
        } catch (error) {
            console.error("Error saving video:", error);
        }
    }

    return (
        <ReelFeed
            items={videos}
            onLike={likeVideo}
            onSave={saveVideo}
            emptyMessage="No videos available."
        />
    )
}

export default Home