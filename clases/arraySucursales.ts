import { Readline } from "readline/promises";
import * as rs from "readline-sync";
import { Veterinary } from "./veterinary";
import { FileManagerVeterinaries } from "../fileManagers/fsVeterinarias"; 


export class arraysvet
{
    private sucursales: Veterinary[];

    public constructor()
    {
        this.sucursales = [];
    }
    public buscarVetPorcod(cod: number):Veterinary | undefined{
        const suc =this.sucursales.find((vet) => vet.getCod() === cod)
        return suc;

}

    public agregarSucursal(cod:number,name: string, address: string):void
    {
        if(this.buscarVetPorcod(cod) === undefined)
        {
            const sucursal = new Veterinary(cod,name,address);
            this.sucursales.push(sucursal);
            FileManagerVeterinaries.guardarDatosVeterinary(this.sucursales);
        }
        else{
            console.log(`a sucursal con el ${cod} ya existe`);
        }

    }

    public eliminarSucursal(cod: number)
    {
        this.sucursales.forEach((vet, indice) =>{
            if(vet.getCod() === cod)
            {
                this.sucursales.splice(indice,1);
                FileManagerVeterinaries.guardarDatosVeterinary(this.sucursales);
            }
        })
    }

    public listarSucursales():void
    {
        this.sucursales.forEach(vet =>{
            console.log(`
            Nombre de la sucursal : ${vet.getName()}
            Direccion : ${vet.getAddress()}
            Codigo : ${vet.getCod()}
            `);
        })
    }

    public cargarSucursales(suc :Veterinary[])
    {
        this.sucursales = suc;
    }
    public pedirDatos():void{
        const cod = rs.questionInt("Inegrese codigo de la nueva sucursal: ");
        const name = rs.question("Ingrese nombre de la nueva sucursal: ");
        const dir = rs.question("Ingrese direccion de la nueva sucursal: ");
        this.agregarSucursal(cod,name,dir);
    }

    public menuSucursales ():void {
        ​
        this.cargarSucursales(FileManagerVeterinaries.cargarDatosVeterinary());
        while(true)
        {
            console.clear()
          const choice = rs.keyInSelect (this.menuOptionsA);
        ​
          switch (choice) {
        ​
            case 0 :
                this.listarSucursales();
                rs.keyInPause("");
              break;
        ​
            case 1 : 
            this.pedirDatos();
            rs.keyInPause("");
              break;
               
        ​
            case 2 : 
                const cod = rs.questionInt("Ingrese el codigo de la sucursal a borrar : ");
                const sucdel = this.buscarVetPorcod(cod);
                if(sucdel !== undefined)
                {
                    console.log(`Esta seguro que desea eliminar la sucursal con el nombre ${sucdel.getName()}`);
                        const choice2 = rs.keyInSelect(this.confirmacionOptions);
                        switch (choice2)
                        {
                            case 0:
                                this.eliminarSucursal(cod);
                                break;
                            default:
                                console.log("operacion cancelada");
                                break;
                        }
                }
                else
                {
                    console.log(`La sucursal con el codigo ${cod} no existe`);
                }
              break;
        ​
            default : 
            rs.keyInPause("Menu anteior");
            return;
          }
        ​
        }
    }
        confirmacionOptions = ["Eliminar"];
        menuOptionsA = ["Listar", "Agregar", "Eliminar"]
}