import './Feed.css';
import { useStoreFeed } from './feed.js';
import { useEffect } from 'react';
import { useUser } from '../../Context/Context.jsx';

function Feed() {
    const { feed, fetchFeed, loading, error } = useStoreFeed();
    const user = useUser();
    useEffect(() => {
        const fetchData = async () => {
            await fetchFeed();
        };
        fetchData();
    }, [fetchFeed]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <>
            <section className="feed">
                {feed.map((recipe) => (
                    <div className="feed-display" key={recipe.id}>
                        <div className="feed-title">
                            <h1>{recipe.title}</h1>
                        </div>
                        <div className="feed-video">
                            <iframe
                                width="320"
                                height="250"
                                src={`https://www.youtube.com/embed/${recipe.video_url}`} // Updated URL
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
                        <div className="poster-details">
                            {/* <h2 className="poster-name">Posted By</h2> */}
                        </div>
                    </div>
                ))}
            </section>
        </>
    );
}

export default Feed;


// import './Feed.css';
// import { useStoreFeed } from './feed.js'
// import { useEffect} from 'react'
// function Feed() {
//     const { feed, fetchFeed , loading, error}  = useStoreFeed();
//     useEffect(() => {
//         const fetchData = async() => {
//             await fetchFeed();
//         }
//         fetchData();
//     }, [fetchFeed])
//     if (loading) return <div>Loading...</div>;
//     if (error) return <div>Error: {error}</div>;
//     return (
//         <>
//             <section className="feed">
//                 {feed.map((recipe) => (
//                     <div className="feed-display" key={recipe.id}>
//                         <div className="feed-title">
//                             <h1>{recipe.title}</h1>
//                         </div>
//                         <div class="feed-video">
//                         <iframe
//                                 width="560"
//                                 height="315"
//                                 src={`https://www.youtube.com/embed?v=${recipe.video_url}`}
//                                 allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//                                 allowFullScreen
//                             ></iframe>
//                           {/* <iframe width="560" height="315" src={`https://www.youtube.com/embed?v=${recipe.video_url}`} frameborder="0" allowfullscreen></iframe> */}
//                         </div>
//                         <div classname = "feed-ingridients">
//                             <h2>Ingridients</h2>
//                             <ul>
//                                 {recipe.ingredients.map((ingredient, index) => (
//                                     <li key={index}>{ingredient}</li>
//                                 ))}
//                             </ul>
//                         </div>
//                     </div>
//                 ))}
//             </section>

//         </>
//     )
// }

// export default Feed;