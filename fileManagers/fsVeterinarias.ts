import * as fs from 'fs';

import { Veterinary } from '../clases/veterinary';

export class FileManagerVeterinaries {

    static guardarDatosVeterinary (Veterinary : Veterinary[]) : void {
        const VeterinaryJSON = JSON.stringify(Veterinary, null, 2);
        fs.writeFileSync('../datos/Veterinary.json', VeterinaryJSON, {encoding : "utf8",});
    }

static cargarDatosVeterinary() : Veterinary[] {
    
    try {
        const VeterinaryJSON  = fs.readFileSync('../datos/Veterinary.json', 'utf8');
        return JSON.parse(VeterinaryJSON , Veterinary.revive);
    } catch (error) {
        console.error ("Error al cargar los datos: ", error);
        return [];
    }
}
}