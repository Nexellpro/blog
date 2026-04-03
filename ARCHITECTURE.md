# ARCHITECTURE TECHNIQUE DU SITE — FINANCE EMPIRE 2026

---

## 1. CONFIRMATION DE MISSION

Mission comprise. Je suis Maxime. Voici mon périmètre :

- **Rôle :** Architecte digital & rédacteur expert finance bilingue
- **Objectif :** Blog empire FR/EN à haut rendement publicitaire
- **Niches :** Crypto | Crédit | Assurance | Investissement
- **Cible monétisation :** AdSense (lancement) → Ezoic (10K sessions) → Mediavine (50K sessions)
- **Cadence :** 20 articles piliers au lancement, puis 3/jour

---

## 2. PHASE 1 — STRUCTURE TECHNIQUE

### 2.1 Catégories Mères et Sous-Catégories

| Catégorie Mère | Sous-catégories FR | Sous-catégories EN |
|---|---|---|
| **Crypto** | Bitcoin, Ethereum, Altcoins, DeFi, Fiscalité Crypto | Bitcoin, Ethereum, Altcoins, DeFi, Crypto Tax |
| **Crédit / Credit** | Crédit immobilier, Crédit conso, Rachat de crédits, Taux | Mortgage, Personal Loans, Refinancing, Interest Rates |
| **Assurance / Insurance** | Assurance vie, Auto, Habitation, Santé | Life Insurance, Auto, Home, Health |
| **Investissement / Investing** | Bourse, ETF, Immobilier locatif, SCPI, PEA | Stocks, ETFs, Real Estate, REITs, 401k/IRA |

### 2.2 Stack Technique Recommandée

#### Thème : GeneratePress Premium
- **Pourquoi :** 30 KB non compressé. Score PageSpeed > 95. Hooks natifs pour injecter les ads sans plugin tiers.
- **Alternative :** Astra Pro (plus lourd mais meilleur page builder si besoin de landing pages).
- **Verdict :** GeneratePress. Pas de débat. La vitesse = argent en MFA.

#### Hébergement
- **Lancement :** Cloudways (DigitalOcean 2GB) — ~$28/mois. Cache Varnish natif.
- **Scale :** Kinsta ou WP Engine quand le trafic dépasse 100K/mois.

#### Plugins Essentiels (Liste stricte — pas de bloat)

| Plugin | Rôle | Gratuit/Premium |
|---|---|---|
| **RankMath Pro** | SEO on-page, schema markup, redirections | Premium ($59/an) |
| **Polylang Pro** | Multilingue FR/EN avec gestion des slugs | Premium ($99/an) |
| **WP Rocket** | Cache, lazy load, minification CSS/JS | Premium ($59/an) |
| **ShortPixel** | Compression images WebP/AVIF automatique | Freemium |
| **Ad Inserter** | Injection publicitaire conditionnelle (positions, devices) | Gratuit |
| **TablePress** | Tableaux comparatifs (indispensable pour le CPC) | Gratuit |
| **Redirection** | Gestion 301 si migration | Gratuit |
| **UpdraftPlus** | Backup automatique | Gratuit |

**Plugins INTERDITS :** Elementor, Jetpack, Yoast (conflit Polylang), tout slider, tout social share lourd.

### 2.3 Structure des URLs Bilingues

```
Domaine : financempire.com (exemple)

Structure Polylang :
├── financempire.com/fr/               ← Page d'accueil FR
│   ├── /fr/crypto/
│   │   └── /fr/crypto/bitcoin-halving-2026-impact-cours/
│   ├── /fr/credit/
│   │   └── /fr/credit/meilleur-taux-immobilier-mars-2026/
│   ├── /fr/assurance/
│   │   └── /fr/assurance/comparatif-assurance-vie-2026/
│   └── /fr/investissement/
│       └── /fr/investissement/meilleurs-etf-pea-2026/
│
├── financempire.com/en/               ← Page d'accueil EN
│   ├── /en/crypto/
│   │   └── /en/crypto/bitcoin-halving-2026-price-impact/
│   ├── /en/credit/
│   │   └── /en/credit/best-mortgage-rates-march-2026/
│   ├── /en/insurance/
│   │   └── /en/insurance/best-life-insurance-policies-2026/
│   └── /en/investing/
│       └── /en/investing/best-etfs-to-buy-2026/
```

#### Paramètres Polylang :
- **Détection langue :** Par URL prefix (`/fr/`, `/en/`)
- **Langue par défaut :** Français (marché moins concurrentiel = trafic plus rapide)
- **Hreflang :** Automatique via Polylang Pro
- **Sitemap :** Un par langue via RankMath

#### Permalinks WordPress :
```
Réglages > Permaliens > Structure personnalisée :
/%category%/%postname%/
```
Polylang ajoute automatiquement le préfixe `/fr/` ou `/en/`.

### 2.4 Architecture des Pages Monétisées

```
[HEADER — Logo + Nav minimaliste]
[BREADCRUMB — SEO + UX]
[AD_SLOT_1 — Leaderboard 728x90 — Au-dessus du fold]
[H1 — Titre optimisé]
[INTRO — 150 mots max, hook + promesse]
[AD_SLOT_2 — In-article 300x250 — Après intro]
[CONTENU — H2/H3 structuré avec tableaux]
[AD_SLOT_3 — In-article natif — Milieu d'article]
[CONTENU SUITE]
[AD_SLOT_4 — Avant conclusion]
[CONCLUSION + CTA]
[AD_SLOT_5 — Sticky footer mobile]
[ARTICLES CONNEXES — Maillage interne]
```

**Densité publicitaire cible :** 1 ad pour 300-400 mots. Au-delà, Google pénalise.

---

## 3. PHASE 3 — LES 20 ARTICLES PILIERS

### Stratégie de sélection
Chaque titre cible un CPC estimé > $5 (EN) / > 2€ (FR). Mots-clés transactionnels ou comparatifs prioritaires.

### CRYPTO (5 articles)

| # | Titre FR | Titre EN | CPC estimé |
|---|---|---|---|
| 1 | Bitcoin Halving 2026 : Faut-il Acheter Avant ou Après ? | Bitcoin Halving 2026: Buy Before or After? The Data Speaks | $8-12 |
| 2 | Top 10 Plateformes Crypto en 2026 : Comparatif Frais et Sécurité | Best Crypto Exchanges 2026: Fees, Security & Honest Rankings | $6-10 |
| 3 | Fiscalité Crypto France 2026 : Le Guide Complet pour Déclarer | Crypto Tax USA 2026: IRS Rules, Forms & How to Pay Less | $12-18 |
| 4 | Ethereum vs Solana en 2026 : Où Placer Son Argent ? | Ethereum vs Solana 2026: Which Blockchain Wins Your Portfolio? | $5-8 |
| 5 | Staking Crypto 2026 : Les Meilleurs Rendements Sans Risque Majeur | Best Crypto Staking Platforms 2026: Earn Up to 12% APY Safely | $7-11 |

### CRÉDIT / CREDIT (5 articles)

| # | Titre FR | Titre EN | CPC estimé |
|---|---|---|---|
| 6 | Taux Immobilier Mars 2026 : Comparatif des Banques | Best Mortgage Rates March 2026: Lender-by-Lender Comparison | $15-25 |
| 7 | Rachat de Crédits 2026 : Économisez Jusqu'à 40% sur Vos Mensualités | Debt Consolidation Loans 2026: Cut Your Payments by 40% | $10-18 |
| 8 | Crédit Auto 2026 : LOA vs LLD vs Crédit Classique | Auto Loans 2026: Lease vs Buy vs Finance — The Real Math | $8-14 |
| 9 | Simulation Crédit Immobilier : Combien Pouvez-Vous Emprunter en 2026 ? | Mortgage Calculator 2026: How Much House Can You Really Afford? | $18-30 |
| 10 | Prêt Personnel 2026 : Les Offres à Taux le Plus Bas | Best Personal Loans 2026: Lowest APR Offers Ranked | $12-20 |

### ASSURANCE / INSURANCE (5 articles)

| # | Titre FR | Titre EN | CPC estimé |
|---|---|---|---|
| 11 | Assurance Vie 2026 : Les Fonds Euros Qui Rapportent Encore | Best Life Insurance 2026: Term vs Whole — What Agents Won't Tell You | $20-35 |
| 12 | Comparatif Assurance Auto 2026 : Trouvez 300€ d'Économies | Cheapest Car Insurance 2026: State-by-State Rates Exposed | $15-28 |
| 13 | Assurance Habitation 2026 : Guide Complet et Comparatif | Best Homeowners Insurance 2026: Coverage, Cost & Claims Ranked | $12-22 |
| 14 | Mutuelle Santé 2026 : Quelle Couverture pour Quel Budget ? | Best Health Insurance Plans 2026: Marketplace vs Employer vs Private | $18-30 |
| 15 | Assurance Emprunteur 2026 : Économisez avec la Loi Lemoine | Mortgage Insurance (PMI) 2026: When to Drop It & How to Save | $10-16 |

### INVESTISSEMENT / INVESTING (5 articles)

| # | Titre FR | Titre EN | CPC estimé |
|---|---|---|---|
| 16 | Meilleurs ETF PEA 2026 : Le Portefeuille à 3 Lignes | Best ETFs to Buy 2026: Build a 3-Fund Portfolio That Beats 90% | $8-14 |
| 17 | SCPI 2026 : Rendements, Fiscalité et Meilleures Sociétés | Best REITs 2026: High-Yield Real Estate Without the Headaches | $10-16 |
| 18 | Investir 10 000€ en 2026 : Les 5 Stratégies les Plus Rentables | How to Invest $10,000 in 2026: 5 Strategies Ranked by Risk | $7-12 |
| 19 | PEA vs Assurance Vie vs CTO : Quel Compte en 2026 ? | Roth IRA vs 401(k) vs Brokerage 2026: The Tax-Smart Order | $12-20 |
| 20 | Actions à Dividendes 2026 : 10 Valeurs pour un Revenu Passif | Top 10 Dividend Stocks 2026: Build $500/Month Passive Income | $6-10 |

---
