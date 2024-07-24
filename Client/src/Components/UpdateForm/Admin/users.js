// import { create } from 'zustand';
// import axios from 'axios';
// import { errors } from 'jose';

// const useUserStore = create((set) => ({
//     users : [],
//     categories: [],
//     newCategory: { name: '', description: '' },
//     loading : false,
//     error : null,
//     fetchAllUsers : async() => {
//         try{
//             set({loading : true, error : null})
//             const response = await axios.get(`http://localhost:5000/api/sign`);
//             console.log(response);
//             set({users : response.data.data, loading : false})
//             if(response.data.success === false){
//                 console.log("No users Found");
//                 set({loading : false})
//             }
//         }catch(error){
//             alert("Error Fetching Users")
//             set({loading : false, error : error})
//         }
//         finally{
//             set({loading : false, error : null})
//         }
//     },
//     fetchAllCategories : async() => {
//         try{
//             const response = await axios.get(`http://localhost:5000/api/getAllCategories`)
//             console.log(response);
//             set({categories : response.data.result, loading : false})
//             if(response.data.success === false){
//                 alert("Error fetching Categories")
//                 set({loading : false, errors : "ERROR FETCHING CATEGORIES"})
//             }
//         }catch(err){
//             alert("Error fetching Categories")
//             set({loading : false, error : err.message})
//         }
//     }, 

//     addNewCategory : async() => {
//         try{
//             const response = await axios.post(`http://localhost:5000/api/category`, newCategory)
//             console.log(response);

//         }catch(err){
//             alert("Error Adding Category")
//             set({loading : false, error : err.message})
//         }
//     }

// }))

// export default useUserStore;

// store.js
import { create } from 'zustand';
import axios from 'axios';

const useUserStore = create((set, get) => ({
  users: [],
  categories: [],
  newCategory: { name: '', description: '' },
  loading: false,
  error: null,

  // Fetch all users
  fetchAllUsers: async () => {
    try {
      set({ loading: true, error: null });
      const response = await axios.get(`http://localhost:5000/api/sign`);
      console.log(response);
      set({ users: response.data.data, loading: false });
    } catch (error) {
      alert("Error Fetching Users");
      set({ loading: false, error: error.message });
    }
  },

  // Fetch all categories
  fetchAllCategories: async () => {
    try {
      set({ loading: true, error: null });
      const response = await axios.get(`http://localhost:5000/api/getAllCategories`);
      console.log(response);
      set({ categories: response.data.result, loading: false });
    } catch (error) {
      alert("Error fetching Categories");
      set({ loading: false, error: error.message });
    }
  },

  // Set new category
  setNewCategory: (newCat) => set({ newCategory: newCat }),

  // Add new category to the server
  addNewCategory: async () => {
    try {
      set({ loading: true, error: null });
      const response = await axios.post(`http://localhost:5000/api/category`, get().newCategory);
      console.log(response);
      // Optionally, update categories with the new category from the response
      set((state) => ({
        categories: [...state.categories, response.data],
        newCategory: { name: '', description: '' },
        loading: false,
      }));
    } catch (error) {
      alert("Error Adding Category");
      set({ loading: false, error: error.message });
    }
  },
}));

export default useUserStore;
