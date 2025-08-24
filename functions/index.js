const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors');

const app = express();
//const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({ origin: true })); // Permite solicitudes de diferentes orígenes (front-end)
app.use(express.json()); // Permite al servidor entender JSON en las solicitudes
app.use(require('./routes/routes'));

// Iniciar el servidor
/*app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});*/

exports.api = functions.https.onRequest(app);
