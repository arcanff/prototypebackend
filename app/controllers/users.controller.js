// Importa la conexión a la base de datos 'pool' desde el archivo "../config/database/db.js"
import { pool } from "../config/database/db";
// Importa la función 'message' desde el archivo "../config/message.js"
import message from "../config/message";

// Controlador para crear un usuario
const createUser = async (req, res) => {
    try {
        // Obtiene los datos del cuerpo de la solicitud (req.body)
        const { name, email, pass} = req.body;

        // Realiza una consulta para insertar el usuario en la base de datos
        const result = await pool.query(
            `INSERT INTO users (name, email, pass) VALUES (?, ?, ?)`,
            [name, email, pass]
        );

        // Devuelve el resultado de la consulta en formato JSON
        res.json(result);
    } catch (error) {
        // Muestra un mensaje de error y devuelve el mensaje de error en la respuesta
        message(error.message, "danger");
        res.status(500).send(error.message);
        console.log(error);

    }
};

// Controlador para obtener todos los usuarios
const findAllUsers = async (req, res) => {
    try {
        // Realiza una consulta para obtener todos los usuarios de la base de datos
        const [rows] = await pool.query(`SELECT * FROM users`);

        // Devuelve los usuarios en formato JSON
        res.json(rows);
    } catch (error) {
        // Muestra un mensaje de error y devuelve el mensaje de error en la respuesta
        message(error.message, "danger");
        res.status(500).send(error.message);
        console.log(error);
    }
};

// Controlador para obtener un usuario específico por su ID
const findOneUser = async (req, res) => {
    try {
        // Obtiene el ID del usuario de los parámetros de la solicitud (req.params)
        const id = req.params.id;

        // Realiza una consulta para obtener el usuario con el ID especificado
        const [result] = await pool.query(
            `SELECT id, name, email FROM users WHERE id = ?`,
            [id]
        );

        // Devuelve el usuario encontrado en formato JSON
        res.json(result[0]);
    } catch (error) {
        // Muestra un mensaje de error y devuelve el mensaje de error en la respuesta
        message(error.message, "danger");
        res.status(500).send(error.message);
        console.log(error);
    }
};

// Controlador para realizar un ping de prueba en la base de datos
const pingUsers = async (req, res) => {
    try {
        // Realiza una consulta para obtener un resultado de prueba de la base de datos
        const [result] = await pool.query(`SELECT "Hello world" as RESULT`);

        // Devuelve el resultado en la respuesta
        res.send(result[0]);
    } catch (error) {
        // Muestra un mensaje de error y devuelve el mensaje de error en la respuesta
        message(error.message, "danger");
        res.status(500).send(error.message);
        console.log(error);
    }
};

// Controlador para actualizar un usuario específico por su ID
const updateUser = async (req, res) => {
    try {
        // Obtiene el ID del usuario de los parámetros de la solicitud (req.params)
        const id = req.params.id;
        // Obtiene los datos actualizados del cuerpo de la solicitud (req.body)
        const { name, email, pass } = req.body;

        // Realiza una consulta para actualizar el usuario con el ID especificado
        const result = await pool.query(
            `UPDATE users SET name = ?, email = ?, pass = ? WHERE id = ?`,
            [name, email, pass, id]
        );

        // Devuelve el resultado de la consulta en formato JSON
        res.json(result);
    } catch (error) {
        // Muestra un mensaje de error y devuelve el mensaje de error en la respuesta
        message(error.message, "danger");
        res.status(500).send(error.message);
        console.log(error);
    }
};

// Controlador para eliminar un usuario por su ID
const deleteUser = async (req, res) => {
    try {
        // Obtiene el ID del usuario de los parámetros de la solicitud (req.params)
        const id = req.params.id;

        // Realiza una consulta para eliminar el usuario con el ID 
        const result = await pool.query(
            `DELETE FROM users WHERE id = ?`,
            [id]
        );

        // Devuelve el resultado de la consulta en formato JSON
        res.json(result);
    } catch (error) {
        // Muestra un mensaje de error y devuelve el mensaje de error en la respuesta
        message(error.message, "danger");
        res.status(500).send(error.message);
        console.log(error);
    }
};

export {
    createUser, findAllUsers, findOneUser, pingUsers, updateUser, deleteUser
};