const authMiddleware = (req, res, next) => {
    // Lógica de autenticación, por ejemplo, verificar un token
    const token = req.headers['authorization'];
    if (!token) {
      return res.status(401).send('Token no proporcionado');
    }
  
    // Aquí puedes añadir lógica para verificar el token
    // Si es válido, llama a next(); si no, responde con un error
  
    next(); // Si todo está bien, continua con la siguiente función
  };
  
  module.exports = authMiddleware;