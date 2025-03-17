"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Definimos el middleware que validará los tokens JWT
// Este middleware se ejecutará antes de las rutas protegidas
const validarToken = (req, res, next) => {
    // Obtenemos el header 'Authorization' que debe contener el token
    // El formato esperado es: "Bearer eyJhbGciOiJIUzI1NiIs..."
    const headerToken = req.headers['authorization'];
    // Verificamos dos condiciones:
    // 1. Que el header exista (no sea undefined)
    // 2. Que comience con 'Bearer ' (nótese el espacio)
    if (headerToken != undefined && headerToken.startsWith('Bearer ')) {
        // Si el token es válido, permitimos que la petición continúe
        // hacia el siguiente middleware o controlador
        try {
            const bearerToken = headerToken.slice(7);
            jsonwebtoken_1.default.verify(headerToken, process.env.SECRET_KEY || "hola123");
            next();
        }
        catch (error) {
            res.status(401).json({
                msg: 'token no valido'
            });
        }
    }
    else {
        // Si no hay token o el formato es incorrecto:
        // - Respondemos con estado 401 (No autorizado)
        // - Enviamos un mensaje explicativo
        res.status(401).json({
            msg: "Acceso denegado"
        });
    }
};
// Exportamos el middleware para poder importarlo en otros archivos
// Típicamente se usa en las rutas que requieren autenticación
exports.default = validarToken;
