// Definition de l'URL de l'API
const url = "http://kevin-chapron.fr:8080";

// Ecouteur d'evenements qui attend que le document soit completement charge
document.addEventListener("DOMContentLoaded", async () => {
    try {
        // Envoi d'une requete de connexion a l'API pour obtenir un token d'authentification
        const tokenData = await ajaxRequest('POST', url + '/login', { Code: 'SAUG06120400' });
        
        // Affichage du nom de l'utilisateur dans l'element avec l'ID 'username'
        document.getElementById('username').textContent = tokenData.Name;
        
        // Recuperation du token d'authentification pour les requetes futures
        const token = tokenData.Token;

        // Envoi d'une requete pour recuperer les messages existants
        const messages = await ajaxRequest('GET', url + '/messages', null, token);
        
        // Affichage de chaque message recupere
        messages.forEach(displayMessage);

        // Connexion au WebSocket pour recevoir les nouveaux messages en temps reel
        connectWebSocket(token);

        // Ecouteur d'evenements pour le bouton d'envoi de message
        document.getElementById('send-button').addEventListener('click', () => {
            const messageInput = document.getElementById('message-input');
            // Envoi du message saisi par l'utilisateur
            sendMessage(messageInput.value);
            // Reinitialisation du champ de saisie
            messageInput.value = '';
        });

        // Ecouteur d'evenements pour la touche 'Entree' dans le champ de saisie de message
        document.getElementById('message-input').addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                // Simule le clic sur le bouton d'envoi si la touche 'Entree' est pressee
                document.getElementById('send-button').click();
            }
        });
    } catch (error) {
        // Gestion des erreurs : affichage d'un message d'erreur dans la console
        console.error("An error occurred:", error);
    }
});