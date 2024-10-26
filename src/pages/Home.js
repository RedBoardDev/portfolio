import React from 'react';
import Button from '@mui/material/Button';
import ProfileImage from '../components/ProfileImage';
import TypingEffect from '../components/TypingEffect';
import "./Home.css";

function Home() {
    return (
        <>
            <div className="home">
                <div className="profile-title-container">
                    <ProfileImage />
                    <h1 className="title">
                        <TypingEffect />
                    </h1>
                    <h2 className="construction">Développeur full stack</h2>
                    <div className="button-container">
                        <Button variant="outlined" color="primary" href="https://www.linkedin.com/in/thomas--ott/" target="_blank" rel="noopener noreferrer">
                            Linkedin
                        </Button>
                        <Button variant="outlined" color="primary" href="https://github.com/RedBoardDev" target="_blank">
                            My Works
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Home;