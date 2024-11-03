const connection = require('../config/db');

const userController = {
  login: async (req, res) => {
    const { nombre, correo, contraseña, direccion } = req.body;

    try {
      const [results] = await connection.query(
        "SELECT Nombre FROM usuario WHERE Nombre = ? AND Correo_electronico = ? AND Contraseña = ? AND Direccion = ?",
        [nombre.trim(), correo.trim(), contraseña.trim(), direccion.trim()]
      );

      if (results.length > 0) {
        res.status(200).send(`Inicio de sesión exitoso para: ${results[0].Nombre}`);
      } else {
        res.status(401).send('Credenciales incorrectas');
      }
    } catch (err) {
      console.error('Error en la consulta:', err);
      res.status(500).send('Error en el servidor');
    }
  },

  // Aquí puedes agregar más métodos para el manejo de usuarios, como el registro
};

module.exports = userController;