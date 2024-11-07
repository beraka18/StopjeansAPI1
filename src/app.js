const express = require('express');
const userRoutes = require('./routes/userRoutes'); // Importar las rutas de usuario
const app = express();
const port = 3000;

// Middleware para parsear el cuerpo de las solicitudes en formato JSON
app.use(express.json());

// Definición de rutas
app.use('/api/users', userRoutes); // Prefijo para las rutas de usuario

// Endpoint de Validación (puedes moverlo a las rutas también)
app.get('/Validar', (req, res) => {
  res.send('Sesión validada!');
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});