import React, { useEffect, useState } from 'react'
import '../../styles/reels.css'
// Use the central api instance for Vercel deployment
import api from '../api/api'; 
import ReelFeed from '../../components/ReelFeed'

const Saved = () => {
    const [ videos, setVideos ] = useState([])

    useEffect(() => {
        const fetchSavedVideos = async () => {
            try {
                // Changed axios.get to api.get
                const response = await api.get("/api/food/save");
                const savedFoods = response.data.savedFoods.map((item) => ({
                    _id: item.food._id,
                    video: item.food.video,
                    description: item.food.description,
                    likeCount: item.food.likeCount,
                    savesCount: item.food.savesCount,
                    commentsCount: item.food.commentsCount,
                    foodPartner: item.food.foodPartner,
                }));
                setVideos(savedFoods);
            } catch (error) {
                console.error("Error fetching saved videos:", error);
            }
        };

        fetchSavedVideos();
    }, [])

    const removeSaved = async (item) => {
        try {
            // Changed axios.post to api.post
            await api.post("/api/food/save", { foodId: item._id });
            setVideos((prev) => prev.map((v) => v._id === item._id ? { ...v, savesCount: Math.max(0, (v.savesCount ?? 1) - 1) } : v));
        } catch (error) {
            console.error("Error removing saved video:", error);
        }
    }

    return (
        <ReelFeed
            items={videos}
            onSave={removeSaved}
            emptyMessage="No saved videos yet."
        />
    )
}

export default Saved