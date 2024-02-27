
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

function createPhoneNumber(numbers){
   
    numbers = `(${numbers.slice(0,3).join('')}) ${numbers.slice(3,6).join('')}-${numbers.slice(6).join('')}`;
    return numbers;
}

createPhoneNumber(numbers); // => (123) 456-7890
//console.log(createPhoneNumber(numbers))


