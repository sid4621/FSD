class Car {
  constructor(model, year) {
    this.model = model;
    this.year = year;
  }

  introduce() {
    console.log(`Car model: ${this.model}, release year: ${this.year}.`);
  }
}

// Create an instance
const c1 = new Car('Reuvelto', 2023);
c1.introduce(); 
