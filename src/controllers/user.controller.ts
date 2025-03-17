// Importamos los tipos necesarios de express para el tipado TypeScript
import { Response, Request } from "express";

// Importamos bcrypt para el manejo seguro de contraseñas (hash y comparación)
import bcrypt from "bcrypt";

// Importamos nuestro modelo de Usuario para interactuar con la base de datos
import User from "../models/user";

import jwt from "jsonwebtoken";

// Controlador para crear nuevos usuarios
export const newUser = async (req: Request, res: Response) => {
    try {
        // Extraemos username y password del cuerpo de la petición (JSON)
        const { username, password } = req.body;

        // Buscamos si ya existe un usuario con ese username en la base de datos
        const user = await User.findOne({ where: { username: username } });

        // Si encontramos un usuario existente, retornamos error
        if (user) {
            return res.status(400).json({
                message: `El usuario ${username} ya existe`
            });
        }

        // Generamos un hash de la contraseña con bcrypt
        // El número 10 es el "salt rounds" - mayor número = más seguro pero más lento
        const passwordHash = await bcrypt.hash(password, 10);

        // Creamos el nuevo usuario en la base de datos con el hash de la contraseña
        await User.create({
            username: username,
            password: passwordHash
        });

        // Si todo sale bien, enviamos mensaje de éxito
        res.json({
            message: `Usuario ${username} creado exitosamente`
        });

    } catch (error) {
        // Si algo falla, enviamos un error 400 con detalles
        res.status(400).json({
            message: "Error al crear el usuario",
            error
        });
    }
};

// Controlador para el login de usuarios
export const login = async (req: Request, res: Response) => {
    // Extraemos credenciales del cuerpo de la petición
    const { username, password } = req.body;

    // Buscamos el usuario en la base de datos
    const user: any = await User.findOne({ where: { username: username } });

    // Si no encontramos el usuario, retornamos error
    if (!user) {
        return res.status(400).json({
            message: `Usuario ${username} no encontrado`
        });
    }

    // Verificamos si la contraseña coincide con el hash almacenado
    const passwordValid = await bcrypt.compare(password, user.password);
    if (!passwordValid) {
        return res.status(400).json({
            message: "Contraseña incorrecta"
        });
    }
    const token = jwt.sign({ 
        username: username
    }, process.env.SECRET_KEY || 'hola123'
    );
    res.json(token);
    // TODO: Implementar respuesta de login exitoso y generación de token
};