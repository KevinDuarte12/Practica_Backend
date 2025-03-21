"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.updateProduct = exports.createProduct = exports.getProductById = exports.getProduct = void 0;
const product_1 = __importDefault(require("../db/models/product")); // Importa el modelo de Producto
// GET - Obtener todos los productos
const getProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Busca todos los productos en la base de datos usando el modelo Product
        const listaProductos = yield product_1.default.findAll();
        // Envía la lista de productos como respuesta en formato JSON
        res.json(listaProductos);
    }
    catch (error) {
        // Si ocurre un error, envía una respuesta con código 500 y un mensaje de error
        res.status(500).json({ msg: 'Error al obtener productos', error });
    }
});
exports.getProduct = getProduct;
// GET - Obtener un producto por ID
const getProductById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params; // Extrae el ID del producto de los parámetros de la URL
    try {
        // Busca un producto por su clave primaria (ID) usando el modelo Product
        const product = yield product_1.default.findByPk(id);
        if (!product) {
            // Si no se encuentra el producto, envía una respuesta con código 404 y un mensaje
            res.status(404).json({ msg: `No existe producto con id ${id}` });
            return;
        }
        // Si se encuentra el producto, lo envía como respuesta en formato JSON
        res.json(product);
    }
    catch (error) {
        // Si ocurre un error, envía una respuesta con código 500 y un mensaje de error
        res.status(500).json({ msg: 'Error al obtener el producto', error });
    }
});
exports.getProductById = getProductById;
// POST - Crear nuevo producto
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req; // Extrae los datos del cuerpo de la solicitud
    try {
        // Crea un nuevo producto en la base de datos usando el modelo Product y los datos del cuerpo
        const product = yield product_1.default.create(body);
        // Envía una respuesta con código 201 (creado) y un mensaje de éxito junto con el producto creado
        res.status(201).json({ msg: 'Producto creado exitosamente', product });
    }
    catch (error) {
        // Si ocurre un error, envía una respuesta con código 500 y un mensaje de error
        res.status(500).json({ msg: 'Error al crear producto', error });
    }
});
exports.createProduct = createProduct;
// PUT - Actualizar producto
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params; // Extrae el ID del producto de los parámetros de la URL
    const { body } = req; // Extrae los datos del cuerpo de la solicitud
    try {
        // Busca un producto por su clave primaria (ID) usando el modelo Product
        const product = yield product_1.default.findByPk(id);
        if (!product) {
            // Si no se encuentra el producto, envía una respuesta con código 404 y un mensaje
            res.status(404).json({ msg: `No existe producto con id ${id}` });
            return;
        }
        // Si se encuentra el producto, lo actualiza con los datos del cuerpo
        yield product.update(body);
        // Envía una respuesta con un mensaje de éxito y el producto actualizado
        res.json({ msg: 'Producto actualizado exitosamente', product });
    }
    catch (error) {
        // Si ocurre un error, envía una respuesta con código 500 y un mensaje de error
        res.status(500).json({ msg: 'Error al actualizar producto', error });
    }
});
exports.updateProduct = updateProduct;
// DELETE - Eliminar producto
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params; // Extrae el ID del producto de los parámetros de la URL
    try {
        // Busca un producto por su clave primaria (ID) usando el modelo Product
        const product = yield product_1.default.findByPk(id);
        if (!product) {
            // Si no se encuentra el producto, envía una respuesta con código 404 y un mensaje
            res.status(404).json({ msg: `No existe producto con id ${id}` });
            return;
        }
        // Si se encuentra el producto, lo elimina de la base de datos
        yield product.destroy();
        // Envía una respuesta con un mensaje de éxito
        res.json({ msg: 'Producto eliminado exitosamente' });
    }
    catch (error) {
        // Si ocurre un error, envía una respuesta con código 500 y un mensaje de error
        res.status(500).json({ msg: 'Error al eliminar producto', error });
    }
});
exports.deleteProduct = deleteProduct;
