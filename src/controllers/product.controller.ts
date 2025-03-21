import { Request, Response } from 'express'; // Importa los tipos Request y Response de Express
import Product from '../db/models/product'; // Importa el modelo de Producto

// GET - Obtener todos los productos
export const getProduct = async (req: Request, res: Response): Promise<void> => {
    try {
        // Busca todos los productos en la base de datos usando el modelo Product
        const listaProductos = await Product.findAll();
        // Envía la lista de productos como respuesta en formato JSON
        res.json(listaProductos);
    } catch (error) {
        // Si ocurre un error, envía una respuesta con código 500 y un mensaje de error
        res.status(500).json({ msg: 'Error al obtener productos', error });
    }
};

// GET - Obtener un producto por ID
export const getProductById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params; // Extrae el ID del producto de los parámetros de la URL
    try {
        // Busca un producto por su clave primaria (ID) usando el modelo Product
        const product = await Product.findByPk(id);
        if (!product) {
            // Si no se encuentra el producto, envía una respuesta con código 404 y un mensaje
            res.status(404).json({ msg: `No existe producto con id ${id}` });
            return;
        }
        // Si se encuentra el producto, lo envía como respuesta en formato JSON
        res.json(product);
    } catch (error) {
        // Si ocurre un error, envía una respuesta con código 500 y un mensaje de error
        res.status(500).json({ msg: 'Error al obtener el producto', error });
    }
};

// POST - Crear nuevo producto
export const createProduct = async (req: Request, res: Response): Promise<void> => {
    const { body } = req; // Extrae los datos del cuerpo de la solicitud
    try {
        // Crea un nuevo producto en la base de datos usando el modelo Product y los datos del cuerpo
        const product = await Product.create(body);
        // Envía una respuesta con código 201 (creado) y un mensaje de éxito junto con el producto creado
        res.status(201).json({ msg: 'Producto creado exitosamente', product });
    } catch (error) {
        // Si ocurre un error, envía una respuesta con código 500 y un mensaje de error
        res.status(500).json({ msg: 'Error al crear producto', error });
    }
};

// PUT - Actualizar producto
export const updateProduct = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params; // Extrae el ID del producto de los parámetros de la URL
    const { body } = req; // Extrae los datos del cuerpo de la solicitud
    try {
        // Busca un producto por su clave primaria (ID) usando el modelo Product
        const product = await Product.findByPk(id);
        if (!product) {
            // Si no se encuentra el producto, envía una respuesta con código 404 y un mensaje
            res.status(404).json({ msg: `No existe producto con id ${id}` });
            return;
        }
        // Si se encuentra el producto, lo actualiza con los datos del cuerpo
        await product.update(body);
        // Envía una respuesta con un mensaje de éxito y el producto actualizado
        res.json({ msg: 'Producto actualizado exitosamente', product });
    } catch (error) {
        // Si ocurre un error, envía una respuesta con código 500 y un mensaje de error
        res.status(500).json({ msg: 'Error al actualizar producto', error });
    }
};

// DELETE - Eliminar producto
export const deleteProduct = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params; // Extrae el ID del producto de los parámetros de la URL
    try {
        // Busca un producto por su clave primaria (ID) usando el modelo Product
        const product = await Product.findByPk(id);
        if (!product) {
            // Si no se encuentra el producto, envía una respuesta con código 404 y un mensaje
            res.status(404).json({ msg: `No existe producto con id ${id}` });
            return;
        }
        // Si se encuentra el producto, lo elimina de la base de datos
        await product.destroy();
        // Envía una respuesta con un mensaje de éxito
        res.json({ msg: 'Producto eliminado exitosamente' });
    } catch (error) {
        // Si ocurre un error, envía una respuesta con código 500 y un mensaje de error
        res.status(500).json({ msg: 'Error al eliminar producto', error });
    }
};