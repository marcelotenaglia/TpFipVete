import * as fs from "fs";
import { Client } from "../clases/clientClass";


export class FileManagerClientes {

    static guardarDatosClientes (Clientes : Client[]) : void {
        
        const ClientesJSON = JSON.stringify(Clientes, null, 2);

        fs.writeFileSync('../datos/Clientes.json', ClientesJSON, {encoding : "utf8",});

    }


    static cargarDatosClientes() : Client[] {

    try {
        
        const ClientesJSON = fs.readFileSync('../datos/Clientes.json', 'utf8');

        return JSON.parse(ClientesJSON, Client.revive);

    } catch (error) {

        console.error ("Error al cargar los datos: ", error);
        
        return [];
    }

}

}