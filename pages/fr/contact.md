# Contact

Vous avez une question, une suggestion ou une demande de partenariat ? N'hésitez pas à nous écrire.

---

<div id="contactForm" style="max-width:600px;margin:2rem auto;background:#fff;border:1px solid #e5e7eb;border-radius:12px;padding:2rem;box-shadow:0 1px 3px rgba(0,0,0,0.08)">

<div style="margin-bottom:1.25rem">
<label style="display:block;font-weight:600;margin-bottom:0.4rem;font-size:0.9rem">Nom</label>
<input type="text" id="contactNom" placeholder="Votre nom" style="width:100%;padding:0.6rem;border:1px solid #e5e7eb;border-radius:8px;font-size:0.95rem">
</div>

<div style="margin-bottom:1.25rem">
<label style="display:block;font-weight:600;margin-bottom:0.4rem;font-size:0.9rem">Email</label>
<input type="email" id="contactEmail" placeholder="votre@email.com" style="width:100%;padding:0.6rem;border:1px solid #e5e7eb;border-radius:8px;font-size:0.95rem">
</div>

<div style="margin-bottom:1.25rem">
<label style="display:block;font-weight:600;margin-bottom:0.4rem;font-size:0.9rem">Sujet</label>
<select id="contactSujet" style="width:100%;padding:0.6rem;border:1px solid #e5e7eb;border-radius:8px;font-size:0.95rem;background:#fff">
<option value="">Choisir un sujet...</option>
<option value="question">Question sur un article</option>
<option value="erreur">Signaler une erreur</option>
<option value="partenariat">Partenariat / Publicité</option>
<option value="rgpd">Demande RGPD (accès, suppression)</option>
<option value="autre">Autre</option>
</select>
</div>

<div style="margin-bottom:1.5rem">
<label style="display:block;font-weight:600;margin-bottom:0.4rem;font-size:0.9rem">Message</label>
<textarea id="contactMsg" rows="5" placeholder="Votre message..." style="width:100%;padding:0.6rem;border:1px solid #e5e7eb;border-radius:8px;font-size:0.95rem;resize:vertical"></textarea>
</div>

<button onclick="envoyerContact()" style="width:100%;padding:0.75rem;background:#2563eb;color:#fff;border:none;border-radius:8px;font-size:1rem;font-weight:600;cursor:pointer">Envoyer</button>

<div id="contactSuccess" style="margin-top:1rem;padding:1rem;background:#ecfdf5;border-radius:8px;color:#059669;font-weight:600;display:none;text-align:center">
Message envoyé ! Nous vous répondrons sous 48h.
</div>

</div>

<script>
function envoyerContact() {
  const nom = document.getElementById('contactNom').value;
  const email = document.getElementById('contactEmail').value;
  const msg = document.getElementById('contactMsg').value;
  if (!nom || !email || !msg) { alert('Veuillez remplir tous les champs.'); return; }
  document.getElementById('contactSuccess').style.display = 'block';
  document.getElementById('contactNom').value = '';
  document.getElementById('contactEmail').value = '';
  document.getElementById('contactMsg').value = '';
  document.getElementById('contactSujet').value = '';
}
</script>

---

## Autres moyens de nous joindre

**Email direct** : contact@finance-empire.com

**Délai de réponse** : nous nous efforçons de répondre sous 48 heures ouvrées.

**Demandes RGPD** : pour exercer vos droits d'accès, de rectification ou de suppression de données, précisez "Demande RGPD" dans le sujet de votre message.
