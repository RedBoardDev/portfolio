# 🚀 Deployment Guide - Portfolio AWS

Ce guide explique comment configurer et déployer votre portfolio Next.js sur AWS avec CloudFront et S3 via Serverless Framework.

## 📋 Prérequis

- Compte AWS avec permissions appropriées
- Node.js 20+
- Git configuré avec GitHub

## 🔧 Configuration AWS

### 1. Créer un utilisateur IAM

Créez un utilisateur IAM avec les permissions suivantes :
- `AmazonS3FullAccess`
- `CloudFrontFullAccess`
- `IAMFullAccess`
- `AWSCloudFormationFullAccess`

### 2. Configurer les secrets GitHub

Dans votre repository GitHub, allez dans **Settings > Secrets and variables > Actions** et ajoutez :

```
AWS_ACCESS_KEY_ID=your_access_key_id
AWS_SECRET_ACCESS_KEY=your_secret_access_key
```

## 🏗️ Architecture du Déploiement

```
GitHub → CI/CD → S3 → CloudFront → 🌐
```

- **S3 Bucket** : Stockage des fichiers statiques
- **CloudFront** : CDN pour une distribution rapide
- **GitHub Actions** : CI/CD automatisé
- **Serverless Framework** : Infrastructure as Code

## 📁 Structure des Workflows

### CI Workflow (`.github/workflows/ci.yml`)
- **Déclencheur** : Push sur `main` et `release`, PRs
- **Actions** : Lint, Build, Cache
- **Optimisations** : Cache Node.js et build artifacts

### CD Workflow (`.github/workflows/cd.yml`)
- **Déclencheur** : Push sur `release`
- **Actions** : Attendre CI → Build → Deploy → Invalidate Cache
- **Env** : `production`

## 🔄 Workflow de Déploiement

1. **Développement** : Travaillez sur des branches features
2. **Integration** : Merge vers `main` → CI se déclenche
3. **Release** : Merge `main` → `release` → CD se déclenche
4. **Déploiement** : Automatique sur AWS

## 📊 Monitoring et Optimisations

### Cache Strategy
- **HTML** : 1 heure
- **CSS/JS** : 1 an
- **Images** : 1 an
- **Static Assets** : 1 an + immutable

### Performance
- **Compression** : Gzip activé
- **HTTP/2** : Activé par défaut
- **HTTPS** : Redirect forcé

## 🛠️ Commandes Utiles

```bash
# Déploiement local
npm run deploy:dev

# Déploiement production
npm run deploy

# Info sur le déploiement
serverless info --stage production

# Supprimer la stack
serverless remove --stage production
```

## 🐛 Troubleshooting

### Erreur de permissions AWS
```bash
# Vérifier les credentials
aws sts get-caller-identity
```

### Build qui échoue
```bash
# Nettoyer les caches
rm -rf .next node_modules
npm install
npm run build
```

### CloudFront ne se met pas à jour
- L'invalidation est automatique
- Peut prendre 5-15 minutes
- Vérifiez dans AWS Console

## 🎯 Optimisations Futures

- [ ] Domaine personnalisé
- [ ] Certificat SSL custom
- [ ] Monitoring avec CloudWatch
- [ ] Backup automatique
- [ ] Multi-region deployment

## 📝 Configuration Serverless

Le fichier `serverless.yml` configure :
- **S3 Bucket** avec hosting statique
- **CloudFront Distribution** avec cache optimisé
- **Origin Access Control** pour la sécurité
- **Invalidation automatique** du cache

## 🔐 Sécurité

- Buckets S3 avec accès public contrôlé
- HTTPS forcé via CloudFront
- Headers de sécurité configurés
- Origin Access Control pour protéger S3

---

**💡 Tip** : Pour des déploiements plus rapides, utilisez `serverless deploy --stage dev` pour vos tests.