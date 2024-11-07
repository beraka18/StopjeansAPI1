const connection = require('../config/db'); // Importamos la conexión de la base de datos

// Función para el login de usuario
async function login(req, res) {
  const { usuario, contraseña } = req.body;
  try {
    const [rows] = await connection.execute(
      'SELECT * FROM Usuario WHERE Nombre = ? AND Contraseña = ?', [usuario, contraseña]
    );
    if (rows.length > 0) {
      res.json({ mensaje: 'Bienvenido!' });
    } else {
      res.status(401).json({ mensaje: 'Credenciales incorrectas' });
    }
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al realizar el login' });
  }
}

// Función para registrar un nuevo usuario
async function register(req, res) {
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
}

module.exports = { login, register };