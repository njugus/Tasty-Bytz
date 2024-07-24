import { useUser } from '../../Context/Context';
import { useState } from 'react'
import React from 'react';
import './Profile.css';
import axios from 'axios';

const ProfileCard = () => {
  const { user } = useUser();
  const [imageInput, setImageInput] = useState();
  const cloudname = "drt64fehk";
  const preset = "Cloudinary Testing";
  const[secure_url, setSecure_url] = useState('')

  const handleUpload = async() => {
    const payload = new FormData();
    payload.append("file", imageInput);
    payload.append("upload_preset", preset);
    try{
        const response = await axios.post(`https://api.cloudinary.com/v1_1/${cloudname}/upload`, payload)
        console.log(response);
        setSecure_url(response.data.secure_url)
    }catch(error){
        console.log(error)
    }
     // const secure_url = response.data.secure_url;
    // try{
    //   const result = await axios.patch(`http://localhost:3000/api/updateProfile`, secure_url);
    //   console.log(result);

    // }catch(e){
    //   console.error("Error", e)
    // }
    
}
  console.log(user);
  if (!user) {
    return <div>Loading...</div>;
  }
  return (
    <div className="profile-card">
      <div className="profile-header">
        <img src={secure_url} alt="Profile" className="profile-image" />
        <input type="file" name="image" id="image" onChange={(e) => {setImageInput(e.target.files[0])}} />
        <button type="submit" onClick={handleUpload}>Upload</button>
        {/* <button className="edit-button">✎ Edit</button> */}
      </div>
      <div className="profile-body">
        <h2>My Profile</h2>
        <div className="profile-row">
          <label htmlFor="first_name">First Name</label>
          <input type="text" id="first_name" name="first_name" value={user.data.first_name} readOnly />
        </div>
        <div className="profile-row">
          <label htmlFor="last_name">Last Name</label>
          <input type="text" id="last_name" name="last_name" value={user.data.last_name} readOnly />
        </div>
        <div className="profile-row">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" value={user.data.email} readOnly />
        </div>
        <div className="profile-footer">
          <button className="update-button">Update Profile</button>
          {/* <button className="delete-button">Delete Profile</button> */}
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;

