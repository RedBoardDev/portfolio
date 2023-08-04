import React from 'react';
import './ProjectCard.css';

function ProjectCard({ projectName, projectDesc, projectImg, projectLink }) {
    return (
        <div className="project-card">
            <div className="project-card-image-container">
                <img src={projectImg} alt="Project" className="project-image" />
                <div className="project-card-overlay">
                    <div className="project-card-info">
                        <h3>{projectName}</h3>
                        <p>{projectDesc}</p>
                        <a href={projectLink} target="_blank" rel="noreferrer" className="project-button">Visiter le site</a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProjectCard;
