import React, { } from 'react';
import ProfileImage from '../components/ProfileImage';
import Button from '@mui/material/Button';
import "./Home.css";

function Home() {
    return (
        <div className="home">
            <div className="profile-title-container">
                <ProfileImage />
                <h1 className="title">Thomas OTT</h1>
                <h2 className="construction">Site web en construction</h2>
                <div className="button-container">
                    <Button variant="outlined" color="primary" href="https://www.linkedin.com/in/thomas--ott/" target="_blank" rel="noopener noreferrer">
                        Linkedin
                    </Button>
                    <Button variant="outlined" color="primary" href="/works">
                        My Works
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default Home;
