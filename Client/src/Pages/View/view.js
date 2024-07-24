import { create } from 'zustand';
import axios  from 'axios';

export const useViewFeed = create((set) => ({
    
    view : [],
    loading : false,
    error : null,

    fetchUserRecipees : async() => {
        try{
            set({loading : true, error : null})
            const response = await axios.get(`http://localhost:5000/api/userRecipees`, {withCredentials : true});
            if (response.data.success === false){
                console.log("No recipees posted yet");
                set({loading : false})
                return;
            }
            const recipes = response.data.details.map(recipe => ({
                ...recipe,
                ingredients: JSON.parse(recipe.ingredients) 
            }));
            console.log(recipes);
            set({ view: recipes, loading: false, error: null });
            // set({view : response.data.details, loading : false, error : null});
        }catch(error){
            console.error("Error Fetching Recipees", error)
            set({loading : false, error : error.message})
        }finally{
            set({loading : false, error : null})
        }
    },
    deleteUserRecipees : async(id) => {
        try{
            set({loading : true, error : null})
            const response = await axios.delete(`http://localhost:5000/api/userRecipees/${id}`, 
                {withCredentials : true}
            )
            console.log(response);
            if(response.status === 200){
                alert("Recipee Deleted Successfully")
                set({loading : false})
                window.location.href = '/timeline';
  
            }
            else{
                alert("Problem Deleting Recipee")
                set({loading : false, error : "problem deleting recipees"});
            }
        }catch(error){
            set({loading : false, error : error.message})
        }
    }
}));
