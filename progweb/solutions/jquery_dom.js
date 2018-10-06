// Au chargement de la page, les réponses du questionnaire doivent être invisibles
$(".questionnaire dd").hide();
// Lorsque l’utilisateur clique sur une des questions, la ou les réponses adéquates doivent être affichées
$(".questionnaire dt").on("click", event => {  
  $(event.currentTarget)
    .nextUntil("dt")
    .toggle();
});
// Au chargement de la page, toutes les questions du formulaire seront respectivement préfixées d’une numérotation Q1, Q2, et Q3
$(".questionnaire dt").each((ind, elem) => {
  $(elem).prepend(`Q ${ind+1}: `)
});
// Les définitions du « résumé jQuery » doivent s’afficher en rouge lorsque la souris passe sur eux et redevenir comme avant lorsque la souris quitte la définition
$("dl:not(.questionnaire) dd").on("mouseover mouseout", event => {
  $(event.currentTarget).toggleClass("highlight");
});
// Les liens qui font référence à une adresse HTTP externe doivent être mise en orange
$("a[href^='http'").addClass("externalLink");
//Le petit formulaire en bas de page doit permettre l’ajout d’une nouvelle note dans la liste des notes
$("form").on("submit", event => {
  let note = $("<p>").text($("#newNote").val());  
  $("#notes").append(note);
  event.currentTarget.reset();
  event.preventDefault();
})
// Lorsque la souris passe sur une des notes, son fond devient rouge, il redevient de la couleur par défaut lorsque la souris quitte la note
$("#notes").on("mouseover mouseout", "p", event => {
  $(event.currentTarget).toggleClass("warning");
})
