"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Importamos Router desde express para crear rutas
const express_1 = require("express");
// Importamos el controlador getProduct para manejar la ruta
const product_controller_1 = require("../controllers/product.controller");
// Creamos una nueva instancia del router
const router = (0, express_1.Router)();
// Definimos una ruta GET en la raíz ('/') que usará el controlador getProduct
router.get('/', product_controller_1.getProduct);
// Exportamos el router para usarlo en otros archivos
exports.default = router;
