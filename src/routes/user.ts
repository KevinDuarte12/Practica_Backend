// Importamos Router y RequestHandler desde express
import { Router, RequestHandler } from 'express';

// Importamos los controladores newUser y login
import { newUser, login } from '../controllers/user.controller';

// Creamos una nueva instancia del router
const router = Router();

// Definimos una ruta POST en la raíz ('/') para crear nuevos usuarios
// Usando type assertion para indicar que newUser es un RequestHandler
router.post('/', newUser as RequestHandler);

// Definimos una ruta POST '/login' para manejar la autenticación
// Usando type assertion para indicar que login es un RequestHandler
router.post('/login', login as RequestHandler);

// Exportamos el router para usarlo en otros archivos
export default router;