import {add, substract} from './math.js'
import sayHello from './greet.js'
import { add as  sum, substract as diff} from './mathOperations.js';
import User, { validateEmail } from './user.js';

console.log("************* Demo **************")
console.log("Add: ",add(2,3));
console.log("Subtract: ",substract(2,3));
console.log(sayHello("Darshan"));

console.log("\n\n\n************* Assignment 1 **************")
console.log("Sum: ",sum(2,3));
console.log("Difference: ",diff(2,3));

const word = "hello";

if (word) {
  import('./upper.js')
    .then(module => {
      const capitalized = module.capitalize(word);
      console.log("Capitalized Word:", capitalized);
    })
    .catch(err => console.error("Failed to load module:", err));
} else {
  console.log("No word to capitalize");
}


console.log("\n\n\n************* Assignment 3 **************")

const user = new User("Darshan");
console.log(user.getInfo());

const email = "darshan@gmail.com";
const isValid = validateEmail(email);
console.log(`Is "${email}" a valid email?`, isValid);
console.log("\n\n\n************* Assignment 2 **************")
