"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.newUser = void 0;
// Función para crear un nuevo usuario
// Recibe como parámetros la request y response de express
const newUser = (req, res) => {
    // Desestructuramos el body de la request para obtener los datos enviados
    const { body } = req;
    // Enviamos una respuesta en formato JSON
    res.json({
        message: "new User", // Mensaje informativo
        body // Datos recibidos en el body
    });
};
exports.newUser = newUser;
// Función para manejar el login de usuarios
const login = (req, res) => {
    // Desestructuramos el body de la request para obtener las credenciales
    const { body } = req;
    // Enviamos una respuesta en formato JSON
    res.json({
        message: "Login User", // Mensaje informativo
        body // Credenciales recibidas
    });
};
exports.login = login;
// Exportamos la función newUser como exportación por defecto
exports.default = exports.newUser;
