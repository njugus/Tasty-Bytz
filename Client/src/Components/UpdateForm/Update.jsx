
import './Update.css';
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const UpdateForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [ingredients, setIngredients] = useState('');
    const [updates, setUpdates] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/getRecipees/${id}`, { withCredentials: true });
                setTitle(response.data.details.title);
                setIngredients(JSON.parse(response.data.details.ingredients).join(', '));
                setLoading(false);
            } catch (error) {
                console.error('Error fetching recipe:', error);
                setError('Failed to fetch recipe');
                setLoading(false);
            }
        };
        fetchRecipe();
    }, [id]);

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };

    const handleIngredientsChange = (event) => {
        setUpdates(event.target.value);
        console.log(updates);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const updatedArray = [...new Set([...ingredients.split(',').map(ingredient => ingredient.trim()), ...updates.split(',').map(ingredient => ingredient.trim())])];
            console.log(updatedArray);
            await axios.patch(`http://localhost:5000/api/getRecipees/${id}`, {
                title,
                ingredients: updatedArray,
            }, { withCredentials: true });
            alert("Updated Successfully");
            navigate('/view-recipees');
        } catch (error) {
            console.error('Error updating recipe:', error);
            setError('Failed to update recipe');
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <form className="main-form" onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    value={title}
                    onChange={handleTitleChange}
                    placeholder="Enter recipe title"
                    className="form-control"
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="ingredients">Ingredients</label>
                <input
                    type="text"
                    id="ingredients"
                    name="ingredients"
                    value={updates}
                    onChange={handleIngredientsChange}
                    placeholder="Enter ingredients, separated by commas"
                    className="form-control"
                    required
                />
            </div>
            <button type="submit" className="btn btn-primary">Update</button>
        </form>
    );
};

export default UpdateForm;
