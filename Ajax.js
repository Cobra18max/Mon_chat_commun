// Fonction asynchrone pour effectuer des requetes AJAX
async function ajaxRequest(method, url, data = null, token = null) {
  // Definition des en-tetes de la requete
  const headers = { 'Content-Type': 'application/json' };
  
  // Si un token est fourni, l'ajouter aux en-tetes pour l'authentification
  if (token) headers['Authorization'] = `Basic ${token}`;

  // Envoi de la requete avec fetch
  const response = await fetch(url, {
    method: method, // Specifie la methode HTTP a utiliser pour la requete (par exemple, 'GET', 'POST', etc.)
    
    headers: headers, // Definit les en-tetes de la requete, qui incluent des informations comme le type de contenu et l'autorisation (s'il y a un token)
    
    body: data ? JSON.stringify(data) : null // Si des donnees sont fournies, les convertir en chaine JSON pour les envoyer dans le corps de la requete ; sinon, le corps est nul (pas de donnees a envoyer)
  });

  // Verification si la reponse est correcte 
  if (!response.ok) {
    // Si la reponse n'est pas correcte, lancer une erreur avec le code et le message de statut
    // Pour une meilleure gestion des erreurs, nous allons d'abord tenter de recuperer les details de l'erreur
    let errorDetails;

    try {
      // Essayer de recuperer le corps de la reponse, qui peut contenir des informations sur l'erreur
      errorDetails = await response.json();
    } catch (jsonError) {
      // Si la conversion en JSON echoue, cela signifie que la reponse n'etait pas au format JSON
      // Nous pouvons donc assigner un message d'erreur generique
      errorDetails = { message: 'Unable to parse error details.' };
    }

    // Afficher les erreurs dans le terminal pour faciliter le debogage
    console.error(`Error ${response.status}: ${response.statusText}. Details: ${JSON.stringify(errorDetails)}`);

    // Lancer une erreur avec le code, le message de statut et les details de l'erreur
    throw new Error(`Error ${response.status}: ${response.statusText}. Details: ${JSON.stringify(errorDetails)}`);
  }

  // Si la reponse est correcte, retourner les donnees JSON de la reponse
  return await response.json();
}