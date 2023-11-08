export class Provider {

    private static idCounter: number = 20;
    private id: number ;
    private name: string;
    private phone: string;
    private cuit : string;

    constructor(name: string, phone: string, cuit : string) {
      this.id = Provider.idCounter++;
      this.name = name;
      this.phone = phone;
      this.cuit = cuit;
    }
  
    getId(): number {
      return this.id;
    }
  
    getName(): string {
      return this.name;
    }
  
    getPhone(): string {
      return this.phone;
    }

    setName(name: string): void {
        this.name = name;
    }

    setPhone(phone: string): void {
        this.phone = phone;
    }

    getCuit() : string {
      return this.cuit
    }

    setCuit(cuit : string) : void {
      this.cuit = cuit;
    } 

    static revive (key : string, value : any) : Provider | any {

      if (typeof value === 'object' && value !== null && 'provider' in value) {
  
        const proveedor = new Provider (value.name, value.phone, value.cuit);
  
        Object.assign (proveedor, value) 
  
        return proveedor;
        
      }
  
      return value;
  
    }

  }