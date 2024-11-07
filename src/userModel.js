const connection = require('../config/db');

// Obtener todos los usuarios
async function getAllUsers() {
  try {
    const [rows] = await connection.execute('SELECT * FROM Usuario');
    return rows;
  } catch (error) {
    throw error;
  }
}

// Eliminar un usuario
async function deleteUser(usuario) {
  try {
    await connection.execute('DELETE FROM Usuario WHERE Nombre = ?', [usuario]);
  } catch (error) {
    throw error;
  }
}

module.exports = { getAllUsers, deleteUser };