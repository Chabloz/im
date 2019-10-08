const TMPL_AUTHOR = $(".tmpl-author").clone();

$("#addAuthor").on("click", event => {  
  // clone la template (pour garder le "clone" initial intact)
  let clone = TMPL_AUTHOR.clone();  
  // ajoute la copie au DOM du formulaire
  $("#authors").append(clone);
});

$("#delAuthor").on("click", event => {  
  // cherche le noeud DOM du dernier auteur et le supprime
  $(".tmpl-author").last().remove();    
});
