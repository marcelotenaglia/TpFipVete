export class Client {
  
    private static idCounter: number = 1;
    private id: number ;
    private name: string;
    private phone: string;
    private isVIP: boolean;
    private visits: number;
  
    constructor(name: string, phone: string) {
      this.id = Client.idCounter++;
      this.name = name;
      this.phone = phone;
      this.isVIP = false;
      this.visits = 0;
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
  
    getIsVIP(): boolean {
      return this.isVIP;
    }
  
    getVisits(): number {
      return this.visits;
    }    
    
    setVisits(visits: number): void {
        this.visits = visits;
      }
    
    setIsVIP(isVIP: boolean): void {
        this.isVIP = isVIP;
      }

      incrementVisits() {
        this.visits++;
      }

      
    setName(name: string): void {
        this.name = name;
    }

    setPhone(phone: string): void {
        this.phone = phone;
    }

    static revive (key : string, value : any) : Client | any {

      if (typeof value === 'object' && value !== null && 'client' in value) {
  
        const cliente = new Client (value.name, value.phone);
  
        Object.assign (cliente, value) 
  
        return cliente;
        
      }
  
      return value;
  
    }

  
  }