"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Importamos la instancia de sequelize que contiene la conexión a la base de datos
const conection_1 = __importDefault(require("../db/conection"));
// Importamos DataTypes de sequelize para definir los tipos de datos de las columnas
const sequelize_1 = require("sequelize");
// Definimos el modelo Product con sus campos y tipos de datos
const Product = conection_1.default.define('product', {
    id: {
        type: sequelize_1.DataTypes.INTEGER, // Tipo de dato INTEGER
        autoIncrement: true, // Autoincremental
        primaryKey: true // Clave primaria
    },
    name: {
        type: sequelize_1.DataTypes.STRING, // Tipo de dato STRING
        allowNull: false // No puede ser nulo
    },
    description: {
        type: sequelize_1.DataTypes.STRING, // Tipo de dato STRING
        allowNull: false // No puede ser nulo
    },
    price: {
        type: sequelize_1.DataTypes.FLOAT, // Tipo de dato FLOAT
        allowNull: false // No puede ser nulo
    },
    stock: {
        type: sequelize_1.DataTypes.INTEGER, // Tipo de dato INTEGER
        allowNull: false // No puede ser nulo
    }
});
exports.default = Product;
