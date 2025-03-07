// Importamos la clase Sequelize del paquete 'sequelize'
import { Sequelize } from "sequelize";

// Creamos una nueva instancia de Sequelize con los parámetros de conexión:
// - 'ejemplo': nombre de la base de datos
// - 'root': usuario de MySQL
// - 'admin123': contraseña
// - Opciones adicionales de configuración
const sequelize = new Sequelize('ejemplo','root','admin123',{
    host: 'localhost',    // El servidor MySQL está en la máquina local
    dialect: 'mysql'      // Especificamos que usaremos MySQL como base de datos
});

// Exportamos la instancia de conexión para usarla en otros archivos
export default sequelize;