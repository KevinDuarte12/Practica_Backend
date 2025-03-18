// Importamos los tipos necesarios de express para el tipado TypeScript
import { Response, Request } from "express";

// Importamos bcrypt para el manejo seguro de contraseñas (hash y comparación)
import bcrypt from "bcrypt";

// Importamos nuestro modelo de Usuario para interactuar con la base de datos
import User from "../models/user";

// Importamos jwt para generar tokens de autenticación
import jwt from "jsonwebtoken";

// Controlador para crear nuevos usuarios
export const newUser = async (req: Request, res: Response) => {
    try {
        // Extraemos el nombre de usuario y la contraseña del cuerpo de la solicitud
        const { username, password } = req.body;

        // Buscamos si el usuario ya existe en la base de datos
        const user = await User.findOne({ where: { username: username } });

        // Si el usuario ya existe, devolvemos un error
        if (user) {
            return res.status(400).json({
                msg: `El usuario ${username} ya existe` // Usa "msg" en lugar de "message"
            });
        }

        // Si el usuario no existe, hasheamos la contraseña
        const passwordHash = await bcrypt.hash(password, 10);

        // Creamos un nuevo usuario en la base de datos
        await User.create({
            username: username,
            password: passwordHash
        });

        // Devolvemos una respuesta exitosa
        res.json({
            msg: `Usuario ${username} creado exitosamente` // Usa "msg" para el mensaje de éxito
        });

    } catch (error) {
        // Si ocurre un error, lo manejamos y devolvemos un mensaje de error
        res.status(400).json({
            msg: "Error al crear el usuario", // Usa "msg" para el mensaje de error
            error
        });
    }
};

// Controlador para el login de usuarios
export const login = async (req: Request, res: Response) => {
    // Extraemos el nombre de usuario y la contraseña del cuerpo de la solicitud
    const { username, password } = req.body;

    // Buscamos el usuario en la base de datos
    const user: any = await User.findOne({ where: { username: username } });

    // Si el usuario no existe, devolvemos un error
    if (!user) {
        return res.status(400).json({
            msg: `Usuario ${username} no encontrado` // Usa "msg" en lugar de "message"
        });
    }

    // Comparamos la contraseña proporcionada con la contraseña hasheada en la base de datos
    const passwordValid = await bcrypt.compare(password, user.password);
    if (!passwordValid) {
        return res.status(400).json({
            msg: "Contraseña incorrecta" // Usa "msg" en lugar de "message"
        });
    }

    // Si las credenciales son válidas, generamos un token JWT
    const token = jwt.sign({ 
        username: username
    }, process.env.SECRET_KEY || 'hola123'); // Usa una clave secreta del entorno o un valor por defecto

    // Devolvemos el token en la respuesta
    res.json({ token }); // Envía el token en un objeto JSON
};