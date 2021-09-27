// Quelques fonctions utilitaires
function domForEach(selector, callback) {
  document.querySelectorAll(selector).forEach(callback);
}
function domOn(selector, event, callback, options) {
  domForEach(selector, ele => ele.addEventListener(event, callback, options));
}

// 1. Au chargement de la page, les réponses du questionnaire doivent être invisibles
domForEach('.questionnaire dd', ele => ele.classList.add('hidden'));

// 2. Lorsque l’utilisateur clique sur une des questions, la réponse adéquate doit être repectivement affichée si actuellement cachée ou cachée si actuellement affichée
domOn('.questionnaire dt', 'click', evt => {
  const ele = evt.currentTarget;
  ele.nextElementSibling.classList.toggle('hidden');
});

// 3. Au chargement de la page, toutes les questions du formulaire seront respectivement préfixées d’une numérotation Q1, Q2, et Q3
domForEach('.questionnaire dt', (ele, index) => {
  ele.textContent = `Q${index + 1}: ${ele.textContent}`;
});

// 4. Les définitions "dd" qui ne sont pas dans le questionnaire doivent s’afficher en rouge lorsque la souris passe sur eux et redevenir comme avant lorsque la souris quitte la définition
domOn('dl:not(.questionnaire) dd', 'mouseover', evt => {
  evt.currentTarget.classList.add('highlight');
});
domOn('dl:not(.questionnaire) dd', 'mouseout', evt => {
  evt.currentTarget.classList.remove('highlight');
});

// 5. Les liens qui font référence à une adresse HTTP externe doivent être mise en orange
domForEach('[href^="http"]', ele => {
  ele.classList.add('externalLink');
});

// 6. Le petit formulaire en bas de page doit permettre l’ajout d’une nouvelle note dans la liste des notes
domOn('form', 'submit', evt => {
  // Annule le comportement par défaut du formulaire (qui aurait rechargé la page!)
  evt.preventDefault();
  // Récupère le contenu du textarea
  const noteTxt = document.getElementById('newNote').value;
  // Crée un nouveau <p> avec le texte de la nouvelle "note"
  const p = document.createElement('p'); // Ici, il vaudrait mieux utiliser le concept de "template" HTML
  p.textContent = noteTxt;
  // Ajoute le <p> comme dernier enfant dans la liste des notes
  document.getElementById('notes').appendChild(p);
  // Vide le formulaire
  document.getElementById('newNote').value = '';
});

// 7. Lorsque la souris passe sur une des notes, son fond devient rouge, il redevient de la couleur par défaut lorsque la souris quitte la note
// Ici la délégation de l'évenement au parent est souhaitable car les éléments ne sont pas encore tous présents dans le DOM
const notes = document.getElementById('notes');
const mouseHandler = evt => {
  let p = evt.target.closest('p'); //Ici on a une dépendance à la structure du DOM choisie, ce qui n'est pas idéal.
  if (!notes.contains(p)) return;
  p.classList.toggle('warning');
};
domOn('#notes', 'mouseover', mouseHandler);
domOn('#notes', 'mouseout', mouseHandler);
