// Importamos la instancia de sequelize que contiene la conexión a la base de datos
import sequelize from "../db/conection";

// Importamos DataTypes de sequelize para definir los tipos de datos de las columnas
import { DataTypes } from "sequelize";

// Definimos el modelo Product con sus campos y tipos de datos
const Product = sequelize.define('product', {
    id: {
        type: DataTypes.INTEGER, // Tipo de dato INTEGER
        autoIncrement: true,    // Autoincremental
        primaryKey: true        // Clave primaria
    },
    name: {
        type: DataTypes.STRING, // Tipo de dato STRING
        allowNull: false        // No puede ser nulo
    },
    description: {
        type: DataTypes.STRING, // Tipo de dato STRING
        allowNull: false        // No puede ser nulo
    },
    price: {
        type: DataTypes.FLOAT,  // Tipo de dato FLOAT
        allowNull: false        // No puede ser nulo
    },
    stock: {
        type: DataTypes.INTEGER, // Tipo de dato INTEGER
        allowNull: false         // No puede ser nulo
    }
});
export default Product;