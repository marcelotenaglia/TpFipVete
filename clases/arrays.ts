import * as rs from "readline-sync";
import { Visits } from "./visitClass"; 
import { Client } from "./clientClass";
import { Pet } from "./petClass";
import { Provider } from "./providerClass";
import { Veterinary } from "./veterinary";
import { arraysvet } from "./arraySucursales";
import { ArrayProv } from "./arrayProviders";
import { ArrayClientes } from "./arrayClient";
import { arrayVisit } from "./arrayvisits";

export class Arreglos
{
    private providers: ArrayProv;
    private sucursales: arraysvet;
    private clientes :ArrayClientes;
    private visits: arrayVisit;

public constructor()
{

    this.providers = new ArrayProv();
    this.sucursales = new arraysvet();
    this.clientes = new ArrayClientes();
    this.visits = new arrayVisit();
}
/*
private isIDAssigned(entities: any[], id: number): boolean {
    return entities.some(entity => entity.getId() === id);
}

​
addClient(client: Client) {
    if (!this.isIDAssigned(this.clients, client.getId())) {
        this.clients.push(client);
    } else {
        console.log(`ID ${client.getId()} ya está asignado a otro cliente.`);
    }
}
​
addPet(pet: Pet) {
    if (!this.isIDAssigned(this.pets, pet.getId())) {
        this.pets.push(pet);
    } else {
        console.log(`ID ${pet.getId()} ya está asignado a otra mascota.`);
    }
}

updateVIPStatus(clientID: number) {
    const client = this.clients.find((c) => c.getId() === clientID);
    if (client) {
      const visits = client.getVisits();
      client.incrementVisits();; // Incrementa el número de visitas
      client.setVisits(visits); // Actualiza el número de visitas en el cliente
      if (visits >= 5) {
        client.setIsVIP(true); // Establece el estado VIP en true
      }
    }
  }
​

​
  deletePet (pet:Pet): void{
    this.pets = this.pets.filter((pets) => pets != pet);
    console.log (`la Mascota ${pet.getName()} ha sido dada de alta o bien ha sido enviada al campo`);
    
  }
​
  deleteClient (client : Client): void {
    this.clients = this.clients.filter((clients)=> clients != client);
    console.log(`El cliente ${client.getName()} ya no forma parte de nuestra familia mascotera`);
  }
​
  newVisits(client : Client, pet:Pet): void {
    const newVisit = new Visits(client,pet);
    this.visit.push(newVisit); 
    client.incrementVisits();
    this.updateVIPStatus(client.getId());  
    console.log(`Visita cargada exitosamente 
    Cliente ID: ${client.getId()} 
    Nombre: ${client.getName()} 
    Nombre Mascota: ${pet.getName()}
    Especie: ${pet.getSpecies()} 
    Motivo de la visita: ${newVisit.getMotive()}
    Fecha de la visita: ${newVisit.getDate()} `);
       
}
​
listVisits(){
    //return console.log(this.visit);
    this.visit.forEach((visit) => {
        console.log(`
      Date: ${visit.getDate()}
      Client: ${visit.getClientName()}
      Pet:${visit.getPetName()}
      Motive: ${visit.getMotive()}  
      ---  
      `);
      });
  }

*/
public menu () : void {

​

while(true)
{
  console.clear();
    const choice = rs.keyInSelect (this.menuOptions);
    
​
    switch (choice) {
​
      case 0 : 
      this.sucursales.menuSucursales();
        break;
​
      case 1 : this.clientes.menuClientes();
        break;
        
      case 2 : this.providers.menuProveedores();
        break;  
​
      case 3 : this.visits.menuvisitas();
        break;
​
      default: 
        rs.keyInPause("nino vimos");
        return;
    }
  }
} 
​
​
public menuClientes () {
​
  const choice = rs.keyInSelect (this.menuOptionsA);
​
  switch (choice) {
​
    case 0 :
      break;
​
    case 1 : 
      break;
      
    case 2 : 
      break;  
​
    case 3 : 
      break;
​
    default : 
      break;
  }
​
}
​
public menuVisitas () {
​
  const choice = rs.keyInSelect (this.menuOptionsA);
​
  switch (choice) {
​
    case 0 :
      break;
​
    case 1 : 
      break;
      
    case 2 : 
      break;  
​
    case 3 : 
      break;
​
    default : 
      break;
  }
​
}
​
menuOptionsA = ["Listar", "Agregar", "Modificar", "Eliminar"]
​
​
menuOptions = ["Sucursales", "Clientes", "Proveedores", "Visitas"];
​
}