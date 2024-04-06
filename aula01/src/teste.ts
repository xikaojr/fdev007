function firstElement<T>(arr: T[]): T | undefined {
  return arr[0];
}

const numbers = [1, 2, 3, 4, 5];
const firstNumber = firstElement(numbers);  // Retorna 1 (tipo number)
console.log(firstNumber);


const strings = ['apple', 'banana', 'cherry'];
const firstString = firstElement(strings);  // Retorna 'apple' (tipo string)
console.log(firstString);


const emptyArray: number[] = [];
const firstEmpty = firstElement(emptyArray);  // Retorna undefined (tipo undefined)
console.log(firstEmpty);
