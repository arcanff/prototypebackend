// Importa el módulo Router de Express
import { Router } from "express";
// Importa todas las funciones controladoras desde el archivo "../controllers/products.controller"
import * as controller from "../controllers/users.controller";

// Crea una instancia de Router
const router = Router();

// Ruta para crear un nuevo producto
router.post('/user', controller.createUser);

// Ruta para obtener un producto específico por su ID
router.get('/user/:id', controller.findOneUser);

// Ruta para realizar un ping de prueba en la base de datos
router.get('/user/ping', controller.pingUsers);

// Ruta para obtener todos los productos
router.get('/user', controller.findAllUsers);

// Ruta para actualizar un producto específico por su ID
router.put('/user/:id', controller.updateUser);

// Ruta para eliminar un producto específico por su ID
router.delete('/user/:id', controller.deleteUser);

// Exporta el enrutador como el valor predeterminado del módulo
export default router;
