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
        const { username, password } = req.body;
        const user = yield user_1.default.findOne({ where: { username: username } });
        if (user) {
            return res.status(400).json({
                msg: `El usuario ${username} ya existe` // Usa "msg" en lugar de "message"
            });
        }
        const passwordHash = yield bcrypt_1.default.hash(password, 10);
        yield user_1.default.create({
            username: username,
            password: passwordHash
        });
        res.json({
            msg: `Usuario ${username} creado exitosamente` // Usa "msg" para el mensaje de éxito
        });
    }
    catch (error) {
        res.status(400).json({
            msg: "Error al crear el usuario", // Usa "msg" para el mensaje de error
            error
        });
    }
});
exports.newUser = newUser;
// Controlador para el login de usuarios
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    const user = yield user_1.default.findOne({ where: { username: username } });
    if (!user) {
        return res.status(400).json({
            msg: `Usuario ${username} no encontrado` // Usa "msg" en lugar de "message"
        });
    }
    const passwordValid = yield bcrypt_1.default.compare(password, user.password);
    if (!passwordValid) {
        return res.status(400).json({
            msg: "Contraseña incorrecta" // Usa "msg" en lugar de "message"
        });
    }
    const token = jsonwebtoken_1.default.sign({
        username: username
    }, process.env.SECRET_KEY || 'hola123');
    res.json({ token }); // Envía el token en un objeto JSON
});
exports.login = login;
