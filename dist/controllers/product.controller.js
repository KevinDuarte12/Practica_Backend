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
exports.getProduct = void 0;
// Importamos el modelo Product que interactúa con la base de datos
const product_1 = __importDefault(require("../models/product"));
// Definimos una función asíncrona que obtiene todos los productos
// req: contiene la información de la petición HTTP
// res: se usa para enviar la respuesta al cliente
const getProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Usamos el método findAll() de Sequelize para obtener todos los productos de la base de datos
    const listaProductos = yield product_1.default.findAll();
    // Enviamos la lista de productos como respuesta en formato JSON
    res.json(listaProductos);
});
exports.getProduct = getProduct;
