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
        const { username, password } = req.body;

        const user = await User.findOne({ where: { username: username } });

        if (user) {
            return res.status(400).json({
                msg: `El usuario ${username} ya existe` // Usa "msg" en lugar de "message"
            });
        }

        const passwordHash = await bcrypt.hash(password, 10);

        await User.create({
            username: username,
            password: passwordHash
        });

        res.json({
            msg: `Usuario ${username} creado exitosamente` // Usa "msg" para el mensaje de éxito
        });

    } catch (error) {
        res.status(400).json({
            msg: "Error al crear el usuario", // Usa "msg" para el mensaje de error
            error
        });
    }
};

// Controlador para el login de usuarios
export const login = async (req: Request, res: Response) => {
    const { username, password } = req.body;

    const user: any = await User.findOne({ where: { username: username } });

    if (!user) {
        return res.status(400).json({
            msg: `Usuario ${username} no encontrado` // Usa "msg" en lugar de "message"
        });
    }

    const passwordValid = await bcrypt.compare(password, user.password);
    if (!passwordValid) {
        return res.status(400).json({
            msg: "Contraseña incorrecta" // Usa "msg" en lugar de "message"
        });
    }

    const token = jwt.sign({ 
        username: username
    }, process.env.SECRET_KEY || 'hola123');

    res.json({ token }); // Envía el token en un objeto JSON
};