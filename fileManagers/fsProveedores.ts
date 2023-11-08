import * as fs from "fs";
import { Provider } from "../clases/providerClass";
export class FileManagerProveedores {

    static guardarDatosProveedores (Proveedores : Provider[]) : void {
        
        const ProveedoresJSON = JSON.stringify(Proveedores, null, 2);

        fs.writeFileSync('../datos/Proveedores.json', ProveedoresJSON, {encoding : "utf8",});

    }


static cargarDatosProveedores() : Provider[] {

    try {
        
        const ProveedoresJSON = fs.readFileSync('../datos/Proveedores.json', 'utf8');

        return JSON.parse(ProveedoresJSON, Provider.revive);

    } catch (error) {

        console.error ("Error al cargar los datos: ", error);
        
        return [];
    }

}

}