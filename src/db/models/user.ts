// Importamos la instancia de sequelize que contiene la conexión a la base de datos
import sequelize from "../conection";

// Importamos DataTypes de sequelize para definir los tipos de datos de las columnas
import { DataTypes, Model } from "sequelize";

interface UserAttributes {
    id?: number;
    username: string;
    password: string;
    email: string;

}

// Definimos el modelo Product con sus campos y tipos de datos
const User = sequelize.define<Model<UserAttributes>>('users', {
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
    }, email: {
        type: DataTypes.STRING, // Tipo de dato STRING
        allowNull: false,        // No puede ser nulo
        unique: true,
        validate: {
            isEmail: true
        }           // Debe ser único
    }
});
export default User;