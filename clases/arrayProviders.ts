import * as rs from "readline-sync";
import { Readline } from "readline/promises";
import { Veterinary } from "./veterinary";
import { FileManagerProveedores } from "../fileManagers/fsProveedores";
import { Provider } from "./providerClass";

export class ArrayProv {

private proveedores : Provider[];

 public constructor () {

        this.proveedores = [];

        }

public findProvider (cuit : string) : Provider | undefined {

        const provider = this.proveedores.find((prov) => prov.getCuit() === cuit)

        return provider;

    }    

    public listProvider () : void {
      
        this.proveedores.forEach (prov => {

            console.log (`
            
            Nombre del Proveedor : ${prov.getName()}
            Telefono del Proveedor : ${prov.getPhone()}
            CUIT del Proovedor : ${prov.getCuit()}

            `)
        })
    }



 public addProvider (name : string, phone : string, cuit : string) : void {

        if (this.findProvider (cuit) === undefined) {

            const proveedor = new Provider (name, phone, cuit);
            this.proveedores.push(proveedor);

            FileManagerProveedores.guardarDatosProveedores(this.proveedores);

        }

        else {

            console.log (`El cuit ${cuit} ya está vinculado a un proveedor`);

        }

    } 

    

 public deleteProvider (cuit : string) {

        this.proveedores.forEach ((prov, ind) => {

            if (prov.getCuit() === cuit) 

            {

        this.proveedores.splice(ind, 1);

        FileManagerProveedores.guardarDatosProveedores(this.proveedores);
            }

        })
    
}

 public cargarProvider (prov : Provider[]) {

    this.proveedores = prov;

 }

 public pedirDatos () : void {

    const name = rs.question ("Ingrese el nombre del Proveedor: ");

    const phone = rs.question ("Ingrese el telefono del Proveedor: ");

    const cuit = rs.question ("Ingrese el CUIT del Proveedor: ");

    this.addProvider(name, phone, cuit);

 }

 public menuProveedores () : void {

    this.cargarProvider(FileManagerProveedores.cargarDatosProveedores());
    
    while (true) {

        console.clear()

          const choice = rs.keyInSelect (this.menuOptionsA);
        ​
          switch (choice) {
        ​
            case 0 :
                this.listProvider();
                rs.keyInPause("");
              break;
        ​
            case 1 : 
            this.pedirDatos();
            rs.keyInPause("");
              break;
              
        ​
            case 2 : 
                const cuit = rs.question("Ingrese el CUIT de la sucursal a borrar : ");
                const provDel = this.findProvider(cuit);
                if(provDel !== undefined)
                {
                    console.log(`Esta seguro que desea eliminar el Proveedor con el nombre ${provDel.getName()}`);
                        const choice2 = rs.keyInSelect(this.confirmacionOptions);
                        switch (choice2)
                        {
                            case 0:
                                this.deleteProvider(cuit);
                                break;
                            default:
                                console.log("operación cancelada");
                                break;
                        }
                }
                else
                {
                    console.log(`El Proveedor con el cuit ${cuit} no existe`);
                }
              break;
        ​
            default : 
            rs.keyInPause("Menu anteior");
            return;
    }
 }

}

 confirmacionOptions = ["Eliminar"];
 menuOptionsA = ["Listar", "Agregar", "Eliminar"]

}
