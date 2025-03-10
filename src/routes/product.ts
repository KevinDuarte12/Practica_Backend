// Importamos Router desde express para crear rutas
import { Router} from 'express'

// Importamos el controlador getProduct para manejar la ruta
import { getProduct } from '../controllers/product.controller';

// Creamos una nueva instancia del router
const router = Router();

// Definimos una ruta GET en la raíz ('/') que usará el controlador getProduct
router.get('/',getProduct);

// Exportamos el router para usarlo en otros archivos
export default router;