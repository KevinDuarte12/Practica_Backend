// Importamos la clase Sequelize del paquete 'sequelize'
// Creamos una nueva instancia de Sequelize con los parámetros de conexión:
// - 'ejemplo': nombre de la base de datos
// - 'root': usuario de MySQL
// - 'admin123': contraseña
// - Opciones adicionales de configuración
require('dotenv').config();
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME, // Nombre de la base de datos
  process.env.DB_USER, // Usuario
  process.env.DB_PASSWORD, // Contraseña
  {
    host: process.env.DB_HOST, // Host
    port: process.env.DB_PORT, // Puerto
    dialect: 'mysql', // Dialecto (MySQL, PostgreSQL, etc.)
  }
);
// Exportamos la instancia de conexión para usarla en otros archivos
export default sequelize;