import * as fs from 'fs';
import { Visits } from '../clases/visitClass';


export class FileManagerVisitas {

    static guardarDatosVisitas (Visitas : Visits[]) : void {
        
        const VisitasJSON = JSON.stringify(Visitas, null, 2);

        fs.writeFileSync('../datos/Visitas.json', VisitasJSON, {encoding : "utf8",});

    }


static cargarDatosVisitas() : Visits[] {

    try {
        
        const VisitasJSON = fs.readFileSync('../datos/Visitas.json', 'utf8');

        return JSON.parse(VisitasJSON, Visits.revive);

    } catch (error) {

        console.error ("Error al cargar los datos: ", error);
        
        return [];
    }

}

}