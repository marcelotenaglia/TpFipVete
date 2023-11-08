import * as rs from "readline-sync";
import { Visits } from "./visitClass"; 
import { Client } from "./clientClass";
import { Pet } from "./petClass";
import { Provider } from "./providerClass";
import { Arreglos } from "./arrays";
import { randomUUID as uid } from "node:crypto";

/*Ejercicio
Hagamos un ejemplo práctico:
Nuestro cliente es una red de veterinarias y desea poder acceder a la siguiente información:
● Sucursales de Veterinarias
● Clientes
● Pacientes (mascotas)
● Proveedores CFS
● 
Veterinarias: nombre, dirección, id (un número generado aleatoriamente al momento del alta) La red debe tener la posibilidad de dar de alta, modificar datos o dar de baja las mismas.
● Clientes: nombre, teléfono, si es VIP (cliente recurrente, en el cual se guarda el número de visitas e incrementarlo cada vez que se realiza una y para ser VIP tiene que tener 5 o mas) y un id (generado igual que los anteriores), las veterinarias deben contar con la opción de alta, baja y modificación de los mismos. CFS
● Pacientes (mascotas): nombre, especie (si no es perro o gato, deberá registrarse como exótica), id del dueño, las veterinarias deben contar con la opción de alta, baja y modificación de los mismos.
● Proveedores: nombre, teléfono y un id generado como los otros la red debe contar con la opción de alta, baja y modificación de los mismos.
IMPORTANTE: los id deben ser únicos, por lo tanto al generarse, antes de guardarlos se debe validar que no exista. Si ya existe se debe volver a generar.*/




export class Veterinary {

    private id: string = uid();
    private cod: number ;
    private name: string;
    private address: string;

    
    constructor(cod:number,name: string, address: string) {
      this.name = name;
      this.address = address;
      this.cod = cod;
      
    }
    public getCod():number
    {
      return this.cod;
    }
  
    getId(): string {
      return this.id;
    }
  
    getName(): string {
      return this.name;
    }
  
    getAddress(): string {
      return this.address;
    }

    setName(name: string): void {
        this.name = name;
    }

    setAddress(address: string): void {
        this.address = address;
    }

 

   

    static revive (key : string, value : any) : Veterinary | any {

      if (typeof value === 'object' && value !== null && 'name' in value) {

        const veterinaria = new Veterinary (value.cod,value.name, value.addres);

        Object.assign (veterinaria, value) 

        return veterinaria;
        
      }

      return value;

    }

    
}   