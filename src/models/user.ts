// Importamos la instancia de sequelize que contiene la conexión a la base de datos
import sequelize from "../db/conection";

// Importamos DataTypes de sequelize para definir los tipos de datos de las columnas
import { DataTypes } from "sequelize";

// Definimos el modelo Product con sus campos y tipos de datos
const User = sequelize.define('user', {
    id: {
        type: DataTypes.INTEGER, // Tipo de dato INTEGER
        autoIncrement: true,    // Autoincremental
        primaryKey: true        // Clave primaria
    },
    username: {
        type: DataTypes.STRING, // Tipo de dato STRING
        allowNull: false,        // No puede ser nulo
        unique: true            // Debe ser único
    },
    password: {
        type: DataTypes.STRING, // Tipo de dato STRING
        allowNull: false,        // No puede ser nulo
        unique: true           // debe ser unico
    }
});
export default User;