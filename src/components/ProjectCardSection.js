import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import './ProjectCardSection.css';
import ProjectCard from '../components/ProjectCard';

function ProjectCardSection({ number }) {
    const [projects, setProjects] = useState([]);

    useEffect(() => {

        const fetchGitHubProjects = async () => {
            try {
                const response = await fetch('https://api.github.com/users/redboarddev/repos?sort=pushed&direction=desc');
                if (!response.ok) {
                    throw new Error('Error while retrieving GitHub data');
                }

                const data = await response.json();

                const filteredProjects = data.filter((project) => project.description);

                const slicedProjects = filteredProjects.slice(0, 6);

                const mappedProjects = slicedProjects.map((project) => ({
                    projectName: project.name,
                    projectDesc: project.description,
                    projectImg: project.owner.avatar_url,
                    projectLink: project.html_url,
                }));

                setProjects(mappedProjects);
            } catch (error) {
                console.error('Erreur:', error);
            }
        };

        fetchGitHubProjects();
    }, []);

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
