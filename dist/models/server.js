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
// Importamos express y el tipo Application desde el módulo 'express'
const express_1 = __importDefault(require("express"));
// Importamos los routers para productos y usuarios
const product_1 = __importDefault(require("../routes/product"));
const user_1 = __importDefault(require("../routes/user"));
const product_2 = __importDefault(require("../models/product"));
const conection_1 = __importDefault(require("../db/conection"));
const user_2 = __importDefault(require("./user"));
const cors_1 = __importDefault(require("cors"));
// Definimos una clase llamada server que manejará la configuración del servidor
class server {
    // Constructor de la clase - se ejecuta al crear una nueva instancia
    constructor() {
        // Asignamos el puerto desde las variables de entorno o usamos '3001' por defecto
        this.port = process.env.PORT || '3001';
        // Inicializamos la aplicación express
        this.app = (0, express_1.default)();
        // Primero configurar middlewares y rutas
        this.middlewares();
        this.routes();
        // Luego conectar a la base de datos
        this.dbConnection().then(() => {
            // Solo iniciar el servidor después de conectar a la DB
            this.listen();
        });
    }
    // Método para iniciar el servidor HTTP
    listen() {
        // Iniciamos el servidor en el puerto especificado
        this.app.listen(this.port, () => {
            console.log(`Server running on port ${this.port}`);
        });
    }
    // Método para configurar las rutas de la API
    routes() {
        // Configuramos las rutas base para productos y usuarios
        this.app.use('/api/product', product_1.default);
        this.app.use('/api/users', user_1.default);
    }
    // Método para configurar los middlewares
    middlewares() {
        // Habilitamos el parsing de JSON en las peticiones
        this.app.use(express_1.default.json());
        this.app.use((0, cors_1.default)());
    }
    dbConnection() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Primero verificar la conexión
                yield conection_1.default.authenticate();
                console.log('Database connection established successfully');
                // Luego sincronizar los modelos
                yield product_2.default.sync();
                yield user_2.default.sync();
                console.log('Product table synchronized');
            }
            catch (error) {
                console.error('Unable to connect to the database:', error);
                throw error; // Re-lanzar el error para manejarlo en el constructor
            }
        });
    }
}
// Exportamos la clase server para poder usarla en otros archivos
exports.default = server;
