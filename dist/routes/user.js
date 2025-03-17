"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Importamos Router y RequestHandler desde express
const express_1 = require("express");
// Importamos los controladores newUser y login
const user_controller_1 = require("../controllers/user.controller");
// Creamos una nueva instancia del router
const router = (0, express_1.Router)();
// Definimos una ruta POST en la raíz ('/') para crear nuevos usuarios
// Usando type assertion para indicar que newUser es un RequestHandler
router.post('/', user_controller_1.newUser);
// Definimos una ruta POST '/login' para manejar la autenticación
// Usando type assertion para indicar que login es un RequestHandler
router.post('/login', user_controller_1.login);
// Exportamos el router para usarlo en otros archivos
exports.default = router;
