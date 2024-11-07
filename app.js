const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');
const app = express();
const port = 5000;

// Middleware para manejar JSON y habilitar CORS
app.use(express.json());
app.use(cors());

// Crear conexión a la base de datos
const connection = mysql.createPool({
  host: 'localhost',
  user: 'root',
  database: 'crud_adaptacion_a_pagina_web_stop',
});

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('Servidor funcionando');
});

// Endpoint para login de usuario
app.post('/login', async (req, res) => {
  const { usuario, contraseña } = req.body;

  try {
    const [rows] = await connection.execute('SELECT * FROM Usuario WHERE Nombre = ? AND Contraseña = ?', [usuario, contraseña]);
    if (rows.length > 0) {
      res.json({ mensaje: 'Bienvenido!' });
    } else {
      res.status(401).json({ mensaje: 'Credenciales incorrectas' });
    }
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al realizar el login' });
  }
});

// Endpoint para registrar un nuevo usuario
app.post('/register', async (req, res) => {
  const { usuario, correo, contraseña, direccion } = req.body;

  try {
    await connection.execute(
      'INSERT INTO Usuario (Nombre, Correo_electronico, Contraseña, Direccion) VALUES (?, ?, ?, ?)',
      [usuario, correo, contraseña, direccion]
    );
    res.json({ mensaje: 'Usuario registrado con éxito' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al registrar el usuario' });
  }
});

// Endpoint para eliminar un usuario
app.delete('/delete', async (req, res) => {
  const { usuario } = req.body;

  try {
    await connection.execute('DELETE FROM Usuario WHERE Nombre = ?', [usuario]);
    res.json({ mensaje: 'Usuario eliminado con éxito' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar el usuario' });
  }
});

// Endpoint para obtener la lista de usuarios
app.get('/usuarios', async (req, res) => {
  try {
    const [rows] = await connection.execute('SELECT * FROM Usuario');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener los usuarios' });
  }
});

// Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});