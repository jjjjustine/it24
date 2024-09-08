console.log("................................");
// Data types..
let myName = "My name is Jane Justine";
console.log(myName);
let int = 10;
console.log("The number is " + int);
console.log("................................");
// using Arithmetic operation..
let number1 = 10;
let number2 = 10;
prod = number1 * number2;
console.log("The product is equal to " + prod);
console.log("................................");
// pag check ug number if odd or even gamit if else statement..
let numb1 = 9;
let numb2 = 13;
let numb3 = 16;
let numb4 = 34;
let numb5 = 45;
function checkEvenOdd(num) {
    if (num % 2 === 0) {
        console.log(num + " is even.");
    } else {
        console.log(num + " is odd.");
    }
}
checkEvenOdd(numb1);
checkEvenOdd(numb2);
checkEvenOdd(numb3);
checkEvenOdd(numb4);
checkEvenOdd(numb5);

console.log("................................");

// pag determine sa number if prime or dili gamit for loop ug logical operator...
let num1 = 7; 

let isPrime = num1 > 1;
for (let i = 2; i < num1 && isPrime; i++) {
    if (num1 % i === 0) isPrime = false;
}
console.log(num1 + (isPrime ? " is a Prime number" : " is not a Prime number"));
console.log("................................");

//pag determine sa word if palindrome or not gamit switch statement...
let word1 = "Level";
let reversedName = "leveL";
let normalizedName = word1.toLowerCase();
let normalReversedName = reversedName.toLowerCase();
let isPalindrome = normalizedName === normalReversedName;

switch (isPalindrome) {
    case true:
        console.log("Word " + word1 +  " is a Palindrome");
        break;
    case false:
        console.log("Word " + word1 + " is not a Palindrome");
        break;
}
