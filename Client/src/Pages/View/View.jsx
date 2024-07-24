import { useEffect } from 'react';
import './View.css'
import { useViewFeed } from './view.js';
import { useNavigate } from 'react-router-dom';
function View() {
    const navigate =  useNavigate();
    const{view, fetchUserRecipees, loading, error, deleteUserRecipees} = useViewFeed();
    useEffect(() => {
        const fetchData = async() => {
            await fetchUserRecipees();
        }

        fetchData();
        
    }, [fetchUserRecipees])

    if (loading) return <div>Loading......</div>
    if(error) return <div>Error loading your recipees...{error}</div>
    
    const handleUpdateClick = (id) => {
         setTimeout(() => {
            navigate(`/update/${id}`)
         }, 0)
    }
    // const handleDeleteClick = (id) => {
    //     try{
    //         //
    //     }catch(error){
    //         alert("Error Deleting Recipee")
    //     }
    // }
    return (
        <>
            <section className="feed">
                {view.map((recipe) => (
                    <div className="feed-display" key={recipe.id}>
                        <div className="feed-title">
                            <h1>{recipe.title}</h1>
                        </div>
                        <div className="feed-video">
                            <iframe
                                width="320"
                                height="250"
                                src={`https://www.youtube.com/embed/${recipe.video_url}`} 
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                title={recipe.title}
                                className = "vid"
                            ></iframe>
                        </div>
                        <div className="feed-ingredients">
                            <h2 className = "ingirdients-title">Ingredients</h2>
                            <ul className="ingridients-bar">
                                {recipe.ingredients.map((ingredient, index) => (
                                    <li key={index}>{ingredient}</li>
                                ))}
                            </ul>
                        </div>
                        <div className="buttons-div">
                            <button className="update" onClick = {() => handleUpdateClick(recipe.id)}>Update</button>
                            <button className="delete" onClick={() => deleteUserRecipees(recipe.id)}>Delete</button>
                        </div>
                    </div>
                ))}
            </section>
        </>
    )
}

export default View;