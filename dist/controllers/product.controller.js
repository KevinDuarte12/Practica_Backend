"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProduct = void 0;
const getProduct = (req, res) => {
    res.json({
        message: 'GET - Product, hola mundo'
    });
};
exports.getProduct = getProduct;
