import * as rs from "readline-sync";
import { Client } from "./clientClass";
import { Pet } from "./petClass";

export class Visits {
    private static idCounter: number = 30;
    private id: number ;
    private client: Client;
    private pet: Pet;
    private visitsdate: Date;
    private motive: string;

    public constructor(client: Client, pet:Pet){
        this.client = client;
        this.pet = pet;
        this.visitsdate = new Date();
        this.id = Visits.idCounter++;
        this.motive = this.visitMotive();
  
        
    }

    private visitMotive(): string{
    console.log("Bienvenido");
    const visitMotive = rs.question("ingrese el motivo de la consulta:")
    this.motive = visitMotive;
    rs.keyInPause();
    return visitMotive; 
   
    }

    getMotive(): string {
        return this.motive;
    }

    getDate(): Date {
        return this.visitsdate;
    }

    getClientName():string {
       return this.client.getName()}

    
    getPetName():string {
     return this.pet.getName()}   
   
    
   static revive (key : string, value : any) : Visits | any {

        if (typeof value === 'object' && value !== null && 'client' in value) {
    
          const visita = new Visits (value.client, value.pet);
    
          Object.assign (visita, value) 
    
          return visita;
          
        }
    
        return value;
    
      }
 
  }
