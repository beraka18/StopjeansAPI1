// Requerir las dependencias
const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');
const session = require('express-session');
const dotenv = require('dotenv');

// Cargar las variables de entorno desde el archivo .env
dotenv.config(); 

// Inicializar la aplicación Express
const app = express();
const port = process.env.PORT || 5000;

// Middleware para manejar JSON y habilitar CORS
app.use(express.json());

// Configuración de CORS con credenciales
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',  // Cambia a la URL de tu frontend
  credentials: true
}));

// Configuración de sesiones
app.use(session({
  secret: process.env.SECRETSESSION,  // Secreto para encriptar la sesión
  resave: false,                      // No volver a guardar sesiones no modificadas
  saveUninitialized: false,           // No guardar sesiones no inicializadas
  proxy: process.env.NODE_ENV === 'production',  // Habilitar proxy para producción
  cookie: {
    secure: process.env.NODE_ENV === 'production',  // Asegura las cookies en producción
    sameSite: 'lax'  // Política para proteger contra CSRF
  }
}));

// Crear conexión a la base de datos usando la URL de conexión completa
const connection = mysql.createPool({
  uri: process.env.DATABASE_URL,  // Usar la URI proporcionada por Railway
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
      req.session.user = usuario; // Guardar el usuario en la sesión
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

// Endpoint para verificar si un usuario está autenticado
app.get('/perfil', (req, res) => {
  if (req.session.user) {
    res.json({ mensaje: `Bienvenido ${req.session.user}` });
  } else {
    res.status(401).json({ mensaje: 'No estás autenticado' });
  }
});

// Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});