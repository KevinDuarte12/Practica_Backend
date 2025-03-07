"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Importamos la clase Sequelize del paquete 'sequelize'
const sequelize_1 = require("sequelize");
// Creamos una nueva instancia de Sequelize con los parámetros de conexión:
// - 'ejemplo': nombre de la base de datos
// - 'root': usuario de MySQL
// - 'admin123': contraseña
// - Opciones adicionales de configuración
const sequelize = new sequelize_1.Sequelize('ejemplo', 'root', 'admin123', {
    host: 'localhost', // El servidor MySQL está en la máquina local
    dialect: 'mysql' // Especificamos que usaremos MySQL como base de datos
});
// Exportamos la instancia de conexión para usarla en otros archivos
exports.default = sequelize;
