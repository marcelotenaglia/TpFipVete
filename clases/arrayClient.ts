import * as rs from 'readline-sync';
import { Client } from './clientClass'; 
import { Readline } from "readline/promises";
import { FileManagerClientes } from "../fileManagers/fsClientes";
import { Veterinary } from "./veterinary";


export class ArrayClientes {

    private clientes: Client[];

    public constructor() {
        this.clientes = [];
    }

    public findClient(DNI: number): Client | undefined {
        const cliente = this.clientes.find((cli) => cli.getDni() === DNI);
        return cliente;
    }

    public listClients(): void {
        this.clientes.forEach((cli) => {
            console.log(`
                DNI del Cliente: ${cli.getDni()}
                Nombre del Cliente: ${cli.getName()}
                Teléfono del Cliente: ${cli.getPhone()}
                ¿Es VIP?: ${cli.getIsVIP() ? 'Sí' : 'No'}
                Número de visitas: ${cli.getVisits()}
            `);
        });
    }

    public addClient(DNI: number, name: string, phone: string): void {
        if (this.findClient(DNI) === undefined) {
            const cliente = new Client(DNI, name, phone);
            this.clientes.push(cliente);
            FileManagerClientes.guardarDatosClientes(this.clientes);
        } else {
            console.log(`El DNI ${DNI} ya está vinculado a un cliente`);
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

    public cargarClientes(cli: Client[]): void {
        this.clientes = cli;
    }

    public pedirDatos(): void {
        const DNI = rs.questionInt("Ingrese el DNI del Cliente: ");
        const name = rs.question("Ingrese el nombre del Cliente: ");
        const phone = rs.question("Ingrese el teléfono del Cliente: ");
        this.addClient(DNI, name, phone);
    }

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
                case 2:
                    rs.keyInPause("Modificar próximamente");
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
}
