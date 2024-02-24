
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

function createPhoneNumber(){
    let phoneNumber = numbers;
    let newPhoneNumber = `(${phoneNumber.slice(0,3).join('')}) ${phoneNumber.slice(3,6).join('')}-${phoneNumber.slice(6).join('')}`;
    return newPhoneNumber;
}

console.log(createPhoneNumber(numbers)); 