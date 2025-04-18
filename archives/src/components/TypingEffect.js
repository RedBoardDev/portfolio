import React, { useState, useEffect } from 'react';

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

export default TypingEffect;
