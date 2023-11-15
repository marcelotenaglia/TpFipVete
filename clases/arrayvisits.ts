import { Client } from "./clientClass";
import { Veterinary } from "./veterinary";
import { Pet } from "./petClass";
import {FileManagerVisitas} from "../fileManagers/fsVisitas"
import * as rs from "readline-sync";
import { FileManagerClientes } from "../fileManagers/fsClientes";
import { ArrayClientes } from "./arrayClient";
import { arraysvet } from "./arraySucursales";
import { FileManagerVeterinaries } from "../fileManagers/fsVeterinarias";
import { Visits } from "./visitClass";

enum Especies {
    dog = "Perro",
    cat = "Gato",
    exotic = "Exotico"
  }

export class arrayVisit
{
    private visitas :Visits[];
    private arrayclientes :ArrayClientes;
    private arraysucursales:arraysvet;

    
    public constructor()
    {
        this.visitas = [];
        this.arrayclientes = new ArrayClientes();
        this.arraysucursales = new arraysvet();
        this.arrayclientes.cargarClientes(FileManagerClientes.cargarDatosClientes());
        this.arraysucursales.cargarSucursales(FileManagerVeterinaries.cargarDatosVeterinary());
    }


    public agregarVisita(cliente:Client,pet :Pet , sucursal:Veterinary)
    {
        this.arrayclientes.cargarClientes(FileManagerClientes.cargarDatosClientes());
        this.arraysucursales.cargarSucursales(FileManagerVeterinaries.cargarDatosVeterinary());

        if(this.arrayclientes.findClient(cliente.getDni()) !== undefined)
        {
            const visita = new Visits(cliente,pet,sucursal);
            this.visitas.push(visita);
            FileManagerVisitas.guardarDatosVisitas(this.visitas);
        }
        else
        {
            console.log("El cliente no existe");
            
        }

    }
    public listarVisita():void
    {
        this.visitas.forEach(visi =>{
            console.log(`
                 ---- Visita ----
                ${visi.getClientName()}
                ${visi.getPetName()}
                ${visi.getMotive()}
                ${visi.getDate()}
                ${visi.getSucursal()} 

                --------------------
            `);
        })
    }
    public listarVisitaSucusal(cod:number):void
    {
        this.visitas.forEach(visi =>{
            let sucursal = visi.getSucursal()
            if(cod === sucursal.getCod())
            {
                console.log(`
                ---- Visita ----
               ${visi.getClientName()}
               ${visi.getPetName()}
               ${visi.getMotive()}
               ${visi.getDate()}
               ${visi.getSucursal()} 

               --------------------
           `);
            }
     
        })
    }
    public cargarVisitas(visist:Visits[]):void
    {
        this.visitas = visist;
    }

    public eliminarVisita(id:number):void
    {
        this.visitas.forEach((vis,indice) => {
            if(vis.getId() === id)
            {
                this.visitas.splice(indice,1);
                FileManagerVisitas.guardarDatosVisitas(this.visitas);
            }
        })
    }
    public pedirDatosCliente():void
    {
        this.arrayclientes.cargarClientes(FileManagerClientes.cargarDatosClientes());
        const clientdni = rs.questionInt("Ingrese el dni del cliente: ");
        const cliente = this.arrayclientes.findClient(clientdni);
        console.log(cliente);
        
        if(cliente !== undefined){
            const petname = rs.question("Ingrese el nombre de la mascota: ");
            const petspecie = rs.question(`Selecione una especie (${Object.values(Especies)}):  `);
            let pet1;
            switch (petspecie.toLowerCase()) {
                case Especies.dog.toLowerCase():
                    pet1 = new Pet(petname,Especies.dog);
                  break;
                case Especies.cat.toLowerCase():
                    pet1 = new Pet(petname,Especies.cat);
                  break;
                case Especies.exotic.toLowerCase():
                    pet1 = new Pet(petname,Especies.exotic);
                  break;
                default:
                  console.log('Opción no válida');
                  break;
              }
              const cod = rs.questionInt("Ingrese codigo de la sucursal: ");
              const sucur = this.arraysucursales.buscarVetPorcod(cod);
              if(sucur !== undefined && pet1 !== undefined)
              {
                this.agregarVisita(cliente,pet1,sucur);

              }
              else
              {
                console.log("la sucursal no existe");
                
              }
              
        }
        else
        {
            console.log("El cliente no esta cargado");
            
        }

    }

    public menuvisitas ():void {
        ​
        this.cargarVisitas(FileManagerVisitas.cargarDatosVisitas());
        while(true)
        {
            console.clear()
          const choice = rs.keyInSelect (this.menuOptionsA);
        ​
          switch (choice) {
        ​
            case 0 :
                this.listarVisita();
                
                rs.keyInPause("");
              break;
        ​
            case 1 : 
                const cod = rs.questionInt("Ingrese codigo de la sucursal");
                console.clear();
                this.listarVisitaSucusal(cod);
            rs.keyInPause("");
              break;
              
            case 2 : 
            this.pedirDatosCliente();
            rs.keyInPause("");
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
        menuOptionsA = ["Listar Visitas", "Listar visitas por sucursal", "Agregar"]
}
