import { Request, Response } from 'express';
export const getProduct = (req: Request, res: Response) => {
    res.json({
        message: 'GET - Product, hola mundo'
    });
}