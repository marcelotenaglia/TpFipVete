import * as rs from 'readline-sync';
import { Client } from './clientClass'; 
import { FileManagerClientes } from "../fileManagers/fsClientes";
import { Veterinary } from "./veterinary";



export class ArrayClientes {

    private clientes: Client[];

    public constructor() {
        this.clientes = [];
    }

    public findClient(dni: number): Client | undefined {
        const cliente = this.clientes.find((cli) => cli.getDni() === dni);
        return cliente; // Busca el cliente por dni
    }
    /*updateVIPStatus(clientID: number) {
        const client = this.clients.find((c) => c.getId() === clientID);
        if (client) {
          const visits = client.getVisits();
          client.incrementVisits();; // Incrementa el número de visitas
          client.setVisits(visits); // Actualiza el número de visitas en el cliente
          if (visits >= 5) {
            client.setIsVIP(true); // Establece el estado VIP en true
          }
        }
      }*/
    ​

    public listClients(): void {
        this.clientes.forEach(cli => {
            cli = Client.revive("",cli);
            console.log(`
                DNI del Cliente: ${cli.getDni()}
                Nombre del Cliente: ${cli.getName()}
                Teléfono del Cliente: ${cli.getPhone()}
                ¿Es VIP?: ${cli.getIsVIP() ? 'Sí' : 'No'} 
                Número de visitas: ${cli.getVisits()}
            `);
        });
    }

    public addClient(dni: number, name: string, phone: string): void {
        if (this.findClient(dni) === undefined) {
            const cliente = new Client(dni, name, phone);
            this.clientes.push(cliente);
            FileManagerClientes.guardarDatosClientes(this.clientes);
        } else {
            console.log(`El DNI ${dni} ya está vinculado a un cliente`);
        }
    }

    public deleteClient(DNI: number): void {
        this.clientes.forEach((cli, ind) => {
            if (cli.getDni() === DNI) {
                this.clientes.splice(ind, 1);
                FileManagerClientes.guardarDatosClientes(this.clientes);
            }
        });
    }

    public sumarVisita(dni : number):void
    {
        const cli = this.findClient(dni);
        if(cli !== undefined)
        {
            cli.incrementVisits();
            FileManagerClientes.guardarDatosClientes(this.clientes);
        }
    }
    public cargarClientes(cli: Client[]): void {
        this.clientes = cli;
    }

    public pedirDatos(): void {
        const DNI = rs.questionInt("Ingrese el DNI del Cliente: ");
        const name = rs.question("Ingrese el nombre del Cliente: ");
        const phone = rs.question("Ingrese el teléfono del Cliente: ");
        this.addClient(DNI, name, phone);
    }


        
public updateClient(DNIClient: number) {
    const cliUpdate = this.findClient(DNIClient);

    if (cliUpdate !== undefined) {
        const choiceX = rs.keyInSelect(this.updateOptions);
        
        switch (choiceX) {
            case 0:
                this.updateClientName(cliUpdate);
                break;
            case 1:
                this.updateClientPhone(cliUpdate);
                break;
            default:
                console.log("Operación cancelada");
                break;
        }
    } else {
        console.log(`El cliente con el DNI ${DNIClient} no existe`);
    }
} // modificar datos cliente

private updateClientName(client: Client) {
    const newName = rs.question("Ingrese Nuevo Nombre: ");
    try {
        client.setName(newName);
        FileManagerClientes.guardarDatosClientes(this.clientes);
        console.log(`Cambio realizado con éxito. Nuevo nombre: ${client.getName()}`);
    } catch (error) {
        console.error("Error al actualizar el nombre del cliente:", error.message);
    }
} //modificar nombre

private updateClientPhone(client: Client) {
    const newPhone = rs.question("Ingrese Nuevo Teléfono: ");
    try {
        client.setPhone(newPhone);
        FileManagerClientes.guardarDatosClientes(this.clientes);
        console.log(`Cambio realizado con éxito. Nuevo teléfono: ${client.getPhone()}`);
    } catch (error) {
        console.error("Error al actualizar el teléfono del cliente:", error.message);
    }
} //modificar telefono

        

    public menuClientes(): void {
        this.cargarClientes(FileManagerClientes.cargarDatosClientes());
        while (true) {
            console.clear();
            const choice = rs.keyInSelect(this.menuOptionsA);

            switch (choice) {
                case 0:
                    this.listClients();
                    rs.keyInPause("");
                    break;
                case 1:
                    this.pedirDatos();
                    rs.keyInPause("");
                    break;
                case 2: //modificar datos!!!
                    //rs.keyInPause("Modificar próximamente");
                    const DNIClient = rs.questionInt("Ingrese el DNI del cliente a modificar: ");
                    this.updateClient(DNIClient);
                    rs.keyInPause("");
                    break;
                case 3:
                    const DNI = rs.questionInt("Ingrese el DNI del cliente a borrar: ");
                    const cliDel = this.findClient(DNI);
                    if (cliDel !== undefined) {
                        console.log(`¿Está seguro que desea eliminar al cliente con el nombre ${cliDel.getName()}`);
                        const choice2 = rs.keyInSelect(this.confirmacionOptions);
                        switch (choice2) {
                            case 0:
                                this.deleteClient(DNI);
                                break;
                            default:
                                console.log("Operación cancelada");
                                break;
                        }
                    } else {
                        console.log(`El cliente con el DNI ${DNI} no existe`);
                    }
                    break;
                default:
                    rs.keyInPause("Menú anterior");
                    return;
            }
        }
    }

    private confirmacionOptions = ["Eliminar"];
    private menuOptionsA = ["Listar", "Agregar", "Modificar", "Eliminar"];
    private updateOptions = ["Modificar nombre","Modificar telefono"]; 
}
