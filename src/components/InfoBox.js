import React from 'react';
import './InfoBox.css';

function InfoBox({ title, description }) {
    return (
        <div className="info-box">
            <h1>{title}</h1>
            {description.map((line, index) => (
                <p key={index}>{line}</p>
            ))}
        </div>
    )
}

export default InfoBox;
