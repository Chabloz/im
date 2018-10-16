const TMPL_AUTHOR = $(".tmpl-author").clone();

$("#addAuthor").on("click", event => {  
  // cloner la template (le clone "premier")
  let clone = TMPL_AUTHOR.clone();  
  // ajouter la copie au DOM du formulaire
  $("#authors").append(clone);
});

$("#delAuthor").on("click", event => {  
  // cherche le noeud DOM du dernier auteur et le supprime
  $(".tmpl-author").last().remove();    
});

