// Importamos express y el tipo Application desde el módulo 'express'
import express, { Application } from 'express';

// Definimos una clase llamada server
class server {
    // Declaramos una propiedad privada app de tipo Application
    private app: Application;
    // Declaramos una propiedad privada port de tipo string
    private port: string;

    // Constructor de la clase
    constructor() {
        // Asignamos el puerto desde las variables de entorno o usamos '3001' por defecto
        this.port = process.env.PORT || '3001';
        // Inicializamos la aplicación express
        this.app = express();
        
        // Variable de ejemplo (puede eliminarse)
        const nombre: string = "Kevin";
        // Mensaje de prueba en consola (puede eliminarse)
        console.log(`Hola ${nombre} como estas?`);
        
        // Llamamos al método listen para iniciar el servidor
        this.listen();
    }

    // Método para iniciar el servidor
    listen() {
        // Iniciamos el servidor en el puerto especificado
        this.app.listen(this.port, () => {
            // Mostramos un mensaje en consola cuando el servidor está corriendo
            console.log(`Server running on port ${this.port}`);
        });  
    }
}

// Exportamos la clase server para poder usarla en otros archivos
export default server;