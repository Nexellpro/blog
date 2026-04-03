# Simulateur de Crédit Immobilier

Estimez votre capacité d'emprunt et vos mensualités en quelques secondes.

---

<div id="simCredit" style="max-width:600px;margin:2rem auto;background:#fff;border:1px solid #e5e7eb;border-radius:12px;padding:2rem;box-shadow:0 1px 3px rgba(0,0,0,0.08)">

<div style="margin-bottom:1.5rem">
<label style="display:block;font-weight:600;margin-bottom:0.4rem;font-size:0.9rem">Montant emprunté (€)</label>
<input type="number" id="simMontant" value="200000" style="width:100%;padding:0.6rem;border:1px solid #e5e7eb;border-radius:8px;font-size:1rem">
</div>

<div style="margin-bottom:1.5rem">
<label style="display:block;font-weight:600;margin-bottom:0.4rem;font-size:0.9rem">Taux annuel (%)</label>
<input type="number" id="simTaux" value="3.2" step="0.1" style="width:100%;padding:0.6rem;border:1px solid #e5e7eb;border-radius:8px;font-size:1rem">
</div>

<div style="margin-bottom:1.5rem">
<label style="display:block;font-weight:600;margin-bottom:0.4rem;font-size:0.9rem">Durée (années)</label>
<input type="number" id="simDuree" value="20" style="width:100%;padding:0.6rem;border:1px solid #e5e7eb;border-radius:8px;font-size:1rem">
</div>

<button onclick="calculerCredit()" style="width:100%;padding:0.75rem;background:#2563eb;color:#fff;border:none;border-radius:8px;font-size:1rem;font-weight:600;cursor:pointer">Calculer</button>

<div id="simResultat" style="margin-top:1.5rem;padding:1.25rem;background:#eff6ff;border-radius:8px;display:none">
<div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem">
<div>
<div style="font-size:0.75rem;color:#6b7280;text-transform:uppercase;letter-spacing:0.5px">Mensualité</div>
<div id="simMensualite" style="font-size:1.5rem;font-weight:800;color:#2563eb">—</div>
</div>
<div>
<div style="font-size:0.75rem;color:#6b7280;text-transform:uppercase;letter-spacing:0.5px">Coût total du crédit</div>
<div id="simCout" style="font-size:1.5rem;font-weight:800;color:#111827">—</div>
</div>
</div>
<div style="margin-top:1rem;font-size:0.8rem;color:#6b7280">
<span>Total remboursé : </span><strong id="simTotal">—</strong>
</div>
</div>

</div>

<script>
function calculerCredit() {
  const M = parseFloat(document.getElementById('simMontant').value);
  const tauxAnnuel = parseFloat(document.getElementById('simTaux').value) / 100;
  const duree = parseInt(document.getElementById('simDuree').value);
  const tauxMensuel = tauxAnnuel / 12;
  const n = duree * 12;
  const mensualite = M * (tauxMensuel * Math.pow(1 + tauxMensuel, n)) / (Math.pow(1 + tauxMensuel, n) - 1);
  const totalRembourse = mensualite * n;
  const coutCredit = totalRembourse - M;
  document.getElementById('simMensualite').textContent = Math.round(mensualite).toLocaleString('fr-FR') + ' €';
  document.getElementById('simCout').textContent = Math.round(coutCredit).toLocaleString('fr-FR') + ' €';
  document.getElementById('simTotal').textContent = Math.round(totalRembourse).toLocaleString('fr-FR') + ' €';
  document.getElementById('simResultat').style.display = 'block';
}
calculerCredit();
</script>

---

## Comment utiliser ce simulateur

1. **Montant emprunté** : le prix du bien moins votre apport personnel
2. **Taux annuel** : consultez nos comparatifs pour les taux actuels (moyenne mars 2026 : 3,1% sur 20 ans)
3. **Durée** : 15, 20 ou 25 ans — plus la durée est longue, plus la mensualité baisse mais le coût total augmente

## Règle des 33%

Les banques françaises appliquent la règle du taux d'endettement maximal de **35%** de vos revenus nets. Votre mensualité ne doit pas dépasser ce seuil.

**Exemple** : avec 3 500€ de revenus nets mensuels, votre mensualité maximale est de ~1 225€.

---

*Ce simulateur fournit une estimation indicative. Les résultats ne constituent pas une offre de prêt. Consultez votre banque ou un courtier pour une simulation personnalisée.*
