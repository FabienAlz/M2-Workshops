# **Liste des tâches**

**User Story 1:** En tant qu'utilisateur, je souhaite pouvoir modifier un atelier que j'ai créé auparavant.

**User Story 2:** En tant qu'utilisateur, je souhaite pouvoir supprimer un atelier que j'ai créé auparavant.

**Tâche 1:** Modifier le fichier index.ejs afin de rajouter un bouton "Modifier" correspondant à chaque atelier créé. Ce bouton redirigera l'utilisateur vers la page /update-wokshop donc le squelette HTML sera écrit dans le fichier workshop-update.ejs où il trouvera un formulaire de création d'atelier rempli avec les valeurs de l'atelier qu'il a décidé de modifier. Cette page reprendra le fichier workshop.ejs comme base. IL faudra créer le fichier workshopCréation.js qui permettra de faire la route qui lie l'URL à la page correspondante.  
**DoD :** Un bouton "Modifier" est présent en face de chaque atelier créé sur l'index. Je peux cliquer sur ce bouton pour être redirigé vers la page de modification d'un atelier. Les champs de cette pages sont remplis et contiennent les valeurs de l'atelier à modifier.   
**Durée :** 4 heures   
**Dépendances :** Aucune  
**User story :** 1

**Tâche 2:**  Modifier le fichier inMemoryWorkshop pour y ajouter la fonctionnalité pour mettre à jour un atelier. Ajouter dans le fichier workshopUpdate.js la route permettant d'appeler la fonction update de inMemoryWorkshop et de retourner à l'index.  
**DoD :** Lorsque je suis sur la page de mise à jour d'un atelier, que je change des champs d'un atelier et que j'appuie sur le bouton "Mettre à jour", je suis redirigé vers l'index et l'atelier que j'ai voulu modifier n'est plus dans la liste et à sa place se trouve l'atelier avec les nouveaux champs.  
**Durée :** 2 heures   
**Dépendances :** Tâche 1  
**User story :** 1

**Tâche 3:**  Ajouter un bouton "Supprimer" dans le fichier index.ejs en face de chaque atelier.Modifier le fichier inMemoryWorkshop pour y ajouter la fonctionnalité pour supprimer un atelier. Créer dans le fichier workshopDelete.js qui contient la route GET permettant d'appeler la fonction delete de inMemoryWorkshop, de mettre à jour l'index et d'y revenir. Créer le fichier remove-workshop.ejs qui permet de faire le lien entre le fichier app.js et workshopDelete.js.  
**DoD :** Lorsque je suis sur l'index et que je clique sur supprimer, l'atelier se supprime.  
**Durée :** 2 heures   
**Dépendances :** Aucune  
**User story :** 2