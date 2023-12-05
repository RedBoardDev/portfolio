import React from 'react';
import Button from '@mui/material/Button';
import "./Home.css";
import { Container, Grid } from '@mui/material';
import ProfileImage from '../components/ProfileImage';
import FloatingActionButton from '../components/FloatingActionButton';
import TypingEffect from '../components/TypingEffect';
import WordCloud from '../components/WordCloud';
import InfoBox from '../components/InfoBox';
import ProjectCardSection from '../components/ProjectCardSection';

function Home() {
    const data = [
        { text: "JavaScript", value: 35, description: "Langage de programmation pour le développement web." },
        { text: "Python", value: 45, description: "Langage de programmation polyvalent et puissant." },
        { text: "React", value: 40, description: "Bibliothèque JavaScript pour la création d'interfaces utilisateur." },
        { text: "Node.js", value: 35, description: "Plateforme de développement côté serveur en JavaScript." },
        { text: "HTML/CSS", value: 50, description: "Langages de base pour la création de pages web." },
        { text: "Git", value: 45, description: "Système de contrôle de version pour le suivi des modifications de code." },
        { text: "Docker", value: 30, description: "Plateforme de conteneurisation pour l'exécution d'applications." },
        { text: "SQL", value: 40, description: "Langage de requête pour interagir avec les bases de données relationnelles." },
        { text: "C++", value: 20, description: "Langage de programmation pour le développement système et les applications." },
        { text: "Java", value: 30, description: "Langage de programmation polyvalent pour les applications." },
        { text: "TypeScript", value: 35, description: "Langage de programmation typé pour le développement JavaScript." },
        { text: "Ruby", value: 25, description: "Cadre d'application web basé sur Ruby." },
        { text: "PHP", value: 25, description: "Langage de script pour le développement web côté serveur." },
        { text: "DevOps", value: 35, description: "Méthodologie de développement logiciel centrée sur la collaboration entre équipes de développement et opérations." },
        { text: "Ansible", value: 30, description: "Outil d'automatisation pour la gestion de configuration et le déploiement d'applications." },
        { text: "Vue.js", value: 20, description: "Framework JavaScript progressif pour la création d'interfaces utilisateur." },
        { text: "Angular", value: 30, description: "Plateforme de développement d'applications web côté client." },
        { text: "API REST", value: 40, description: "Architecture d'API pour les services web." },
        { text: "Express.js", value: 30, description: "Cadre d'application web pour Node.js." },
        { text: "GraphQL", value: 25, description: "Langage de requête pour les API et les services web." },
        { text: "GraphQL", value: 25, description: "Langage de requête pour les API et les services web." },

    ];

    return (
        <>
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
                        <Button variant="outlined" color="primary" href="https://github.com/RedBoardDev" target="_blank">
                            My Works
                        </Button>
                    </div>
                </div>
            </div>
            <div className="sections-wrapper">
                <div className="wordcloud-section">
                    <Container maxWidth="lg">
                        <Grid container justifyContent="center" spacing={0}>
                            <Grid item xs={12} md={10} lg={9} xl={12}>
                                <WordCloud data={data} />
                            </Grid>
                        </Grid>
                    </Container>
                </div>

                <InfoBox title="Réalisations récentes"
                    description={[
                        "Découvrez six de mes projets les plus marquants.",
                        "Ils illustrent ma passion pour le développement et ma capacité à créer des solutions innovantes."
                    ]}
                />

                <div className="mywork-section">
                    <Container maxWidth="lg">
                        <Grid container justifyContent="center" spacing={0}>
                            <Grid item xs={12} md={10} lg={9} xl={12}>
                                <ProjectCardSection number={6} />
                            </Grid>
                        </Grid>
                    </Container>
                </div>
            </div>
        </>
    );
}

export default Home;