const express = require('express');
const mysql = require('mysql2/promise'); // Importamos mysql2 con promesas
const app = express();
const port = 3000;

// Middleware para parsear el cuerpo de las solicitudes en formato JSON
app.use(express.json());

// Crear la conexión a la base de datos
const connection = mysql.createPool({
  host: 'localhost',
  user: 'root',
  database: 'crud_adaptacion_a_pagina_web_stop',
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Cambié el método de GET a POST para Login, es más adecuado para manejar credenciales
app.post('/Login', async (req, res) => { // req = request, petición; res = response, respuesta
  const { nombre, correo, contraseña, direccion } = req.body; // Extraemos datos del cuerpo de la petición

  // Depuración: muestra los datos recibidos en el cuerpo de la solicitud
  console.log('Datos recibidos para Login:', { nombre, correo, contraseña, direccion });

  try {
    // Consulta simple SELECT
    const query = `
      SELECT Nombre, Correo_electronico, Direccion 
      FROM usuario 
      WHERE Nombre = ? AND Correo_electronico = ? AND Contraseña = ? AND Direccion = ?`;
    
    console.log('Ejecutando consulta:', query); // Depuración: Antes de la consulta

    const [results] = await connection.query(query, [
      nombre.trim(), correo.trim(), contraseña.trim(), direccion.trim()
    ]);

    // Depuración: después de la consulta, solo muestra datos relevantes de cada fila
    console.log('Resultados de la consulta:', results.map(row => ({
      Nombre: row.Nombre,
      Correo_electronico: row.Correo_electronico,
      Direccion: row.Direccion
    })));

    if (results.length > 0) {
      res.status(200).send(`Inicio de sesión exitoso para: ${results[0].Nombre}`);
    } else {
      res.status(401).send('Credenciales incorrectas'); // Mensaje de error si no hay resultados
    }
  } catch (err) {
    console.error('Error en la consulta:', err);
    res.status(500).send('Error en el servidor'); // Mensaje de error del servidor
  }
});

// Endpoint de Validación
app.get('/Validar', (req, res) => {
  res.send('Sesión validada!');
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});