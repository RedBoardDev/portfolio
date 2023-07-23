import React from 'react';
import './ProfileImage.css';
import profilePic from '../assets/profile-pic.png';

const ProfileImage = () => (
  <div className="profile-container">
    <p className="enclosure">{"{"}</p>
    <div className="profile-image-container">
      <img src={profilePic} alt="profile-pic" className="profile-image" />
    </div>
    <p className="enclosure">{"}"}</p>
  </div>
);

export default ProfileImage;
