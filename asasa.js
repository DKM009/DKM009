function sendMessage() {
    const sessionId = 'YOUR_SESSION_ID'; // Un ID único para cada sesión
    const queryInput = {
      text: document.getElementById('userInput').value,
      // ... otras opciones de configuración
    };
  
    // Crear una instancia del cliente Dialogflow
    const sessionClient = new Dialogflow.SessionsClient();
    const sessionPath = sessionClient.sessionPath('YOUR_PROJECT_ID', sessionId);
  
    sessionClient
      .detectIntent({ session: sessionPath, queryInput })
      .then(responses => {
        const result = responses[0].queryResult;
        console.log(`Respuesta: ${result.fulfillmentText}`);
        // Mostrar la respuesta en tu página web
      })
      .catch(err => {
        console.error('Error:', err);
      });
  }