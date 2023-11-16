import * as rs from "readline-sync";
import { Client } from "./clientClass";
import { Pet } from "./petClass";
import {Veterinary} from "./veterinary"; 

export class Visits {
    private static idCounter: number = 30;
    private id: number ;
    private client: Client;
    private pet: Pet;
    private visitsdate: Date;
    private motive: string;
    private sucursal : Veterinary;

    public constructor(client: Client, pet:Pet, sucursal:Veterinary){
        this.client = client;
        this.pet = pet;
        this.visitsdate = new Date();
        this.id = Visits.idCounter++;
        this.motive = "";
        this.sucursal = sucursal;
  
        
    }

    private visitMotive(): string{
    console.log("Bienvenido");
    const visitMotive = rs.question("ingrese el motivo de la consulta:")
    this.motive = visitMotive;
    rs.keyInPause();
    return visitMotive; 
   
    }
    public getId():number
    {
      return this.id;
    }
    public getClient():Client
    {
      return this.client;
    }
    public getPet():Pet
    {
      return this.pet;
    }

    public getSucursal():Veterinary
    {
      return this.sucursal;
    }

    public setSucursal(sucursal :Veterinary):void
    {
      this.sucursal = sucursal;
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
    
          const visita = new Visits (value.client, value.pet,value.sucursal);
    
          Object.assign (visita, value) 
    
          return visita;
          
        }
    
        return value;
    
      }
 
  }
