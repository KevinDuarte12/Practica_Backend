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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Controlador para crear nuevos usuarios
const newUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Extraemos username y password del cuerpo de la petición (JSON)
        const { username, password } = req.body;
        // Buscamos si ya existe un usuario con ese username en la base de datos
        const user = yield user_1.default.findOne({ where: { username: username } });
        // Si encontramos un usuario existente, retornamos error
        if (user) {
            return res.status(400).json({
                message: `El usuario ${username} ya existe`
            });
        }
        // Generamos un hash de la contraseña con bcrypt
        // El número 10 es el "salt rounds" - mayor número = más seguro pero más lento
        const passwordHash = yield bcrypt_1.default.hash(password, 10);
        // Creamos el nuevo usuario en la base de datos con el hash de la contraseña
        yield user_1.default.create({
            username: username,
            password: passwordHash
        });
        // Si todo sale bien, enviamos mensaje de éxito
        res.json({
            message: `Usuario ${username} creado exitosamente`
        });
    }
    catch (error) {
        // Si algo falla, enviamos un error 400 con detalles
        res.status(400).json({
            message: "Error al crear el usuario",
            error
        });
    }
});
exports.newUser = newUser;
// Controlador para el login de usuarios
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Extraemos credenciales del cuerpo de la petición
    const { username, password } = req.body;
    // Buscamos el usuario en la base de datos
    const user = yield user_1.default.findOne({ where: { username: username } });
    // Si no encontramos el usuario, retornamos error
    if (!user) {
        return res.status(400).json({
            message: `Usuario ${username} no encontrado`
        });
    }
    // Verificamos si la contraseña coincide con el hash almacenado
    const passwordValid = yield bcrypt_1.default.compare(password, user.password);
    if (!passwordValid) {
        return res.status(400).json({
            message: "Contraseña incorrecta"
        });
    }
    const token = jsonwebtoken_1.default.sign({
        username: username
    }, process.env.SECRET_KEY || 'hola123');
    res.json(token);
    // TODO: Implementar respuesta de login exitoso y generación de token
});
exports.login = login;
