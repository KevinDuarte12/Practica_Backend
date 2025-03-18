"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.newUser = void 0;
// Importamos bcrypt para el manejo seguro de contraseñas (hash y comparación)
const bcrypt_1 = __importDefault(require("bcrypt"));
// Importamos nuestro modelo de Usuario para interactuar con la base de datos
const user_1 = __importDefault(require("../models/user"));
// Importamos jwt para generar tokens de autenticación
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Controlador para crear nuevos usuarios
const newUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Extraemos el nombre de usuario y la contraseña del cuerpo de la solicitud
        const { username, password } = req.body;
        // Buscamos si el usuario ya existe en la base de datos
        const user = yield user_1.default.findOne({ where: { username: username } });
        // Si el usuario ya existe, devolvemos un error
        if (user) {
            return res.status(400).json({
                msg: `El usuario ${username} ya existe` // Usa "msg" en lugar de "message"
            });
        }
        // Si el usuario no existe, hasheamos la contraseña
        const passwordHash = yield bcrypt_1.default.hash(password, 10);
        // Creamos un nuevo usuario en la base de datos
        yield user_1.default.create({
            username: username,
            password: passwordHash
        });
        // Devolvemos una respuesta exitosa
        res.json({
            msg: `Usuario ${username} creado exitosamente` // Usa "msg" para el mensaje de éxito
        });
    }
    catch (error) {
        // Si ocurre un error, lo manejamos y devolvemos un mensaje de error
        res.status(400).json({
            msg: "Error al crear el usuario", // Usa "msg" para el mensaje de error
            error
        });
    }
});
exports.newUser = newUser;
// Controlador para el login de usuarios
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Extraemos el nombre de usuario y la contraseña del cuerpo de la solicitud
    const { username, password } = req.body;
    // Buscamos el usuario en la base de datos
    const user = yield user_1.default.findOne({ where: { username: username } });
    // Si el usuario no existe, devolvemos un error
    if (!user) {
        return res.status(400).json({
            msg: `Usuario ${username} no encontrado` // Usa "msg" en lugar de "message"
        });
    }
    // Comparamos la contraseña proporcionada con la contraseña hasheada en la base de datos
    const passwordValid = yield bcrypt_1.default.compare(password, user.password);
    if (!passwordValid) {
        return res.status(400).json({
            msg: "Contraseña incorrecta" // Usa "msg" en lugar de "message"
        });
    }
    // Si las credenciales son válidas, generamos un token JWT
    const token = jsonwebtoken_1.default.sign({
        username: username
    }, process.env.SECRET_KEY || 'hola123'); // Usa una clave secreta del entorno o un valor por defecto
    // Devolvemos el token en la respuesta
    res.json({ token }); // Envía el token en un objeto JSON
});
exports.login = login;
