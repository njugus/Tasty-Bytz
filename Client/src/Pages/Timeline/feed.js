import { create } from 'zustand';
import axios from 'axios';

export const useStoreFeed = create((set) => ({
    feed: [],
    loading: false,
    error: null,
    fetchFeed: async () => {
        try {
            set({ loading: true, error: null });

            const response = await axios.get('http://localhost:3000/api/getRecipees');

            if (response.data.success === false) {
                console.log("No Recipes Found");
                set({ loading: false });
                return;
            }

            // Ensure response.data.details is an array
            const recipes = response.data.details.map(recipe => ({
                ...recipe,
                ingredients: JSON.parse(recipe.ingredients) 
            }));
            console.log(recipes[0].video_url);
            set({ feed: recipes, loading: false, error: null });
        } catch (e) {
            console.error("Error Fetching Recipes", e);
            set({ error: e.message, loading: false });
        } finally {
            set({ loading: false });
        }
    }
}));
