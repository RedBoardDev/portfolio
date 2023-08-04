import React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/system';
import './ProjectCardSection.css';
import ProjectCard from '../components/ProjectCard';

import project1Img from '../assets/projects/project1.png';
import project2Img from '../assets/projects/project2.png';
import project3Img from '../assets/projects/project3.png';
import project4Img from '../assets/projects/project4.png';
import project5Img from '../assets/projects/project5.png';
import project6Img from '../assets/projects/project6.png';

function ProjectCardSection({ number }) {
    const projects = [
        {
            projectName: "Projet 1",
            projectDesc: "Description du projet 1",
            projectImg: project1Img,
            projectLink: "google.com"
        },
        {
            projectName: "Projet 2",
            projectDesc: "Description du projet 2",
            projectImg: project2Img,
            projectLink: "google.com"
        },
        {
            projectName: "Projet 3",
            projectDesc: "Description du projet 3",
            projectImg: project3Img,
            projectLink: "google.com"
        },
        {
            projectName: "Projet 4",
            projectDesc: "Description du projet 4",
            projectImg: project4Img,
            projectLink: "google.com"
        },
        {
            projectName: "Projet 5",
            projectDesc: "Description du projet 5",
            projectImg: project5Img,
            projectLink: "google.com"
        },
        {
            projectName: "Projet 6",
            projectDesc: "Description du projet 6",
            projectImg: project6Img,
            projectLink: "google.com"
        }
    ];

    return (
        <div className="project-cards-section">
            <div className="project-cards-container">
                {projects.map((project, index) => (
                    <ProjectCard
                        key={index}
                        projectName={project.projectName}
                        projectDesc={project.projectDesc}
                        projectImg={project.projectImg}
                        projectLink={project.projectLink}
                    />
                ))}
            </div>
            <Button className="btn-see-more">Voir plus de projets</Button>

        </div>
    );
}

export default ProjectCardSection;
