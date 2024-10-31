let ws; // Declaration d'une variable pour stocker l'instance WebSocket

// Fonction pour etablir une connexion WebSocket
function connectWebSocket(token) {
  // Creation d'une nouvelle connexion WebSocket vers l'URL specifiee
  ws = new WebSocket("ws://kevin-chapron.fr:8080/ws");

  // Evenement declenche lorsque la connexion WebSocket est ouverte
  ws.onopen = () => {
    // Envoi d'un message d'authentification au serveur avec le token
    ws.send(JSON.stringify({ auth: token }));
  };

  // Evenement declenche lorsqu'un message est recu du serveur
  ws.onmessage = (event) => {
    // Analyse des donnees du message recu
    const messageData = JSON.parse(event.data);
    // Appel d'une fonction pour afficher le message dans l'interface utilisateur
    displayMessage(messageData);
  };

  // Evenement declenche en cas d'erreur avec la connexion WebSocket
  ws.onerror = (error) => console.error('WebSocket Error:', error);

  // Evenement declenche lorsque la connexion WebSocket est fermee
  ws.onclose = () => {
    console.log('WebSocket connection closed.'); // Log pour indiquer que la connexion a ete fermee
    // Optionnel : essayer de se reconnecter apres un delai
    setTimeout(() => connectWebSocket(token), 5000); // Reconnexion apres 5 secondes
  };
}

// Fonction pour envoyer un message via WebSocket
function sendMessage(message) {
  // Verification que la connexion WebSocket est ouverte avant d'envoyer le message
  if (ws && ws.readyState === WebSocket.OPEN) {
    // Envoi du message au serveur sous forme de chaine JSON
    ws.send(JSON.stringify({ message: message }));
  } else {
    console.error('WebSocket is not open. Message not sent:', message); // Log d'erreur si la connexion n'est pas ouverte
  }
}

// Fonction pour fermer la connexion WebSocket de maniere propre
function closeWebSocket() {
  if (ws) {
    ws.close(); // Ferme la connexion WebSocket
    console.log('WebSocket connection closed by the user.'); // Log pour indiquer que la connexion a ete fermee par l'utilisateur
  }
}

// Fonction pour afficher les messages dans l'interface utilisateur
function displayMessage(messageData) {
  // Logique pour afficher le message dans l'interface utilisateur (non definie ici)
  console.log('Received message:', messageData); // Exemple de log pour afficher le message recu
}