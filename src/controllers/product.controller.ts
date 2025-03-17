// Importamos los tipos Request y Response desde express para tipar los parámetros
import { Request, Response } from 'express';

// Importamos el modelo Product que interactúa con la base de datos
import Product from '../models/product';

// Definimos una función asíncrona que obtiene todos los productos
// req: contiene la información de la petición HTTP
// res: se usa para enviar la respuesta al cliente
export const getProduct = async (req: Request, res: Response) => {
    // Usamos el método findAll() de Sequelize para obtener todos los productos de la base de datos
    const listaProductos = await Product.findAll();
    
    // Enviamos la lista de productos como respuesta en formato JSON
    res.json(listaProductos);
}