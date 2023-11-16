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
  
    
      constructor(name: string, species: Especies) {
        this.id = Pet.idCounter++;
        this.name = name;
        this.species = species;
   
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
    

      setName(name: string): void {
          this.name = name;
      }
  
      setSpecies(species: Especies): void {
          this.species = species;
      }
      static revive (key : string, value : any) : Pet | any {

        if (typeof value === 'object' && value !== null && 'name' in value) {
    
          const pet = new Pet (value.name,value.especie);
    
          Object.assign (pet, value) 
    
          return pet;
          
        }
    
        return value;
    
      }
 
    }