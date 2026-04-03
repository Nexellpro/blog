const fs = require('fs');
const path = require('path');

// FAQ database keyed by filename patterns
const FAQS = {
  // FR CRYPTO
  'defi-protocoles': `

## FAQ

### Quel rendement peut-on esperer en DeFi en 2026 ?

Les protocoles de rendement reel (Aave, GMX, Lido) offrent entre 3% et 12% APY en 2026. Les rendements superieurs a 15% signalent un risque eleve ou des emissions de tokens inflationnistes. Privilegiez les protocoles generant des revenus reels issus de frais de transaction.

### La DeFi est-elle sure pour un debutant ?

Les protocoles etablis comme Aave (TVL > 15 milliards $) et Lido n'ont jamais subi de hack majeur, mais le risque smart contract existe toujours. Commencez avec des stablecoins sur des protocoles audites et ne deposez jamais plus de 10% de votre portefeuille crypto en DeFi.

### Quelle difference entre rendement reel et rendement inflationniste ?

Le rendement reel provient des frais payes par les utilisateurs du protocole. Le rendement inflationniste vient de l'emission de nouveaux tokens, diluant la valeur. En 2026, seuls les protocoles a rendement reel sont consideres comme durables.`,

  'layer-2': `

## FAQ

### Quel Layer 2 choisir entre Arbitrum, Optimism et Base en 2026 ?

Arbitrum domine avec 45% de part de marche et la plus grande liquidite DeFi. Base (Coinbase) attire les debutants. Optimism mise sur l'ecosysteme Superchain. Pour le DeFi avance, Arbitrum reste le choix par defaut.

### Combien coute une transaction sur un Layer 2 ?

Les frais moyens en mars 2026 sont de 0,02 a 0,10 $ sur Arbitrum et Base, contre 2 a 8 $ sur Ethereum mainnet. Apres l'EIP-4844, les couts Layer 2 ont chute de 90%.

### Mes fonds sont-ils en securite sur un Layer 2 ?

Les rollups optimistes heritent de la securite d'Ethereum. En cas de litige, les transactions peuvent etre contestees sur le mainnet. Aucun incident majeur n'a cause de perte de fonds utilisateurs a ce jour.`,

  'minage-crypto': `

## FAQ

### Le minage de Bitcoin est-il encore rentable en 2026 ?

Avec un cout d'electricite inferieur a 0,06 $/kWh et des ASIC de derniere generation, le minage reste rentable avec une marge de 30 a 45%. Au-dessus de 0,10 $/kWh, la rentabilite disparait sauf si le Bitcoin depasse 120 000 $.

### Quel materiel acheter pour miner en 2026 ?

L'Antminer S21 (200 TH/s) offre le meilleur ratio performance/consommation pour environ 5 500 $. L'investissement se rembourse en 14 a 18 mois selon le cours du BTC et le tarif electrique.

### Peut-on miner de l'Ethereum en 2026 ?

Non. Ethereum est passe au Proof of Stake en septembre 2022. Le minage ETH n'existe plus. Les anciens mineurs GPU se sont reconvertis vers Kaspa ou Ravencoin, mais les marges restent faibles.`,

  'nft-2026': `

## FAQ

### Les NFT sont-ils morts en 2026 ?

Le marche speculatif des PFP a perdu 85% de son volume depuis 2022. Mais les NFT utilitaires (billets, certifications, gaming) connaissent une croissance de 340%. Le format survit, l'usage a pivote.

### Peut-on encore gagner de l'argent avec les NFT ?

La speculation sur l'art numerique est quasi morte. Les opportunites en 2026 se trouvent dans les NFT de gaming (Immutable X), les actifs tokenises (RWA) et les certifications professionnelles.

### Quels sont les risques d'investir dans les NFT ?

Illiquidite extreme, risque de contrefacon, dependance aux marketplaces, et absence totale de protection juridique pour l'acheteur en France.`,

  'securiser-cryptos': `

## FAQ

### Quel hardware wallet choisir en 2026 ?

Le Ledger Nano X (79 EUR) reste la reference avec Bluetooth. Le Trezor Model T (219 EUR) offre un code entierement open source. Pour les gros portefeuilles (> 50 000 EUR), le Ledger Stax facilite la verification des transactions.

### Un software wallet est-il suffisamment securise ?

Pour de petits montants (< 2 000 EUR) et un usage DeFi frequent, MetaMask ou Rabby sont acceptables. Au-dela de 5 000 EUR, un hardware wallet devient indispensable.

### Que faire si je perds ma seed phrase ?

Sans votre phrase de recuperation, vos fonds sont perdus definitivement. Stockez-la sur une plaque en acier (Cryptosteel, 60 EUR) dans un lieu physique sur, jamais sous forme numerique.`,

  // FR CREDIT
  'primo-accedant': `

## FAQ

### Quel apport minimum pour un premier achat immobilier en 2026 ?

Les banques exigent en moyenne 10% du prix du bien. Certaines banques en ligne acceptent 5% pour les profils CDI stables. Le PTZ 2026 peut completer votre apport jusqu'a 40% du prix dans les zones B2 et C.

### Quelles aides pour les primo-accedants en 2026 ?

Le PTZ a ete elargi a toutes les zones pour le neuf. Action Logement offre jusqu'a 40 000 EUR a 0,5% pour les salaries du prive. Les collectivites locales proposent des prets complementaires a 0-1%.

### Combien de temps dure un achat immobilier ?

Comptez 4 a 6 mois entre la premiere visite et la remise des cles : 10 jours de retractation, 2-3 mois pour l'offre de pret, 1 mois chez le notaire.`,

  'taux-fixe-vs-variable': `

## FAQ

### Taux fixe ou variable : lequel choisir en 2026 ?

Avec des taux fixes a 3,15% sur 20 ans et une BCE qui baisse ses taux directeurs, le variable redevient competitif. Sur 10-15 ans, le variable peut economiser 0,5 a 0,8 point. Sur 25 ans, le fixe reste plus sur.

### Le taux variable peut-il depasser le taux fixe ?

Oui. Si l'Euribor remonte au-dessus de 3%, un taux variable cape a +2 points peut atteindre 4,5%. Verifiez toujours le plafond contractuel.

### Peut-on passer d'un taux variable a un taux fixe ?

Oui, via une option de conversion, mais avec des frais de 0,5 a 1% du capital restant et un nouveau taux au cours du marche.`,

  'surendettement': `

## FAQ

### Comment deposer un dossier de surendettement en 2026 ?

Telechargez le formulaire Cerfa sur le site de la Banque de France. Le dossier est gratuit, traite sous 3 mois. Les poursuites des creanciers sont suspendues automatiquement.

### Le surendettement est-il inscrit au FICP ?

Oui, pour 5 ans (plan conventionnel) ou 7 ans (retablissement personnel). Cette inscription bloque l'acces au credit mais n'affecte pas votre salaire.

### Quelles dettes ne sont pas effacees ?

Les pensions alimentaires, amendes penales, dettes de reparation penale et dettes professionnelles ne peuvent pas etre effacees.`,

  'credit-immobilier-sans-apport': `

## FAQ

### Peut-on acheter sans apport en 2026 ?

Environ 8% des credits immobiliers sont accordes sans apport, principalement aux jeunes cadres en CDI avec revenus > 3 500 EUR/mois. Les banques en ligne sont plus flexibles.

### Quel taux pour un pret sans apport ?

Surprime de 0,2 a 0,4 point : environ 3,4 a 3,6% sur 25 ans en mars 2026. Sur 250 000 EUR, cela represente 15 000 a 25 000 EUR d'interets supplementaires.

### Comment convaincre une banque sans apport ?

Trois elements : epargne residuelle (meme 5 000 EUR), taux d'endettement < 30%, et reste a vivre confortable. Domicilier vos revenus renforce le dossier.`,

  'ameliorer-score-credit': `

## FAQ

### Comment connaitre son score de credit en France ?

La France n'a pas de score FICO. Les banques consultent le FICP et le FCC via la Banque de France. Vous pouvez demander votre situation gratuitement en ligne.

### Combien de temps pour ameliorer son profil bancaire ?

Comptez 3 a 6 mois de gestion irreprochable. Un incident FICP reste inscrit 5 ans mais peut etre radie une fois la dette soldee.

### Le decouvert autorise affecte-t-il mon credit ?

Un decouvert occasionnel ne pose pas de probleme. Un decouvert permanent signale une gestion fragile et peut compromettre un dossier de credit immobilier.`,

  'renegocier-credit': `

## FAQ

### Quand renegocier son credit immobilier en 2026 ?

La renegociation est interessante si l'ecart depasse 0,7 point, le capital restant > 70 000 EUR, et vous etes dans la premiere moitie du pret. Les emprunteurs de 2023 (taux 4%+) ont une fenetre en 2026.

### Combien coute une renegociation ?

IRA (max 3% du capital ou 6 mois d'interets), frais de dossier (500-1 500 EUR), et eventuellement nouvelles garanties (1-2% du pret).

### Renegocier ou faire racheter ?

La renegociation est moins chere mais offre une baisse plus faible. Le rachat externe est plus agressif mais coute 2 000-5 000 EUR. Au-dela de 100 000 EUR de capital, le rachat est generalement plus avantageux.`,

  'micro-credit': `

## FAQ

### Qui peut beneficier du micro-credit en 2026 ?

Personnes exclues du circuit bancaire : chomeurs, RSA, CDD, interimaires. Montant de 300 a 8 000 EUR sur 6 mois a 5 ans, taux plafonne autour de 5%.

### Ou demander un micro-credit ?

ADIE, CCAS, Croix-Rouge, associations Emmaus. La demande passe par un accompagnateur social. Delai : 2 a 4 semaines.

### Le micro-credit est-il inscrit au FICP ?

Non, tant que les echeances sont respectees. En cas d'impayes, l'inscription est possible mais les organismes privilegient le reechelonnement.`,

  'credit-travaux': `

## FAQ

### Quel credit pour une renovation energetique en 2026 ?

L'eco-PTZ (0%, jusqu'a 50 000 EUR) est le plus avantageux pour les renovations globales. Pour des travaux ponctuels, un pret personnel vert (2,5-4%) est une alternative. Cumulez avec MaPrimeRenov'.

### Peut-on cumuler eco-PTZ et MaPrimeRenov' ?

Oui. Un menage aux revenus modestes peut obtenir jusqu'a 90% de prise en charge entre MaPrimeRenov', eco-PTZ et les CEE (primes energie).

### Combien coute une renovation energetique complete ?

30 000 a 70 000 EUR pour une maison de 100 m2. Gain sur la facture : 40-60%, soit 1 200-2 000 EUR/an. Retour sur investissement : 5-8 ans avec aides.`,

  // FR ASSURANCE remaining
  'assurance-trottinette': `

## FAQ

### L'assurance trottinette electrique est-elle obligatoire ?

Oui, depuis 2019. Rouler sans assurance expose a une amende de 3 750 EUR. Les EDPM sont consideres comme des vehicules terrestres a moteur et doivent etre couverts par une RC minimum.

### Combien coute une assurance trottinette ?

De 3,30 EUR/mois (RC seule) a 15-20 EUR/mois (tous risques avec vol). Pour un velo electrique standard (< 25 km/h), comptez 5 a 12 EUR/mois.

### Mon assurance habitation couvre-t-elle ma trottinette ?

Generalement non pour les EDPM motorises. Certains contrats couvrent les VAE < 25 km/h. Verifiez votre contrat ou appelez votre assureur.`,

  // FR INVESTISSEMENT
  'actions-dividendes': `

## FAQ

### Combien investir pour vivre des dividendes ?

Avec un rendement moyen de 4,5% net, il faut 400 000 EUR pour generer 1 500 EUR/mois. En investissant 500 EUR/mois des 25 ans, ce capital est atteignable vers 50-55 ans.

### Les dividendes sont-ils imposes en France ?

Au PFU de 30% ou bareme progressif + 17,2% PS. Sur PEA, exoneration d'impot apres 5 ans (seuls 17,2% PS). Le PEA est optimal pour les actions europeennes a dividendes.

### Quelles actions francaises versent les meilleurs dividendes en 2026 ?

TotalEnergies (5,8%), BNP Paribas (6,1%), AXA (5,5%), Engie (5,2%) et Sanofi (3,8%) figurent parmi les meilleurs rendements du CAC 40.`,

  'correction-actions-ia': `

## FAQ

### Les actions IA sont-elles en bulle en 2026 ?

Les Magnificent 7 affichent un P/E moyen de 35x contre 22x pour le S&P 500. C'est eleve mais justifie par 25-30% de croissance annuelle. Le risque de bulle existe si cette croissance ralentit sous 15%.

### Faut-il acheter apres une correction de 15-20% ?

Historiquement, acheter le S&P 500 apres -15% genere +22% sur 12 mois. Privilegiez les ETF larges (MSCI World) plutot que des paris sur Nvidia seul.

### Quelles alternatives aux GAFAM pour l'IA ?

TSMC, ASML (infrastructure), ServiceNow, Palantir (SaaS IA) et les ETF thematiques (Global X AI) offrent une exposition diversifiee avec moins de concentration.`,

  'crowdfunding-immobilier': `

## FAQ

### Le crowdfunding immobilier est-il risque ?

Le taux de defaut a grimpe a 4,8% en 2025 contre 0,5% en 2021. Selectionnez les plateformes avec historique > 5 ans et defaut < 2%. Ne depassez jamais 10% de votre patrimoine.

### Quel rendement esperer ?

8 a 12% brut sur 12-36 mois, soit 5,6-8,4% net apres flat tax. Attention : 35% des projets subissent des retards en 2025. Capital bloque sans interets supplementaires.

### Quelle somme minimum ?

La plupart des plateformes acceptent 1 000 EUR, certaines des 100 EUR. Diversifiez sur au moins 10 projets pour lisser le risque.`,

  'immobilier-locatif': `

## FAQ

### Quelles villes les plus rentables en 2026 ?

Saint-Etienne (8-10% brut), Mulhouse (7-9%), Le Mans (6-8%). Mais la rentabilite nette apres charges tombe a 3-5%. Paris (2-3%) offre plus de securite mais moins de rendement.

### LMNP ou location nue en 2026 ?

Le LMNP reste fiscalement avantageux grace a l'amortissement qui reduit l'imposition a quasi zero pendant 15-20 ans. La location nue convient pour les locataires long terme en grande ville.

### Quel budget minimum pour un investissement locatif ?

80 000 a 120 000 EUR tout compris pour un studio en ville moyenne. Avec 10% d'apport et un credit sur 20 ans, le loyer couvre la mensualite si le rendement brut depasse 7%.`,

  'investir-10000': `

## FAQ

### Ou placer 10 000 euros en 2026 ?

Horizon 5+ ans : 60% ETF MSCI World, 20% SCPI, 20% fonds euros. Court terme : livret A (2,5%) ou fonds euros. Ne mettez pas tout sur un seul actif.

### Investir d'un coup ou progressivement ?

Le lump sum surperforme le DCA dans 65% des cas sur 10 ans. Compromis : 6 000 EUR immediatement et 4 000 EUR sur 4 mois.

### 10 000 euros suffisent-ils ?

Largement. Un PEA s'ouvre a 0 EUR de frais. Un ETF MSCI World a 10 000 EUR expose a 1 500+ entreprises. Les SCPI acceptent des 1 000 EUR.`,

  'investir-20-ans': `

## FAQ

### Combien investir par mois a 20 ans ?

Meme 50 EUR/mois font la difference. 100 EUR/mois a 8%/an pendant 40 ans = 349 000 EUR. L'important est la regularite, pas le montant.

### Quel compte ouvrir en premier a 20 ans ?

Un PEA immediatement, meme avec 100 EUR. L'avantage fiscal demarre a l'ouverture. Ensuite, un livret A pour 3 mois de depenses en precaution.

### Faut-il investir en crypto quand on est jeune ?

5-10% du portefeuille maximum (Bitcoin, Ethereum). 80%+ doit aller en ETF diversifies. La crypto est volatile : ne mettez que ce que vous acceptez de perdre.`,

  'investir-montres-luxe': `

## FAQ

### Une Rolex est-elle un bon investissement en 2026 ?

Certains modeles (Daytona, Submariner) se revendent 20-80% au-dessus du retail. Mais le marche a corrige de 25-30% depuis 2022. Les opportunites sont sur les modeles discontinues.

### Quels risques a investir dans les montres ?

Contrefacons (5-10% du marche secondaire), entretien (revision Rolex : 800-1 500 EUR), absence de rendement courant, illiquidite (vente en 2-8 semaines).

### Comment authentifier une montre de luxe ?

Plateformes certifiees (Chrono24 Trusted Seller, Watchfinder) ou certificat de la marque. Pour les Rolex, le numero de serie entre les cornes est verifiable. Budget authentification : 150-300 EUR.`,

  'livret-a-ldds': `

## FAQ

### Quel est le taux du Livret A en 2026 ?

2,5% au 1er fevrier 2026, en baisse par rapport aux 3% de 2024. Plafond : 22 950 EUR. Le LEP offre 3,5% pour les revenus modestes.

### Faut-il remplir son Livret A avant d'investir ?

Non. Gardez 3-6 mois de depenses en precaution (5 000-15 000 EUR). Au-dela, chaque euro perd du pouvoir d'achat si l'inflation depasse 2,5%.

### Le LEP est-il reserve aux revenus modestes ?

Oui, plafond de 22 419 EUR de revenu fiscal pour une personne seule. Avec 3,5% et 10 000 EUR de plafond, c'est le meilleur placement garanti de France.`,

  'meilleurs-etf-pea': `

## FAQ

### Quel ETF choisir sur PEA en 2026 ?

L'Amundi MSCI World (CW8, 0,38% de frais) reste l'incontournable. Completez avec un ETF Emerging Markets. 2-3 ETF suffisent pour une diversification optimale.

### Combien rapporte un ETF MSCI World par an ?

10,4% annualise sur 10 ans, 8,2% sur 30 ans (dividendes reinvestis). Attendez-vous a 6-9% sur le long terme, avec des annees a -20%.

### PEA ou CTO pour les ETF ?

Le PEA est superieur (17,2% apres 5 ans vs 30% sur CTO). Le CTO seulement pour les ETF non eligibles PEA. Remplissez d'abord votre PEA.`,

  'obligations-rendement': `

## FAQ

### Les obligations sont-elles un bon placement en 2026 ?

Oui. Les OAT 10 ans offrent 3,1%. Les fonds obligataires investment grade rapportent 3,5-4,5%. Alternative credible aux fonds euros pour la partie securisee.

### Quelle difference entre obligations et fonds euros ?

Les fonds euros garantissent le capital (3-3,5% en 2026). Les obligations varient en valeur mais offrent des coupons reguliers et potentiellement plus de rendement.

### Comment investir en obligations ?

Via ETF obligataires sur PEA/CTO, fonds euros en assurance vie, ou en direct (minimum 1 000 EUR). Les ETF sont la solution la plus simple.`,

  'or-record': `

## FAQ

### Faut-il acheter de l'or a 2 800 dollars ?

Les analystes ciblent 3 000-3 200 $ d'ici fin 2026. Un achat progressif (DCA mensuel) est plus prudent qu'un all-in a ces niveaux records.

### Or physique ou or papier ?

L'or physique coute 2-5% de prime + stockage. L'or papier (ETF) est plus liquide et moins cher (0,12-0,25%/an). Pour > 50 000 EUR, combinez les deux.

### L'or est-il taxe en France ?

Taxe forfaitaire de 11,5% ou regime des plus-values (36,2%) avec abattement de 5%/an des la 3e annee. Apres 22 ans : exoneration totale.`,

  'pea-vs-assurance-vie': `

## FAQ

### Quel compte ouvrir en premier ?

Le PEA pour sa fiscalite imbattable (17,2% apres 5 ans). L'assurance vie ensuite pour la flexibilite et la transmission. Le CTO seulement si les autres sont pleins.

### Peut-on avoir un PEA et une assurance vie ?

Oui, c'est recommande. Le PEA pour les actions (rendement), l'assurance vie pour les fonds euros (securite) et la transmission (152 500 EUR/beneficiaire exoneres).

### Quel est le plafond du PEA en 2026 ?

150 000 EUR de versements (les gains ne comptent pas). Le PEA-PME permet 225 000 EUR supplementaires. Un couple peut placer 750 000 EUR en PEA.`,

  'scpi-2026': `

## FAQ

### Quel rendement attendre des SCPI en 2026 ?

4,52% en moyenne. Les meilleures (Iroko Zen, Corum Origin) visent 5,5-7%. Apres imposition, le rendement net tombe a 3-4,5%.

### Les SCPI sont-elles risquees ?

Baisse de 5-15% pour certaines SCPI de bureaux en 2023-2024. Risque principal : illiquidite (revente en 3-12 mois). Privilegiez les SCPI diversifiees geographiquement.

### SCPI en direct ou en assurance vie ?

En direct, imposition a votre TMI. En assurance vie, fiscalite allegee (PFU 30% apres 8 ans). Pour un TMI a 30%+, l'assurance vie est souvent plus avantageuse.`,

  'trading-vs-investissement': `

## FAQ

### Le day trading est-il rentable en 2026 ?

Selon l'AMF, 89% des traders particuliers perdent de l'argent. Les 11% restants gagnent en moyenne 2 900 EUR/an. Sans 2-3 ans de formation et 50 000 EUR+ de capital, les chances sont quasi nulles.

### Quel capital minimum pour le trading ?

25 000 EUR minimum pour les actions (regle PDT). Pour le Forex/CFD, les courtiers acceptent 500 EUR mais les frais mangent la performance. Capital realiste pour en vivre : 100 000 EUR+.

### Peut-on combiner trading et investissement long terme ?

Oui : 80-90% en ETF long terme (PEA) et 10-20% max en trading (CTO). Si le trading perd, le patrimoine global reste protege.`,

  // EN CRYPTO
  'bitcoin-halving-2026-price': `

## FAQ

### When is the next Bitcoin halving?

The next Bitcoin halving is expected in April 2028, reducing miner rewards from 3.125 BTC to 1.5625 BTC per block. However, markets typically price in the halving 12-18 months in advance.

### Should I buy Bitcoin before or after the halving?

Historical data shows buying 6-12 months before the halving has yielded the highest returns. Post-halving peaks typically occur 12-18 months later. Dollar-cost averaging through the cycle is the most risk-adjusted approach.

### How much could Bitcoin reach after the 2028 halving?

Based on diminishing returns across cycles (9,067% in 2012, 2,943% in 2016, 705% in 2020, 69% in 2024), a 2-3x from pre-halving levels is realistic. A 10x return is extremely unlikely given market maturity.`,

  'best-crypto-exchanges': `

## FAQ

### What is the cheapest crypto exchange in 2026?

Binance offers the lowest trading fees at 0.1% spot (0.075% with BNB discount). Kraken charges 0.16% maker / 0.26% taker. Coinbase is the most expensive at 0.4-0.6% but offers the simplest interface.

### Which crypto exchange is safest?

Coinbase, Kraken, and Bitstamp have never been hacked and hold full reserves verified by third-party audits. Always enable 2FA and use withdrawal address whitelisting.

### Can I use a crypto exchange from any country?

Regulations vary. US residents cannot use Binance (must use Binance.US). EU residents need MiCA-compliant exchanges. Always verify your local regulatory requirements before opening an account.`,

  'crypto-tax': `

## FAQ

### How is crypto taxed in the US in 2026?

Crypto held > 1 year is taxed as long-term capital gains (0-20% depending on income). Crypto held < 1 year is taxed as ordinary income (10-37%). Every trade, swap, and NFT purchase is a taxable event.

### Do I need to report crypto on my taxes if I lost money?

Yes, and you should. Capital losses can offset gains and up to $3,000 of ordinary income per year. Unused losses carry forward indefinitely. Tax-loss harvesting in crypto is one of the few legal advantages available.

### What crypto tax software should I use?

CoinTracker ($59-199/year) and Koinly ($49-279/year) integrate with major exchanges and generate IRS-ready forms. Both support DeFi transactions. Free alternatives exist for portfolios under 25 trades.`,

  'ethereum-vs-solana': `

## FAQ

### Is Ethereum or Solana a better investment in 2026?

Ethereum has 10x the TVL ($85B vs $8B), stronger institutional adoption (ETH ETFs), and proven security over 8+ years. Solana offers 65,000 TPS and sub-cent fees. ETH is the safer bet; SOL is the higher-risk higher-reward play.

### What are Solana's biggest risks?

Network outages (7 in 2022-2023, improved to 1 in 2025), validator concentration, and dependence on Solana Labs. The network is faster but less battle-tested than Ethereum.

### Can Ethereum and Solana coexist?

Yes. Most analysts expect a multi-chain future where Ethereum dominates high-value DeFi and institutional use, while Solana captures retail trading and gaming. Holding both (70/30 ETH/SOL) is a common allocation.`,

  'best-crypto-staking': `

## FAQ

### What is the best crypto staking APY in 2026?

ETH staking yields 3.5-4.2% via Lido or Coinbase. Solana staking offers 6-7%. Cosmos (ATOM) provides 15-18% but with higher inflation risk. Stablecoin staking on Aave yields 4-8%.

### Is crypto staking safe?

Liquid staking protocols like Lido (ETH) and Marinade (SOL) are relatively safe with $20B+ TVL. However, smart contract risk exists. Native staking directly with validators eliminates smart contract risk but locks your funds.

### Do I pay taxes on staking rewards?

In the US, staking rewards are taxed as ordinary income at fair market value when received. You also owe capital gains tax when you sell the rewards. Keep detailed records of every reward received.`,

  'sec-greenlights': `

## FAQ

### What does SEC-approved ETH staking mean for investors?

Ethereum ETF holders can now earn 3-4% staking yield without managing validators. This makes ETH ETFs comparable to dividend-paying stocks, potentially attracting billions in institutional capital.

### Which ETH ETFs offer staking in 2026?

BlackRock iShares Ethereum Trust, Fidelity Ethereum Fund, and 21Shares Core Ethereum ETF have all integrated staking. Fees range from 0.15-0.25%, with net staking yields of 2.8-3.5% after fund expenses.

### Does staking make ETH ETFs better than BTC ETFs?

In terms of total return potential, yes. BTC ETFs generate zero yield, while staked ETH ETFs produce 3-4% annually on top of price appreciation. This yield advantage could shift institutional allocation toward ETH.`,

  'europe-mica': `

## FAQ

### What is MiCA regulation?

MiCA (Markets in Crypto-Assets) is the EU's comprehensive crypto regulatory framework, effective since June 2024. It requires exchanges to hold licenses, maintain reserves for stablecoins, and follow strict AML/KYC rules.

### Which crypto exchanges are MiCA-compliant?

As of March 2026, Coinbase, Kraken, Bitstamp, and Crypto.com have full MiCA authorization. Binance operates under transitional provisions. Smaller exchanges without licenses must cease EU operations.

### How does MiCA affect crypto investors in Europe?

Greater consumer protection (mandatory insurance, transparent fees, cold storage requirements) but fewer available tokens (exchanges delisted 30%+ of tokens lacking compliance). Stablecoin availability is also restricted.`,

  'beginner-crypto-portfolio': `

## FAQ

### How much should a beginner invest in crypto?

Start with 5-10% of your investable assets. Never invest money you need within 2 years. A typical beginner allocation: 60% Bitcoin, 30% Ethereum, 10% altcoins (or stablecoins for DeFi yield).

### What is the safest way to buy crypto in 2026?

Use a regulated exchange (Coinbase, Kraken) with bank transfer. Enable 2FA, start with Bitcoin and Ethereum only, and transfer to a hardware wallet for amounts above $5,000.

### How often should I check my crypto portfolio?

Weekly at most. Daily monitoring leads to emotional trading. Set price alerts for significant moves (>10%) and rebalance quarterly. Time in the market beats timing the market.`,

  'top-crypto-scams': `

## FAQ

### How do I know if a crypto project is a scam?

Red flags: guaranteed returns above 20%, anonymous team, no audited smart contracts, pressure to invest quickly, referral-heavy structure. Always verify the team on LinkedIn and check for third-party audits.

### Can I recover money lost to a crypto scam?

Rarely. Blockchain transactions are irreversible. Report to the FBI (IC3.gov), FTC, and your local police. Some recovery firms exist but many are themselves scams. Prevention is the only reliable protection.

### Are crypto airdrops safe?

Legitimate airdrops never ask for your seed phrase or require sending crypto first. If a website asks you to connect your wallet and approve unlimited token spending, it is likely a phishing attack.`,

  'bitcoin-vs-gold': `

## FAQ

### Is Bitcoin better than gold as a safe haven?

Gold has 5,000 years of track record and zero counterparty risk. Bitcoin has outperformed gold 100:1 over 10 years but with 5x the volatility. Gold protects against inflation; Bitcoin is a bet on digital scarcity adoption.

### Can Bitcoin replace gold in a portfolio?

For aggressive investors, a 2-5% Bitcoin allocation can replace some gold exposure. Conservative portfolios should keep gold for its negative correlation with stocks during crises. A blend of both (3% BTC, 5% gold) is gaining institutional acceptance.

### What percentage of my portfolio should be in gold vs Bitcoin?

Traditional recommendation: 5-10% gold, 0-5% Bitcoin. Younger investors can skew toward Bitcoin (higher growth potential). Retirees should favor gold (lower volatility, proven crisis performance).`,

  'defi-real-yield': `

## FAQ

### What is real yield in DeFi?

Real yield comes from actual protocol revenue (trading fees, lending interest, liquidation penalties) distributed to token holders. Unlike inflationary yield farming, real yield is sustainable because it is backed by economic activity.

### Which DeFi protocols generate real yield in 2026?

GMX (15-25% on GLP), Aave (3-8% on lending), Lido (3.5-4.2% ETH staking), and MakerDAO (8% DSR). These protocols generate hundreds of millions in annual fees distributed to stakers.

### Is DeFi yield farming still worth it in 2026?

Pure yield farming (providing liquidity for token emissions) is mostly dead. Real yield protocols offering 5-15% annually with established track records are the sustainable alternative.`,

  'nfts-2026-dead': `

## FAQ

### Are NFTs dead in 2026?

Speculative PFP trading volume dropped 85% from 2022 peaks. However, utility NFTs (event tickets, gaming items, RWA certificates) saw 340% growth. The technology survived; the use case pivoted.

### Can you still make money with NFTs?

Speculative flipping is essentially dead. Opportunities exist in gaming NFTs (Immutable X ecosystem), tokenized real-world assets, and creator platforms with genuine utility.

### What are the risks of investing in NFTs?

Extreme illiquidity, high fraud risk (5-10% counterfeits), platform dependency (metadata can disappear if marketplaces shut down), and no legal protection in most jurisdictions.`,

  'secure-crypto-hardware': `

## FAQ

### Which hardware wallet is best in 2026?

Ledger Nano X ($79) for Bluetooth convenience, Trezor Model T ($219) for open-source transparency, and Ledger Stax ($279) for large portfolios. All three support 5,000+ tokens.

### Do I need a hardware wallet for small amounts?

For amounts under $2,000 with regular DeFi usage, MetaMask or Rabby are acceptable. Above $5,000, a hardware wallet becomes essential. The $79 cost of a Ledger is insurance, not an expense.

### What happens if I lose my hardware wallet?

Your crypto is on the blockchain, not the device. With your 12/24-word seed phrase, you can restore access on any compatible wallet. Without the seed phrase, funds are permanently lost.`,

  'layer-2-arbitrum-optimism-base': `

## FAQ

### Which Layer 2 is best in 2026?

Arbitrum leads with 45% market share and the deepest DeFi liquidity. Base (by Coinbase) is growing fastest for retail users. Optimism powers the Superchain ecosystem. For DeFi power users, Arbitrum is the default choice.

### How much do Layer 2 transactions cost?

Average fees in March 2026: $0.02-0.10 on Arbitrum and Base, vs $2-8 on Ethereum mainnet. Post-EIP-4844, L2 costs dropped 90%.

### Are Layer 2s as secure as Ethereum?

Optimistic rollups (Arbitrum, Optimism, Base) inherit Ethereum's security through fraud proofs. Transactions can be challenged on mainnet. No major L2 has suffered user fund losses to date.`,

  'crypto-mining': `

## FAQ

### Is Bitcoin mining profitable in 2026?

With electricity below $0.06/kWh and latest-gen ASICs (Antminer S21), margins are 30-45%. Above $0.10/kWh, mining is unprofitable unless BTC exceeds $120,000. Location and energy cost determine everything.

### What equipment do I need to mine Bitcoin?

The Antminer S21 (200 TH/s, $5,500) offers the best efficiency in 2026. ROI takes 14-18 months depending on BTC price and electricity cost. GPU mining is dead for Bitcoin.

### Can you mine Ethereum in 2026?

No. Ethereum switched to Proof of Stake in September 2022. ETH mining no longer exists. Former GPU miners pivoted to Kaspa, Ravencoin, or Ergo, but margins are thin compared to Bitcoin ASIC mining.`,

  // EN CREDIT
  'best-mortgage-rates': `

## FAQ

### What are average mortgage rates in March 2026?

30-year fixed rates average 5.9-6.3%, 15-year fixed at 5.2-5.6%, and 5/1 ARMs at 5.0-5.4%. Rates vary by credit score, down payment, and lender. Top-tier borrowers (760+ FICO, 20% down) get rates 0.25-0.5% below average.

### Should I wait for rates to drop before buying?

Timing the market rarely works. Buying now and refinancing when rates drop (predicted mid-5% range by late 2026) is the standard strategy. Every month of waiting means paying rent with no equity building.

### How much can I save by shopping multiple lenders?

The CFPB found borrowers save an average of $1,500/year by comparing 3+ lenders. Online lenders (Better, Rocket) often beat traditional banks by 0.1-0.25% on rate.`,

  'debt-consolidation': `

## FAQ

### Is debt consolidation worth it in 2026?

If your average interest rate exceeds 15% and you have $10,000+ in debt, consolidation at 8-12% can save thousands. The math only works if you stop accumulating new debt after consolidating.

### Does debt consolidation hurt your credit score?

Short-term: a hard inquiry drops your score 5-10 points. Long-term: lower utilization and consistent payments improve your score. Most borrowers see a net positive within 6 months.

### What is the best debt consolidation method?

Personal loans (fixed rate, fixed term) for balances under $50,000. Balance transfer cards (0% APR for 15-21 months) for under $10,000. Home equity for large amounts with low rates but risk to your property.`,

  'auto-loans': `

## FAQ

### Is it better to lease or buy a car in 2026?

Buying is cheaper long-term if you keep the car 5+ years. Leasing costs 15-25% more over 6 years but offers lower monthly payments and new cars every 3 years. Finance if you drive 15,000+ miles/year (lease penalties apply).

### What is a good auto loan rate in 2026?

New car: 5.5-7.0% for prime borrowers. Used car: 7.0-9.5%. Credit unions average 1-2% lower than bank rates. A 720+ credit score qualifies for the best rates.

### How much should I put down on a car?

20% down on new, 10% on used is the standard advice. This prevents being underwater on the loan. If you cannot afford 10%, consider a less expensive vehicle.`,

  'mortgage-calculator': `

## FAQ

### How much house can I afford on a $100,000 salary?

Using the 28/36 rule, your monthly housing payment should not exceed $2,333. At 6% interest with 20% down, that supports a home price of approximately $350,000-$380,000 depending on taxes and insurance.

### What is the 28/36 rule for mortgages?

Housing costs (mortgage, taxes, insurance) should not exceed 28% of gross income. Total debt payments should stay under 36%. Lenders may approve up to 43% DTI, but exceeding 36% increases financial stress significantly.

### How much do closing costs add to a home purchase?

Expect 2-5% of the purchase price, or $7,000-$17,500 on a $350,000 home. This includes lender fees, title insurance, appraisal, and prepaid taxes. Some costs are negotiable.`,

  'best-personal-loans': `

## FAQ

### What is the lowest personal loan rate in 2026?

SoFi and LightStream offer rates starting at 6.99% APR for excellent credit (750+). Average rates across all credit tiers are 10-15%. Credit unions often beat online lenders by 1-2%.

### How much can I borrow with a personal loan?

Most lenders offer $1,000-$100,000. Approval depends on income, credit score, and debt-to-income ratio. For amounts above $50,000, you typically need a 700+ credit score and verifiable income above $75,000.

### Do personal loans affect your credit score?

The initial hard inquiry drops your score 5-10 points. Regular payments build positive history. Consolidating credit card debt with a personal loan can significantly improve your utilization ratio.`,

  'ecb-rate-cut': `

## FAQ

### How does the ECB rate cut affect my mortgage?

Variable-rate mortgages tied to Euribor benefit directly. A 0.25% ECB cut typically reduces Euribor by a similar amount within weeks, lowering monthly payments by 15-30 EUR per 100,000 EUR borrowed.

### Will mortgage rates keep falling in 2026?

The ECB has signaled 2-3 more cuts in 2026, potentially bringing the deposit rate to 2.0-2.25%. Fixed mortgage rates could reach 2.5-2.8% by year-end, the lowest since early 2023.

### Should I switch from fixed to variable rate now?

If you have more than 5 years left on a fixed rate above 3.5%, switching to variable could save significantly. But variable rates carry upward risk if inflation rebounds. Consider a capped variable for protection.`,

  'buy-now-pay-later-debt': `

## FAQ

### Is Buy Now Pay Later a form of debt?

Yes. BNPL is an unsecured credit product. Late payments can incur fees of $5-10 per installment and may be reported to credit bureaus starting 2026. 43% of BNPL users have missed at least one payment.

### Does BNPL affect your credit score in 2026?

Starting 2026, major BNPL providers (Klarna, Afterpay, Affirm) report payment history to credit bureaus. Late payments will negatively impact your score. On-time payments may help build credit.

### How much BNPL debt does the average American have?

The average BNPL user carries $1,200 in outstanding BNPL obligations across 3.5 active plans. Gen Z users average $890. These figures exclude traditional credit card debt.`,

  'first-time-homebuyer': `

## FAQ

### What credit score do I need to buy a house in 2026?

FHA loans: minimum 580 (3.5% down) or 500 (10% down). Conventional loans: minimum 620, but 740+ gets the best rates. Every 20-point increase in score saves approximately $20-40/month on a $300,000 mortgage.

### How much should I save before buying my first home?

Down payment (3-20% of purchase price) plus closing costs (2-5%) plus 3-6 months of reserves. For a $300,000 home: minimum $18,000 (3% down + closing) to $75,000 (20% down + reserves).

### What first-time buyer programs are available in 2026?

FHA loans (3.5% down), VA loans (0% down for veterans), USDA loans (0% down for rural areas), state housing authority down payment assistance, and employer-assisted housing programs.`,

  'fixed-vs-adjustable': `

## FAQ

### When does an adjustable-rate mortgage make sense?

ARMs are advantageous if you plan to sell or refinance within 5-7 years. The initial rate savings of 0.5-1.0% vs fixed translates to $3,000-$7,000 saved over 5 years on a $300,000 loan.

### How much can an ARM rate increase?

Typical caps: 2% per adjustment period, 5-6% lifetime cap. A 5/1 ARM starting at 5.0% could reach 10-11% in a worst case. Monthly payment on $300,000 would jump from $1,610 to $2,632.

### Can I refinance an ARM into a fixed-rate mortgage?

Yes, and this is the standard exit strategy. Refinancing costs 1-2% of the loan balance. Time your refinance before the first rate adjustment to maximize savings.`,

  'drowning-in-debt': `

## FAQ

### What is the fastest way to pay off debt?

The avalanche method (highest interest first) saves the most money. The snowball method (smallest balance first) builds motivation. Average payoff time for $30,000 in debt: 3-5 years with aggressive payments.

### When should I consider bankruptcy?

When debt exceeds 40% of annual income, minimum payments consume more than 50% of take-home pay, and you see no path to repayment within 5 years. Consult a nonprofit credit counselor before filing.

### Does debt negotiation really work?

Settlement companies typically negotiate debts down to 40-60% of the balance. But the process damages your credit (150-200 point drop), takes 2-4 years, and fees run 15-25% of enrolled debt.`,

  'no-down-payment': `

## FAQ

### Can I buy a house with no down payment in 2026?

Yes, through VA loans (eligible veterans/active military), USDA loans (rural areas with income limits), and some state-specific programs. Conventional 0% down options exist but carry higher rates and PMI.

### What are the disadvantages of no down payment?

Higher monthly payments, PMI costs ($100-300/month), higher interest rates (0.25-0.5% premium), instant negative equity if prices dip, and less competitive offers in hot markets.

### How do I qualify for a USDA loan?

Income must be below 115% of area median income. Property must be in an eligible rural or suburban area (check the USDA eligibility map). Credit score minimum: 640. No down payment required.`,

  'raise-credit-score': `

## FAQ

### How fast can I raise my credit score?

Paying down credit card balances below 30% utilization can boost your score 20-40 points within 30 days. Becoming an authorized user on an old account can add 15-25 points in 1-2 months. Disputes of errors take 30-45 days.

### What hurts your credit score the most?

Payment history (35% of FICO): one 30-day late payment can drop your score 60-100 points. Utilization (30%): maxing out cards is the second-biggest damage. Hard inquiries (10%): each one costs 5-10 points.

### Is 700 a good credit score in 2026?

700 is "good" but not "excellent." You qualify for most products but not the best rates. The difference between 700 and 760 can save $30,000+ in interest on a 30-year mortgage.`,

  'when-to-refinance': `

## FAQ

### When does refinancing make financial sense?

When you can reduce your rate by at least 0.75%, plan to stay in the home 3+ years (to recoup closing costs), and have 20%+ equity. The break-even point on a $300,000 refinance is typically 18-24 months.

### How much does refinancing cost?

Closing costs run 2-5% of the loan amount, or $6,000-$15,000 on a $300,000 mortgage. Some lenders offer no-closing-cost refinances but compensate with a higher rate (0.25-0.5% more).

### Can I refinance with bad credit?

FHA Streamline refinance requires no credit check if you are current on your existing FHA loan. Conventional refinancing typically requires 620+ credit score. Below 620, options are very limited.`,

  'microloans': `

## FAQ

### What is a microloan and who qualifies?

Microloans range from $500-$50,000 for individuals or small businesses who cannot access traditional bank financing. Nonprofit lenders (Grameen America, Kiva, Accion) serve underbanked communities with relaxed credit requirements.

### What interest rate do microloans charge?

Nonprofit microloans: 5-15% APR. SBA microloans: 8-13%. Peer-to-peer: 6-25%. Compared to payday loans (400%+ APR) or credit cards (20-30%), microloans are significantly cheaper for underserved borrowers.

### How do I apply for a microloan?

Contact a local Community Development Financial Institution (CDFI), apply through Kiva.org (0% interest, crowdfunded), or visit the SBA microloan program website. Most require a simple business plan and basic financial documents.`,

  'home-improvement-loans': `

## FAQ

### What is the best way to finance home improvements in 2026?

Home equity loans (5-7% fixed) for large projects over $25,000. HELOCs (variable, 6-8%) for ongoing renovations. Personal loans (8-15%) for projects under $25,000 when you lack equity. 0% APR credit cards for small projects under $5,000.

### Can I deduct home improvement loan interest on taxes?

Home equity loan/HELOC interest is deductible if funds are used to "buy, build, or substantially improve" the home securing the loan. Personal loan interest is never deductible. Maximum deductible debt: $750,000.

### How much value does a renovation add to a home?

Kitchen remodel: 60-80% ROI. Bathroom remodel: 55-70% ROI. New roof: 60-70% ROI. Swimming pool: 40-50% ROI. Minor repairs and cosmetic updates offer the best return per dollar spent.`,

  // EN INSURANCE
  'best-life-insurance': `

## FAQ

### How much life insurance do I need?

Use the DIME formula: Debt + Income replacement (10x salary) + Mortgage + Education costs. A typical family with $300,000 mortgage, $80,000 salary, and 2 kids needs $1.2-1.5 million in coverage.

### Term or whole life insurance: which is better?

Term life is better for 95% of families. A $500,000 term policy costs $220-340/year vs $3,800-5,500 for whole life. Invest the $3,000+ annual savings in index funds for significantly higher returns.

### At what age should I buy life insurance?

As soon as someone depends on your income. Every year you wait costs 4-8% more. A 25-year-old pays roughly half what a 35-year-old pays for identical coverage.`,

  'cheapest-car-insurance': `

## FAQ

### What is the cheapest car insurance company in 2026?

USAA (military members) averages $1,100/year. For civilians, GEICO ($1,350/year) and State Farm ($1,400/year) consistently offer the lowest rates. Rates vary dramatically by state: Louisiana averages $2,800 vs Maine at $900.

### How can I lower my car insurance premium?

Bundle home + auto (10-25% discount), raise your deductible to $1,000 (saves 15-25%), maintain a clean driving record, take a defensive driving course (5-10% off), and shop quotes every 12 months.

### Does credit score affect car insurance rates?

In 47 states, yes. A "poor" credit score can double your premium compared to "excellent." Only California, Hawaii, and Massachusetts prohibit credit-based insurance scoring.`,

  'best-homeowners-insurance': `

## FAQ

### How much homeowners insurance do I need?

Enough to rebuild your home at current construction costs (not market value). A 2,000 sq ft home costs $150-250/sq ft to rebuild in 2026, so coverage of $300,000-$500,000 is typical. Add 20% for inflation protection.

### What does homeowners insurance not cover?

Floods (requires separate NFIP or private policy), earthquakes (separate policy), normal wear and tear, pest damage, and intentional damage. Sewer backup and identity theft require endorsements.

### How can I lower my homeowners insurance?

Raise deductible to $2,500 (saves 10-20%), install security systems (5-15% off), bundle with auto (15-25% off), maintain good credit, and update plumbing/electrical/roof to reduce risk.`,

  'best-health-insurance': `

## FAQ

### What is the best health insurance plan type in 2026?

HDHPs with HSAs offer the lowest premiums and tax-advantaged savings for healthy individuals. PPOs provide the most flexibility for those with chronic conditions. HMOs are cheapest for families who stay in-network.

### How much does health insurance cost without an employer?

ACA marketplace average: $450-650/month for individuals before subsidies. With subsidies (income under 400% FPL), costs drop to $50-250/month. Bronze plans are cheapest ($350/month) but have high deductibles.

### What is the maximum out-of-pocket for health insurance in 2026?

The ACA sets the 2026 maximum at $9,450 for individuals and $18,900 for families. After reaching this limit, your plan covers 100% of covered services for the remainder of the year.`,

  'mortgage-insurance-pmi': `

## FAQ

### When can I remove PMI from my mortgage?

At 80% LTV (20% equity) you can request removal. At 78% LTV, the lender must automatically cancel it. You can reach 80% faster by making extra payments or if your home value increases (request a new appraisal).

### How much does PMI cost?

0.5-1.5% of the loan amount annually, or $125-375/month on a $300,000 mortgage. FHA MIP costs 0.85%/year and cannot be removed (must refinance to conventional). PMI costs vary by credit score and LTV.

### Is it worth putting 20% down to avoid PMI?

If you have the cash, yes. PMI on a $300,000 loan costs $1,500-4,500/year. But if putting 20% down depletes your savings, a smaller down payment with PMI may be wiser. Run the numbers for your situation.`,

  'home-insurance-crisis': `

## FAQ

### Why are home insurance rates surging in 2026?

Climate-related claims cost insurers $120B in 2025. Reinsurance costs rose 30-40%. Construction material inflation (15% since 2023) increases replacement costs. Insurers are raising rates 15-25% or exiting high-risk states entirely.

### Which states have the worst home insurance rates?

Florida ($4,200/year average), Louisiana ($3,800), Texas ($3,200), and Oklahoma ($3,100). California faces insurer exits rather than rate hikes due to regulatory caps. State-run FAIR plans are often the last resort.

### How can I keep my home insurance affordable?

Harden your home (impact-resistant roof saves 15-30%), raise deductible to $5,000, shop 5+ carriers annually, consider surplus lines insurers, and join community wildfire/flood mitigation programs for group discounts.`,

  'ai-health-insurance': `

## FAQ

### How is AI changing health insurance in 2026?

AI processes 70%+ of claims automatically, reducing processing from 30 days to 72 hours. AI underwriting analyzes wearable data, genetic markers, and lifestyle patterns to set personalized premiums. This raises efficiency but also discrimination concerns.

### Can AI deny my health insurance claim?

AI can flag claims for review, but the ACA requires human oversight for denials. In practice, algorithmic denials increased 25% in 2025. Several states have passed laws requiring human review of all AI-assisted denials.

### Does wearing a fitness tracker lower my insurance premium?

Some insurers offer 5-15% discounts for sharing health data (steps, heart rate, sleep). UnitedHealthcare, John Hancock, and Vitality lead these programs. Privacy trade-offs are significant.`,

  'best-pet-insurance': `

## FAQ

### Is pet insurance worth it in 2026?

Average vet costs for a serious illness or surgery: $3,000-$10,000. Pet insurance costs $30-60/month for dogs, $15-30 for cats. If you cannot absorb a $5,000 emergency vet bill, insurance is worth considering.

### What does pet insurance not cover?

Pre-existing conditions, elective procedures, breeding costs, cosmetic procedures, and most dental cleaning. Waiting periods of 14-30 days apply for illness and 6-12 months for orthopedic conditions.

### What is the best pet insurance company?

Healthy Paws (fast claims, no annual limits), Embrace (diminishing deductible), and Lemonade (AI-powered instant claims) are top-rated. ASPCA and Nationwide offer the broadest coverage for exotic pets.`,

  'best-travel-insurance': `

## FAQ

### Do I need travel insurance in 2026?

For domestic trips, credit card coverage is often sufficient. For international travel, yes: a medical emergency abroad averages $10,000-$50,000. Medical evacuation costs $25,000-$100,000+. Your domestic health insurance likely does not cover overseas care.

### How much does travel insurance cost?

4-8% of your total trip cost. A $5,000 trip costs $200-$400 to insure. Cancel-for-any-reason (CFAR) coverage adds 40-50% but refunds 75% of prepaid costs if you change your mind.

### What does travel insurance cover?

Trip cancellation/interruption, medical emergencies, emergency evacuation, lost luggage, and travel delays. Read exclusions carefully: pandemics, pre-existing conditions, and adventure sports may require add-ons.`,

  'cancel-insurance': `

## FAQ

### Can I cancel insurance at any time?

Most policies can be cancelled anytime with written notice. You receive a prorated refund of unused premiums. Exception: some insurers charge a short-rate cancellation fee (10-15% penalty) for early cancellation.

### Will cancelling insurance hurt my credit?

No, cancelling insurance does not affect your credit score. However, a lapse in auto insurance (even 1 day) can increase future premiums by 20-40%. Always have new coverage in place before cancelling.

### How do I cancel insurance without a penalty?

Cancel at renewal date for zero penalty. If mid-term, negotiate with your insurer for a prorated refund. Under the ACA, health insurance can only be cancelled during open enrollment or with a qualifying life event.`,

  'cyber-insurance': `

## FAQ

### How much does cyber insurance cost for a business?

Small businesses (< $5M revenue): $1,500-$5,000/year. Mid-size ($5-50M): $5,000-$25,000. Large enterprises: $25,000-$250,000+. Premiums depend on industry, data volume, and security posture.

### What does cyber insurance cover?

Data breach response costs (forensics, notification, credit monitoring), ransomware payments (controversial), business interruption losses, legal defense, regulatory fines, and third-party liability from data exposure.

### Do small businesses need cyber insurance?

43% of cyberattacks target small businesses, and 60% of those attacked close within 6 months. If you store customer data, accept online payments, or rely on digital systems, cyber insurance is a cost-effective safety net.`,

  'affordable-life-insurance': `

## FAQ

### What is the cheapest life insurance in 2026?

Haven Life and Bestow offer $500,000 20-year term policies starting at $18-19/month for healthy non-smoking 35-year-olds. Online-first insurers beat traditional agents by 10-20% on price.

### How much life insurance can I get for $50 a month?

A healthy 35-year-old non-smoker can get approximately $1-1.5 million in 20-year term coverage for $50/month. A 45-year-old gets roughly $500,000-$750,000 for the same premium.

### Is no-exam life insurance more expensive?

No-exam policies cost 0-15% more than fully underwritten policies for healthy applicants. For applicants with health issues, no-exam policies may actually be cheaper since they use algorithmic underwriting rather than blood test results.`,

  'accident-insurance': `

## FAQ

### What does accident insurance cover?

Lump-sum payments for specific injuries: fractures ($500-$5,000), dislocations ($1,000-$4,000), burns ($500-$10,000), hospital stays ($100-$300/day), and accidental death ($25,000-$500,000). It pays regardless of other insurance.

### Is accident insurance worth the cost?

At $10-$25/month, it is worth considering if you have a high-deductible health plan, active lifestyle, or physically demanding job. The average accident claim pays $2,000-$5,000 for a fracture or ER visit.

### How is accident insurance different from health insurance?

Health insurance covers medical bills. Accident insurance pays a fixed cash benefit directly to you, regardless of medical costs. You can use the money for anything: deductibles, rent, lost wages, childcare.`,

  'ebike-scooter-insurance': `

## FAQ

### Do I need insurance for an electric scooter?

In most US states, e-scooters under 20 mph do not require insurance. However, if you cause an accident, you are personally liable. In the EU, electric scooters above 25 km/h require mandatory liability insurance.

### How much does e-bike insurance cost?

$100-$300/year for theft and damage coverage on a $2,000-$5,000 e-bike. Liability-only coverage starts at $75/year. Specialized insurers (Velosurance, Markel, BIKMO) offer better coverage than homeowners policy endorsements.

### Does homeowners insurance cover my e-bike?

Most homeowners policies cover e-bikes for theft (minus deductible) but NOT liability while riding. Coverage is typically capped at $1,000-2,000 for personal property. A dedicated e-bike policy provides better protection.`,

  // EN INVESTING
  'best-etfs': `

## FAQ

### What is the best ETF for beginners in 2026?

VTI (Vanguard Total Stock Market, 0.03% fees) or VOO (S&P 500, 0.03%) for US exposure. VXUS (international, 0.07%) for diversification. A simple VTI + VXUS portfolio covers 10,000+ stocks globally.

### How many ETFs do I need in my portfolio?

Three is optimal: US stocks (VTI), international stocks (VXUS), and bonds (BND). Adding more ETFs increases complexity without meaningfully improving diversification. Some investors use just one (VT, total world).

### Are ETFs better than mutual funds?

For taxable accounts, yes. ETFs are more tax-efficient (fewer capital gains distributions), have lower fees on average, and trade like stocks. In 401(k)s, mutual fund versions of the same index work equally well.`,

  'best-reits': `

## FAQ

### What is a good REIT dividend yield in 2026?

The FTSE Nareit All Equity REITs Index yields 4.2% in March 2026. Top-performing sectors: data centers (3-4%), industrial (3.5-4.5%), healthcare (5-7%), and mortgage REITs (8-12% but higher risk).

### Are REITs better than owning rental property?

REITs offer instant diversification, zero management hassle, and daily liquidity. Rental property offers leverage (mortgage), tax benefits (depreciation), and hands-on control. REITs average 10-12% total return; rentals average 8-12% but require active management.

### How are REIT dividends taxed?

REIT dividends are taxed as ordinary income (not qualified dividend rates). At a 24% tax bracket, you keep 76 cents per dollar of REIT dividends vs 85 cents for qualified dividends. Holding REITs in tax-advantaged accounts (IRA, 401k) avoids this disadvantage.`,

  'how-to-invest-10000': `

## FAQ

### What is the best way to invest $10,000 in 2026?

For long-term growth: 70% VTI or VOO (US stocks), 20% VXUS (international), 10% BND (bonds). For income: 50% dividend ETFs, 30% REITs, 20% bond ETFs. Keep 3-6 months expenses in a high-yield savings account first.

### Should I invest $10,000 all at once?

Lump sum investing outperforms dollar-cost averaging 65% of the time over 10-year periods. If the volatility makes you uncomfortable, invest $2,500/month over 4 months as a compromise.

### Can $10,000 grow to $100,000?

At 8% annual return (S&P 500 historical average), $10,000 grows to $100,000 in approximately 30 years without additional contributions. Adding $200/month accelerates this to roughly 18 years.`,

  'roth-ira-vs-401k': `

## FAQ

### Should I contribute to a Roth IRA or 401(k) first?

Contribute enough to your 401(k) to get the full employer match (free money), then max out a Roth IRA ($7,000 in 2026), then go back to the 401(k). This strategy optimizes both the match and tax diversification.

### What is the Roth IRA income limit in 2026?

Single filers: phase-out begins at $150,000 MAGI, fully excluded at $165,000. Married filing jointly: $236,000-$246,000. Above these limits, use the backdoor Roth IRA strategy (contribute to traditional, then convert).

### Can I have both a Roth IRA and a 401(k)?

Yes, and you should. The combined 2026 limits allow $30,500 in a 401(k) + $7,000 in a Roth IRA = $37,500 in tax-advantaged retirement savings annually. Add catch-up contributions if you are 50+.`,

  'top-10-dividend': `

## FAQ

### How much do I need invested to earn $500/month in dividends?

At a 4% average yield, you need $150,000 invested. At 5% yield (higher-risk stocks), $120,000. Building this through monthly $500 investments in dividend-growth stocks takes approximately 12-15 years with reinvestment.

### Are dividend stocks better than growth stocks?

Neither is universally better. Dividend stocks provide income and tend to be less volatile. Growth stocks offer higher total returns over long periods. A blend of both (60% growth, 40% dividend) suits most investors.

### Do dividend stocks do well in a recession?

Dividend aristocrats (25+ years of consecutive increases) outperformed the S&P 500 in 8 of the last 10 recessions. Companies like Johnson & Johnson, Procter & Gamble, and Coca-Cola maintained dividends through 2008 and 2020.`,

  'ai-stock-correction': `

## FAQ

### Is the AI stock correction a buying opportunity?

If you have a 5+ year horizon, corrections of 15-20% in high-quality tech stocks have historically been excellent entry points. The key question is whether AI revenue growth (currently 25-30%/year) justifies premium valuations.

### Which AI stocks are most overvalued?

Companies trading above 50x forward earnings with decelerating revenue growth are most at risk. Focus on free cash flow generation rather than revenue multiples. Profitable AI companies (Microsoft, Google) are safer than unprofitable ones.

### Should I sell my AI stocks during the correction?

Selling during corrections locks in losses and misses rebounds. The S&P 500 has recovered 100% of corrections within 18 months on average. Reduce position sizes if AI exceeds 25% of your portfolio, but do not panic-sell.`,

  'gold-hits-2800': `

## FAQ

### Is it too late to buy gold at $2,800?

Analysts target $3,000-$3,200 by end of 2026, driven by central bank buying (1,200 tonnes in 2025) and geopolitical uncertainty. Dollar-cost averaging monthly is safer than a lump sum at record highs.

### What is the best way to invest in gold?

ETFs (GLD, IAU) for liquidity and low cost (0.25% fees). Physical coins/bars for long-term holding (2-5% premium over spot). Gold miners ETF (GDX) for leveraged exposure with higher volatility.

### How much gold should I have in my portfolio?

Traditional allocation: 5-10% for diversification and inflation hedging. In periods of high geopolitical risk, up to 15%. Gold has zero correlation with stocks, making it a genuine portfolio diversifier.`,

  'best-cities-rental': `

## FAQ

### What are the best cities for rental property in 2026?

Top markets by cash-on-cash return: Cleveland (8-12%), Indianapolis (7-10%), Memphis (7-9%), Birmingham (6-9%), and Kansas City (6-8%). These markets offer low entry prices ($100-$180K) and stable rental demand.

### How much do I need to start investing in rental property?

Minimum: 20-25% down payment + closing costs + reserves. For a $150,000 property: $37,500 down + $5,000 closing + $10,000 reserves = approximately $52,500. FHA allows 3.5% down on owner-occupied multi-family.

### Is rental property still a good investment in 2026?

Yes, if you buy right. Target properties with 1% rule (monthly rent equals 1% of purchase price), positive cash flow after all expenses, and in markets with population growth. Avoid appreciation-only bets in expensive markets.`,

  'high-yield-savings': `

## FAQ

### What is the best high-yield savings rate in 2026?

Top rates in March 2026: Wealthfront (4.5%), Marcus by Goldman Sachs (4.4%), Ally Bank (4.3%), Capital One (4.2%). These are variable rates that will decrease as the Fed cuts. Lock in CD rates if you want guarantees.

### Is my money safe in a high-yield savings account?

Yes, if the bank is FDIC-insured (up to $250,000 per depositor per bank). All major online banks offering high yields are FDIC-insured. For amounts above $250,000, spread across multiple banks.

### High-yield savings or money market fund?

Both offer similar yields (4-4.5% in 2026). Money market funds (Vanguard VMFXX, Fidelity SPAXX) may offer slightly higher yields but are not FDIC-insured. For emergency funds, FDIC-insured savings accounts are safer.`,

  'real-estate-crowdfunding': `

## FAQ

### Is real estate crowdfunding safe?

Default rates rose to 3-5% in 2025 as some developers faced cash crunches. Platforms like Fundrise (diversified REITs) are safer than single-project platforms. Never invest more than 10% of your portfolio in crowdfunding.

### What returns does real estate crowdfunding generate?

Advertised: 8-15% annually. Actual average (including defaults and delays): 6-10%. Fundrise averaged 7.3% net over 5 years. Single-project platforms have higher returns but also higher risk of total loss.

### What is the minimum investment for real estate crowdfunding?

Fundrise: $10 minimum. CrowdStreet: $25,000 (accredited investors). RealtyMogul: $5,000. Groundfloor: $10. Lower minimums allow diversification across more projects, reducing concentration risk.`,

  'start-investing-at-20': `

## FAQ

### How much should I invest at 20 years old?

At least 15% of your income, or as much as you can while covering basic expenses. Even $100/month starting at 20 grows to $350,000+ by 60 at 8% average returns. Time is your single biggest advantage.

### What should a 20-year-old invest in?

100% stocks is appropriate at 20 given a 40+ year horizon. A single target-date fund or VT (total world ETF) is the simplest approach. Add bonds gradually after age 35-40.

### Should a 20-year-old invest or pay off student loans?

If loan interest is below 5%, invest (especially to get 401k match). If above 7%, pay off loans first. Between 5-7%, do both. Mathematically, investing during low-rate student loans historically produces higher net worth.`,

  'bonds-comeback': `

## FAQ

### Are bonds a good investment in 2026?

Yes. After a decade of near-zero yields, bonds offer 3.5-5% yields with low risk. The Bloomberg Aggregate Bond Index yields 4.2% in March 2026. For conservative investors, this is the best bond market in 15 years.

### What type of bonds should I buy?

Treasury bonds (risk-free, 3.5-4.5%), investment-grade corporate bonds (4-5.5%), and TIPS (inflation-protected, 2% real yield). Avoid high-yield/junk bonds unless you can tolerate equity-like volatility.

### Do bonds go up when stocks go down?

Usually, but not always. In 2022, both stocks and bonds fell simultaneously. In 2026, with inflation normalizing, the traditional negative correlation is reasserting. Bonds now function as portfolio ballast again.`,

  'luxury-watches-investment': `

## FAQ

### Which luxury watches appreciate the most?

Rolex Daytona (ceramic, +45% over 5 years), Patek Philippe Nautilus 5711 (+120%), and Audemars Piguet Royal Oak 15500 (+60%). Discontinued references and limited editions outperform standard production models.

### Is it a good time to buy luxury watches in 2026?

The market corrected 25-30% from 2022 peaks, making entry prices more attractive. Rolex Submariner is now available at or near retail. The best time to buy is during corrections, not during hype cycles.

### How do I avoid buying a fake luxury watch?

Buy only from authorized dealers, certified pre-owned programs (Rolex CPO launched 2023), or platforms with authentication guarantees (Chrono24 Escrow, Watchfinder). Independent authentication costs $150-300 and is worth every dollar.`,

  'day-trading-vs-long-term': `

## FAQ

### What percentage of day traders make money?

Studies consistently show 85-90% of retail day traders lose money over any 4-year period. The profitable 10-15% earn modest returns that often underperform a simple S&P 500 buy-and-hold strategy after accounting for time spent.

### How much money do I need to day trade?

US pattern day trader rule requires $25,000 minimum in a margin account. Practically, you need $50,000-$100,000 to generate meaningful income after commissions, taxes, and platform costs.

### Is long-term investing really better than trading?

For 95%+ of people, yes. The S&P 500 has returned 10.4% annually over 30 years with zero effort. Active trading requires 40+ hours/week, expensive tools, and still underperforms passive investing for most participants.`,
};

// Process all files
const articlesDir = path.join(__dirname, 'articles');
let added = 0;
let skipped = 0;

function walkDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fp = path.join(dir, file);
    const stat = fs.statSync(fp);
    if (stat.isDirectory()) {
      walkDir(fp);
    } else if (file.endsWith('.md')) {
      const content = fs.readFileSync(fp, 'utf8');
      if (content.includes('## FAQ')) {
        skipped++;
        continue;
      }
      // Find matching FAQ
      const basename = path.basename(file, '.md');
      let matched = null;
      for (const [pattern, faq] of Object.entries(FAQS)) {
        if (basename.includes(pattern)) {
          matched = faq;
          break;
        }
      }
      if (matched) {
        fs.appendFileSync(fp, matched);
        added++;
        console.log(`+ ${fp}`);
      } else {
        console.log(`? No FAQ pattern for: ${basename}`);
      }
    }
  }
}

walkDir(articlesDir);
console.log(`\nDone: ${added} FAQs added, ${skipped} already had FAQ`);
