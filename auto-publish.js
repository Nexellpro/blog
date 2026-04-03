/**
 * Auto-publication de 4 articles/jour via Claude AI
 * - 2 articles "actualité" (news: true)
 * - 2 articles "guide finance" (news: false)
 * - Publiés à des heures aléatoires dans la journée (pas tous d'un coup)
 *
 * Usage:
 *   1. Définir la clé API: set ANTHROPIC_API_KEY=sk-ant-...
 *   2. Lancer: node auto-publish.js
 *
 * Le script planifie 4 publications à des heures aléatoires aujourd'hui.
 * Pour l'automatiser quotidiennement, ajouter au Planificateur de tâches Windows:
 *   - Déclencheur: tous les jours à 06:00
 *   - Action: node C:\Users\Marou\Desktop\Blog\auto-publish.js
 */

const Anthropic = require('@anthropic-ai/sdk');
const fs = require('fs');
const path = require('path');

const client = new Anthropic();

// ========== CONFIG ==========
const CATEGORIES = ['crypto', 'credit', 'assurance', 'investissement'];

const NEWS_TOPICS = {
  crypto: [
    "dernières régulations crypto en Europe",
    "mouvement de prix Bitcoin cette semaine",
    "nouveau hack ou faille DeFi",
    "adoption crypto par une grande entreprise",
    "mise à jour majeure Ethereum ou Solana",
  ],
  credit: [
    "évolution des taux directeurs BCE",
    "nouvelles mesures gouvernementales sur le crédit",
    "tendances du marché immobilier cette semaine",
    "changement réglementaire sur les prêts",
    "statistiques récentes sur l'endettement des ménages",
  ],
  assurance: [
    "réforme assurance santé ou habitation",
    "impact climatique sur les primes d'assurance",
    "nouvelle loi sur la résiliation d'assurance",
    "évolution du marché de l'assurance vie",
    "cyber-risques et assurance entreprise",
  ],
  investissement: [
    "correction ou rally sur les marchés actions",
    "record du prix de l'or ou des matières premières",
    "nouveaux ETF ou produits d'investissement lancés",
    "résultats trimestriels d'entreprises majeures",
    "tendances immobilier locatif et SCPI",
  ],
};

const GUIDE_TOPICS = {
  crypto: [
    "comment choisir entre proof of work et proof of stake",
    "guide complet des airdrops crypto en 2026",
    "comprendre les tokenomics avant d'investir",
    "stratégies de sortie : quand vendre ses cryptos",
    "comparatif des blockchains Layer 1 en 2026",
  ],
  credit: [
    "comment négocier son taux avec sa banque",
    "les erreurs qui font refuser un crédit immobilier",
    "prêt à taux zéro 2026 : conditions et éligibilité",
    "crédit entre particuliers : avantages et risques",
    "comment calculer son taux d'endettement réel",
  ],
  assurance: [
    "comment bien choisir son assurance emprunteur",
    "comparatif des mutuelles santé pour indépendants",
    "assurance habitation : les garanties indispensables",
    "optimiser sa fiscalité avec l'assurance vie",
    "guide de l'assurance professionnelle pour freelances",
  ],
  investissement: [
    "construire un portefeuille anti-inflation",
    "investir dans les forêts et terres agricoles",
    "guide du crowdequity : investir dans les startups",
    "stratégie barbell : allier sécurité et rendement",
    "les meilleurs placements pour préparer sa retraite",
  ],
};

// ========== GENERATION ==========

async function generateArticle(type, category) {
  const isNews = type === 'news';
  const topics = isNews ? NEWS_TOPICS[category] : GUIDE_TOPICS[category];
  const topic = topics[Math.floor(Math.random() * topics.length)];

  const today = new Date().toISOString().split('T')[0];
  const catLabels = { crypto: 'Crypto', credit: 'Crédit', assurance: 'Assurance', investissement: 'Investissement' };

  const prompt = isNews
    ? `Tu es un journaliste financier expert. Écris un article d'ACTUALITÉ en français sur : "${topic}".

Date de publication : ${today}
Catégorie : ${catLabels[category]}

RÈGLES STRICTES :
- 800-1200 mots
- Ton journalistique, factuel, avec des chiffres précis et datés
- INTERDIT : contenu générique, "il est important de", phrases de remplissage, répétitions
- Commence par un fait marquant ou un chiffre choc
- Cite des sources (BCE, AMF, CoinGecko, Bloomberg, etc.)
- Inclus 5 marqueurs [AD_SLOT_1] à [AD_SLOT_5] répartis dans le texte
- Termine par une section ## FAQ avec 3 questions/réponses spécifiques
- Le contenu doit passer E-E-A-T (expertise, expérience, autorité, fiabilité)
- Ajoute un disclaimer en fin d'article`

    : `Tu es un expert en finance personnelle. Écris un GUIDE APPROFONDI en français sur : "${topic}".

Date de publication : ${today}
Catégorie : ${catLabels[category]}

RÈGLES STRICTES :
- 1500-2500 mots
- Ton expert mais accessible, avec des exemples concrets et chiffrés
- INTERDIT : contenu générique, "il est important de", phrases de remplissage, conseils vagues
- Structure claire avec des h2 et h3
- Inclus des tableaux comparatifs quand pertinent
- Inclus 5 marqueurs [AD_SLOT_1] à [AD_SLOT_5] répartis dans le texte
- Termine par une section ## FAQ avec 3 questions/réponses spécifiques
- Le contenu doit passer E-E-A-T
- Ajoute un disclaimer en fin d'article`;

  const response = await client.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 4000,
    messages: [
      {
        role: 'user',
        content: prompt,
      },
    ],
  });

  const content = response.content[0].text;

  // Extract title from first # heading
  const titleMatch = content.match(/^#\s+(.+)/m);
  const title = titleMatch ? titleMatch[1].trim() : topic;

  // Generate slug
  const slug = title
    .toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .substring(0, 60);

  // Build frontmatter
  const frontmatter = `---
title: "${title.replace(/"/g, '\\"')}"
date: "${today}"
updated: "${today}"
category: "${catLabels[category]}"
lang: "fr"
slug: "${slug}"
news: ${isNews}
---

`;

  return { title, slug, content: frontmatter + content, category, isNews };
}

function saveArticle(article) {
  const catDir = path.join(__dirname, 'articles', 'fr', article.category);
  if (!fs.existsSync(catDir)) fs.mkdirSync(catDir, { recursive: true });

  const filePath = path.join(catDir, `${article.slug}.md`);

  // Don't overwrite existing
  if (fs.existsSync(filePath)) {
    console.log(`  ⚠ Fichier existe déjà: ${article.slug}.md — ignoré`);
    return null;
  }

  fs.writeFileSync(filePath, article.content, 'utf-8');
  console.log(`  ✓ ${article.isNews ? 'ACTU' : 'GUIDE'} | ${article.category} | ${article.slug}.md`);
  return filePath;
}

function addToIndex(article) {
  // Add the article to ARTICLES in index.html
  const indexPath = path.join(__dirname, 'index.html');
  let html = fs.readFileSync(indexPath, 'utf-8');

  const catKey = article.category;
  const entry = `          { file: 'articles/fr/${catKey}/${article.slug}.md', title: "${article.title.replace(/"/g, '\\"')}", news: ${article.isNews} },`;

  // Find the category array in FR and insert before the closing ]
  const catRegex = new RegExp(`(fr:\\s*\\{[\\s\\S]*?${catKey}:\\s*\\[)([\\s\\S]*?)(\\s*\\])`);
  const match = html.match(catRegex);
  if (match) {
    html = html.replace(catRegex, `$1$2${entry}\n$3`);
    fs.writeFileSync(indexPath, html, 'utf-8');
    console.log(`  ✓ Ajouté à index.html`);
  } else {
    console.log(`  ⚠ Impossible d'ajouter à index.html — catégorie ${catKey} non trouvée`);
  }
}

// ========== SCHEDULER ==========

function randomHoursBetween(startH, endH, count) {
  const hours = [];
  for (let i = 0; i < count; i++) {
    const h = startH + Math.random() * (endH - startH);
    hours.push(h);
  }
  return hours.sort((a, b) => a - b);
}

function msUntilHour(h) {
  const now = new Date();
  const target = new Date(now);
  target.setHours(Math.floor(h), Math.round((h % 1) * 60), 0, 0);
  const diff = target - now;
  return diff > 0 ? diff : 0;
}

function formatHour(h) {
  const hh = Math.floor(h);
  const mm = Math.round((h % 1) * 60);
  return `${String(hh).padStart(2, '0')}:${String(mm).padStart(2, '0')}`;
}

async function publishOne(type, idx) {
  const category = CATEGORIES[Math.floor(Math.random() * CATEGORIES.length)];
  console.log(`\n[${new Date().toLocaleTimeString('fr-FR')}] Génération article ${idx + 1}/4 (${type}, ${category})...`);

  try {
    const article = await generateArticle(type, category);
    const saved = saveArticle(article);
    if (saved) addToIndex(article);
  } catch (err) {
    console.error(`  ✗ Erreur: ${err.message}`);
  }
}

async function main() {
  console.log('=== Auto-Publication Finance Empire ===\n');

  if (!process.env.ANTHROPIC_API_KEY) {
    console.error('✗ ANTHROPIC_API_KEY non définie.');
    console.error('  Windows: set ANTHROPIC_API_KEY=sk-ant-...');
    console.error('  Puis relancez: node auto-publish.js');
    process.exit(1);
  }

  // Mode immédiat (--now) : publie les 4 articles tout de suite
  if (process.argv.includes('--now')) {
    console.log('Mode immédiat (--now)\n');
    const types = ['news', 'news', 'guide', 'guide'];
    for (let i = 0; i < 4; i++) {
      await publishOne(types[i], i);
    }
    console.log('\n✓ Terminé.');
    return;
  }

  // Mode planifié : 4 heures aléatoires entre 7h et 22h
  const hours = randomHoursBetween(7, 22, 4);
  const types = ['news', 'news', 'guide', 'guide'];
  // Mélanger les types
  for (let i = types.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [types[i], types[j]] = [types[j], types[i]];
  }

  console.log('Publications planifiées pour aujourd\'hui :');
  hours.forEach((h, i) => {
    console.log(`  ${i + 1}. ${formatHour(h)} — ${types[i] === 'news' ? 'Actualité' : 'Guide finance'}`);
  });
  console.log('\nEn attente...\n');

  for (let i = 0; i < 4; i++) {
    const delay = msUntilHour(hours[i]);
    if (delay > 0) {
      console.log(`  ⏳ Prochain article dans ${Math.round(delay / 60000)} minutes (${formatHour(hours[i])})`);
      await new Promise(r => setTimeout(r, delay));
    }
    await publishOne(types[i], i);
  }

  console.log('\n✓ 4 articles publiés. Fin de la journée.');
}

main();
