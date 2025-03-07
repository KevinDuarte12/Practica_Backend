// Importamos los tipos Response y Request desde express para tipar nuestras funciones
import e, { Response, Request } from "express";

// Función para crear un nuevo usuario
// Recibe como parámetros la request y response de express
export const newUser = (req: Request, res: Response) => {
   // Desestructuramos el body de la request para obtener los datos enviados
   const { body } = req;
   
    // Enviamos una respuesta en formato JSON
    res.json({
        message: "new User", // Mensaje informativo
        body // Datos recibidos en el body
    });
};

// Función para manejar el login de usuarios
export const login = (req: Request, res: Response) => {
    // Desestructuramos el body de la request para obtener las credenciales
    const { body } = req;
    
    // Enviamos una respuesta en formato JSON
    res.json({
        message: "Login User", // Mensaje informativo
        body // Credenciales recibidas
    });
};

// Exportamos la función newUser como exportación por defecto
export default newUser;
