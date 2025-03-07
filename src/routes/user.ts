// Importamos Router desde express para crear rutas
import {Router} from 'express';

// Importamos los controladores newUser y login
import newUser, { login } from '../controllers/user.controller';

// Creamos una nueva instancia del router
const router = Router();

// Definimos una ruta POST en la raíz ('/') para crear nuevos usuarios
router.post('/',newUser);

// Definimos una ruta POST '/login' para manejar la autenticación
router.post('/login',login);

// Exportamos el router para usarlo en otros archivos
export default router;