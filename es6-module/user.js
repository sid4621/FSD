export default class User {
  constructor(name) {
    this.name = name;
  }
  
  getInfo() {
    return `User name is ${this.name}`;
  }
}

export function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}
