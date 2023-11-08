enum Especies {
    dog = "Perro",
    cat = "Gato",
    exotic = "Exotico"
  }
  
  export class Pet {
      private static idCounter: number = 10;
      private id: number ;
      private name: string;
      private species: Especies;
      private ownerID: number;
    
      constructor(name: string, species: Especies, ownerID: number) {
        this.id = Pet.idCounter++;
        this.name = name;
        this.species = species;
        this.ownerID = ownerID;
      }
    
      getId(): number {
        return this.id;
      }
    
      getName(): string {
        return this.name;
      }
    
      getSpecies(): string {
        return this.species;
      }
    
      getOwnerID(): number {
        return this.ownerID;
      }
  
      setName(name: string): void {
          this.name = name;
      }
  
      setSpecies(species: Especies): void {
          this.species = species;
      }
  
      setOwnerID(ownerID: number): void {
          this.ownerID = ownerID;
      }
  
    }