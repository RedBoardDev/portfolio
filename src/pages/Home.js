import React from 'react';
import Button from '@mui/material/Button';
import "./Home.css";
import ProfileImage from '../components/ProfileImage';
import FloatingActionButton from '../components/FloatingActionButton';
import TypingEffect from '../components/TypingEffect';
import WordCloud from '../components/WordCloud';
import { Container, Grid } from '@mui/material';

function Home() {
    const data = [
        // { text: "Développement de sites web", value: 42, description: "Création et maintenance de sites web." },
        // { text: "Développement back-end", value: 40, description: "Création de la logique serveur pour les applications web." },
        // { text: "Gestion de bases de données", value: 45, description: "Conception et manipulation de bases de données." },
        // { text: "Automatisation de processus", value: 40, description: "Automatisation des tâches répétitives." },
        // { text: "Développement d'applications mobiles", value: 30, description: "Création d'applications pour les appareils mobiles." },
        { text: "1JavaScript", value: 35, description: "Langage de programmation pour le développement web." },
        { text: "2Python", value: 45, description: "Langage de programmation polyvalent et puissant." },
        { text: "3React", value: 40, description: "Bibliothèque JavaScript pour la création d'interfaces utilisateur." },
        { text: "4Node.js", value: 35, description: "Plateforme de développement côté serveur en JavaScript." },
        { text: "5HTML/CSS", value: 50, description: "Langages de base pour la création de pages web." },
        { text: "6Git", value: 45, description: "Système de contrôle de version pour le suivi des modifications de code." },
        { text: "7Docker", value: 30, description: "Plateforme de conteneurisation pour l'exécution d'applications." },
        { text: "8SQL", value: 40, description: "Langage de requête pour interagir avec les bases de données relationnelles." },
        { text: "9C++", value: 20, description: "Langage de programmation pour le développement système et les applications." },
        { text: "10Java", value: 30, description: "Langage de programmation polyvalent pour les applications." },
        { text: "11TypeScript", value: 35, description: "Langage de programmation typé pour le développement JavaScript." },
        { text: "12Ruby", value: 25, description: "Cadre d'application web basé sur Ruby." },
        { text: "13PHP", value: 25, description: "Langage de script pour le développement web côté serveur." },
        { text: "14DevOps", value: 35, description: "Méthodologie de développement logiciel centrée sur la collaboration entre équipes de développement et opérations." },
        { text: "15Ansible", value: 30, description: "Outil d'automatisation pour la gestion de configuration et le déploiement d'applications." },
        { text: "16Vue.js", value: 20, description: "Framework JavaScript progressif pour la création d'interfaces utilisateur." },
        { text: "17Angular", value: 30, description: "Plateforme de développement d'applications web côté client." },
        { text: "18API REST", value: 40, description: "Architecture d'API pour les services web." },
        { text: "19Express.js", value: 30, description: "Cadre d'application web pour Node.js." },
        { text: "20GraphQL", value: 25, description: "Langage de requête pour les API et les services web." },
        { text: "21GraphQL", value: 25, description: "Langage de requête pour les API et les services web." },

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
                        <Button variant="outlined" color="primary" href="/works">
                            My Works
                        </Button>
                    </div>
                </div>
            </div>
            <div className="wordcloud-section">
                <Container maxWidth="lg">
                    <Grid container justifyContent="center" spacing={0}>
                        <Grid item xs={12} md={10} lg={9} xl={12} sx={{ marginTop: "20px" }}>
                            <WordCloud data={data} />
                        </Grid>
                    </Grid>
                </Container>
            </div>

            <div className="mywork-section">
                <Container maxWidth="lg">
                    <Grid container justifyContent="center" spacing={0}>
                        <Grid item xs={12} md={10} lg={9} xl={12} sx={{ marginTop: "20px" }}>
                            {/* <NewComponent /> */}
                        </Grid>
                    </Grid>
                </Container>
            </div>

        </>
    );
}

export default Home;