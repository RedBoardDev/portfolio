import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import "./Home.css";
import ProfileImage from '../components/ProfileImage';
import FloatingActionButton from '../components/FloatingActionButton';

const TypingEffect = () => {
    const [text, setText] = useState("");
    const [showCursor, setShowCursor] = useState(true);

    useEffect(() => {
        const name = "Thomas OTT";
        let currentIndex = 0;
        let typingSpeed;

        const typeCharacter = () => {
            if (currentIndex < name.length) {
                setText(name.substring(0, currentIndex + 1));
                currentIndex++;
                typingSpeed = 150;
            } else {
                setShowCursor(false);
            }

            setTimeout(typeCharacter, typingSpeed);
        };

        typeCharacter();
    }, []);

    return (
        <span>
            {text}
            {showCursor && <span className="cursor">_</span>}
        </span>
    );
};

function Home() {
    return (
        <div className="home">
            <FloatingActionButton />
            <div className="profile-title-container">
                <ProfileImage />
                <h1 className="title">
                    <TypingEffect />
                </h1>
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
