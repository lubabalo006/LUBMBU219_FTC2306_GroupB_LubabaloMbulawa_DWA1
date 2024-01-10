// const MAX_NUMBER = 10
// const MIN_NUMBER = -5
// const STEP_AMOUNT = 2


// const number = document.querySelector('[data-key="number"]')
// const subtract = document.querySelector('[data-key="subtract"]')
// const add = document.querySelector('[data-key="add"]')


// const subtracthandler = () => {
//     const newValue = parseInt(number.value) -STEP_AMOUNT
//     number.value = newValue;

//     if(add.disabled === true) {
//         add.disabled = false
//     } 
//     if (newValue <= MIN_NUMBER) {
//         subtract.disabled = true
//     }

// }

// const addhandler = () => {
//     const newValue = parseInt(number.value) +STEP_AMOUNT
//     number.value = newValue;

//     if (subtract.disabled === true) {
//         subtract.disabled = false
//     }
//     if (newValue >= MAX_NUMBER) {
//         add.disabled = true
//     }
// }



// subtract.addEventListener('click', subtracthandler)
// add.addEventListener('click', addhandler)

import { onMounted, query, html } from 'https://cdn.jsdelivr.net/npm/@shoelace/shoelace@2.0.1/dist/shoelace.esm.min.js';

const counterElement = query('#counter');
const addButton = query('#add');
const subtractButton = query('#subtract');
const resetButton = query('#reset');

let counterValue = 0;

// Function to update the counter value and display it
const updateCounter = () => {
    counterElement.innerText = counterValue;
};

// Function to increment the counter by one
const incrementCounter = () => {
    counterValue++;
    updateCounter();
};

// Function to decrement the counter by one
const decrementCounter = () => {
    if (counterValue > 0) {
        counterValue--;
        updateCounter();
    }
};

// Function to reset the counter
const resetCounter = () => {
    counterValue = 0;
    updateCounter();
    alert('Counter has been reset.');
};

// Event listeners for the buttons
addButton.addEventListener('click', incrementCounter);
subtractButton.addEventListener('click', decrementCounter);
resetButton.addEventListener('click', resetCounter);

// Initial setup
onMounted(() => {
    updateCounter();
});
