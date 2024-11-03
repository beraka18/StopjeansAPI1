const express = require('express');
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Ruta para iniciar sesión
router.post('/login', userController.login);

// Puedes agregar más rutas aquí, como registro, obtener usuarios, etc.

module.exports = router;